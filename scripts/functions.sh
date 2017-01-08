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
root_dir="$(realpath "$( cd "$( dirname "${BASH_SOURCE[0]}" )" && cd .. && pwd )")"

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

# Updates the version number for all subrepos in a group
function group_update_version()
{
  group_path=$1
  version=$2

  subrepos "${group_path}" | while read subrepo; do
    update_version "${subrepo}" "${version}"
  done
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
function group_release()
{
  group_path=$1

  subrepos "${group_path}" | while read subrepo; do
    remote=$(subrepo_remote "${subrepo}")

    release_dir="${subrepo}/.release"
    rm -rf "${release_dir}"

    echo_green "***** Cloning ${remote} (${subrepo}) *****"
    git clone "${remote}" "${release_dir}"
    release_subrepo_clone "${subrepo}"

    echo_green "***** TODO: RELEASE ${remote} *****"
    release_subrepo_clone "${release_dir}"
  done
}

function release_karma_all()
{
  group_path=$1

  subrepos "${group_path}" | while read subrepo; do
    release_karma "$subrepo"
  done
}

# Publishes a released package for a subrepo (from a clone of the subrepo)
function release_karma()
{
  dir=$1

  ptype=$(project_type "${dir}")
  if [ -n "${ptype}" ]; then
    eval ${ptype}_release_karma "${dir}"
  fi
}

# Publishes a released package for a subrepo (from a clone of the subrepo)
function release_subrepo_clone()
{
  dir=$1

  ptype=$(project_type "${dir}")
  if [ -n "${ptype}" ]; then
    eval ${ptype}_release "${dir}"
  fi
}

# Updates the version for a subrepo
function update_version()
{
  subrepo=$1
  version=$2

  ptype=$(project_type "${subrepo}")
  if [ -n "${ptype}" ]; then
    eval ${ptype}_update_version "${subrepo}" "${version}"
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
  else
    echo_err "ERROR: Unrecognised platform: ${subrepo}"
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
  subrepo=$1
  xmllint --xpath "//*[local-name()='project']/*[local-name()='version']/text()" "${subrepo}/pom.xml"
}

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
}

function maven_release()
{
  dir=$1

  pushd "${dir}"
  echo "TODO: RELEASE MAVEN ${dir}"
  popd "${dir}"
}

################ NPM ################

function npm_version()
{
  subrepo=$1
  jq -r ".version" "${subrepo}/package.json"
}

function npm_update_version()
{
  subrepo=$1
  version=$2
  sed -i "" "s/\(\"version\" *: *\"\)[0-9]*\.[0-9]*\.[0-9]*\(\"\)/\1${version}\2/" "${subrepo}/package.json"
  echo_green "Updated ${subrepo} to ${version}"
}

function npm_release_karma()
{
  echo_green "Checking npm release karma..."
  npm whoami && echo_green "npm ok" || echo_red "\nYou need to: npm login"
}

function npm_release() {
  dir=$1

  pushd "${dir}"
  echo "TODO: RELEASE NPM ${dir}"
  # npm install
  # npm publish
  popd "${dir}"
}

################ RUBYGEM ################

function rubygem_version()
{
  subrepo=$1
  cat "$(find_path "${subrepo}" "*.gemspec")" | grep -m 1 ".version *= *" | sed "s/.*= *'\([^']*\)'.*/\1/"
}

function rubygem_update_version()
{
  subrepo=$1
  version=$2
  sed -i "" "s/\(s\.version *= *'\)[0-9]*\.[0-9]*\.[0-9]*\('\)/\1${version}\2/" "$(find_path "${subrepo}" "*.gemspec")"
  echo_green "Updated ${subrepo} to ${version}"
}

function rubygem_release_karma()
{
  echo_green "Checking rubygems release karma..."
  ls ~/.gem/credentials && echo_green "rubygems ok" || echo_red "\nYou need to: gem push"
}

function rubygem_release() {
  dir=$1

  pushd "${dir}"
  echo "TODO: RELEASE GEM ${dir}"
  popd "${dir}"
}

################ PYTHON ################

function python_update_version()
{
  subrepo=$1
  version=$2
  sed -i "" \
    -e "s/\(version *= *'\)[0-9]*\.[0-9]*\.[0-9]*\('\)/\1${version}\2/" \
    -e "s/\(archive\/v\)[0-9]*\.[0-9]*\.[0-9]*\(\.tar\)/\1${version}\2/" \
    "${subrepo}/setup.py"
  echo_green "Updated ${subrepo} to ${version}"
}

function python_release() {
  dir=$1

  pushd "${dir}"
  echo "TODO: RELEASE PYTHON ${dir}"
  popd "${dir}"
}

################ PERL ################

function perl_update_version()
{
  subrepo=$1
  version=$2
  echo "${version}" > "${subrepo}/VERSION"
  echo_green "Updated ${subrepo} to ${version}"
}

function perl_release_karma()
{
  echo_green "Checking Perl release karma..."
  ls ~/.pause && echo_green "Perl ok" || echo_red "\nYou need a PAUSE (CPAN) account"
}

function perl_release() {
  dir=$1

  pushd "${dir}"
  echo "TODO: RELEASE PERL ${dir}"
  popd "${dir}"
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

  nuget=${root_dir}/bin/NuGet.exe
  sln=$(find_path "${dir}" "*.sln")
  nuspec=$(find_path "${dir}" "*.nuspec")

  pushd "${dir}"
  mono "${nuget}" restore "${sln}"
  xbuild /p:Configuration=Release
  mono "${nuget}" pack "${nuspec}"
  mono "${nuget}" push "$(find_path "${dir}" "*.nupkg")"
  popd "${dir}"
}

################ .NET ################

function go_update_version()
{
  subrepo=$1
  version=$2
  echo_blue "No need to update to ${version} in ${subrepo} (currently not using a go package manager)"
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
