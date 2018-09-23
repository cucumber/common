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
  echo "TRAVIS_BRANCH=${TRAVIS_BRANCH}"
  echo "TRAVIS_TAG=${TRAVIS_TAG}"
  
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

function release_module()
{
  module=$1
  version=$2

  subrepos "${path}" | while read subrepo; do
    version_subrepo "${subrepo}" "${version}"
  done
  
  git commit -am "Release ${module} v${version}"
  git tag "${module}/v${version}"
  git push && git push --tags
}

 function release_subrepo()
 {
   subrepo=$1
   version=$2
   next_version=$3

   clone_for_release "${subrepo}"
   release_subrepo_clone "$(release_dir "${subrepo}")" "${version}" "${next_version}"
 }

# Sets up GPG in a module dir
function setup_gpg()
{
  subrepo=$1
  repo=$(subrepo_owner_name "${subrepo}")

  pushd "${subrepo}"

  gpg --export-secret-key E60E1F911B996560FFB135DAF4CABFB5B89B8BE6 > scripts/codesigning.asc

  # Encrypt the signing key to scripts/codesigning.asc.enc. Store the encrypted
  # decryption keys in `.travis.yml` and copy the openssl command to decrypt it.
  rm -f scripts/codesigning.asc.enc
  openssl_line=$(travis encrypt-file \
    scripts/codesigning.asc \
    scripts/codesigning.asc.enc \
    --repo "${repo}" | grep openssl)
  
  cat << EOF > scripts/decrypt_signing_key.sh
#!/usr/bin/env bash
set -euf -o pipefail
${openssl_line}
EOF
  
  # Remove the unencrypted key. We don't want that to accidentally end up in git!
  rm scripts/codesigning.asc
  
  chmod +x scripts/decrypt_signing_key.sh 
  git add scripts/codesigning.asc.enc scripts/decrypt_signing_key.sh
  git commit -m "Add encrypted signing keys for ${subrepo}"
  
  popd
}

function setup_travis_token() {
  subrepo=$1
  pushd "${subrepo}"

  travis encrypt TRAVIS_API_TOKEN=${TRAVIS_API_TOKEN} --add --repo "cucumber/gherkin-go"

  popd
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

function version_subrepo()
{
  dir=$1
  version=$2

  ptype=$(project_type "${dir}")
  if [ -n "${ptype}" ]; then
    eval ${ptype}_version "${dir}" "${version}"
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

function maven_release_karma()
{
  echo_green "Checking maven release karma..."
  ls ~/.m2/settings.xml && echo_green "maven ok" || echo_red "\nFollow these instructions: https://maven.apache.org/guides/mini/guide-encryption.html"

  echo_green "Checking gpg..."
  ls ~/.gnupg/secring.gpg && echo_green "gpg ok" || echo_red "\nFollow these instructions: http://blog.sonatype.com/2010/01/how-to-generate-pgp-signatures-with-maven/"

  echo_green "Checking xmlstarlet..."
  which xmlstarlet || echo_red "\nYou need to brew install xmlstarlet (or similar if you're not on OS X)"

  echo_red "Try this manually: gpg --use-agent --local-user devs@cucumber.io -ab README.md"
  echo_red "The first time you should be asked for a passphrase, the next time not."
}

function maven_release()
{
  dir=$1
  version=$2
  next_version=$3

  pushd "${dir}"

  xmlstarlet ed --inplace --ps -N pom="http://maven.apache.org/POM/4.0.0" \
    --update "/pom:project/pom:version" \
    --value "${version}-SNAPSHOT" \
    "pom.xml"
  git add .
  git commit -m "Update to ${version}-SNAPSHOT"

  # LIBRARY_VERSION specifies what executable version to download - if any
  LIBRARY_VERSION=${version} make

  mvn --batch-mode release:clean release:prepare -Darguments="-DskipTests=true"  
  mvn --batch-mode release:perform -Psign-source-javadoc -DskipTests=true
  
  cp pom.xml ../pom.xml
  popd
}

function maven_version()
{
  dir=$1
  version=$2
  next_version=$3

  pushd "${dir}"
  xmlstarlet ed --inplace --ps -N pom="http://maven.apache.org/POM/4.0.0" \
    --update "/pom:project/pom:version" \
    --value "${version}" \
    "pom.xml"
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
  npm install
  npm version "${version}" --allow-same-version
  npm publish
  git push
  git push --tags

  cp package.json ../package.json
  popd
}

function npm_version() {
  dir=$1
  version=$2

  pushd "${dir}"
  npm --no-git-tag-version version "${version}"
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
  git show > .release.patch
  cd ..
  patch -p1 < .release/.release.patch
  popd
}

function rubygem_version() {
  dir=$1
  version=$2

  pushd "${dir}"
  sed -i "" "s/\(s\.version *= *'\)[0-9]*\.[0-9]*\.[0-9]*\('\)/\1${version}\2/" "$(find_path "." "*.gemspec")"
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
