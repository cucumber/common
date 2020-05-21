# CHANGE LOG
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

----
## [Unreleased]

### Added

* [Java] Enable consumers to find our version at runtime using `clazz.getPackage().getImplementationVersion()` by upgrading to `cucumber-parent:2.1.0`
  ([#976](https://github.com/cucumber/cucumber/pull/976)
   [aslakhellesoy])

### Changed

* [Java] Updated `TagExpressionParser` to use a static method to parse a tag expression and return an `Expression` object to the user.
* [Java] Reduced public API to the bare minimum required.
* [Java] Added more informative error messages for `TagExpressionParser` through the `TagExpressionException`. 
  ([#1005](https://github.com/cucumber/cucumber/pull/1005)
  [cyocum])

### Deprecated

### Removed

### Fixed

## [2.0.4] - 2020-01-10

### Changed

* [JavaScript] changed module name to `@cucumber/tag-expressions`

## [2.0.3] - 2019-12-10

### Changed

* [Java] Upgrades to `cucumber-parent:2.0.2`
* [Ruby] Renamed gem to `tag-expressions`

### Removed

* [Ruby] Removed `tag-expressions` executable

## [2.0.2] - 2019-07-15

### Fixed

* Fix incomplete 2.0.1 release

## [2.0.1] - 2019-07-15

### Fixed

* Fix incomplete 2.0.0 release

## [2.0.0] - 2019-07-10

### Added
* Go: New implementation.
  ([#339](https://github.com/cucumber/cucumber/pull/339)
   [charlierudolph])

### Changed
* JavaScript: Changed API to return a `parse` function rather than a class with a `parse` method.
* JavaScript: Refactored to TypeScript

### Removed
* Java: OSGi support has been removed.
  ([#412](https://github.com/cucumber/cucumber/issues/412)
   [aslakhellesoy])

### Fixed
* Documentation links now point to new website (cucumber.io)
  ([#560](https://github.com/cucumber/cucumber/issues/560)
   [luke-hill])

## [1.1.1] - 2017-12-01

### Fixed
* Java: Fix OSGI exported package
  ([#309](https://github.com/cucumber/cucumber/pull/309)
   by [mpkorstanje])

## [1.1.0] - 2017-11-28

### Added
* Ruby: Added `tag-expressions` command-line tool for tag expressions
  ([#282](https://github.com/cucumber/cucumber/pull/282)
   by [aslakhellesoy])
* Escape special chars in tags
  ([#286](https://github.com/cucumber/cucumber/pull/286)
   [#285](https://github.com/cucumber/cucumber/issues/285)
   by [link89])

### Fixed
* Don't support RPN
  ([#304](https://github.com/cucumber/cucumber/issues/304)
   by [aslakhellesoy])
* Parse empty tag expressions (always evaluates to true)
  ([#296](https://github.com/cucumber/cucumber/issues/296)
   by [aslakhellesoy])

## [1.0.1] - 2017-05-28

### Fixed
* javascript:
  ([#76](https://github.com/cucumber/cucumber/pull/76)
   [#78](https://github.com/cucumber/cucumber/pull/78)
   [#104](https://github.com/cucumber/cucumber/issues/104)
   by [charlierudolph])
* java: Make the jar a bundle to support OSGi
  ([#99](https://github.com/cucumber/cucumber/pull/99)
    by [brasmusson])
* Add a [changelog](keepachangelog.com)
  ([#213](https://github.com/cucumber/cucumber/issues/213)
   by [aslakhellesoy])

## 1.0.0 - 2016-09-01

### Added

* First stable release!

<!-- Releases -->
[Unreleased]: https://github.com/cucumber/cucumber/compare/tag-expressions/v2.0.4...master
[2.0.4]: https://github.com/cucumber/cucumber/compare/tag-expressions/v2.0.3...tag-expressions/v2.0.4
[2.0.3]: https://github.com/cucumber/cucumber/compare/tag-expressions/v2.0.2...tag-expressions/v2.0.3
[2.0.2]: https://github.com/cucumber/cucumber/compare/tag-expressions/v2.0.1...tag-expressions/v2.0.2
[2.0.1]: https://github.com/cucumber/cucumber/compare/tag-expressions/v2.0.0...tag-expressions/v2.0.1
[2.0.0]: https://github.com/cucumber/cucumber/compare/tag-expressions-v1.1.1...tag-expressions/v2.0.0
[1.1.1]: https://github.com/cucumber/cucumber/compare/tag-expressions-v1.1.0...tag-expressions-v1.1.1
[1.1.0]: https://github.com/cucumber/cucumber/compare/tag-expressions-v1.0.1...tag-expressions-v1.1.0
[1.0.1]: https://github.com/cucumber/cucumber/releases/tag/tag-expressions-v1.0.1

<!-- Contributors -->
[aslakhellesoy]:    https://github.com/aslakhellesoy
[brasmusson]:       https://github.com/brasmusson
[charlierudolph]:   https://github.com/charlierudolph
[link89]:           https://github.com/link89
[luke-hill]:        https://github.com/luke-hill
