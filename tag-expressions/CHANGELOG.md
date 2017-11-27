# CHANGE LOG
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

----
## [Unreleased]

### Added
* Escape special chars in tags
  ([#286](https://github.com/cucumber/cucumber/pull/286)
   [#285](https://github.com/cucumber/cucumber/issues/285)
   by [link89])

### Changed
N/A

### Deprecated
N/A

### Removed
N/A

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
[Unreleased]: https://github.com/cucumber/cucumber/compare/tag-expressions-v1.0.1...master
[1.0.1]:      https://github.com/cucumber/cucumber/releases/tag/tag-expressions-v1.0.1

<!-- Contributors -->
[aslakhellesoy]:    https://github.com/aslakhellesoy
[brasmusson]:       https://github.com/brasmusson
[charlierudolph]:   https://github.com/charlierudolph
[link89]:           https://github.com/link89
