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
      rsync --archive ${line}
    done
    popd
  done
}

# Prints all subrepos. Optionally specify a parent dir.
function subrepos()
{
  dir=$1
  git ls-files "${dir}" | grep "\.subrepo" | xargs -n 1 dirname
}

# Prints the remote (git URL) of a subrepo
function subrepo_remote()
{
  subrepo=$1
  suffix=$(cat ${subrepo}/.subrepo).git
  if [ -z "${GITHUB_TOKEN}" ]; then
    echo "git@github.com:${suffix}"
  else
    echo "https://${GITHUB_TOKEN}@github.com/${suffix}"
  fi
}

function subrepo_owner_name()
{
  subrepo=$1
  cat ${subrepo}/.subrepo
}

function git_branch() {
  if [ -z "${TRAVIS_TAG}" ]; then
    # Only report branch if we're not on a tag
    echo "${TRAVIS_BRANCH}"
  fi
}

function git_tag() {
  echo "${TRAVIS_TAG}"
}

function push_subrepos()
{
  if [ "${TRAVIS_PULL_REQUEST}" = "false" ] || [ -z "${TRAVIS_PULL_REQUEST}" ]; then
    subrepos $1 | while read subrepo; do
      push_subrepo_branch_maybe "${subrepo}"
    done
    push_subrepo_tag_maybe
  else
    echo "Skipping pushing to subrepos on Travis pull request builds."
  fi
}

function push_subrepo_branch_maybe()
{
  subrepo=$1
  remote=$(subrepo_remote "${subrepo}")
  branch=$(git_branch)
  
  if [ -z "${branch}" ]; then
    echo "No branch to push"
  else
    git push --force "${remote}" $(splitsh-lite --prefix=${subrepo}):refs/heads/${branch}
  fi
}

function push_subrepo_tag_maybe()
{
  tag=$(git_tag)
  if [ -z "${tag}" ]; then
    echo "No tag to push"
  else
    tagged_subrepo=$(echo "${tag}" | cut -d/ -f 1)
    vtag=$(echo "${tag}" | cut -d/ -f 2)
    subrepos . | while read subrepo; do
      if [[ "${subrepo}" = "${tagged_subrepo}"* ]]; then
        remote=$(subrepo_remote "${subrepo}")
        ref=$(splitsh-lite --prefix=${subrepo} --origin=refs/tags/${tag})
        git push --force "${remote}" ${ref}:refs/tags/${vtag}
      fi
    done
  fi
}

function release_module()
{
  module=$1
  version=$2

  subrepos "${module}" | while read subrepo; do
    version_subrepo "${subrepo}" "${version}"
  done
  
  git commit -am "Release ${module} v${version}"
  git tag "${module}/v${version}"
  git push && git push --tags
}

function setup_travis_maven_deploy()
{
  subrepo=$1
  repo=$(subrepo_owner_name "${subrepo}")
  if [ -z "${CI_SONATYPE_PASSWORD}" ]; then
    echo "Please define CI_SONATYPE_PASSWORD. It's in 1Password (cukebot)."
    exit 1
  fi
  if [ -z "${CI_GPG_PASSPHRASE}" ]; then
    echo "Please define CI_GPG_PASSPHRASE. It's in 1Password."
    exit 1
  fi

  pushd "${subrepo}"
  travis encrypt "CI_SONATYPE_PASSWORD=${CI_SONATYPE_PASSWORD}" --add --repo "${repo}"
  travis encrypt "CI_GPG_PASSPHRASE=${CI_GPG_PASSPHRASE}" --add --repo "${repo}"
  popd
  setup_gpg "${subrepo}"
}

# Sets up GPG in a module dir
function setup_gpg()
{
  subrepo=$1
  if [ -z "$2" ]; then
    repo=$(subrepo_owner_name "${subrepo}")
  else
    repo=$2
  fi

  pushd "${subrepo}"

  if [ -z "${CI_GPG_PASSPHRASE}" ]; then
    echo "Please define CI_GPG_PASSPHRASE. It's in 1Password."
    exit 1
  fi

  echo "${CI_GPG_PASSPHRASE}" | gpg2 --batch --passphrase-fd 0 --pinentry-mode loopback \
    --export-secret-key E60E1F911B996560FFB135DAF4CABFB5B89B8BE6 > scripts/codesigning.asc

  # Encrypt the signing key to scripts/codesigning.asc.enc. Store the encrypted
  # decryption keys in `.travis.yml` and copy the openssl command to decrypt it.
  rm -f scripts/codesigning.asc.enc
  travis encrypt-file \
    scripts/codesigning.asc \
    scripts/codesigning.asc.enc \
    --add \
    --repo "${repo}"
  
  # Remove the unencrypted key. We don't want that to accidentally end up in git!
  rm scripts/codesigning.asc
  
  popd
}

function setup_travis_token() {
  subrepo=$1
  repo=$(subrepo_owner_name "${subrepo}")
  pushd "${subrepo}"

  travis encrypt TRAVIS_API_TOKEN=${TRAVIS_API_TOKEN} --add --repo "${repo}"

  popd
}

function version_subrepo()
{
  dir=$1
  version=$2

  ptype=$(project_type "${dir}")
  if [ -n "${ptype}" ]; then
    eval ${ptype}_version "${dir}" "${version}"
  fi
}

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
  elif [ -f "$(find_path ${dir} "*.sln")" ]; then
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

function maven_version()
{
  dir=$1
  version=$2
  next_version=$3

  pushd "${dir}"
  mvn versions:set -DnewVersion=${version} -DgenerateBackupPoms=false
  popd
}

function npm_version() {
  dir=$1
  version=$2

  pushd "${dir}"
  npm --no-git-tag-version version "${version}"
  popd
}

function rubygem_version() {
  dir=$1
  version=$2

  pushd "${dir}"
  sed -i "" "s/\(s\.version *= *'\)[0-9]*\.[0-9]*\.[0-9]*\('\)/\1${version}\2/" "$(find_path "." "*.gemspec")"
  popd
}

# FUNCTIONS BELOW ARE OBSOLETE AND SHOULD BE REPLACXED WITH TRAVIS RELEASING

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
  git add .
  git commit -m "Release ${version}"

  dzil test --release
  dzil build
  dzil release

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

  pushd "${dir}"
  dotnet_update_version "${version}"
  dotnet pack --configuration Release
  nupkg_dir=$(cat .nuget-push | head -1) 
  nupkg=$(find_path "${nupkg_dir}" "*.nupkg")
  
  echo_green "Log into nuget.org and manually upload ${nupkg}"

  git add .
  git commit -m "Release ${version}"
  git show > .release.patch
  cd ..
  patch -p1 < .release/.release.patch
  popd
}

function dotnet_update_version()
{
  version=$1
  nupkg_dir=$(cat .nuget-push | head -1)
  csproj=$(find_path "${nupkg_dir}" "*.csproj")

  xmlstarlet ed --inplace --ps \
    --update "/Project/PropertyGroup/PackageVersion" \
    --value "${version}" \
    "${csproj}"
  echo_green "Updated ${csproj} to ${version}"
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

function go_release() {
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

function go_version() {
  # no-op
  echo ""
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
