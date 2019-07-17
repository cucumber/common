#!/usr/bin/env bash

header=$(cat <<HEADER
## [Unreleased]

### Added

### Changed

### Deprecated

### Removed

### Fixed
HEADER)

headerEscaped=${header//$'\n'/\\$'\n'}
sed -i "s/----/---\n$headerEscaped\n/g" CHANGELOG.md
