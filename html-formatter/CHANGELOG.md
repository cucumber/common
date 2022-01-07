# CHANGE LOG
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

----
## [Unreleased]

### Added

- Use `auto` theme to automatically render with light or dark theme per platform preference.

### Changed

### Deprecated

### Removed

### Fixed

## [17.0.0] - 2021-09-02

### Changed

* Upgrade to `@cucumber/react` `^18.0.0`

### Fixed

* [Java] Fix a regression from 14.0.0 where the embedded JavaScript had the wrong content,
  preventing reports from displaying properly.

## [16.0.1] - 2021-07-19

### Changed

* Upgrade to `messages` v17.0.1

## [16.0.0] - 2021-07-08

### Added

* Add filters and highlighted search terms in URL query parameter of HTML reports to make sharing those easier
  ([#1302](https://github.com/cucumber/cucumber/pull/1302))

### Changed

* Upgrade Cucumber Messages to v17.0.0

## [15.0.2] - 2021-05-27

### Fixed

* Upgrade to `@cucumber/react` `16.1.0`

## [15.0.1] - 2021-05-27

### Fixed

* Upgrade to `@cucumber/react` `16.0.2`, fixing a couple of bugs

## [15.0.0] - 2021-05-26

### Changed

* Upgrade to `@cucumber/react` `16.0.0`

## [14.0.0] - 2021-05-17

### Changed

* Upgrade to messages 16.0.0

## [13.0.0] - 2021-04-06

### Added

* Add inline logo icon to page

### Changed

* Upgrade dependencies including `@cucumber/gherkin` ^18.0.0,
  `@cucumber/messages` ^15.0.0, `@cucumber/query` ^9.0.2 and
  `@cucumber/react` ^13.0.0

## [12.0.0] - 2021-02-08

### Changed

* Upgrade to gherkin 17.0.0
* Upgrade to messages 14.0.0
* Upgrade to query 8.0.0

### Fixed

* Reclassified bundled dependencies as `devDependencies` only ([#1308](https://github.com/cucumber/cucumber/pull/1308))

## [11.0.4] - 2020-12-18

### Fixed

* Fix Java release

## [11.0.3] - 2020-12-18

### Fixed

* Downgrade to Webpack 4.44.2 since the Webpack 5 build fails to load in browsers.

## [11.0.2] - 2020-12-17

### Fixed

* Upgrade `@cucumber/react`

## [11.0.1] - 2020-12-17

### Fixed

* Upgrade `@cucumber/react`

## [11.0.0] - 2020-12-17

* Upgrade `@cucumber/react`

## [10.0.0] - 2020-11-04

### Changed

* Upgrade `@cucumber/react`

### Fixed

* [JavaScript] Fix CSS resolution when installed locally [#1180](https://github.com/cucumber/cucumber/pull/1180)

## [9.0.0] - 2020-08-08

### Changed

* Update `messages` to 13.0.1
* Update `messages` to 10.0.0

## [8.0.0] - 2020-08-07

### Changed

* Updated `react` to v9.0.0

## [7.2.0] - 2020-07-31

### Changed
* Updated `react` to v8.1.0
* Updated `messages` to v12.4.0

## [7.1.0] - 2020-07-30

### Changed

* Use `FilteredResults` as the entry point for the reporter ([#1111](https://github.com/cucumber/cucumber/pull/1111))
* Use `react` 8.1.0

## [7.0.0] - 2020-06-29

### Changed

* Upgrade `@cucumber/react` and other dependencies

## [6.0.3] - 2020-06-12

### Fixed
* [JavaScript] Fixed a bug where the command-line interface would always exit with 1
  even if there were no errors.
* [Java] Always use UTF-8 encoding

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
[Unreleased]: https://github.com/cucumber/cucumber/compare/html-formatter/v17.0.0...main
[17.0.0]:      https://github.com/cucumber/cucumber/compare/html-formatter/v16.0.1...html-formatter/v17.0.0
[16.0.1]:      https://github.com/cucumber/cucumber/compare/html-formatter/v16.0.0...html-formatter/v16.0.1
[16.0.0]:      https://github.com/cucumber/cucumber/compare/html-formatter/v15.0.2...html-formatter/v16.0.0
[15.0.2]:      https://github.com/cucumber/cucumber/compare/html-formatter/v15.0.1...html-formatter/v15.0.2
[15.0.1]:      https://github.com/cucumber/cucumber/compare/html-formatter/v15.0.0...html-formatter/v15.0.1
[15.0.0]:      https://github.com/cucumber/cucumber/compare/html-formatter/v14.0.0...html-formatter/v15.0.0
[14.0.0]:      https://github.com/cucumber/cucumber/compare/html-formatter/v13.0.0...html-formatter/v14.0.0
[13.0.0]:      https://github.com/cucumber/cucumber/compare/html-formatter/v12.0.0...html-formatter/v13.0.0
[12.0.0]:      https://github.com/cucumber/cucumber/compare/html-formatter/v11.0.4...html-formatter/v12.0.0
[11.0.4]:      https://github.com/cucumber/cucumber/compare/html-formatter/v11.0.3...html-formatter/v11.0.4
[11.0.3]:      https://github.com/cucumber/cucumber/compare/html-formatter/v11.0.2...html-formatter/v11.0.3
[11.0.2]:      https://github.com/cucumber/cucumber/compare/html-formatter/v11.0.1...html-formatter/v11.0.2
[11.0.1]:      https://github.com/cucumber/cucumber/compare/html-formatter/v11.0.0...html-formatter/v11.0.1
[11.0.0]:      https://github.com/cucumber/cucumber/compare/html-formatter/v10.0.0...html-formatter/v11.0.0
[10.0.0]:      https://github.com/cucumber/cucumber/compare/html-formatter/v9.0.0...html-formatter/v10.0.0
[9.0.0]:      https://github.com/cucumber/cucumber/compare/html-formatter/v8.0.0...html-formatter/v9.0.0
[8.0.0]:      https://github.com/cucumber/cucumber/compare/html-formatter/v7.2.0...html-formatter/v8.0.0
[7.2.0]:      https://github.com/cucumber/cucumber/compare/html-formatter/v7.1.0...html-formatter/v7.2.0
[7.1.0]:      https://github.com/cucumber/cucumber/compare/html-formatter/v7.0.0...html-formatter/v7.1.0
[7.0.0]:      https://github.com/cucumber/cucumber/compare/html-formatter/v6.0.3...html-formatter/v7.0.0
[6.0.3]:      https://github.com/cucumber/cucumber/compare/html-formatter/v6.0.2...html-formatter/v6.0.3
[6.0.2]:      https://github.com/cucumber/cucumber/compare/html-formatter/v6.0.1...html-formatter/v6.0.2
[6.0.1]:      https://github.com/cucumber/cucumber/compare/html-formatter/v6.0.0...html-formatter/v6.0.1
[6.0.0]:      https://github.com/cucumber/cucumber/compare/html-formatter/v5.0.0...html-formatter/v6.0.0
[5.0.0]:      https://github.com/cucumber/cucumber/compare/html-formatter/v4.3.0...html-formatter/v5.0.0
[4.3.0]:      https://github.com/cucumber/cucumber/compare/html-formatter/v4.2.0...html-formatter/v4.3.0
[4.2.0]:      https://github.com/cucumber/cucumber/compare/html-formatter/v4.1.0...html-formatter/v4.2.0
[4.1.0]:      https://github.com/cucumber/cucumber/compare/html-formatter/v4.0.0...html-formatter/v4.1.0
[4.0.0]:      https://github.com/cucumber/cucumber/compare/html-formatter/v3.2.3...html-formatter/v4.0.0
[3.2.3]:      https://github.com/cucumber/cucumber/compare/html-formatter/v3.2.2...html-formatter/v3.2.3
[3.2.2]:      https://github.com/cucumber/cucumber/compare/html-formatter/v3.2.1...html-formatter/v3.2.2
[3.2.1]:      https://github.com/cucumber/cucumber/compare/html-formatter/v3.2.0...html-formatter/v3.2.1
[3.2.0]:      https://github.com/cucumber/cucumber/compare/html-formatter/v3.1.0...html-formatter/v3.2.0
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
