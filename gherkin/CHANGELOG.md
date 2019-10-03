# CHANGE LOG

All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](http://semver.org).

This document is formatted according to the principles of [Keep A CHANGELOG](http://keepachangelog.com).

----
## [Unreleased]

### Added

* New keywords for German
  ([#352](https://github.com/cucumber/cucumber/pull/352)
   [#707](https://github.com/cucumber/cucumber/issues/707)
   [#708](https://github.com/cucumber/cucumber/pull/708)
   [coderbyheart]
   [Haukinger])

### Changed

* Upgrade cucumber-messages to 6.0.1
* [JavaScript] restore native JavaScript parser
  ([#709](https://github.com/cucumber/cucumber/pull/709)
   [#689](https://github.com/cucumber/cucumber/pull/689)
   [badeball]
   [aslakhellesoy])
* [Ruby] restore native ruby parser
  ([#702](https://github.com/cucumber/cucumber/pull/702) [brasmusson])

### Deprecated

### Removed

### Fixed

* [Go, Ruby] Fix trimming of whitespace in example cells
  ([#703](https://github.com/cucumber/cucumber/pull/703) [aslakhellesoy])

## [7.0.4] - 2019-08-29

### Changed

* Upgrade to cucumber-messages 5.0.1

## [7.0.3] - 2019-08-15

### Fixed

* [Ruby] Fix inclusion of gherkin executables

## [7.0.2] - 2019-08-14

### Changed

* Upgrade to c21e 2.0.0

## [7.0.1] - 2019-08-14

### Fixed

* The 7.0.0 release failed

## [7.0.0] - 2019-08-14

### Added

* [TypeScript] dialect support
  ([#597](https://github.com/cucumber/cucumber/pull/597)
   [charlierudolph]
   [aslakhellesoy])
* Populate the `Pickle#id` field with a SHA1 hash of the source + line + column.

### Fixed

* [TypeScript] ExeFile not a constructor
  ([#641](https://github.com/cucumber/cucumber/pull/641)
   [#634](https://github.com/cucumber/cucumber/issues/634)
   [joscha])

* [Java,TypeScript] Fix parsing of long documents.
  ([#566](https://github.com/cucumber/cucumber/issues/566)
   [aslakhellesoy])

## [6.0.17] - 2019-03-31

### Changed

* Upgrade to cucumber-messages 2.1.2

## [6.0.15] - 2018-10-31

### Added
* (Go) Executables are uploaded to GitHub releases.

### Fixed
* Fix bug where leading tabs prevented parser from identifying keywords
  ([#512](https://github.com/cucumber/cucumber/pull/512) [VjacheslavVytjagov])
* [JavaScript] Fix JavaScript build
  ([#499](https://github.com/cucumber/cucumber/pull/499)
   [noisygerman])

## [6.0.13] - 2018-09-25

This major release aligns Gherkin with [Example Mapping](https://cucumber.io/blog/2015/12/08/example-mapping-introduction),
a collaborative technique for *designing* scenarios and discovering details
about rules and behaviour.

A new `Rule` keyword has been introduced, and acts as a grouping of one or more
`Example`s - a new synonym for `Scenario`. The `Scenario Outline` keyword can now
be interchanged with the `Scenario` keyword, which makes Gherkin a little less confusing,
especially to beginners. These are the first major change to the
Gherkin grammar in 8 years or so, and we're pretty excited about them. We hope they will
guide people towards thinking of scenarios as *examples of business rules*
rather than a series of form submissions and link clicking. This rule-focused
style engages product owners, and can act as amazing living documentation of your
product. It opens up for the true benefits of BDD - a business-friendly format
for describing and agreeing on software behaviour, and a guide to development.
Developers will code against this spec, and produce better (simpler) software faster.
The software will do what it says on the tin.

The new Gherkin grammar is backwards compatible, meaning that existing Gherkin
documents are still valid.

The library API however is not backwards compatible. It is now a stream-like
API which produces a stream of messages (source, AST and pickle messages).

Internally, each library shells out to a go executable (embedded in the library for all major
OSes and processor architectures), and communicates via STDIN/STDOUT using
[protocol buffers](https://developers.google.com/protocol-buffers/). The rationale
behind this architectural change is to reduce the maintenance burden (a single parser
rather than a dozen), but also to make it quicker and easier to implement a Gherkin
library in a new language. Just generate some protobuf classes/structs and write a
small program that shells out and communicates using those messages.

Our preliminary benchmarks suggest that performance is comparable to the native implementations,
or better. There is a small hit in startup cost, but this is offset against a higher throughput
of the parser.

At the time of this writing Gherkin 6 is nearly integrated in Cucumber-JVM and
Cucumber-Ruby. Integration with Cucumber.js has not started and we would really
welcome some help with that.

The message protocol will continue to evolve to represent runtime information such
as results, parameter types, cucumber expressions and other metadata. This will
make it easier for the community to build plugins for Cucumber. One HTML Gherkin
formatter to rule them all. Statistic plugins and more.

### Added
* (TypeScript) - Added TypeScript definitions (`.d.ts`) for Gherkin.
* Added `Rule` keyword
  ([#250](https://github.com/cucumber/cucumber/issues/250)
   [aslakhellesoy])
* Added `Example` as synonym for `Scenario` in English and many other languages.
  This is to align Gherkin with BDD and Example Mapping terminology.
  ([aslakhellesoy])
* Added `Ukoliko` as an additional synonym for `Given`, in Croatian.
  ([#480](https://github.com/cucumber/cucumber/pull/480)
   [banovotz](https://github.com/banovotz))

### Changed
* (JavaScript,Java,Ruby) The native parsers are removed. Parsing is done by `gherkin-go`
  executables which are bundled with the published libraries.
  ([aslakhellesoy], [jaysonesmith])
* (JavaScript,Java,Ruby,Go) `Scenario` keyword (or `Example` keyword) can be used to create `Scenario Outline`.
  ([#353](https://github.com/cucumber/cucumber/pull/353) [aslakhellesoy])

### Removed
* (Java) OSGi support has been removed.
  ([#412](https://github.com/cucumber/cucumber/issues/412)
   [aslakhellesoy])

### Fixed

* (JavaScript) Fix ability to pass language to parser.
  ([#401](https://github.com/cucumber/cucumber/pull/401)
   [charlierudolph])

## [5.1.0] - 2018-05-30

### Added
* (.NET) - Better .NET Core support
* Support for Aragonese
  ([#298](https://github.com/cucumber/cucumber/pull/298)
   [danilat])
* (C) build a shared `libgherkin.so` library which allows Gherkin to be used
  as a library. (Cucumber.ml currently uses this.)
  ([cucumber/gherkin-c#6](https://github.com/cucumber/gherkin-c/pull/6)
   [cyocum])

### Changed
* Pass the content type of a docstring down into its pickle string form
  ([#292](https://github.com/cucumber/cucumber/pull/292)
   [rjwittams])
* Fixed Russian equivalents of `Given` and `Then`. ([#369](https://github.com/cucumber/cucumber/pull/369) [cerebellum13](https://github.com/cerebellum13))

### Fixed

* (C) Segfault when file does not exist
  ([#394](https://github.com/cucumber/cucumber/issues/394)
   [#395](https://github.com/cucumber/cucumber/pull/395)
   [cyocum])
* (JavaScript)
  ([#374](https://github.com/cucumber/cucumber/issues/374)
   [#377](https://github.com/cucumber/cucumber/pull/377)
   [charlierudolph])
* (Ruby, JavaScript) Remove berp.exe from packages
  ([#289](https://github.com/cucumber/cucumber/issues/289)
   [aslakhellesoy])
* (Go) fixes validation for go vet tool on latest versions
  ([#330](https://github.com/cucumber/cucumber/pull/330)
   [l3pp4rd])
* (Ruby) removed unneeded files from the gem

## [5.0.0] - 2017-10-13

### Added
* Ability to specify an initial language for the parser, so that the `# language` header isn't required
  ([#288](https://github.com/cucumber/cucumber/pull/288)
   by [charlierudolph] and [aslakhellesoy])
* A better wording for the Greek translation of `Scenario Outline` (`Περίγραμμα Σεναρίου`)
  ([#185](https://github.com/cucumber/cucumber/pull/185) by [pmatsinopoulos])
* Added female, singular `Given` in Romanian (`Dată fiind`)
  ([#202](https://github.com/cucumber/cucumber/pull/202) by [tsundberg])
* (C) CMake support
  ([#2](https://github.com/cucumber/gherkin-c/issues/2)
   [#3](https://github.com/cucumber/gherkin-c/pull/3)
   by [Pwera])

### Changed
* Compile empty scenarios to empty pickles
  ([#249](https://github.com/cucumber/cucumber/issues/249)
   [#264](https://github.com/cucumber/cucumber/pull/264)
   by [brasmusson])

## [4.1.3] - 2017-05-04

### Added
* (Go) Implement CLI
  ([#145](https://github.com/cucumber/cucumber/issues/145)
   [#162](https://github.com/cucumber/cucumber/pull/162)
   by [l3pp4rd])

### Fixed
* (JavaScript) Fix gherkin/javascript/examples so Gherkin loads in browser
  ([#197](https://github.com/cucumber/cucumber/pull/197)
   by [aslakhellesoy])
* (JavaScript) Don't depend on fs in the library
  ([#196](https://github.com/cucumber/cucumber/pull/196)
   by [aslakhellesoy])
* (Python) Fix executable
  ([#194](https://github.com/cucumber/cucumber/pull/194)
   [#157](https://github.com/cucumber/cucumber/issues/157)
   by [aslakhellesoy])
* (C) Fix Windows related issues
  ([#193](https://github.com/cucumber/cucumber/pull/193)
   [#168](https://github.com/cucumber/cucumber/issues/168)
   by [brasmusson])
* (C) Fix `uri` in pickles on C command line
  ([#176](https://github.com/cucumber/cucumber/pull/176)
   [#165](https://github.com/cucumber/cucumber/issues/165)
   by [brasmusson])
* (Go) Add missing error handling
  ([#170](https://github.com/cucumber/cucumber/pull/170)
   by [l3pp4rd])
* (Go) Fix build on go 1.8
  ([#137](https://github.com/cucumber/cucumber/issues/137)
   [#162](https://github.com/cucumber/cucumber/pull/162)
   by [l3pp4rd])
* (Python) Fix build on python 3.4
  ([#138](https://github.com/cucumber/cucumber/issues/138)
   [#158](https://github.com/cucumber/cucumber/pull/158)
   by [brasmusson])

## [4.1.2] - 2017-05-03
Something went wrong during this release - do not use

## [4.1.1] - 2017-03-16

### Added
* (JavaScript, Ruby, Python) Packages include executabled.
  ([#155](https://github.com/cucumber/cucumber/pull/155)
   by [aslakhellesoy])

### Fixed
* (Python) Python package 4.1.0 broken
  ([#153](https://github.com/cucumber/cucumber/issues/153)
   [#156](https://github.com/cucumber/cucumber/pull/156)
   by [aslakhellesoy])

## [4.1.0] - 2017-03-16

### Added
* (.NET, Java, JavaScript, Ruby, Python) Streaming API and command line client.
  ([#240](https://github.com/cucumber/gherkin/pull/240))
* (Java): Add accessors for languages and dialect keywords.
  ([#248](https://github.com/cucumber/gherkin/pull/248)
   by [brasmusson])
* (All): Add the language to the Pickles
  ([#251](https://github.com/cucumber/gherkin/pull/251)
   by [brasmusson])
* (C): New parser and compiler in C
  ([#187](https://github.com/cucumber/gherkin/pull/187)
   by [brasmusson])
* (I18n) mk-Cyrl/mk-Latn: Added Macedonian language
  ([#249](https://github.com/cucumber/gherkin/pull/249)
   by [nikolovski])
* (Build) Automate the version update for the sub-projects
  ([#211](https://github.com/cucumber/gherkin/pull/211)
   by [brasmusson])
* (Java) Make the jar a bundle to support execution in OSGi containers
  ([#221](https://github.com/cucumber/gherkin/pull/221)
   by [brasmusson])
* (Java) Using full path when loading gherkin-languages.json
  ([#225](https://github.com/cucumber/gherkin/pull/225)
   by [mauriciotogneri])
* (I18n) ru: Added word "Затем" as a synonym for when steps
  ([#246](https://github.com/cucumber/gherkin/pull/246)
   by [dobiedad])
* (I18n) Georgian language
  ([#218](https://github.com/cucumber/gherkin/pull/239)
   by [Pr-Mex])
* (I18n) nl: Added "Wanneer" as a synonym for when steps
  ([#218](https://github.com/cucumber/gherkin/pull/241)
   by [jmezach])
* (I18n) ast: Add Asturian translation
  ([#209](https://github.com/cucumber/gherkin/pull/209)
   by [ajspadial])
* (I18n) az: Add Azerbaijani translation
  ([#218](https://github.com/cucumber/gherkin/pull/218)
   by [nalekberov])
* (Java) Add a getter for the tags of a pickle
   by [brasmusson])

### Changed
* Gherkin has moved from [cucumber/gherkin](https://github.com/cucumber/gherkin) to the [cucumber/cucumber](https://github.com/cucumber/cucumber) monorepo
* (.NET) Migrated code to .NET Core
  ([#215](https://github.com/cucumber/gherkin/pull/215)
   by [SabotageAndi])
* (I18n) Russian translation fix
  ([#255](https://github.com/cucumber/gherkin/pull/255)
   by [ehpc])

### Fixed
* (Javascript) Check for module before window
  ([#204](https://github.com/cucumber/gherkin/pull/204)
   by [charlierudolph])

## [4.0.0] - 2016-04-10

This is a major release because of two backwards-incompatible changes.

First, the AST returned by the parser is a `GherkinDocument` node, with a `feature`
property pointing to a `Feature` node. Prior to this release the parser would return
a `Feature` node.

Second, the `Feature` node now has an array/list of `children` that are `Background`,
`Scenario` or `ScenarioOutline`.

Other noteworthy changes is several minor improvements to bring the grammar closer
to Gherkin 2.

### Removed
* (JavaScript) Remove bower package
   by [aslakhellesoy])

### Added
* (JavaScript) Expose dialects
  ([#177](https://github.com/cucumber/gherkin/pull/177)
   by [charlierudolph])
* (Perl) new implementation!
  ([#161](https://github.com/cucumber/gherkin/pull/161)
   by [pjlsergeant])
* (Objective-C) Added Objective-C example to the README
  ([#152](https://github.com/cucumber/gherkin/pull/152)
   by [Ahmed-Ali])
* (I18n) ru: Add "Функциональность" as translation of Feature
  ([#165](https://github.com/cucumber/gherkin/pull/165)
   by [nixel2007])

### Changed
* (All) Allow emtpy Feature files
  ([#189](https://github.com/cucumber/gherkin/pull/189)
  by [aslakhellesoy], [brasmusson], [enkessler])
* (All) Rename Feature.scenarioDefinitions to Feature.children
  (by [aslakhellesoy])
* (All) Background as part of Feature.children
  ([#174](https://github.com/cucumber/gherkin/pull/174)
   by [aslakhellesoy])
* (All) Remove scenario keyword from pickles
  ([#176](https://github.com/cucumber/gherkin/pull/176)
   by [charlierudolph])
* (All) Don't make pickles out of step-less scenarios
  ([#175](https://github.com/cucumber/gherkin/pull/175)
   by [enkessler])
* (Ruby) More consistent AST node types
  ([#158](https://github.com/cucumber/gherkin/pull/158)
   by [enkessler])
* (All) Allow incomplete scenario outlines
  ([#160](https://github.com/cucumber/gherkin/pull/160),
   [#170](https://github.com/cucumber/gherkin/pull/170)
   by [brasmusson])

### Fixed
* (Ruby) Use require instead of require_relative
  ([#173](https://github.com/cucumber/gherkin/pull/173)
   by [maximeg])
* (JavaScript) Fixed undefined reference to stopOnFirstError on ES6
  (by [aslakhellesoy])
* (Python) Add the `gherkin.pickles` package to the Python installation
  ([#157](https://github.com/cucumber/gherkin/pull/157),
   [#156](https://github.com/cucumber/gherkin/issues/156)
   by [Zearin])
* (Ruby, Java) Make parser work even when system encoding ($LANG) is not UTF-8.
  ([#151](https://github.com/cucumber/gherkin/issues/151)
   by [aslakhellesoy])

## [3.2.0] - 2016-01-12

### Added
* (I18n) Mongolian translation of Gherkin
  ([#140](https://github.com/cucumber/gherkin/pull/140)
   by [jargalan])
* (I18n) Emoji translation of Gherkin
  (by [aslakhellesoy])
* (Python) Implemented compiler
  ([#124](https://github.com/cucumber/gherkin/pull/124)
   by [Zearin])
* (Objective C) New implementation
  ([#110](https://github.com/cucumber/gherkin/pull/110)
   by [LiohAu])

### Changed
* (All) changed package/module/repo name from `gherkin3` to `gherkin`. (Python package is called `gherkin-official`)
* (I18n) Improved Malay translation of Gherkin
  ([#132](https://github.com/cucumber/gherkin/pull/132)
   by [gabanz])
* (I18n) Improved Irish translation of Gherkin
  ([#135](https://github.com/cucumber/gherkin/pull/135)
   by [merrua])
* (All) Escape only '|', 'n' and '\' in table cells
  ([#114](https://github.com/cucumber/gherkin/pull/114)
   by [brasmusson])
* (I18n) Support stricter French grammar
  ([#134](https://github.com/cucumber/gherkin/pull/134)
   by [moreau-nicolas])
* (All) the AST's `DocString` `contentType` property is not defined rather than
  an empty string when the Gherkin doc doesn't specify the type after three backticks.
  (by [aslakhellesoy])

### Fixed
* (Python) Fix i18n support when parsing features from strings.
  (by [brasmusson])
* (All) Do not change escaped docstring separators in descriptions
  ([#115](https://github.com/cucumber/gherkin/pull/115)
   by [brasmusson])
* (Travis CI) Build Objective-C on Travis. Fix Travis language settings.
  ([#122](https://github.com/cucumber/gherkin/pull/122),
   [#118](https://github.com/cucumber/gherkin/issues/118),
   by [brasmusson])
* (Python) Don't monkey-patch `io.StringIO` in `token_scanner.py`
  ([#121](https://github.com/cucumber/gherkin/pull/121)
   by [zbmott])
* (JavaScript) Interpolate replaces globally
  ([#108](https://github.com/cucumber/gherkin/pull/108)
   by [charlierudolph])
* (JavaScript)  Make parser work on Node 0.10 and 4.1
  (by [aslakhellesoy])
* (Go) Fix lookahead bug in the parser
  (by [brasmusson])

## [3.1.2] - 2015-10-04

### Added
* (All) `TokenMatcher` now accepts a default language
  (previously, only JavaScript had this behavior)
  ([#78](https://github.com/cucumber/gherkin/issues/78)
   by [brasmusson])
* (Ruby) `Parser.parse` now accepts a `String`, `StringIO`, `IO` or `TokenScanner`
  ([#100](https://github.com/cucumber/gherkin/pull/100)
   by [maxmeyer])
* (JavaScript) Add browserified `dist/gherkin.js` and `dist/gherkin.min.js`
  (by [aslakhellesoy])

### Changed
* (Python) Use `@properties` in `Dialect` class
  ([#86](https://github.com/cucumber/gherkin/pull/86)
   by [Zearin])
* (Ruby) `Parser.parse` now treats `String` as source (not a file path)

### Fixed
* (Ruby) Fix lookahead bug in the parser
  ([#104](https://github.com/cucumber/gherkin/issues/104)
   by [brasmusson]
   and [aslakhellesoy])
* (Python) Fix file parsing on Windows
  ([#93](https://github.com/cucumber/gherkin/issues/93)
   by [brasmusson])

## [3.1.1] - 2015-09-03

### Added
* (All) Add Bosnian
  ([#48](https://github.com/cucumber/gherkin/pull/48)
   by [paigehf])
* (All) Add support for `\n`, '\|', and '\\' in table cells
  ([#40](https://github.com/cucumber/gherkin/issues/40),
   [#71](https://github.com/cucumber/gherkin/pull/71),
   by [koterpillar])
* (JavaScript)  Default arguments for `Parser(builder)` and `Parser.parse(scanner, matcher)`
  (by [aslakhellesoy])
* (JavaScript) It's now possible to pass a string directly to `Parser.parse()`
* (Python) It's now possible to pass a string directly to `Parser.parse()`
  (by [aslakhellesoy])

### Changed
* (Java) Improved build process
* (Python) Use new-style classes
  ([#72](https://github.com/cucumber/gherkin/pull/72)
   by [Zearin])

### Fixed
* (Python) File descriptors are now explicitly closed
  ([#74](https://github.com/cucumber/gherkin/pull/74)
   by [Zearin])

## [3.1.0] - 2015-08-16

### Removed
* (JavaScript) Remove `tea-error` dependency

### Added
* (.NET) Release Nuget package
  ([#57](https://github.com/cucumber/gherkin/issues/57),
   [#58](https://github.com/cucumber/gherkin/issues/58))

### Changed
* (Java) Change Maven `groupId` artifact from `info.cukes` to `io.cucumber`

### Fixed
* (All) Multiple calls to `parse()` cannot use the same instance of `AstBuilder`
  ([#62](https://github.com/cucumber/gherkin/issues/62))
* (Python) `gherkin-languages.json` not packaged
  ([#63](https://github.com/cucumber/gherkin/issues/63))


## 3.0.0 - 2015-07-16

* First release

<!-- Releases -->
[Unreleased]: https://github.com/cucumber/cucumber/compare/gherkin/v7.0.4...master
[7.0.4]:     https://github.com/cucumber/cucumber/compare/gherkin/v7.0.3...gherkin/v7.0.4
[7.0.3]:     https://github.com/cucumber/cucumber/compare/gherkin/v7.0.2...gherkin/v7.0.3
[7.0.2]:     https://github.com/cucumber/cucumber/compare/gherkin/v7.0.1...gherkin/v7.0.2
[7.0.1]:     https://github.com/cucumber/cucumber/compare/gherkin/v7.0.0...gherkin/v7.0.1
[7.0.0]:     https://github.com/cucumber/cucumber/compare/gherkin/v6.0.17...gherkin/v7.0.0
[6.0.17]:     https://github.com/cucumber/cucumber/compare/gherkin-v6.0.15...gherkin/v6.0.17
[6.0.15]:     https://github.com/cucumber/cucumber/compare/gherkin-v6.0.14...gherkin/v6.0.15
[6.0.14]:     https://github.com/cucumber/cucumber/compare/gherkin-v6.0.13...gherkin/v6.0.14
[6.0.13]:     https://github.com/cucumber/cucumber/compare/gherkin-v5.1.0...gherkin/v6.0.13
[5.1.0]:      https://github.com/cucumber/cucumber/compare/gherkin-v5.0.0...gherkin-v5.1.0
[5.0.0]:      https://github.com/cucumber/cucumber/compare/gherkin-v4.1.3...gherkin-v5.0.0
[4.1.3]:      https://github.com/cucumber/cucumber/compare/gherkin-v4.1.2...gherkin-v4.1.3
[4.1.2]:      https://github.com/cucumber/cucumber/compare/gherkin-v4.1.1...gherkin-v4.1.2
[4.1.1]:      https://github.com/cucumber/cucumber/compare/gherkin-v4.1.0...gherkin-v4.1.1
[4.1.0]:      https://github.com/cucumber/cucumber/tree/gherkin-v4.1.0
[4.0.0]:      https://github.com/cucumber/gherkin/compare/v3.2.0...v4.0.0
[3.2.0]:      https://github.com/cucumber/gherkin/compare/v3.1.2...v3.2.0
[3.1.2]:      https://github.com/cucumber/gherkin/compare/v3.1.1...v3.1.2
[3.1.1]:      https://github.com/cucumber/gherkin/compare/v3.1.0...v3.1.1
[3.1.0]:      https://github.com/cucumber/gherkin/compare/v3.0.0...v3.1.0

<!-- Contributors -->
[Ahmed-Ali]:        https://github.com/Ahmed-Ali
[ajspadial]:        https://github.com/ajspadial
[aslakhellesoy]:    https://github.com/aslakhellesoy
[badeball]:         https://github.com/badeball
[brasmusson]:       https://github.com/brasmusson
[charlierudolph]:   https://github.com/charlierudolph
[coderbyheart]:     https://github.com/coderbyheart
[cyocum]:           https://github.com/cyocum
[danilat]:          https://github.com/danilat
[dobiedad]:         https://github.com/dobiedad
[ehpc]:             https://github.com/ehpc
[enkessler]:        https://github.com/enkessler
[gabanz]:           https://github.com/gabanz
[Haukinger]:        https://github.com/Haukinger
[jargalan]:         https://github.com/jargalan
[jmezach]:          https://github.com/jmezach
[joscha]:           https://github.com/joscha
[koterpillar]:      https://github.com/koterpillar
[l3pp4rd]:          https://github.com/l3pp4rd
[LiohAu]:           https://github.com/LiohAu
[mauriciotogneri]:  https://github.com/mauriciotogneri
[maximeg]:          https://github.com/maximeg
[maxmeyer]:         https://github.com/maxmeyer
[merrua]:           https://github.com/merrua
[moreau-nicolas]:   https://github.com/moreau-nicolas
[nalekberov]:       https://github.com/nalekberov
[nixel2007]:        https://github.com/nixel2007
[nikolovski]:       https://github.com/nikolovski
[noisygerman]:      https://github.com/noisygerman
[paigehf]:          https://github.com/paigehf
[pjlsergeant]:      https://github.com/pjlsergeant
[pmatsinopoulos]:   https://github.com/pmatsinopoulos
[rjwittams]:        https://github.com/rjwittams
[Pr-Mex]:           https://github.com/Pr-Mex
[Pwera]:            https://github.com/Pwera
[SabotageAndi]:     https://github.com/SabotageAndi
[tsundberg]:        https://github.com/tsundberg
[zbmott]:           https://github.com/zbmott
[Zearin]:           https://github.com/Zearin
