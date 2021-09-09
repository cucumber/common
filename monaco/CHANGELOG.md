# CHANGE LOG
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

----
## [Unreleased]

### Changed

* Changed exports and API so the monaco global is configured once, and each editor configured once each.

### Fixed

* Fixed double-rendering of auto-complete

## [0.2.0] - 2021-09-08

### Changed

* Add an `editor` argument to the `configure` function
  ([#1737](https://github.com/cucumber/common/pull/1737)
   [aslakhellesoy])

### Fixed

* Fix event listener for diagnostics by listening to the editor directly
  ([#1737](https://github.com/cucumber/common/pull/1737)
   [aslakhellesoy])

## [0.1.0] - 2021-09-07

### Added

* Document Formatting
  ([#1732](https://github.com/cucumber/common/pull/1732)
   [aslakhellesoy])

## [0.0.1] - 2021-09-02

### Added

* First release

<!-- Releases -->
[Unreleased]: https://github.com/cucumber/common/compare/monaco/v0.2.0...main
[0.2.0]:      https://github.com/cucumber/common/compare/monaco/v0.1.0...v0.2.0
[0.1.0]:      https://github.com/cucumber/common/compare/monaco/v0.0.1...v0.1.0
[0.0.1]:      https://github.com/cucumber/common/tree/monaco/v0.0.1

<!-- Contributors in alphabetical order -->
[aslakhellesoy]:    https://github.com/aslakhellesoy
