#!/usr/bin/env bash
#
# This bash script defines common functions used by cucumber contributors
#
# TODO: Document with https://github.com/tests-always-included/tomdoc.sh
#
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

# The root dir of the monorepo
root_dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && cd .. && pwd )"

function echo_err()
{
  echo_red "$@" 1>&2
}

function echo_green
{
  echo -e "${GREEN}$@${NC}"
}

function echo_red
{
  echo -e "${RED}$@${NC}"
}

function echo_blue
{
  echo -e "${BLUE}$@${NC}"
}

function docker_image() {
  dockerfile=$1
  image_name=$(basename ${dockerfile} | cut -d '.' -f 2)
  tag=$(cat ${dockerfile} | md5sum | cut -d ' ' -f 1)
  echo "cucumber/${image_name}:${tag}"
}

function docker_build() {
  dockerfile=$1
  docker build --rm --file ${dockerfile} --tag $(docker_image ${dockerfile}) .
}

# You have to `docker login` as a user with access to the "cucumber" docker hub
# team. Contact somebody on the core team if you think you should have access.
function docker_push() {
  dockerfile=$1
  docker push $(docker_image ${dockerfile})
}

function rsync_files()
{
  git ls-files "${root_dir}/**/.rsync" | while read rsync_file; do
    pushd "$( dirname "${rsync_file}" )"
    cat .rsync | while read line; do
      rsync -ah --delete ${line}
    done
    popd
  done
}

# Prints all subrepos. Optionally specify a parent dir.
function subrepos()
{
  dir=$1
  if [ -n "${dir}" ]; then
    dir="${dir}/"
  fi
  git ls-files "${dir}**/.gitrepo" | xargs -n 1 dirname
}

# Prints the remote (git URL) of a subrepo
function subrepo_remote()
{
  subrepo=$1
  git subrepo status "${subrepo}" | grep "Remote URL:" | sed -e 's/[ \t][ \t]*Remote URL:[ \t][ \t]*//g'
}

function pull_subrepos()
{
  subrepos $1 | while read subrepo; do
    remote=$(subrepo_remote "${subrepo}")
    echo "pulling ${subrepo} from ${remote}"
    git subrepo pull "${subrepo}"
  done
}

function push_subrepos()
{
  subrepos $1 | while read subrepo; do
    remote=$(subrepo_remote "${subrepo}")
    echo "pushing ${subrepo} to ${remote}"
    git subrepo push "${subrepo}"
  done
}

function build_subrepos()
{
  subrepos $1 | while read subrepo; do
    pushd "${subrepo}"
    make
    popd
  done
}

# Releases all implementations of a group.
#
# Before running this function you should make sure you are authenticated
# with all the various package managers:
#
#   ./scripts/check-release-karma
function release_subrepos()
{
  group_path=$1
  version=$2
  next_version=$3

  subrepos "${group_path}" | while read subrepo; do
    release_subrepo "${subrepo}" "${version}" "${next_version}"
  done
}

function release_subrepo()
{
  subrepo=$1
  version=$2
  next_version=$3

  clone_for_release "${subrepo}"
  release_subrepo_clone "$(release_dir "${subrepo}")" "${version}" "${next_version}"
}

# Clones a subrepo into a temporary directory, which is where the release will be
# made from.
function clone_for_release()
{
  subrepo=$1
  remote=$(subrepo_remote "${subrepo}")
  rdir=$(release_dir "${subrepo}")

  rm -rf "${rdir}"

  echo_green "***** Cloning ${remote} (${subrepo}) *****"
  git clone "${remote}" "${rdir}"
}

# Publishes a released package for a subrepo (from a clone of the subrepo)
function release_subrepo_clone()
{
  dir=$1
  version=$2
  next_version=$3

  ptype=$(project_type "${dir}")
  if [ -n "${ptype}" ]; then
    eval ${ptype}_release "${dir}" "${version}" "${next_version}"
  fi
}

function release_dir()
{
  echo "$1/.release"
}

function release_karma_all()
{
  group_path=$1

  subrepos "${group_path}" | while read subrepo; do
    release_karma "$subrepo"
  done
}

