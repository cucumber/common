#!/usr/bin/env bash
#
# Triggers a build of a repo
#
set -euf -o pipefail

# foo/bar => foo%2Fbar
org=$1
repo=$2
tag=$3
token=$4
org_repo="${org}%2F${repo}"
# body_fmt='{
#   "request": {
#     "tag":"%s",
#     "message": "Trigger build of tag %s"
#   }
# }'
# 
# body=$(printf "${body_fmt}" "${tag}" "${tag}")

# curl -v -s -X POST \
#    -H "Content-Type: application/json" \
#    -H "Accept: application/json" \
#    -H "Travis-API-Version: 3" \
#    -H "Authorization: token ${token}" \
#    -d "${body}" \
#    https://api.travis-ci.org/repo/${repo}/requests


build=$(curl \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -H "Travis-API-Version: 3" \
    -H "Authorization: token ${token}" \
    "https://api.travis-ci.org/repo/${org_repo}/builds"
)

build_id=$(echo "${build}" | jq "[.builds[] | select(.tag.name == \"${tag}\")][0] | .id")
build_state=$(echo "${build}" | jq --raw-output "[.builds[] | select(.tag.name == \"${tag}\")][0] | .state")

echo "build_state=${build_state}"

if [ "$build_state" = "started" || "$build_state" = "created" ]; then
    echo "Cancelling..."
    curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -H "Travis-API-Version: 3" \
        -H "Authorization: token ${token}" \
        "https://api.travis-ci.org/build/${build_id}/cancel"
fi

echo "Restarting..."
curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -H "Travis-API-Version: 3" \
    -H "Authorization: token ${token}" \
    "https://api.travis-ci.org/build/${build_id}/restart"
