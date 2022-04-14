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

function git_branch() {
  if [ -z "${CIRCLE_TAG}" ]; then
    # Only report branch if we're not on a tag
    echo "${CIRCLE_BRANCH}"
  fi
}

function git_tag() {
  echo "${CIRCLE_TAG}"
}

function push_subrepos()
{
  if [ "${CIRCLE_PULL_REQUEST}" = "false" ] || [ -z "${CIRCLE_PULL_REQUEST}" ]; then
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
  elif [ "${branch}" != "main" ]; then
    echo "Not pushing branch (we only push main)"
  else
    {
      git push --force "${remote}" $(splitsh-lite --prefix=${subrepo}):refs/heads/${branch}
    } || {
      git push --force "${remote}" $(splitsh-lite --scratch --prefix=${subrepo}):refs/heads/${branch}
    }
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
        {
          git push --force "${remote}" $(splitsh-lite --prefix=${subrepo} --origin=refs/tags/${tag}):refs/tags/${vtag}
        } || {
          git push --force "${remote}" $(splitsh-lite --scratch --prefix=${subrepo} --origin=refs/tags/${tag}):refs/tags/${vtag}
        }
      fi
    done
  fi
}

function update_go_library_version()
{
  if [ "$#" -ne 2 ]; then
    echo "Usage: update_go_library_version libraryName version"
  else
    libname=$1
    version=$2
    major=`echo $version | awk -F'.' '{print $1}'`

    echo "Updating ${libname} to ${version}"
    pushd ${root_dir}
    git ls-files "${root_dir}/**/go.mod" | while read go_mod; do
      # Edit require directives
      sed -Ei "s/github\.com\/cucumber\/common\/${libname}\/go(\/v[[:digit:]]+)? v.*/github\.com\/cucumber\/common\/${libname}\/go\/v${major} v${version}/" ${go_mod}
      # Edit replace directives
      sed -Ei "s/github\.com\/cucumber\/common\/${libname}\/go(\/v[[:digit:]]+)? =>/github\.com\/cucumber\/common\/${libname}\/go\/v${major} =>/" ${go_mod}
    done
    git ls-files "${root_dir}/**/*.go" | while read go_mod; do
      sed -Ei "s/github\.com\/cucumber\/common\/${libname}\/go(\/v[[:digit:]]+)?/github\.com\/cucumber\/common\/${libname}\/go\/v${major}/" ${go_mod}
      # sed -i "s/github.com\/cucumber\/${libname}-go\/v[[:digit:]]\+/github.com\/cucumber\/${libname}-go\/v${major}/" ${go_mod}
    done
    popd
  fi
}

function update_npm_dependency_if_exists() {
  package_json=$1
  module_name=$2
  module_version=$3

  cat "${package_json}" | \
    jq "if .[\"dependencies\"][\"${module_name}\"]? then .[\"dependencies\"][\"${module_name}\"] = \"^${module_version}\" else . end" | \
    jq "if .[\"devDependencies\"][\"${module_name}\"]? then .[\"devDependencies\"][\"${module_name}\"] = \"^${module_version}\" else . end" > \
    "${package_json}".tmp
  mv "${package_json}".tmp "${package_json}"
}
