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

## [6.0.2] - 2020-05-01

### Added

* [Java] Enable consumers to find our version at runtime using `clazz.getPackage().getImplementationVersion()` by upgrading to `cucumber-parent:2.1.0`
  ([#976](https://github.com/cucumber/cucumber/pull/976)
   [aslakhellesoy])

### Fixed
* [Java] Use version range for messages dependency 
  ([#986](https://github.com/cucumber/cucumber/pull/986)
   [mpkorstanje])
* [Java] Make writer idempotent when failing to close underlying writer 
  ([#986](https://github.com/cucumber/cucumber/pull/986)
   [mpkorstanje])
   
## [6.0.1] - 2020-04-15

### Fixed

* Fix Ruby release
  ([#970](https://github.com/cucumber/cucumber/pull/970)
   [aslakhellesoy])

## [6.0.0] - 2020-04-14

### Changed

* Upgrade to messages 12.0.0
* Upgrade to gherkin 13.0.0
* Upgrade to @cucumber/react 7.0.0

## [5.0.0] - 2020-04-01

### Changed

* Upgrade `@cucumber/*` dependencies to next major version

### Fixed

* Fix deprecation warning about `<Wrapper>` (Use `<QueriesWrapper>` instead)

## [4.3.0] - 2020-03-13

### Added

* Ruby implementation
  ([#931](https://github.com/cucumber/cucumber/pull/931)
   [vincent-psarga])

## [4.2.0] - 2020-03-10

### Added

* Java: New Java implementation
  ([#922](https://github.com/cucumber/cucumber/pull/922)
   [mpkorstanje])
* JavaScript: Add a mustache template in the JavaScript npm module that other implementations can use
* JavaScript: Add `CucumberHtmlStream` (default export), allowing this module to be used as a library (in Cucumber.js)

### Changed

* JavaScript: No server side rendering
  * It's not *really* needed. This does break SEO, but that's not a goal for Cucumber HTML reports.
  * Using both server side rendering and client side rendering results in conflicting versions of the react dom being used during development.
  ([#923](https://github.com/cucumber/cucumber/pull/923)
   [aslakhellesoy]
   [mpkorstanje])
* JavaScript Use a custom mustache template engine that streams output. Ported from Java

### Fixed

* [JavaScript] Lower memory footprint - messages are no longer buffered during HTML generation
  ([#928](https://github.com/cucumber/cucumber/pull/928)
   [aslakhellesoy])

## [4.1.0] - 2020-03-02

### Added

* Embed CSS in generated HTML
  ([#911](https://github.com/cucumber/cucumber/pull/911)
   [aslakhellesoy]
   [vincent-psarga])

## [4.0.0] - 2020-02-15

### Changed

* Upgrade `@cucumber/react` to `4.0.0`

## [3.2.3] - 2020-01-22

### Changed

* Upgrade `@cucumber/react` to `3.3.0`

## [3.2.2] - 2020-01-15

### Fixed

* Nothing changed, just tagged a new release to trigger docker build

## [3.2.1] - 2020-01-14

### Fixed

* Nothing changed, just tagged a new release to trigger docker build

## [3.2.0] - 2020-01-10

### Changed

* [JavaScript] changed module name to `@cucumber/html-formatter`

## [3.1.0] - 2019-12-10

### Changed

* Use cucumber-react 3.1.0

## [3.0.0] - 2019-11-15

### Changed

* Use cucumber-react 3.0.0

## [2.0.3] - 2019-10-21

### Fixed

* Fixed automated build on Docker

## [2.0.2] - 2019-10-21

### Fixed

* Add source map support for better stack traces

## [2.0.1] - 2019-10-18

### Changed

* Upgrade cucumber-react to 2.0.1
* Upgrade cucumber-messages to 6.0.2

## [2.0.0] - 2019-10-10

### Changed

* Upgrade cucumber-messages to 6.0.1

## [1.1.0] - 2019-08-29

### Changed

* Upgraded to cucumber-react 1.1.0

## [1.0.2] - 2019-08-23

### Fixed

* Fixed packaging (again)

## [1.0.1] - 2019-08-23

### Fixed

* Fixed packaging

## [1.0.0] - 2019-08-23

### Added

* First release

### Fixed

<!-- Releases -->
[Unreleased]: https://github.com/cucumber/cucumber/compare/formatter/v6.0.2...master
[6.0.2]:      https://github.com/cucumber/cucumber/compare/formatter/v6.0.1...formatter/v6.0.2
[6.0.1]:      https://github.com/cucumber/cucumber/compare/formatter/v6.0.0...formatter/v6.0.1
[6.0.0]:      https://github.com/cucumber/cucumber/compare/formatter/v5.0.0...formatter/v6.0.0
[5.0.0]:      https://github.com/cucumber/cucumber/compare/formatter/v4.3.0...formatter/v5.0.0
[4.3.0]:      https://github.com/cucumber/cucumber/compare/formatter/v4.2.0...formatter/v4.3.0
[4.2.0]:      https://github.com/cucumber/cucumber/compare/formatter/v4.1.0...formatter/v4.2.0
[4.1.0]:      https://github.com/cucumber/cucumber/compare/formatter/v4.0.0...formatter/v4.1.0
[4.0.0]:      https://github.com/cucumber/cucumber/compare/formatter/v3.2.3...formatter/v4.0.0
[3.2.3]:      https://github.com/cucumber/cucumber/compare/formatter/v3.2.2...formatter/v3.2.3
[3.2.2]:      https://github.com/cucumber/cucumber/compare/formatter/v3.2.1...formatter/v3.2.2
[3.2.1]:      https://github.com/cucumber/cucumber/compare/formatter/v3.2.0...formatter/v3.2.1
[3.2.0]:      https://github.com/cucumber/cucumber/compare/html-formatter/v3.1.0...formatter/v3.2.0
[3.1.0]:      https://github.com/cucumber/cucumber/compare/html-formatter/v3.0.0...html-formatter/v3.1.0
[3.0.0]:      https://github.com/cucumber/cucumber/compare/html-formatter/v2.0.3...html-formatter/v3.0.0
[2.0.3]:      https://github.com/cucumber/cucumber/compare/html-formatter/v2.0.2...html-formatter/v2.0.3
[2.0.2]:      https://github.com/cucumber/cucumber/compare/html-formatter/v2.0.1...html-formatter/v2.0.2
[2.0.1]:      https://github.com/cucumber/cucumber/compare/html-formatter/v2.0.0...html-formatter/v2.0.1
[2.0.0]:      https://github.com/cucumber/cucumber/compare/html-formatter/v1.1.0...html-formatter/v2.0.0
[1.1.0]:      https://github.com/cucumber/cucumber/compare/html-formatter/v1.0.2...html-formatter/v1.1.0
[1.0.2]:      https://github.com/cucumber/cucumber/compare/html-formatter/v1.0.1...html-formatter/v1.0.2
[1.0.1]:      https://github.com/cucumber/cucumber/compare/html-formatter/v1.0.0...html-formatter/v1.0.1
[1.0.0]:      https://github.com/cucumber/cucumber/releases/tag/html-formatter/v1.0.0

<!-- Contributors in alphabetical order -->
[aslakhellesoy]:    https://github.com/aslakhellesoy
[vincent-psarga]:   https://github.com/vincent-psarga
[mpkorstanje]:      https://github.com/mpkorstanje
