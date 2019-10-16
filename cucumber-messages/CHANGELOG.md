# CHANGE LOG
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

----
## [Unreleased]

* [Java] Fix shading of `com.google.protobuf.util`

## [6.0.1] - 2019-10-03

### Fixed

* [Go] Release 6.0.0 is unusable.

## [6.0.0] - 2019-10-02

### Added

* New `TestStepMatched` message
* `Duration` message to express duration in a seconds + nano format
* field `duration` in `TestResult` message

### Changed

* Renamed `PatternMatch` to `StepMatchArgument`
* Renamed `CommandRunTestStep#patternMatches` to `CommandRunTestStep#stepMatchArguments`
* Replace Google's Timestamp by our own message

### Removed

* `durationNanoSeconds` field in `TestResult` message

## [5.0.1] - 2019-08-23

### Fixed

* [Go] Fix module version (5.0.0 left it at v4)

## [5.0.0] - 2019-08-23

### Changed

* The ordinal numbers of the `Status` enum have changed, to easier compute an
  aggregated status.

### Fixed

* [JavaScript] Don't swallow exceptions happening in `ProtobufMessageStream`

## [4.0.0] - 2019-08-14

* [Go] Append v4 to go module name to comply with the go.mod spec

## [3.0.5] - 2019-08-14

### Fixed

* [Go] Tag the cucumber/cucumber-messages-go subrepo (again)

## [3.0.4] - 2019-08-14

### Fixed

* [Go] Tag the cucumber/cucumber-messages-go subrepo (again)

## [3.0.3] - 2019-08-14

### Fixed

* [Go] Tag the cucumber/cucumber-messages-go subrepo

## [3.0.2] - 2019-08-01

### Added

* Add Timestamp property and comments to TestRunFinished message
  ([#665](https://github.com/cucumber/cucumber/pull/665)
   [SabotageAndi]

## [3.0.1] - 2019-07-15

### Added

* [.NET] Publish NuGet package
  ([#635](https://github.com/cucumber/cucumber/pull/635)
   [SabotageAndi]
   [aslakhellesoy]
   [vincent-psarga])

## [3.0.0] - 2019-06-05

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
[Unreleased]: https://github.com/cucumber/cucumber/compare/cucumber-messages/v6.0.1...master
[6.0.1]:      https://github.com/cucumber/cucumber/compare/cucumber-messages/v6.0.0...cucumber-messages/v6.0.1
[6.0.0]:      https://github.com/cucumber/cucumber/compare/cucumber-messages/v5.0.1...cucumber-messages/v6.0.0
[5.0.1]:      https://github.com/cucumber/cucumber/compare/cucumber-messages/v5.0.0...cucumber-messages/v5.0.1
[5.0.0]:      https://github.com/cucumber/cucumber/compare/cucumber-messages/v4.0.0...cucumber-messages/v5.0.0
[4.0.0]:      https://github.com/cucumber/cucumber/compare/cucumber-messages/v3.0.5...cucumber-messages/v4.0.0
[3.0.5]:      https://github.com/cucumber/cucumber/compare/cucumber-messages/v3.0.4...cucumber-messages/v3.0.5
[3.0.4]:      https://github.com/cucumber/cucumber/compare/cucumber-messages/v3.0.3...cucumber-messages/v3.0.4
[3.0.3]:      https://github.com/cucumber/cucumber/compare/cucumber-messages/v3.0.2...cucumber-messages/v3.0.3
[3.0.2]:      https://github.com/cucumber/cucumber/compare/cucumber-messages/v3.0.1...cucumber-messages/v3.0.2
[3.0.1]:      https://github.com/cucumber/cucumber/compare/cucumber-messages/v3.0.0...cucumber-messages/v3.0.1
[3.0.0]:      https://github.com/cucumber/cucumber/compare/cucumber-messages/v2.1.2...cucumber-messages/v3.0.0
[2.1.2]:      https://github.com/cucumber/cucumber/compare/cucumber-messages/v2.1.1...cucumber-messages/v2.1.2
[2.1.1]:      https://github.com/cucumber/cucumber/compare/cucumber-messages/v2.1.0...cucumber-messages/v2.1.1
[2.1.0]:      https://github.com/cucumber/cucumber/compare/cucumber-messages/v2.0.0...cucumber-messages/v2.1.0
[2.0.0]:      https://github.com/cucumber/cucumber/compare/cucumber-messages/v1.1.2...cucumber-messages/v2.0.0
[1.1.2]:      https://github.com/cucumber/cucumber/compare/cucumber-messages-v1.0.0...cucumber-messages/v1.1.2
[1.0.0]:      https://github.com/cucumber/cucumber/releases/tag/cucumber-messages-v1.0.0

<!-- Contributors in alphabetical order -->
[aslakhellesoy]:    https://github.com/aslakhellesoy
[brasmusson]:       https://github.com/brasmusson
[charlierudolph]:   https://github.com/charlierudolph
[david1995]:        https://github.com/david1995
[luke-hill]:        https://github.com/luke-hill
[SabotageAndi]:     https://github.com/SabotageAndi
[vincent-psarga]:   https://github.com/vincent-psarga
