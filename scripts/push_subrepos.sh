#!/usr/bin/env bash
#
# Push all subrepos. Intended to be run in CI.
#
set -ef -o pipefail
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
source "${DIR}/functions.sh"

if [ -n "${TRAVIS_BRANCH}" ]; then
  git fetch --unshallow
fi
push_subrepos .