#!/usr/bin/env bash
#
# Bumps the patch version and appends -SNAPSHOT
#
set -uf -o pipefail

# Finding current version in Changelog is way simpler, as there may be multiple <version> nodes in pom.xml
# Also extracting version with maven itself is a bit tedious
if [[ $(cat "../CHANGELOG.md") =~ \[([0-9]+).([0-9]+).([0-9]+)\] ]]; then
  MAJOR="${BASH_REMATCH[1]}"
  MINOR="${BASH_REMATCH[2]}"
  PATCH="${BASH_REMATCH[3]}"

  NEW_VERSION="$MAJOR.$MINOR.$(( PATCH + 1))-SNAPSHOT"
  mvn versions:set -DnewVersion=$NEW_VERSION -DgenerateBackupPoms=false
  echo "Updated version in pom.xml to $NEW_VERSION"
else
  echo "Unable to find current version in CHANGELOG, please update pom.xml manually"
  echo "Bump the patch version in the `pom.xml` and append `-SNAPSHOT` to it."
  exit 1
fi
