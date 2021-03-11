#!/usr/bin/env bash
#
# This is a shim around ./gherkin that falls back to using ts-node if the TypeScript
# code has not been compiled. Used in acceptance tests for gherkin/javascript only
#

set -eu -o pipefail
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

if [[ -f "${DIR}/../../../gherkin-streams/javascript/dist/src/cli/main.js" ]]; then
  ${DIR}/../../../gherkin-streams/javascript/bin/gherkin $*
else
  echo -e "\033[0;31m*** TypeScript sources not compiled. Running with ts-node which is considerably slower. ***\033[0m" 1>&2
  echo -e "\033[0;31m*** To speed up, run 'pushd ../.. && npm run build && popd' ***\033[0m" 1>&2
  ${DIR}/../../../node_modules/.bin/ts-node \
    --require source-map-support/register \
    --require tsconfig-paths/register \
    ${DIR}/../../../gherkin-streams/javascript/src/cli/main.ts $*
fi
