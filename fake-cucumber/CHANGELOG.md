# CHANGE LOG
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

----
## [Unreleased]

### Added

* The first emitted message is a `Meta` message.
  ([#976](https://github.com/cucumber/cucumber/pull/976)
   [aslakhellesoy]) 

### Changed

### Deprecated

### Removed

### Fixed

## [7.0.0] - 2020-04-14

### Added

* expose `withFullStackTrace` and `withSourceFramesOnlyStackTrace`
* expose internals needed to generate test cases and allow specifying a custom function to compute test cases
* expose `IHook`, added `SupportCode.registerBeforeDefinition` and `SupportCode.registerAfterDefinition` to enable custom Hook execution
* expose `IWorld`
* expose `IStepDefinition` and added `SupportCode.registerStepDefinition` to enable custom step matching

### Changed

* Upgrade to messages 12.0.0
* Upgrade to gherkin 13.0.0

### Removed

* Removed the `--globals` option
* Removed `IStepDefinition#getArguments(string)` - doesn't need to be on interface.
  This removes an API dependency on `@cucumber/cucumber-expressions`

## [6.0.0] - 2020-03-31

### Changed

* Upgrade to messages 11.x
* [JavaScript] All array return values and function parameters are now declared as TypeScript `ReadOnlyArray`

## [5.0.0] - 2020-03-02

### Changed

* Upgraded messages and gherkin

## [4.0.0] - 2020-02-14

### Changed

* Upgraded cucumber-expressions, gherkin and messages

## [3.0.3] - 2020-01-10

### Changed

* [JavaScript] changed module name to `@cucumber/fake-cucumber`

## [3.0.2] - 2019-12-10

### Fixed

* Add `typescript` to runtime dependencies

## [3.0.1] - 2019-12-10

### Fixed

* Add `ts-node` to runtime dependencies

## [3.0.0] - 2019-12-10

### Added

* Implement `Given`/`When`/`Then`/`After`/`Before` DSL
* Dynamically load files from the file system
* Support Hooks
  ([#803](https://github.com/cucumber/cucumber/pull/803)
   [vincent-psarga]
   [aslakhellesoy])

### Changed

* Upgrade to `gherkin` `9.0.0`
* Upgrade to `cucumber-messages` `8.0.0`
* Upgrade to `cucumber-expressions` `8.3.0`

### Removed

* Remove `--format json`. Only support `--format ndjson|protobuf`

### Fixed

* Test results are now realistic - using duration and error messages from step definitions.
  ([#801](https://github.com/cucumber/cucumber/pull/801)
   [vincent-psarga]
   [aslakhellesoy])

## [2.1.0] - 2019-11-14

### Changed

* Upgrade to gherkin 8.2.0
* Upgrade to cucumber-messages 7.0.0

## [2.0.3] - 2019-10-22

### Fixed

* Try another build of the docker image

## [2.0.2] - 2019-10-22

### Changed

* Document how to run via docker

## [2.0.1] - 2019-10-21

### Fixed

* Add source map support for better stack traces

## [2.0.0] - 2019-10-04

### Changed

* Generate TestStepFinished messages with duration instead of durationNanoseconds

* Upgrade cucumber-messages to 6.0.1

* Upgrade gherkin to 8.0.0

## [1.1.1] - 2019-09-04

### Fixed

* More realistic random results

## [1.1.0] - 2019-08-29

### Changed

* Upgrade to Gherkin 7.0.4

### Fixed

## [1.0.1] - 2019-08-29

### Added

* Add new --results=none|random|pattern option

## [1.0.0] - 2019-08-23

### Added

* First release

<!-- Releases -->
[Unreleased]: https://github.com/cucumber/cucumber/compare/fake-cucumber/v7.0.0...master
[7.0.0]:      https://github.com/cucumber/cucumber/compare/fake-cucumber/v6.0.0...fake-cucumber/v7.0.0
[6.0.0]:      https://github.com/cucumber/cucumber/compare/fake-cucumber/v5.0.0...fake-cucumber/v6.0.0
[5.0.0]:      https://github.com/cucumber/cucumber/compare/fake-cucumber/v4.0.0...fake-cucumber/v5.0.0
[4.0.0]:      https://github.com/cucumber/cucumber/compare/fake-cucumber/v3.0.3...fake-cucumber/v4.0.0
[3.0.3]:      https://github.com/cucumber/cucumber/compare/fake-cucumber/v3.0.2...fake-cucumber/v3.0.3
[3.0.2]:      https://github.com/cucumber/cucumber/compare/fake-cucumber/v3.0.1...fake-cucumber/v3.0.2
[3.0.1]:      https://github.com/cucumber/cucumber/compare/fake-cucumber/v3.0.0...fake-cucumber/v3.0.1
[3.0.0]:      https://github.com/cucumber/cucumber/compare/fake-cucumber/v2.1.0...fake-cucumber/v3.0.0
[2.1.0]:      https://github.com/cucumber/cucumber/compare/fake-cucumber/v2.0.3...fake-cucumber/v2.1.0
[2.0.3]:      https://github.com/cucumber/cucumber/compare/fake-cucumber/v2.0.2...fake-cucumber/v2.0.3
[2.0.2]:      https://github.com/cucumber/cucumber/compare/fake-cucumber/v2.0.1...fake-cucumber/v2.0.2
[2.0.1]:      https://github.com/cucumber/cucumber/compare/fake-cucumber/v2.0.0...fake-cucumber/v2.0.1
[2.0.0]:      https://github.com/cucumber/cucumber/compare/fake-cucumber/v1.1.1...fake-cucumber/v2.0.0
[1.1.1]:      https://github.com/cucumber/cucumber/compare/fake-cucumber/v1.1.0...fake-cucumber/v1.1.1
[1.1.0]:      https://github.com/cucumber/cucumber/compare/fake-cucumber/v1.0.1...fake-cucumber/v1.1.0
[1.0.1]:      https://github.com/cucumber/cucumber/compare/fake-cucumber/v1.0.0...fake-cucumber/v1.0.1
[1.0.0]:      https://github.com/cucumber/cucumber/releases/tag/fake-cucumber/v1.0.0

<!-- Contributors in alphabetical order -->
[aslakhellesoy]:    https://github.com/aslakhellesoy
[vincent-psarga]:    https://github.com/vincent-psarga
