#!/usr/bin/env bash

# Add unreleased header to Changelog

HEADER=$(cat <<EOF
## [Unreleased]

### Added

### Changed

### Deprecated

### Removed

### Fixed
EOF
)

if [[ $(cat CHANGELOG.md) = \#\#\ \[Unreleased\] ]]; then
  echo "Unreleased header found, skipping"
else
  HEADER_ESCAPED=${HEADER//$'\n'/\\$'\n'}
  echo "Adding Unreleased header at beginning of the file"
  sed -i "s/----/----\n$HEADER_ESCAPED\n/g" CHANGELOG.md
fi

# Find new version number
RELEASE_HEADER_LINE="$(grep -n "<!-- Releases -->" CHANGELOG.md | head -n 1 | cut -d: -f1)"
INSERTION_LINE=$((RELEASE_HEADER_LINE + 1))
CURRENT_GIT_DIFF=$(head -n $INSERTION_LINE CHANGELOG.md | tail -1)
LIB_NAME=$(basename $(pwd))

#Add new diff at the end of the file
if [[ $CURRENT_GIT_DIFF =~ \[([0-9]+.[0-9]+.[0-9]+)\] ]]; then
  CURRENT_VERSION="${BASH_REMATCH[1]}"
  NEW_GIT_DIFF=$(echo $CURRENT_GIT_DIFF | \
    sed "s/$CURRENT_VERSION/Unreleased/" | \
    sed "s/$LIB_NAME\/v$CURRENT_VERSION/master/" | \
    sed "s/$LIB_NAME\/v[0-9]\+.[0-9]\+.[0-9]\+/$LIB_NAME\/v$CURRENT_VERSION/"
  )

  echo "Adding new git diff: $NEW_GIT_DIFF"
  sed -i "${INSERTION_LINE} i ${NEW_GIT_DIFF}" CHANGELOG.md
else
 echo "No current version found in $(head -n $INSERTION_LINE CHANGELOG.md | tail -1)"
fi
