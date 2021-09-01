# CHANGE LOG

All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](http://semver.org).

This document is formatted according to the principles of [Keep A CHANGELOG](http://keepachangelog.com).

----
## [Unreleased]

### Added

### Changed

### Deprecated

### Removed

### Fixed

## [19.0.0] - 2021-07-08

### Changed

* Update messages to v17
* [Go] Move module paths to point to monorepo
  ([#1550](https://github.com/cucumber/common/issues/1550))

## [18.0.0] - 2021-05-17

### Changed

* Upgrade to messages 16.0.0

## [17.0.2] - 2021-04-22

### Fixed

* Handle tagged examples
  ([1489](https://github.com/cucumber/cucumber/pull/1489)
   [aurelien-reeves])

## [7.0.1] - 2021-04-09

### Fixed

* Handle embeddings when step is issued from a hook
  ([#1466](https://github.com/cucumber/cucumber/pull/1466)
   [#1172](https://github.com/cucumber/cucumber/issues/1172)
   [aurelien-reeves])

## [7.0.0] - 2021-03-29

### Changed

* Update `messages` to 15.0.0

## [6.0.0] - 2020-08-07

### Changed

* Update `messages` to 13.0.1
* Handle the `JavaMethod` and `JavaStackTraceElement` fields in `SourceReference`:
  - outputs `<className>.<methodName>(<parameter1>,<parameter2>, etc)` for `JavaMethod`
  - outputs `<fileName>:<line?>` for `JavaStackTraceElement`

## [5.1.0] - 2020-06-29

### Changed

* Upgrade to messages 12.2.0
* Upgrade to gherkin 14.0.2

## [5.0.0] - 2020-04-14

### Added

* Output description for Backgrounds.

### Changed

* Upgrade to messages 12.0.0
* Upgrade to gherkin 13.0.0

## [4.0.0] - 2020-04-01

### Changed

* Bump major version of messages

## [3.1.1] - 2020-03-02

### Fixed

* Fix 3.1.0 release

## [3.1.0] - 2020-03-02

### Added

* Handle text added with `log`.

## [3.0.0] - 2020-02-14

### Changed

Upgrade messages

### Fixed

* Process rules
* Output background name

## [2.2.0] - 2020-01-10

### Changed

* Upgrade to cucumber-messages 9.0.3

## [2.1.0] - 2019-12-10

### Changed

* Upgrade to cucumber-messages 8.0.0

### Fixed

* Support for text/plain attachments (haven't fully implemented support for other types)
* Support for Tags, DataTable and DocStrings

## [2.0.0] - 2019-10-17

### Changed

* Upgrade to cucumber-messages v6

## [1.0.0]

### Added

* Initial release

<!-- Releases -->
[Unreleased]: https://github.com/cucumber/cucumber/compare/json-formatter/v19.0.0...main
[19.0.0]:      https://github.com/cucumber/cucumber/compare/json-formatter/v18.0.0...json-formatter/v19.0.0
[18.0.0]:      https://github.com/cucumber/cucumber/compare/json-formatter/v17.0.2...json-formatter/v18.0.0
[17.0.2]:      https://github.com/cucumber/cucumber/compare/json-formatter/v7.0.1...json-formatter/v17.0.2
[7.0.1]:      https://github.com/cucumber/cucumber/compare/json-formatter/v7.0.0...json-formatter/v7.0.1
[7.0.0]:      https://github.com/cucumber/cucumber/compare/json-formatter/v6.0.0...json-formatter/v7.0.0
[6.0.0]:      https://github.com/cucumber/cucumber/compare/json-formatter/v5.1.0...json-formatter/v6.0.0
[5.1.0]:      https://github.com/cucumber/cucumber/compare/json-formatter/v5.0.0...json-formatter/v5.1.0
[5.0.0]:      https://github.com/cucumber/cucumber/compare/json-formatter/v4.0.0...json-formatter/v5.0.0
[4.0.0]:      https://github.com/cucumber/cucumber/compare/json-formatter/v3.1.1...json-formatter/v4.0.0
[3.1.1]:      https://github.com/cucumber/cucumber/compare/json-formatter/v3.1.0...json-formatter/v3.1.1
[3.1.0]:      https://github.com/cucumber/cucumber/compare/json-formatter/v3.0.0...json-formatter/v3.1.0
[3.0.0]:      https://github.com/cucumber/cucumber/compare/json-formatter/v2.2.0...json-formatter/v3.0.0
[2.2.0]:      https://github.com/cucumber/cucumber/compare/json-formatter/v2.1.0...json-formatter/v2.2.0
[2.1.0]:      https://github.com/cucumber/cucumber/compare/json-formatter/v2.0.0...json-formatter/v2.1.0
[2.0.0]:      https://github.com/cucumber/cucumber/compare/json-formatter/v1.0.0...json-formatter/v2.0.0
[1.0.0]:      https://github.com/cucumber/cucumber/releases/tag/json-formatter/v1.0.0

<!-- Contributors -->
[aslakhellesoy]:    https://github.com/aslakhellesoy
[aurelien-reeves]:  https://github.com/aurelien-reeves
