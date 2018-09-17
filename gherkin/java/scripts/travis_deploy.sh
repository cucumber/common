#!/usr/bin/env bash
set -euf -o pipefail
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

if [[ "$TRAVIS_PULL_REQUEST" == 'true' ]]; then
  echo "Not deploying pull requests"
  exit 0
fi

if [[ "$TRAVIS_BRANCH" != 'master' || -z "$TRAVIS_TAG" ]]; then
  echo "Skipping deploy (not master branch or tagged build)"
  exit 0
fi

source "${DIR}/decrypt_signing_key.sh"
gpg -q --fast-import scripts/codesigning.asc
source "${DIR}/mvn_deploy.sh"
#source "${DIR}/mvn_upload_api_docs.sh"