# Check whether the current user (probably) has the karma to release a subrepo.
# This is not a real check, just high level checks you're logged into the package
# repo, and other heuristics.
function release_karma()
{
  dir=$1

  ptype=$(project_type "${dir}")
  if [ -n "${ptype}" ]; then
    eval ${ptype}_release_karma
  fi
}

# TODO: Replace with a simple `basename`
function project_type()
{
  dir=$1

  if [ -f "${dir}/pom.xml" ]; then
    echo "maven"
  elif [ -f "${dir}/package.json" ]; then
    echo "npm"
  elif [ -f "${dir}/setup.py" ]; then
    echo "python"
  elif [ -f "${dir}/cpanfile" ]; then
    echo "perl"
  elif [ -f "$(find_path ${dir} "*.gemspec")" ]; then
    echo "rubygem"
  elif [ -f "$(find_path ${dir} "*.nuspec")" ]; then
    echo "dotnet"
  elif [ -f "$(find_path ${dir} "*.go")" ]; then
    echo "go"
  elif [ -d "$(find_path ${dir} "*.xcodeproj")" ]; then
    echo "xcode"
  elif [ -f "$(find_path ${dir} "*.c")" ]; then
    echo "c"
  else
    echo_err "ERROR: Unrecognised platform: ${dir}"
  fi
}

function find_path()
{
  subrepo=$1
  glob=$2
  find "${subrepo}" -name "${glob}" | head -1
}

################ MAVEN ################

function maven_update_version()
{
  subrepo=$1
  version=$2

  xmlstarlet ed --inplace --ps -N pom="http://maven.apache.org/POM/4.0.0" \
    --update "/pom:project/pom:version" \
    --value "${version}" \
    "${subrepo}/pom.xml"
  echo_green "Updated ${subrepo} to ${version}"
}

function maven_release_karma()
{
  echo_green "Checking maven release karma..."
  ls ~/.m2/settings.xml && echo_green "maven ok" || echo_red "\nFollow these instructions: https://maven.apache.org/guides/mini/guide-encryption.html"

  echo_green "Checking gpg..."
  ls ~/.gnupg/secring.gpg && echo_green "gpg ok" || echo_red "\nFollow these instructions: http://blog.sonatype.com/2010/01/how-to-generate-pgp-signatures-with-maven/"

  echo_red "Try this manually: gpg --use-agent --local-user devs@cucumber.io -ab README.md"
  echo_red "The first time you should be asked for a passphrase, the next time not."
}

function maven_release()
{
  dir=$1
  version=$2
  next_version=$3

  pushd "${dir}"
  mvn release:clean
  mvn --batch-mode -P release-sign-artifacts release:prepare -DdevelopmentVersion=${next_version}-SNAPSHOT
  mvn --batch-mode -P release-sign-artifacts release:perform
  echo_green "Log in to https://oss.sonatype.org/, close and release the project."
  popd
}

################ NPM ################

function npm_release_karma()
{
  echo_green "Checking npm release karma..."
  npm whoami && echo_green "npm ok" || echo_red "\nYou need to: npm login"
}

function npm_release() {
  dir=$1
  version=$2
  next_version=$3

  pushd "${dir}"
  yarn install
  yarn version --new-version "${version}"
  yarn publish
  git push
  git push --tags
  popd
}

################ RUBYGEM ################

function rubygem_release_karma()
{
  echo_green "Checking rubygems release karma..."
  ls ~/.gem/credentials && echo_green "rubygems ok" || echo_red "\nYou need to: gem push"
}

function rubygem_release() {
  dir=$1
  version=$2
  next_version=$3

  pushd "${dir}"
  sed -i "" "s/\(s\.version *= *'\)[0-9]*\.[0-9]*\.[0-9]*\('\)/\1${version}\2/" "$(find_path "." "*.gemspec")"
  git add .
  git commit -m "Release ${version}"
  bundle exec rake build release
  popd
}

################ PYTHON ################

