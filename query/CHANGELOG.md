# CHANGE LOG
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

----
## [Unreleased]

### Added

### Changed

### Deprecated

### Removed

### Fixed

## [11.0.0] - 2021-07-08

### Changed

* Bump `@cucumber/messages` to v17.0.0

### Fixed

* Methods that return/map step results now include results from _only the last attempt_ where there have been retries ([#1631](https://github.com/cucumber/common/pull/1631)). Affects methods:
  * `Query#getPickleStepAttachments`
  * `Query#getPickleStepTestStepResults`
  * `Query#getPickleTestStepResults`
  * `Query#getStatusCounts`
  * `Query#getTestStepResults`
  * `Query#getTestStepsAttachments`

## [10.1.0] - 2021-05-31

### Added

* New `Query#getStatusCounts(pickleIds: string[])` method which calculates a summary
  of a run.

## [10.0.0] - 2021-05-17

### Changed

* Upgrade to gherkin 19.0.0
* Upgrade to messages 16.0.0

### Removed

* [JavaScript] Removed `Query#getWorstTestStepResult` method. Use `getWorstTestStepResult`
  from `@cucumber/messages` instead.

## [9.0.2] - 2021-04-06

### Fixed

* [JavaScript] Fix issue with compiled files not appearing in published package
  ([#1452](https://github.com/cucumber/cucumber/pull/1452))

## [9.0.1] - 2021-04-03

### Fixed

* Fixed a snafu with the 9.0.0 release

## [9.0.0] - 2021-03-29

### Changed

* Upgrade to messages 15.0.0

## [8.0.0] - 2021-02-07

### Changed

* Upgrade to messages 14.0.0

## [7.0.1] - 2020-12-17

### Fixed

* Removed unneeded `@cucumber/gherkin` dependency

## [7.0.0] - 2020-08-07

### Changed

* Update `messages` to 13.0.1

## [6.1.0] - 2020-06-29

### Added

* Add `getBeforeHookSteps` and `getAfterHookSteps`
* Add `getTestStepResults`
* Add `getHook`

## [6.0.0] - 2020-04-14

### Changed

* Upgrade to messages 12.0.0
* Upgrade to gherkin 13.0.0

## [5.0.0] - 2020-03-31

### Added

* Add `QueryStream`
* Major bump of gherkin and messages

## [4.0.0] - 2020-03-02

### Changed

* Upgraded gherkin

### Fixed

* Report `Status.UNKNOWN` when status is not known
* Add `gherkin` as a runtime dependency

## [3.0.0] - 2020-02-14

### Changed

* Rolled `TestResultsQuery` and `StepMatchArgumentsQuery` into a new, single `Query` class.
* Upgraded fake-cucumber, gherkin and messages

## [2.0.0] - 2020-01-22

### Changed

* [JavaScript] the API been rewritten

## [1.1.1] - 2020-01-10

### Changed

* [JavaScript] changed module name to `@cucumber/query`

## [1.1.0] - 2019-12-10

### Changed

* Something changed, but we didn't record what. Look at the diff!

## [1.0.0] - 2019-11-15

### Added

* First JavaScript implementation

<!-- Releases -->
[Unreleased]: https://github.com/cucumber/cucumber/compare/query/v11.0.0...main
[11.0.0]:      https://github.com/cucumber/cucumber/compare/cucumber-query/v10.1.0...query/v11.0.0
[10.1.0]:      https://github.com/cucumber/cucumber/compare/cucumber-query/v10.0.0...query/v10.1.0
[10.0.0]:      https://github.com/cucumber/cucumber/compare/cucumber-query/v9.0.2...query/v10.0.0
[9.0.2]:      https://github.com/cucumber/cucumber/compare/cucumber-query/v9.0.1...query/v9.0.2
[9.0.1]:      https://github.com/cucumber/cucumber/compare/cucumber-query/v9.0.0...query/v9.0.1
[9.0.0]:      https://github.com/cucumber/cucumber/compare/cucumber-query/v8.0.0...query/v9.0.0
[8.0.0]:      https://github.com/cucumber/cucumber/compare/cucumber-query/v7.0.1...query/v8.0.0
[7.0.1]:      https://github.com/cucumber/cucumber/compare/cucumber-query/v7.0.0...query/v7.0.1
[7.0.0]:      https://github.com/cucumber/cucumber/compare/cucumber-query/v6.1.0...query/v7.0.0
[6.1.0]:      https://github.com/cucumber/cucumber/compare/cucumber-query/v6.0.0...query/v6.1.0
[6.0.0]:      https://github.com/cucumber/cucumber/compare/cucumber-query/v5.0.0...query/v6.0.0
[5.0.0]:      https://github.com/cucumber/cucumber/compare/cucumber-query/v4.0.0...query/v5.0.0
[4.0.0]:      https://github.com/cucumber/cucumber/compare/cucumber-query/v3.0.0...query/v4.0.0
[3.0.0]:      https://github.com/cucumber/cucumber/compare/cucumber-query/v2.0.0...query/v3.0.0
[2.0.0]:      https://github.com/cucumber/cucumber/compare/cucumber-query/v1.1.1...query/v2.0.0
[1.1.1]:      https://github.com/cucumber/cucumber/compare/cucumber-query/v1.1.0...query/v1.1.1
[1.1.0]:      https://github.com/cucumber/cucumber/compare/cucumber-query/v1.0.0...cucumber-query/v1.1.0
[1.0.0]:      https://github.com/cucumber/cucumber/releases/tag/cucumber-query/v1.0.0

<!-- Contributors in alphabetical order -->
[aslakhellesoy]:    https://github.com/aslakhellesoy
