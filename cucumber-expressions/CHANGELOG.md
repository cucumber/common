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

## [10.2.0] - 2020-05-28

### Added
* [Java]  Support for Optional
  ([#1006](https://github.com/cucumber/cucumber/pull/1006)
   [gaeljw], [mpkorstanje])

* [Java] Enable consumers to find our version at runtime using `clazz.getPackage().getImplementationVersion()` by upgrading to `cucumber-parent:2.1.0`
  ([#976](https://github.com/cucumber/cucumber/pull/976)
   [aslakhellesoy])

## [10.1.0] - 2020-04-14

### Changed

* [Java] `CucumberExpression` and `RegularExpression` are now public.  

### Fixed

* [Java] Minor performance improvement for matching regular expressions steps.

## [10.0.0] - 2020-03-31

### Changed

* [JavaScript] All array return values and function parameters are now declared as TypeScript `ReadOnlyArray`

## [9.0.0] - 2020-02-14

### Added

* [JavaScript, Ruby] Added `ExpressionFactory`, which is now the preferred way to create `Expression` instances.

### Deprecated

* [Ruby] `CucumberExpression` and `RegularExpression` constructors should not be used directly.
  Use `ExpressionFactory#create_expression` instead.

### Removed

* [Java, JavaScript] `CucumberExpression` and `RegularExpression` are no longer part of the public API.
* [JavaScript] remove support for Node 8, which is now EOL

## [8.3.1] - 2020-01-10

* [JavaScript] changed module name to `@cucumber/cucumber-expressions`

## [8.3.0] - 2019-12-10

### Added

* [JavaScript] export `Argument`, `Group` and `Expression` types

## [8.2.1] - 2019-11-11

### Fixed

* Fix webpack packaging (simplify by assigning to `window.CucumberExpressions`)

## [8.2.0] - 2019-11-11

### Added

* [JavaScript] build with webpack.
  ([#792](https://github.com/cucumber/cucumber/pull/792)
   [aslakhellesoy])

## [8.1.0] - 2019-10-31

### Added

* Expose `Argument#getParameterType()` method. Needed by Cucumber `protobuf` formatters.
  ([#781](https://github.com/cucumber/cucumber/pull/781)
   [aslakhellesoy])

## [8.0.2] - 2019-10-28

### Fixed

* [Go] Change Go module name to `github.com/cucumber/cucumber-expressions-go/v8`
  ([aslakhellesoy])

* Fix captured empty strings being undefined
  ([#746](https://github.com/cucumber/cucumber/issues/746)
   [#754](https://github.com/cucumber/cucumber/pull/754)
   [davidjgoss])

## [8.0.1] - 2019-10-07

### Fixed

* [JavaScript] Support Node 8
  ([#732](https://github.com/cucumber/cucumber/pull/732)
   [#725](https://github.com/cucumber/cucumber/issues/725)
   [charlierudolph])

## [8.0.0] - 2019-08-11

### Added
* [Java] Annotate function interfaces with @FunctionalInterface
    ([cucumber/cucumber-jvm#1716](https://github.com/cucumber/cucumber-jvm/issues/1716)
    [mpkorstanje])
* [Java] Mark public api with @API Guardian annotations
    ([cucumber/cucumber-jvm#1536](https://github.com/cucumber/cucumber-jvm/issues/1536)
    [mpkorstanje])
### Changed

* Improve decimal number parsing
  ([#669](https://github.com/cucumber/cucumber/issues/669)
   [#672](https://github.com/cucumber/cucumber/pull/672)
   [#675](https://github.com/cucumber/cucumber/pull/675)
   [#677](https://github.com/cucumber/cucumber/pull/677)
   [mpkorstanje])
* Only suggest parameter types when text is surrounded by whitespace or punctuation
  ([#657](https://github.com/cucumber/cucumber/issues/657)
   [#661](https://github.com/cucumber/cucumber/pull/661)
   [vincent-psarga]
   [aslakhellesoy]
   [luke-hill]
   [mpkorstanje])
* [Java] Upgrades to `cucumber-parent:2.0.2`
* [Java] Simplify heuristics to distinguish between Cucumber Expressions and Regular Expressions
  ([#515](https://github.com/cucumber/cucumber/issues/515)
   [#581](https://github.com/cucumber/cucumber/pull/581)
   [mpkorstanje])
* [Java/Go] cucumber-expressions: Prefer language type hint over parameter type
  ([#658](https://github.com/cucumber/cucumber/pull/658)
   [#659](https://github.com/cucumber/cucumber/pull/659)
   [mpkorstanje])

### Fixed

* Fix RegExp lookaround
  ([#643](https://github.com/cucumber/cucumber/issues/643)
   [#644](https://github.com/cucumber/cucumber/pull/644)
   [vincent-psarga]
   [mpkorstanje])

* Match integer strings as `{float}`.
  ([#600](https://github.com/cucumber/cucumber/issues/600)
   [#605](https://github.com/cucumber/cucumber/pull/605)
   [aslakhellesoy]
   [vincent-psarga])

* reconized lookaround as a non-capturing regex
 ([#481](https://github.com/cucumber/cucumber/issues/576)
   [#593](https://github.com/cucumber/cucumber/pull/593)
   [#643](https://github.com/cucumber/cucumber/pull/643)
   [#644](https://github.com/cucumber/cucumber/pull/644)
   [luke-hill])

## [7.0.2] - 2019-06-15

### Fixed

* Support Boolean in BuiltInParameterTransformer
    ([#604](https://github.com/cucumber/cucumber/pull/604) [tommywo])

## [7.0.0] - 2019-03-22

### Fixed

* Javascript release process
* Version numbering 🙈

## [6.6.2] - 2019-03-22

This was a mistaken release due to [tooky]'s fat fingers.

## [6.2.3] - 2019-03-22

### Fixed

* Ruby release process working again

## [6.2.2] - 2019-03-16

### Changed

* Limit generated expressions to 256
 ([#576](https://github.com/cucumber/cucumber/issues/576),
   [#574](https://github.com/cucumber/cucumber/pull/574)
   [mpkorstanje])

### Fixed

* Allow parameter-types in escaped optional groups
   ([#572](https://github.com/cucumber/cucumber/pull/572),
     [#561](https://github.com/cucumber/cucumber/pull/561)
     [luke-hill], [jaysonesmith], [mpkorstanje])

* Prefer expression with the longest non-empty match #580
  ([#580](https://github.com/cucumber/cucumber/pull/580),
    [#575](https://github.com/cucumber/cucumber/issues/575)
    [mpkorstanje])

## [6.2.1] - 2018-11-30

### Fixed

* (Java) Improve heuristics for creating Cucumber/Regular Expressions from strings
  ([#515](https://github.com/cucumber/cucumber/issues/515)
   [#518](https://github.com/cucumber/cucumber/pull/518)
   [aslakhellesoy])

## [6.2.0] - 2018-10-28

### Added
* Add anonymous parameter types
  ([#496](https://github.com/cucumber/cucumber/pull/496) [mpkorstanje])

## [6.1.2] - 2018-10-11

Same as 6.1.1 - just fixed a mistake made during the 6.1.1 release.

## [6.1.1] - 2018-10-11

### Fixed

* (Java) Add the ability to supply an alternative algorithm for compiling `java.util.regex.Pattern`
  to work around a limitation on Android (and other platforms).
  ([#494](https://github.com/cucumber/cucumber/issues/494)
   [#498](https://github.com/cucumber/cucumber/pull/498)
   [lsuski])  

## [6.1.0] - 2018-09-23

### Added

* (Java) Added `ParameterType.fromEnum(MyEnumClass.class)` to make it easier
  to register enums.
  ([#423](https://github.com/cucumber/cucumber/pull/423)
   [aslakhellesoy])

### Removed
* java: OSGi support has been removed.
  ([#412](https://github.com/cucumber/cucumber/issues/412)
   [aslakhellesoy])

### Fixed
* java: The text between `()` (optional text) can be unicode.
  ([#473](https://github.com/cucumber/cucumber/pull/473)
   [savkk]
   [aslakhellesoy]
* The built-in `{word}` parameter type handles unicode (any non-space character)
  ([#471](https://github.com/cucumber/cucumber/pull/471)
   [savkk]
   [aslakhellesoy]
* Parenthesis inside character class should not be treated as capture group.
  ([#454](https://github.com/cucumber/cucumber/issues/454)
   [#461](https://github.com/cucumber/cucumber/pull/461)
   [#463](https://github.com/cucumber/cucumber/pull/463)
   [#464](https://github.com/cucumber/cucumber/pull/464)
   [aidamanna]
   [aslakhellesoy]
   [spicalous])

## [6.0.1] - 2018-06-14

### Added
* Allow `ParameterType` with no name (`nil`, `null`, `""`). Useful when the
  Parameter Type is only used in conjunction with Regular Expressions.
  ([#387](https://github.com/cucumber/cucumber/issues/387)
   [#410](https://github.com/cucumber/cucumber/pull/410)
   [aslakhellesoy])

### Fixed

* Support empty capture groups.
  ([#404](https://github.com/cucumber/cucumber/issues/404)
   [#411](https://github.com/cucumber/cucumber/pull/411)
   [aslakhellesoy])
* Better error message if a parameter type has a name with one of the characters `()[]$.|?*+`.
  ([#387](https://github.com/cucumber/cucumber/issues/387)
   [#410](https://github.com/cucumber/cucumber/pull/410)
   [aslakhellesoy])

## [6.0.0] - 2018-05-30

### Changed

* Throw an error if a parameter type is used inside optional text parenthesis,
  or with alternative text.
  ([#360](https://github.com/cucumber/cucumber/pull/360)
   [aslakhellesoy])

### Fixed

* Bugfix for nested capture groups.
  ([#375](https://github.com/cucumber/cucumber/issues/375)
   [#380](https://github.com/cucumber/cucumber/pull/380)
   [aslakhellesoy]
   [charlierudolph])

## [5.0.19] - 2018-05-24

### Fixed

* java: Escape closing braces to avoid PatternSyntaxException on Android

## [5.0.18] - 2018-05-21

### Changed

* java: The `{byte}` parameter type no longer uses hexadecimal, but uses the same pattern as `{short}`, `{int}` and `{long}`.

### Fixed

* The `/` character can be escaped with `\/` in order to keep a literal `/` rather
  than interpreting it as alternation character. Generated expressions will use
  `\/` if the original text contains `/`.
  ([#391](https://github.com/cucumber/cucumber/issues/391)
   [#392](https://github.com/cucumber/cucumber/pull/392)
   [aslakhellesoy])

## [5.0.17] - 2018-04-12

### Changed

* java: Swapped 2 parameters in a `ParameterType` constructor to make it consistent with
  overloaded constructors.

## [5.0.16] - 2018-04-12

There are backwards incompatible changes in the Java implementation, but we're
not bumping the minor version number because no released libraries are using
it yet.

### Changed

* java: Renamed `{bigint}` to `{biginteger}` ([mpkorstanje, aslakhellesoy])
* java: The API uses `Transformer` for transforms with 0-1 capture groups,
  and `CaptureGroupTransformer` for 2+ capture groups.

### Fixed

* java: Better error message when users leave anchors (^ and $) in their regular expressions ([aslakhellesoy])
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
[Unreleased]: https://github.com/cucumber/cucumber/compare/cucumber-expressions/v10.2.0...master
[10.2.0]:      https://github.com/cucumber/cucumber/compare/cucumber-expressions/v10.1.0...cucumber-expressions/v10.2.0
[10.1.0]:      https://github.com/cucumber/cucumber/compare/cucumber-expressions/v10.0.0...cucumber-expressions/v10.1.0
[10.0.0]:      https://github.com/cucumber/cucumber/compare/cucumber-expressions/v9.0.0...cucumber-expressions/v10.0.0
[9.0.0]:      https://github.com/cucumber/cucumber/compare/cucumber-expressions/v8.3.1...cucumber-expressions/v9.0.0
[8.3.1]:      https://github.com/cucumber/cucumber/compare/cucumber-expressions/v8.3.0...cucumber-expressions/v8.3.1
[8.3.0]:      https://github.com/cucumber/cucumber/compare/cucumber-expressions/v8.2.1...cucumber-expressions/v8.3.0
[8.2.1]:      https://github.com/cucumber/cucumber/compare/cucumber-expressions/v8.2.0...cucumber-expressions/v8.2.1
[8.2.0]:      https://github.com/cucumber/cucumber/compare/cucumber-expressions/v8.1.0...cucumber-expressions/v8.2.0
[8.1.0]:      https://github.com/cucumber/cucumber/compare/cucumber-expressions/v8.0.2...cucumber-expressions/v8.1.0
[8.0.2]:      https://github.com/cucumber/cucumber/compare/cucumber-expressions/v8.0.1...cucumber-expressions/v8.0.2
[8.0.1]:      https://github.com/cucumber/cucumber/compare/cucumber-expressions/v8.0.0...cucumber-expressions/v8.0.1
[8.0.0]:      https://github.com/cucumber/cucumber/compare/cucumber-expressions/v7.0.2...cucumber-expressions/v8.0.0
[7.0.2]:      https://github.com/cucumber/cucumber/compare/cucumber-expressions/v7.0.0...cucumber-expressions/v7.0.2
[7.0.0]:      https://github.com/cucumber/cucumber/compare/cucumber-expressions-v6.6.2...cucumber-expressions-v7.0.0
[6.6.2]:      https://github.com/cucumber/cucumber/compare/cucumber-expressions-v6.2.3...cucumber-expressions-v6.6.2
[6.2.3]:      https://github.com/cucumber/cucumber/compare/cucumber-expressions-v6.2.2...cucumber-expressions-v6.2.3
[6.2.2]:      https://github.com/cucumber/cucumber/compare/cucumber-expressions-v6.2.1...cucumber-expressions-v6.2.2
[6.2.1]:      https://github.com/cucumber/cucumber/compare/cucumber-expressions-v6.2.0...cucumber-expressions-v6.2.1
[6.2.0]:      https://github.com/cucumber/cucumber/compare/cucumber-expressions-v6.1.2...cucumber-expressions-v6.2.0
[6.1.2]:      https://github.com/cucumber/cucumber/compare/cucumber-expressions-v6.1.0...cucumber-expressions-v6.1.2
[6.1.1]:      https://github.com/cucumber/cucumber/compare/cucumber-expressions-v6.1.0...cucumber-expressions-v6.1.1
[6.1.0]:      https://github.com/cucumber/cucumber/compare/cucumber-expressions-v6.0.1...cucumber-expressions-v6.1.0
[6.0.1]:      https://github.com/cucumber/cucumber/compare/cucumber-expressions-v6.0.0...cucumber-expressions-v6.0.1
[6.0.0]:      https://github.com/cucumber/cucumber/compare/cucumber-expressions-v5.0.18...cucumber-expressions-v6.0.0
[5.0.18]:     https://github.com/cucumber/cucumber/compare/cucumber-expressions-v5.0.17...cucumber-expressions-v5.0.18
[5.0.17]:     https://github.com/cucumber/cucumber/compare/cucumber-expressions-v5.0.16...cucumber-expressions-v5.0.17
[5.0.16]:     https://github.com/cucumber/cucumber/compare/cucumber-expressions-v5.0.15...cucumber-expressions-v5.0.16
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
[aidamanna]:        https://github.com/aslakhellesoy
[aslakhellesoy]:    https://github.com/aslakhellesoy
[brasmusson]:       https://github.com/brasmusson
[charlierudolph]:   https://github.com/charlierudolph
[davidjgoss]:       https://github.com/davidjgoss
[dmeehan1968]:      https://github.com/dmeehan1968
[gaeljw]:          https://github.com/gaeljw
[gpichot]:          https://github.com/gpichot
[jamis]:            https://github.com/jamis
[jaysonesmith]:     https://github.com/jaysonesmith
[lsuski]:           https://github.com/lsuski
[luke-hill]:        https://github.com/luke-hill
[mpkorstanje]:      https://github.com/mpkorstanje
[kAworu]:           https://github.com/kAworu
[savkk]:            https://github.com/savkk
[spicalous]:        https://github.com/spicalous
[tooky]:            https://github.com/tooky
[tommywo]:          https://github.com/tommywo
[vincent-psarga]:   https://github.com/vincent-psarga
[davidjgoss]:       https://github.com/davidjgoss
