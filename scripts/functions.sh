#!/usr/bin/env bash
#
# This bash script defines common functions used by other scripts
#
ROOT="$( cd "$( dirname $( dirname "${BASH_SOURCE[0]}" ) )" && pwd )"

# Lists all the .travis.yml files in this monorepo. These files declare a manyrepo
# in the parent directory.
function travis_ymls()
{
    find "${ROOT}" -name "*.travis.yml" -not -path "**/node_modules/*" -not -path "${DIR}/_book/**"
}
