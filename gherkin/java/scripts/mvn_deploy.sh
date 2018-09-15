#!/usr/bin/env bash
set -euf -o pipefail
if [[ "$TRAVIS_TAG" || "$TRAVIS_BRANCH" == 'master' && "$TRAVIS_PULL_REQUEST" == 'false' ]]; then
  mvn deploy -Psign-source-javadoc --settings scripts/ci-settings.xml -DskipTests=true
else
  echo "Artifacts are only deployed on a build of the master branch, or on tags"
fi
