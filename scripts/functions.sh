#!/usr/bin/env bash
#
# This bash script defines common functions used by other scripts
#
function root_dir()
{
    echo "$( cd "$( dirname "${BASH_SOURCE[0]}" )" && cd .. && pwd )"
}

# Lists all the .travis.yml files in this monorepo. These files declare a manyrepo
# in the parent directory.
function travis_ymls()
{
    find "$(root_dir)" -name "*.travis.yml" -not -path "**/node_modules/*" -not -path "$(root_dir)/_book/**"
}
