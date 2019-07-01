# CHANGE LOG
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

----
## [In Git] - (Not released)

### Added

### Changed

### Deprecated

### Removed

### Fixed

## [3.0.0] - (2019-06-05)

### Added
* Added `TestRunStarted#timestamp` field
  ([#615](https://github.com/cucumber/cucumber/pull/615)
   [david1995])
* Added `TestCaseStarted#platform` field
  ([#626](https://github.com/cucumber/cucumber/pull/626)
   [#616](https://github.com/cucumber/cucumber/pull/616)
   [david1995])

### Changed
* Use an enum for the `encoding` field.
* Misc changes for `cucumber-engine`
  ([#549](https://github.com/cucumber/cucumber/pull/549))

### Deprecated

### Removed

### Fixed

## [2.1.2] - 2019-03-29

### Fixed

* Fix Project struggling to build across JRuby and Ruby 2.6
  ([#578](https://github.com/cucumber/cucumber/pull/578)
  [luke-hill])
   
## [2.1.1] - 2018-11-02

### Fixed

* Release process improvements

## [2.1.0] - 2018-11-01

### Added

* Add testResult to the TestCaseFinished message
  ([#488](https://github.com/cucumber/cucumber/pull/488)
   [brasmusson])

## [2.0.0] - 2018-10-14

### Added

* Several messages to support [cucumber-engine]()
  ([#502](https://github.com/cucumber/cucumber/pull/502)
   [charlierudolph])

## [1.1.2] - 2018-10-01

### Added

* Added `TestHookStarted` and `TestHookFinished` to distinguish between messages about Gherkin steps and hooks
  ([aslakhellesoy]) 

## [1.0.0] - 2018-09-15

### Added

* Protobuf messages for Go, Java, JavaScript, TypeScript and Ruby

<!-- Releases -->
[Unreleased]: https://github.com/cucumber/cucumber/compare/cucumber-messages/v3.0.0...master
[3.0.0]:      https://github.com/cucumber/cucumber/compare/cucumber-messages/v2.1.2...v3.0.0
[2.1.2]:      https://github.com/cucumber/cucumber/compare/cucumber-messages/v2.1.1...v2.1.2
[2.1.1]:      https://github.com/cucumber/cucumber/compare/cucumber-messages/v2.1.0...v2.1.1
[2.1.0]:      https://github.com/cucumber/cucumber/compare/cucumber-messages/v2.0.0...v2.1.0
[2.0.0]:      https://github.com/cucumber/cucumber/compare/cucumber-messages/v1.1.2...v2.0.0
[1.1.2]:      https://github.com/cucumber/cucumber/compare/cucumber-messages-v1.0.0...cucumber-messages/v1.1.2
[1.0.0]:      https://github.com/cucumber/cucumber/releases/tag/cucumber-messages-v1.0.0

<!-- Contributors in alphabetical order -->
[aslakhellesoy]:    https://github.com/aslakhellesoy
[brasmusson]:       https://github.com/brasmusson
[charlierudolph]:   https://github.com/charlierudolph
[david1995]:        https://github.com/david1995
[luke-hill]:        https://github.com/luke-hill