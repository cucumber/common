# CHANGE LOG
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

----
## [Unreleased]

### Added

### Changed

* The `StepDocument` type now includes an `expression: Expression` field.

### Deprecated

### Removed

### Fixed

## [0.0.4] - 2021-09-15

### Changed

* Upgrade to `@cucumber/cucumber-expressions 13.0.1`

## [0.0.3] - 2021-09-01

### Added

* Build choices based on all values for a parameter type, across steps
  ([#1671](https://github.com/cucumber/common/pull/1671)
   [aslakhellesoy])

## [0.0.2] - 2021-07-15

### Added

* Added `suggestion` string property on `StepDocument`
  ([#1657](https://github.com/cucumber/common/pull/1657)
   [aslakhellesoy])

### Changed

* The `StepDocument` type has changed to `{ suggestion: string, segments: StepSegments }`
  ([#1657](https://github.com/cucumber/common/pull/1657)
   [aslakhellesoy])

## [0.0.1]

### Added

* First release!

<!-- Releases -->
[Unreleased]: https://github.com/cucumber/common/compare/suggest/v0.0.4...main
[0.0.4]:      https://github.com/cucumber/common/tree/suggest/v0.0.3
[0.0.3]:      https://github.com/cucumber/common/tree/suggest/v0.0.2
[0.0.2]:      https://github.com/cucumber/common/tree/suggest/v0.0.1
[0.0.1]:      https://github.com/cucumber/common/tree/suggest/v0.0.1

<!-- Contributors in alphabetical order -->
[aslakhellesoy]:    https://github.com/aslakhellesoy