function python_release_karma()
{
  echo_green "Checking PyPi release karma..."
  ls ~/.pypirc && echo_green "PyPi ok" || echo_red "\nYou need to create a ~/.pypirc file. See http://peterdowns.com/posts/first-time-with-pypi.html"
}

function python_release() {
  dir=$1
  version=$2
  next_version=$3

  pushd "${dir}"
  python_update_version "${version}"
  python setup.py sdist upload -r pypi

  git add .
  git commit -m "Release ${version}"
  git tag "v${version}"
  git push
  git push --tags
  popd
}

function python_update_version()
{
  version=$1
  sed -i "" \
    -e "s/\(version *= *'\)[0-9]*\.[0-9]*\.[0-9]*\('\)/\1${version}\2/" \
    -e "s/\(archive\/v\)[0-9]*\.[0-9]*\.[0-9]*\(\.tar\)/\1${version}\2/" \
    "setup.py"
}

################ PERL ################

function perl_release_karma()
{
  echo_green "Checking Perl release karma..."
  ls ~/pause.conf && echo_green "Perl ok" || echo_red "\nYou need a PAUSE (https://pause.perl.org/) account and a ~/pause.conf file. See http://search.cpan.org/~perlancar/App-pause-0.59/bin/pause"
  which dzil && echo_green "Dist::Zilla ok" || echo_red "\nYou need dzil on your PATH. On OS X it's in something like /usr/local/Cellar/perl/5.24.1/bin/dzil"
}

function perl_release() {
  dir=$1
  version=$2
  next_version=$3

  pushd "${dir}"
  perl_update_version "${version}"
  dzil test --release
  dzil build
  dzil release

  git add .
  git commit -m "Release ${version}"
  git tag "v${version}"
  git push
  git push --tags
  popd
}

function perl_update_version()
{
  subrepo=$1
  version=$2
  echo "${version}" > "${subrepo}/VERSION"
  echo_green "Updated ${subrepo} to ${version}"
}

################ .NET ################

function dotnet_update_version()
{
  subrepo=$1
  version=$2

  xmlstarlet ed --inplace --ps -N nuspec="http://schemas.microsoft.com/packaging/2010/07/nuspec.xsd" \
    --update "/package/nuspec:metadata/nuspec:version" \
    --value "${version}" \
    "$(find_path "${subrepo}" "*.nuspec")"
  echo_green "Updated ${subrepo} to ${version}"
}

function dotnet_release_karma()
{
  echo_green "Checking .NET release karma..."
  ls ~/.config/NuGet/NuGet.Config && echo_green ".NET ok" || echo_red "\nYou need to: nuget setApiKey Your-API-Key. See https://docs.nuget.org/ndocs/create-packages/publish-a-package"
}

function dotnet_release()
{
  dir=$1
  version=$2
  next_version=$3

  nuget=${root_dir}/bin/NuGet.exe
  sln=$(find_path "${dir}" "*.sln")
  nuspec=$(find_path "${dir}" "*.nuspec")

  pushd "${dir}"
  mono "${nuget}" restore "${sln}"
  xbuild /p:Configuration=Release
  mono "${nuget}" pack "${nuspec}"
  mono "${nuget}" push "$(find_path "${dir}" "*.nupkg")"
  popd
}

################ Go ################

function go_update_version()
{
  subrepo=$1
  version=$2
  echo_blue "No need to update to ${version} in ${subrepo} (currently not using a go package manager)"
}

function go_release_karma()
{
  echo_blue "No release karma needed for ${subrepo} (currently not using a Go package manager)"
}

################ xcode ################

function xcode_update_version()
{
  subrepo=$1
  version=$2
  echo_blue "No need to update to ${version} in ${subrepo} (currently not using an xcode package manager)"
}

function xcode_release_karma()
{
  echo_blue "No release karma needed for ${subrepo} (currently not using an xcode package manager)"
}

################ c ################

function c_release_karma()
{
  echo_blue "No release karma needed for ${subrepo} (currently not using a c package manager)"
}

function c_release() {
  dir=$1
  version=$2
  next_version=$3

  pushd "${dir}"
  git add .
  git commit -m "Release ${version}"
  git tag "v${version}"
  git push
  git push --tags
  popd
}
