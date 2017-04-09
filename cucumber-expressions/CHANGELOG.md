# CHANGE LOG
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

----
## [Unreleased]

### Removed
* Remove support for `{name:type}` syntax which was deprecated in
  [#117](https://github.com/cucumber/cucumber/pull/117) and released in 2.0.0.
  ([#180](https://github.com/cucumber/cucumber/pull/180)
   by [aslakhellesoy])

### Added
N/A

### Changed
N/A

### Fixed
N/A

## [3.0.0] - 2017-03-08

### Removed
* java: Drop support for Java 7 (Java 8 or higher is required)

### Added
* Alternative text: `I have a cat/dog/fish`
  (by [aslakhellesoy])
* `ParameterType` can be constructed with `null`/`nil` arguments for
  * `type` / `constructorFunction`: Makes it simpler to use in languages without static types
  * `transform`: Leave arguments unchanged, return as string
  (by [aslakhellesoy])

### Changed
* Renamed API:
  * `Parameter         -> ParameterType`
  * `ParameterRegistry -> ParameterTypeRegistry`
  * `addParameter      -> defineParameterType`

* Stricter conflict checks when defining parameters
  ([#121](https://github.com/cucumber/cucumber/pull/121)
   by [aslakhellesoy])

### Fixed
N/A

## [2.0.1] - 2017-02-17
N/A

### Removed
N/A

### Added
* Document how to define `async` parameters.
  Depends on [cucumber/cucumber-js#753](https://github.com/cucumber/cucumber-js/pull/753).
  ([#108](https://github.com/cucumber/cucumber/issues/108)
   by [aslakhellesoy])

### Changed
* Defer parameter transformation until after the match
  ([#118](https://github.com/cucumber/cucumber/issues/118)
   [#120](https://github.com/cucumber/cucumber/pull/120)
   by [aslakhellesoy])

### Fixed
* Tweak Babel settings to produce ES5 code
  ([#119](https://github.com/cucumber/cucumber/issues/119)
   by [aslakhellesoy])

## [2.0.0] - 2017-02-17

### Removed
N/A

### Added
N/A

### Changed
* Deprecate `{name:type}` syntax in favour of `{type}`
  ([#117](https://github.com/cucumber/cucumber/pull/117)
   by [aslakhellesoy])
* Rename transform to parameter
  ([#114](https://github.com/cucumber/cucumber/issues/114)
   [#115](https://github.com/cucumber/cucumber/pull/115)
   by [aslakhellesoy])

### Fixed
* Escape RegExp characters.
  ([#103](https://github.com/cucumber/cucumber/issues/103)
   [#106](https://github.com/cucumber/cucumber/pull/106)
   by [charlierudolph] and [aslakhellesoy])
* Regexp literals in transforms.
  ([#109](https://github.com/cucumber/cucumber/issues/109)
   by [aslakhellesoy])

## [1.0.4] - 2017-01-20

### Removed
N/A

### Added
N/A

### Changed
* ruby: Use `Integer` instead of `Fixnum`

### Fixed
* Handle multiple capture group regexps for matching
  ([#102](https://github.com/cucumber/cucumber/issues/102)
   by [gpichot])
* Make the tests pass on Ruby 2.4.0 (as well as older rubies)

## [1.0.3] - 2016-11-25

### Removed
N/A

### Added
N/A

### Changed
N/A

### Fixed
* Include `dist` in npm package.
  ([#85](https://github.com/cucumber/cucumber/issues/85)
   by [aslakhellesoy])

## [1.0.2] - 2016-11-23

### Removed
N/A

### Added
N/A

### Changed
N/A

### Fixed
* Generated expressions - expose argument names.
  ([#83](https://github.com/cucumber/cucumber/pull/83)
   by [charlierudolph])
* Build JavaScript code with Babel.
  ([#86](https://github.com/cucumber/cucumber/pull/86)
   by [aslakhellesoy])
* Handle optional groups in regexp.
  ([#87](https://github.com/cucumber/cucumber/pull/87)
   by [brasmusson])

## [1.0.1] - 2016-09-28

### Added

* First stable release!

<!-- Releases -->
[Unreleased]: https://github.com/cucumber/cucumber/compare/cucumber-expressions-v3.0.0...master
[3.0.0]:      https://github.com/cucumber/cucumber/compare/cucumber-expressions-v2.0.1...cucumber-expressions-v3.0.0
[2.0.1]:      https://github.com/cucumber/cucumber/compare/cucumber-expressions-v2.0.0...cucumber-expressions-v2.0.1
[2.0.0]:      https://github.com/cucumber/cucumber/compare/cucumber-expressions-v1.0.4...cucumber-expressions-v2.0.0
[1.0.4]:      https://github.com/cucumber/cucumber/compare/cucumber-expressions-v1.0.3...cucumber-expressions-v1.0.4
[1.0.3]:      https://github.com/cucumber/cucumber/compare/cucumber-expressions-v1.0.2...cucumber-expressions-v1.0.3
[1.0.2]:      https://github.com/cucumber/cucumber/compare/cucumber-expressions-v1.0.1...cucumber-expressions-v1.0.2
[1.0.1]:      https://github.com/cucumber/cucumber/releases/tag/cucumber-expressions-v1.0.1

<!-- Contributors -->
[aslakhellesoy]:    https://github.com/aslakhellesoy
[brasmusson]:       https://github.com/brasmusson
[charlierudolph]:   https://github.com/charlierudolph
[gpichot]:          https://github.com/charlierudolph
