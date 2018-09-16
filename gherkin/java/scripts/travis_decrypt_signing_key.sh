#!/usr/bin/env bash
set -euf -o pipefail
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
if [ "$TRAVIS_BRANCH" == 'master' ] && [ "$TRAVIS_PULL_REQUEST" == 'false' ]; then
    source "${DIR}/decrypt_signing_key.sh"
    gpg -q --fast-import scripts/codesigning.asc
fi