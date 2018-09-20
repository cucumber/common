#!/usr/bin/env bash
#
# Triggers a build of a repo
#
set -euf -o pipefail

# foo/bar => foo%2Fbar
repo=$(echo "$1" | sed 's|/|%2F|')
tag=$2
token=$3

body='{
"request": {
"branch":"${tag}"
}}'

curl -v -s -X POST \
   -H "Content-Type: application/json" \
   -H "Accept: application/json" \
   -H "Travis-API-Version: 3" \
   -H "Authorization: token ${token}" \
   -d "${body}" \
   https://api.travis-ci.org/repo/${repo}/requests
