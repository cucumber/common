#!/usr/bin/env bash
#
# This bash script defines common functions used by other scripts
#
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

function echo_green
{
    echo -e "${GREEN}$1${NC}"
}

function echo_red
{
    echo -e "${RED}$1${NC}"
}

# The root dir of the monorepo
function root_dir()
{
    echo "$( cd "$( dirname "${BASH_SOURCE[0]}" )" && cd .. && pwd )"
}

# Lists all the .travis.yml files in this monorepo (except the one in the root).
# The presence of a .travis.yml file declares a manyrepo in the parent directory.
function travis_ymls()
{
    git ls-files "**/.travis.yml"
}

# Lists all the manyrepos. Each line has two fields (tab separated for cut friendliness)
# dir and name.
#
# For example:
#
# cucumber-expressions/java cucumber/cucumber-expressions-java
function manyrepos()
{
  travis_ymls | while read travis_yml; do
    manyrepo_name=$(awk '/^#[ \t]+manyrepo:/ {print $3}' ${travis_yml})
    if [ "${manyrepo_name}" = "" ]
    then
      echo -e "${RED}No manyrepo comment in ${travis_yml}${NC}"
      exit 1
    fi
    manyrepo_dir=$(dirname ${travis_yml})
    echo -e "${manyrepo_dir}\t${manyrepo_name}"
  done
}
