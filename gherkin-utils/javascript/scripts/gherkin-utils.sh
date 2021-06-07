#!/usr/bin/env bash
#

set -eu -o pipefail
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

${DIR}/../../../node_modules/.bin/ts-node \
  --require source-map-support/register \
  --require tsconfig-paths/register \
  ${DIR}/../src/cli.ts $*
