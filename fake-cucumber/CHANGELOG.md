# CHANGE LOG
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

----
## [Unreleased]

### Added

* Handle Hooks (4 built-in hooks: @before-passed, @before-failed, @after-passed, @after-failed)
  ([#803](https://github.com/cucumber/cucumber/pull/803)
   [vincent-psarga]
   [aslakhellesoy])

### Changed

### Deprecated

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
[Unreleased]: https://github.com/cucumber/cucumber/compare/fake-cucumber/v2.1.0...master
[2.1.0]:      https://github.com/cucumber/cucumber/compare/fake-cucumber/v2.0.3...fake-cucumber/v2.1.0
[2.0.3]:      https://github.com/cucumber/cucumber/compare/fake-cucumber/v2.0.2...fake-cucumber/v2.0.3
[2.0.2]:      https://github.com/cucumber/cucumber/compare/fake-cucumber/v2.0.1...fake-cucumber/v2.0.2
[2.0.1]:      https://github.com/cucumber/cucumber/compare/fake-cucumber/v2.0.0...fake-cucumber/v2.0.1
[2.0.0]:      https://github.com/cucumber/cucumber/compare/fake-cucumber/v1.1.1...fake-cucumber/v2.0.0
[1.1.1]:      https://github.com/cucumber/cucumber/compare/fake-cucumber/v1.1.0...fake-cucumber/v1.1.1
[1.1.0]:      https://github.com/cucumber/cucumber/compare/fake-cucumber/v1.0.1...fake-cucumber/v1.1.0
[1.0.1]:      https://github.com/cucumber/cucumber/compare/fake-cucumber/v2.1.0...fake-cucumber/v1.0.1
[1.0.0]:      https://github.com/cucumber/cucumber/releases/tag/fake-cucumber/v1.0.0

<!-- Contributors in alphabetical order -->
[aslakhellesoy]:    https://github.com/aslakhellesoy
[vincent-psarga]:    https://github.com/vincent-psarga
