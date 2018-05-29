#!/usr/bin/env bash
#
# Push all subrepos. Intendsed to be run in CI.
#
set -euf -o pipefail
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
source "${DIR}/functions.sh"

git fetch --unshallow
push_subrepos .