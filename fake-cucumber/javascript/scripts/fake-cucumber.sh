#!/usr/bin/env bash
#
# This is a shim around bin/fake-cucumber that falls back to using ts-node if the TypeScript
# code has not been compiled.
#

set -eu -o pipefail
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

if [[ -f "${DIR}/../dist/src/cli.js" ]]; then
  ${DIR}/../bin/fake-cucumber $*
else
  echo -e "\033[0;31m*** TypeScript sources not compiled. Running with ts-node which is considerably slower. ***\033[0m" 1>&2
  echo -e "\033[0;31m*** To speed up, run 'pushd ../.. && npm run build && popd' ***\033[0m" 1>&2
  ${DIR}/../../../node_modules/.bin/ts-node \
    --require source-map-support/register \
    --require tsconfig-paths/register \
    ${DIR}/../src/cli.ts $*
fi
