#!/usr/bin/env bash
#
set -euf -o pipefail
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
source "${DIR}/functions.sh"

function clone_subrepos()
{
  for subrepo in $(subrepos .)
  do
    remote=$(subrepo_remote "${subrepo}")
    rm -rf "${subrepo}/.old"
    git clone "${remote}" "${subrepo}/.old"
    pushd "${subrepo}/.old"
    ruby "${DIR}/retagger.rb" > ".retagger.json"
    popd
    
    rm -rf "${subrepo}/.new.git"
    mkdir "${subrepo}/.new.git" 
    pushd "${subrepo}/.new.git"
    git init --bare
    popd
    rm -rf "${subrepo}/.new"
    rm -rf "${subrepo}/.subrepo" # remove
    git clone file://$(pwd)/${subrepo}/.new.git "${subrepo}/.new"
    pushd "${subrepo}/.new"
    touch tmp
    git add tmp
    git commit -m "create master"
    git push
    popd
    git push --force "file://$(pwd)/${subrepo}/.new.git" $(splitsh-lite --prefix=${subrepo}):master

    pushd "${subrepo}/.new.git"
    ruby "${DIR}/retagger.rb" < "../.old/.retagger.json"
    popd
    
    echo "${remote}" > "${subrepo}/.subrepo"
    # TODO: Delete old .gitrepo files too
  done
}

clone_subrepos