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

if [[ $(cat CHANGELOG.md) =~ \#\#\ \[Unreleased\] ]]; then
  echo "Unreleased header found, skipping"
else
  HEADER_ESCAPED=${HEADER//$'\n'/\\$'\n'}
  echo "Adding Unreleased header at beginning of the file"
  sed -i "s/----/----\n$HEADER_ESCAPED\n/g" CHANGELOG.md
fi

# Find new version number
RELEASE_HEADER_LINE="$(grep -n "<!-- Releases -->" CHANGELOG.md | head -n 1 | cut -d: -f1)"
INSERTION_LINE=$((RELEASE_HEADER_LINE + 1))
CURRENT_GITHUB_DIFF_LINK=$(head -n $INSERTION_LINE CHANGELOG.md | tail -1)
LIB_NAME=$(basename $(pwd))

#Add new diff at the end of the file
if [[ $CURRENT_GITHUB_DIFF_LINK =~ \[([0-9]+.[0-9]+.[0-9]+)\] ]]; then
  CURRENT_VERSION="${BASH_REMATCH[1]}"
  NEW_GITHUB_DIFF_LINK=$(echo $CURRENT_GITHUB_DIFF_LINK | \
    sed "s/$CURRENT_VERSION/Unreleased/" | \
    sed "s/$LIB_NAME\/v$CURRENT_VERSION/master/" | \
    sed "s/$LIB_NAME\/v[0-9]\+.[0-9]\+.[0-9]\+/$LIB_NAME\/v$CURRENT_VERSION/"
  )
  sed -i "${INSERTION_LINE} i ${NEW_GITHUB_DIFF_LINK}" CHANGELOG.md
else
 echo "No current version found in $(head -n $INSERTION_LINE CHANGELOG.md | tail -1)"
fi
