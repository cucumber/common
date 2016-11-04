#!/usr/bin/env bash
#
# This bash script defines common functions used by other scripts
#
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
