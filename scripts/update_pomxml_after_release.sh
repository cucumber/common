#!/usr/bin/env bash

# Ensure pom.xml is here
if [ ! -f "java/pom.xml" ]; then
  echo "No pom.xml found in java directory"
  exit 1
fi

# Finding current version in Changelog is way simpler, as there may be multiple <version> nodes in pom.xml
# Also extracting version from maven itself is
if [[ $(cat "CHANGELOG.md") =~ \[([0-9]+).([0-9]+).([0-9]+)\] ]]; then
  MAJOR="${BASH_REMATCH[1]}"
  MINOR="${BASH_REMATCH[2]}"
  PATCH="${BASH_REMATCH[3]}"
  RELEASED_VERSION="$MAJOR.$MINOR.$PATCH"
else
  echo "Unable to find current version in CHANGELOG, please update pom.xml manualy"
  echo "Bump the patch version in the `pom.xml` and append `-SNAPSHOT` to it."
  exit 1;
fi

NEW_VERSION="$MAJOR.$MINOR.$(( PATCH + 1))-SNAPSHOT"
cd java
mvn versions:set -DnewVersion=$NEW_VERSION -DgenerateBackupPoms=false
cd -
echo "Updated version in pom.xml to $NEW_VERSION"
