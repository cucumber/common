#!/usr/bin/env bash
#
# Triggers a tagged build of a module repo, cancelling any started or running
# builds first.
#
set -euf -o pipefail

org=$1
repo=$2
tag=$3
token=$4
org_repo="${org}%2F${repo}"

# Get the latest builds
builds=$(curl \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -H "Travis-API-Version: 3" \
    -H "Authorization: token ${token}" \
    "https://api.travis-ci.org/repo/${org_repo}/builds"
)

# Find the build with the git tag we're interested in
build=$(echo "${builds}" | jq "[.builds[] | select(.tag.name == \"${tag}\")][0]")

# Find the id of the build
build_id=$(echo "${build}" | jq ".id")

# Find the build's state
build_state=$(echo "${build}" | jq --raw-output ".state")

if [ "$build_state" = "started" || "$build_state" = "created" ]; then
    echo "Cancelling ${build_state} build of ${org}/${repo}@${tag}"
    curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -H "Travis-API-Version: 3" \
        -H "Authorization: token ${token}" \
        "https://api.travis-ci.org/build/${build_id}/cancel"
fi

echo "Restarting build ${build_id} of ${org}/${repo}@${tag}"
curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -H "Travis-API-Version: 3" \
    -H "Authorization: token ${token}" \
    "https://api.travis-ci.org/build/${build_id}/restart"
