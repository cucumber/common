# CHANGE LOG
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

----
## [Unreleased]

### Added

### Changed

* java: Renamed `{bigint}` to `{biginteger}` ([mpkorstanje, aslakhellesoy])

### Deprecated

### Removed

### Fixed

* java: `{bigdecimal}` would only match integers ([mpkorstanje, aslakhellesoy])
* java: `{byte}` is suggested in snippets ([mpkorstanje])

## [5.0.15] - 2018-04-08

### Added

* go: Added Go implementation
  ([#350](https://github.com/cucumber/cucumber/pull/350)
   [charlierudolph])

### Changed

* java: Change the Java API
  ([e246e7c76045f9a379cebe46e40a0f2705c9d82c](https://github.com/cucumber/cucumber-expressions-java/commit/e246e7c76045f9a379cebe46e40a0f2705c9d82c)
   [mpkorstanje])

## [5.0.14] - 2018-04-04

### Added

* Matching a literal open-parenthesis
  ([#107](https://github.com/cucumber/cucumber/issues/107)
   [#333](https://github.com/cucumber/cucumber/issues/333)
   [#334](https://github.com/cucumber/cucumber/pull/334)
   [jamis])
* Matching a literal left curly brace [aslakhellesoy]

### Removed
* ruby: Support for named capture group in `Regexp`
  ([#329](https://github.com/cucumber/cucumber/issues/329)
   [aslakhellesoy])

### Fixed
* Generated expressions escape `(` and `{` if they were present in the text.
  ([#345](https://github.com/cucumber/cucumber/issues/345)
  [aslakhellesoy])

## [5.0.13] - 2018-01-21

### Fixed
* Fixed *yet* another regression introduced by [#324](https://github.com/cucumber/cucumber/pull/324)
  and simplified capture group parsing in `TreeRegexp` to reduce likelihood of more bugs.

## [5.0.12] - 2018-01-19

### Fixed
* javascript: Fixed another regression introduced by [#324](https://github.com/cucumber/cucumber/pull/324)
  ([#326](https://github.com/cucumber/cucumber/issues/326)
   [#327](https://github.com/cucumber/cucumber/pull/327)
   [mpkorstanje] [aslakhellesoy])

## [5.0.11] - 2018-01-19

### Fixed
* javascript: Fixed a regression introduced by [#324](https://github.com/cucumber/cucumber/pull/324)
  ([#325](https://github.com/cucumber/cucumber/issues/325)
   [aslakhellesoy])

## [5.0.10] - 2018-01-19

### Fixed
* Support escaped backslashes (`\\`) in Regular expressions.
  ([#323](https://github.com/cucumber/cucumber/issues/323)
   [#324](https://github.com/cucumber/cucumber/pull/324)
   [aslakhellesoy])

## [5.0.7] - 2017-11-29

### Fixed
* ruby: Only disallow `Regexp::EXTENDED`, `Regexp::IGNORECASE` and `Regexp::MULTILINE` in `ParameterType` regexps. Other flags such as `Regexp::NOENCODING` and `Regexp::FIXEDENCODING` are OK.

## [5.0.6] - 2017-11-28

### Fixed
* javascript: Backport `RegExp#flags` for Node 4.x

## [5.0.5] - 2017-11-28

### Fixed
* ruby: Fix typo in `ParameterType` error message.
  ([#306](https://github.com/cucumber/cucumber/issues/306)
   [aslakhellesoy], [luke-hill])
* Ignore `ParameterType`s with optional capture groups when generating snippets. Trying to do so
  caused an infinite loop.
  ([#307](https://github.com/cucumber/cucumber/issues/307)
   [aslakhellesoy])
* Throw an error when `ParameterType` regexps have flags. Flags are not allowed because only the source
  of the regexp is used to build a new regexp for the entire Cucumber Expression. See
  [#308](https://github.com/cucumber/cucumber/issues/308). ([aslakhellesoy])

## [5.0.4] - 2017-11-28

### Fixed
* Cucumber Expressions with alternation (`I said Alpha1/Beta1`) now works with
  more than just letters - it works with anything that isn't a space.
  ([#303](https://github.com/cucumber/cucumber/issues/303)
   by [aslakhellesoy])

## [5.0.3] - 2017-11-06

### Fixed

* javascript: Support RegExp flags
  ([#300](https://github.com/cucumber/cucumber/issues/300)
   by [aslakhellesoy] and [dmeehan1968])

## [5.0.2] - 2017-10-20

(There was no 5.0.1 release)

### Fixed
* java: Make the jar a bundle to support osgi. ([#287](https://github.com/cucumber/cucumber/pull/287)
  by [mpkorstanje])

## [5.0.0] - 2017-10-10

### Changed

* ruby, javascript: A `transformer` function can run in the context of a world object. `Argument#value` now takes an object as argument (renamed to `Argument#getValue` in js) ([#284](https://github.com/cucumber/cucumber/pull/284) by [aslakhellesoy])

## [4.0.4] - 2017-10-05

### Changed

* java: Backport to Java 7 ([#1](https://github.com/cucumber/cucumber-expressions-java/pull/1) by [mpkorstanje])

### Fixed

* Support `%` in undefined steps so snippet generation doesn't crash. ([#276](https://github.com/cucumber/cucumber/issues/276), [#279](https://github.com/cucumber/cucumber/pull/279) by [aslakhellesoy])
* Support escaped parenthesis in Regular expressions ([#254](https://github.com/cucumber/cucumber/pull/254) by [jaysonesmith], [aslakhellesoy])

## [4.0.3] - 2017-07-24

### Fixed
* javascript: Expose `Argument.group` and fix `start` and `end` accessors in `Group`

## [4.0.2] - 2017-07-14

### Fixed
* javascript: Make it work on Node 4 and browser (Use `Array.indexOf` instead of `Array.includes`)
  ([#237](https://github.com/cucumber/cucumber/pull/237)
   by [aslakhellesoy])

## [4.0.1] - 2017-07-14

### Fixed
* Fix bugs with nested and optional capture groups
  ([#237](https://github.com/cucumber/cucumber/pull/237)
   by [aslakhellesoy])

## [4.0.0] - 2017-06-28

### Removed
* Remove support for `{name:type}` syntax which was deprecated in
  [#117](https://github.com/cucumber/cucumber/pull/117) and released in 2.0.0.
  ([#180](https://github.com/cucumber/cucumber/pull/180)
   by [aslakhellesoy])
* Removed support for `{undefined}` parameter types. If a parameter type is not
  defined, and error will be raised.

### Added
* Support capture groups in parameter types
  ([#227](https://github.com/cucumber/cucumber/pull/227)
   [#57](https://github.com/cucumber/cucumber/issues/57)
   [#204](https://github.com/cucumber/cucumber/issues/204)
   [#224](https://github.com/cucumber/cucumber/issues/224)
   by [aslakhellesoy])
* Add `{word}` built-in parameter type
  ([#191](https://github.com/cucumber/cucumber/issues/191)
   [#226](https://github.com/cucumber/cucumber/pull/226)
   by [aslakhellesoy])
* Add `{string}` built-in parameter type
  ([#190](https://github.com/cucumber/cucumber/issues/190)
   [#231](https://github.com/cucumber/cucumber/pull/231)
   by [aslakhellesoy])

### Changed
* Allow duplicate regexps in parameter types
  ([#186](https://github.com/cucumber/cucumber/pull/186)
   [#132](https://github.com/cucumber/cucumber/issues/132)
   by [aslakhellesoy])

### Fixed
* RegularExpression constructor is not filtering non-capturing groups
  ([#211](https://github.com/cucumber/cucumber/issues/211)
   [#179](https://github.com/cucumber/cucumber/pull/179)
   [#216](https://github.com/cucumber/cucumber/pull/216)
   [#220](https://github.com/cucumber/cucumber/pull/220)
   by [kAworu], [aslakhellesoy])

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
[Unreleased]: https://github.com/cucumber/cucumber/compare/cucumber-expressions-v5.0.15...master
[5.0.15]:     https://github.com/cucumber/cucumber/compare/cucumber-expressions-v5.0.14...cucumber-expressions-v5.0.15
[5.0.14]:     https://github.com/cucumber/cucumber/compare/cucumber-expressions-v5.0.13...cucumber-expressions-v5.0.14
[5.0.13]:     https://github.com/cucumber/cucumber/compare/cucumber-expressions-v5.0.12...cucumber-expressions-v5.0.13
[5.0.12]:     https://github.com/cucumber/cucumber/compare/cucumber-expressions-v5.0.11...cucumber-expressions-v5.0.12
[5.0.11]:     https://github.com/cucumber/cucumber/compare/cucumber-expressions-v5.0.10...cucumber-expressions-v5.0.11
[5.0.10]:     https://github.com/cucumber/cucumber/compare/cucumber-expressions-v5.0.7...cucumber-expressions-v5.0.10
[5.0.7]:      https://github.com/cucumber/cucumber/compare/cucumber-expressions-v5.0.6...cucumber-expressions-v5.0.7
[5.0.6]:      https://github.com/cucumber/cucumber/compare/cucumber-expressions-v5.0.5...cucumber-expressions-v5.0.6
[5.0.5]:      https://github.com/cucumber/cucumber/compare/cucumber-expressions-v5.0.4...cucumber-expressions-v5.0.5
[5.0.4]:      https://github.com/cucumber/cucumber/compare/cucumber-expressions-v5.0.3...cucumber-expressions-v5.0.4
[5.0.3]:      https://github.com/cucumber/cucumber/compare/cucumber-expressions-v5.0.2...cucumber-expressions-v5.0.3
[5.0.2]:      https://github.com/cucumber/cucumber/compare/cucumber-expressions-v5.0.0...cucumber-expressions-v5.0.2
[5.0.0]:      https://github.com/cucumber/cucumber/compare/cucumber-expressions-v4.0.4...cucumber-expressions-v5.0.0
[4.0.4]:      https://github.com/cucumber/cucumber/compare/cucumber-expressions-v4.0.3...cucumber-expressions-v4.0.4
[4.0.3]:      https://github.com/cucumber/cucumber/compare/cucumber-expressions-v4.0.2...cucumber-expressions-v4.0.3
[4.0.2]:      https://github.com/cucumber/cucumber/compare/cucumber-expressions-v4.0.1...cucumber-expressions-v4.0.2
[4.0.1]:      https://github.com/cucumber/cucumber/compare/cucumber-expressions-v4.0.0...cucumber-expressions-v4.0.1
[4.0.0]:      https://github.com/cucumber/cucumber/compare/cucumber-expressions-v3.0.0...cucumber-expressions-v4.0.0
[3.0.0]:      https://github.com/cucumber/cucumber/compare/cucumber-expressions-v2.0.1...cucumber-expressions-v3.0.0
[2.0.1]:      https://github.com/cucumber/cucumber/compare/cucumber-expressions-v2.0.0...cucumber-expressions-v2.0.1
[2.0.0]:      https://github.com/cucumber/cucumber/compare/cucumber-expressions-v1.0.4...cucumber-expressions-v2.0.0
[1.0.4]:      https://github.com/cucumber/cucumber/compare/cucumber-expressions-v1.0.3...cucumber-expressions-v1.0.4
[1.0.3]:      https://github.com/cucumber/cucumber/compare/cucumber-expressions-v1.0.2...cucumber-expressions-v1.0.3
[1.0.2]:      https://github.com/cucumber/cucumber/compare/cucumber-expressions-v1.0.1...cucumber-expressions-v1.0.2
[1.0.1]:      https://github.com/cucumber/cucumber/releases/tag/cucumber-expressions-v1.0.1

<!-- Contributors in alphabetical order -->
[aslakhellesoy]:    https://github.com/aslakhellesoy
[brasmusson]:       https://github.com/brasmusson
[charlierudolph]:   https://github.com/charlierudolph
[dmeehan1968]:      https://github.com/dmeehan1968
[gpichot]:          https://github.com/gpichot
[jamis]:            https://github.com/jamis
[jaysonesmith]:     https://github.com/jaysonesmith
[luke-hill]:        https://github.com/luke-hill
[mpkorstanje]:      https://github.com/mpkorstanje
[kAworu]:           https://github.com/kAworu
