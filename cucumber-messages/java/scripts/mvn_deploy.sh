#!/usr/bin/env bash
set -eufx -o pipefail
gpg -q --fast-import scripts/codesigning.asc
if [ -z $TRAVIS_TAG ]; then
  mvn deploy -Psign-source-javadoc --settings scripts/ci-settings.xml -DskipTests=true
else
  echo "Not deploying on tag build because we will deploy on the master build."
  echo "The version in the pom.xml indicates whether this is a release build."
fi
