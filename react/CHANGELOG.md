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

## [12.0.0] - 2021-02-07

### Changed

* Upgrade to gherkin 17.0.0
* Upgrade to messages 14.0.0
* Upgrade to query 8.0.0

### Fixed

* [JavaScript] removed circular dependencies.
  ([#1292](https://github.com/cucumber/cucumber/pull/1292)
   [davidjgoss]
   [aslakhellesoy])
* Fixed search button
  ([#1298](https://github.com/cucumber/cucumber/issues/1298)
   [#1299](https://github.com/cucumber/cucumber/issues/1299)
   [hWorblehat])
* Fixed inability to scroll horizontally in long text attachments

## [11.0.2] - 2020-12-17

### Fixed

* Upgraded `@cucumber/query` (only change is the dropped dependency on `@cucumber/gherkin`)

## [11.0.1] - 2020-12-17

### Fixed

* Fixed `react` and `react-dom` peerDependencies version range from `^16 | ^17` (incorrect) to `~16 || ~17`

## [11.0.0] - 2020-12-17

### Fixed

* Make image and video attachments collapsible; show collapsed by default.
* Prevent images from growing wider than their container.
  ([#1220](https://github.com/cucumber/cucumber/issues/1220)
   [#1205](https://github.com/cucumber/cucumber/issues/1205)
   [#1260](https://github.com/cucumber/cucumber/pull/1260)
   [davidjgoss])
* Markdown rendering of `description` fields are now done with `react-markdown` instead of `marked`.
  This is a more secure [protection agains XSS](https://medium.com/javascript-security/avoiding-xss-via-markdown-in-react-91665479900)
  ([#1275](https://github.com/cucumber/cucumber/issues/1275)
   [#1276](https://github.com/cucumber/cucumber/pull/1276)
   [aslakhellesoy])

## [10.1.2] - 2020-12-13

### Fixed

* Allow `react` and `react-dom` peer dependencies to be `^16 | ^17`.

## [10.1.1] - 2020-11-06

### Fixed

* Replaced `git-url-parse` with our own simpler implementation that doesn't need a browser polyfill.

## [10.1.0] - 2020-11-04

### Added

* Upgrade to React 17
* Upgrade to `@cucumber/gherkin-utils 2.1.0`
* Upgrade to `@cucumber/messages 13.1.0`
* Upgrade to `@cucumber/tag-expressions 3.0.0`
* Upgrade to Storybook 6.0.0

### Fixed

* Fixed typos in some CSS class names

## [10.0.1] - 2020-09-02

### Fixed

* Fix rendering of failed hooks from Cucumber-JVM
  ([#1166](https://github.com/cucumber/cucumber/issues/1166)
   [#1167](https://github.com/cucumber/cucumber/pull/1167)
   [@aslakhellesoy]
   [@sebrose]
   [@cbliard])
* Fix react warnings about rendering `<li>` inside `<li>`
* Updated some class names

## [10.0.0] - 2020-08-08

### Added

* Export all the `*Context` classes

### Changed

* Update `messages` to 13.0.1

### Fixed

* Added missing CSS class on BackgroundTitle anchor link.

## [9.0.0] - 2020-08-07

### Added

* semantic CSS classes on elements.
* expose `filterByStatus` method

### Changed

* fix `filterByStatus` signature

## [8.2.0] - 2020-07-31

### Changed

* Updated `messages` to v12.4.0

## [8.1.0] - 2020-07-30

### Added

* Display visible anchors for headers ([#983](https://github.com/cucumber/cucumber/issues/983))

* Make Duration human readable.

### Fixed

 * Various fixes ([#1111](https://github.com/cucumber/cucumber/pull/1111))
    * better styling
    * enhanced responsivness
    * filtering is now alongside search
    * do not display filter when all scenarios have the same status (except if status is "unknown")

## [8.0.2] - 2020-06-29

### Added

* Expose `<FilteredResults>` in exports so we don't need to reach into `dist`

## [8.0.1] - 2020-06-29

### Fixed

* Make `ansi-to-html` a runtime dependency

## [8.0.0] - 2020-06-29

### Added

* Display execution summary ([#1067](https://github.com/cucumber/cucumber/pull/1067))
* Display failed Hooks and attachments added in Hooks ([#975](https://github.com/cucumber/cucumber/pull/975))
* Use ANSI color to render logs ([#1057](https://github.com/cucumber/cucumber/issues/1057))
* Add search ([#895](https://github.com/cucumber/cucumber/pull/895))

### Changed

* Do not rely on line number to obtain Step or Row status.
* Upgrade internal dependencies

## [7.0.0] - 2020-04-14

### Added

* The `<Attachment>` component can now display the following media types:
  - `image/*`
    - Only base64 content encoding supported
  - `video/*`
    - Only base64 content encoding supported
  - `text/*`
    - Both base64 and identity content encoding supported
  - `application/json`
    - Both base64 and identity content encoding supported
    - JSON is prettified with 2 space indent
  ([#964](https://github.com/cucumber/cucumber/pull/964)
   [#945](https://github.com/cucumber/cucumber/issues/945)
   [aslakhellesoy])

### Changed

* Upgrade to messages 12.0.0
* Upgrade to gherkin 13.0.0

## [6.0.0] - 2020-04-01

### Changed

* Upgrade to messages 11.x
* Image attachment data processing is possibly faster since no `btoa` conversion is needed anymore

### Removed

* Removed `btoa` prop from `<QueriesWrapper>`
* Removed `<Wrapper>`

## [5.1.0] - 2020-03-04

### Added

* Add `<QueriesWrapper>` which allows incrementally updating queries without having
  to rebuild them every time the envelope list is updated. Use this instead of `<Wrapper>`

### Deprecated

* The `<Wrapper>` component is deprecated in favour of `<QueriesWrapper>`.

### Fixed

* Fix a bug in rendering of steps before test cases have been received

## [5.0.0] - 2020-03-02

### Added

* Render Markdown in descriptions
  ([#909](https://github.com/cucumber/cucumber/pull/909)
   [#codemrkay])

### Changed

* Upgrade messages and query

## [4.1.1] - 2020-02-28

### Fixed

* Fix broken 4.1.0 release

## [4.1.0] - 2020-02-28

### Added

* Add compiled stylesheets to package

## [4.0.0] - 2020-02-14

### Added

* Display attachments (`image/*` and `text/*` media types)

### Changed

* Upgraded messages and query

## [3.3.0] - 2020-01-22

### Fixed

* Accordion now displays the aggregated status colour
* Render Examples rows properly
  ([#778](https://github.com/cucumber/cucumber/issues/778)
   [aslakhellesoy])
* Do not highlight placeholders
  ([#826](https://github.com/cucumber/cucumber/issues/826)
   [aslakhellesoy])

## [3.2.0] - 2020-01-10

### Changed

* [JavaScript] changed module name to `@cucumber/react`
* Replace styled-components with external CSS
  ([#839](https://github.com/cucumber/cucumber/pull/839)
   [aslakhellesoy])

## [3.1.0] - 2019-12-10

### Changed

* Render errors in `<pre>`
* Upgrade to cucumber-messages 8.0.0

## [3.0.0] - 2019-11-15

### Changed

* Only display accordion
* Upgrade to cucumber-messages 7.0.0
* Extract lookup logic to cucumber-query 1.0.0

### Removed

* Removed the side nav

## [2.0.1] - 2019-10-18

### Changed

* Upgrade to cucumber-messages 6.0.2

## [2.0.0] - 2019-10-10

* Upgrade to cucumber-messages 6.0.1

## [1.1.0] - 2019-08-29

### Fixed

* Better layout and styling
* Better results aggregation
* Better support for empty/malformed Gherkin documents

## [1.0.0] - 2019-08-23

### Added

* First release

<!-- Releases -->
[Unreleased]: https://github.com/cucumber/cucumber/compare/react/v12.0.0...master
[12.0.0]:      https://github.com/cucumber/cucumber/compare/react/v11.0.2...react/v12.0.0
[11.0.2]:      https://github.com/cucumber/cucumber/compare/react/v11.0.1...react/v11.0.2
[11.0.1]:      https://github.com/cucumber/cucumber/compare/react/v11.0.0...react/v11.0.1
[11.0.0]:      https://github.com/cucumber/cucumber/compare/react/v10.1.2...react/v11.0.0
[10.1.2]:      https://github.com/cucumber/cucumber/compare/react/v10.1.1...react/v10.1.2
[10.1.1]:      https://github.com/cucumber/cucumber/compare/react/v10.1.0...react/v10.1.1
[10.1.0]:      https://github.com/cucumber/cucumber/compare/react/v10.0.1...react/v10.1.0
[10.0.1]:      https://github.com/cucumber/cucumber/compare/react/v10.0.0...react/v10.0.1
[10.0.0]:      https://github.com/cucumber/cucumber/compare/react/v9.0.0...react/v10.0.0
[9.0.0]:      https://github.com/cucumber/cucumber/compare/react/v8.2.0...react/v9.0.0
[8.2.0]:      https://github.com/cucumber/cucumber/compare/react/v8.1.0...react/v8.2.0
[8.1.0]:      https://github.com/cucumber/cucumber/compare/react/v8.0.1...react/v8.1.0
[8.0.1]:      https://github.com/cucumber/cucumber/compare/react/v8.0.0...react/v8.0.1
[8.0.0]:      https://github.com/cucumber/cucumber/compare/react/v7.0.0...react/v8.0.0
[7.0.0]:      https://github.com/cucumber/cucumber/compare/react/v6.0.0...react/v7.0.0
[6.0.0]:      https://github.com/cucumber/cucumber/compare/react/v5.1.0...react/v6.0.0
[5.1.0]:      https://github.com/cucumber/cucumber/compare/react/v5.0.0...react/v5.1.0
[5.0.0]:      https://github.com/cucumber/cucumber/compare/react/v4.1.1...react/v5.0.0
[4.1.1]:      https://github.com/cucumber/cucumber/compare/react/v4.1.0...react/v4.1.1
[4.1.0]:      https://github.com/cucumber/cucumber/compare/react/v4.0.0...react/v4.1.0
[4.0.0]:      https://github.com/cucumber/cucumber/compare/react/v3.3.0...react/v4.0.0
[3.3.0]:      https://github.com/cucumber/cucumber/compare/react/v3.2.0...react/v3.3.0
[3.2.0]:      https://github.com/cucumber/cucumber/compare/cucumber-react/v3.1.0...react/v3.2.0
[3.1.0]:      https://github.com/cucumber/cucumber/compare/cucumber-react/v3.0.0...cucumber-react/v3.1.0
[3.0.0]:      https://github.com/cucumber/cucumber/compare/cucumber-react/v2.0.1...cucumber-react/v3.0.0
[2.0.1]:      https://github.com/cucumber/cucumber/compare/cucumber-react/v2.0.0...cucumber-react/v2.0.1
[2.0.0]:      https://github.com/cucumber/cucumber/compare/cucumber-react/v1.1.0...cucumber-react/v2.0.0
[1.1.0]:      https://github.com/cucumber/cucumber/compare/cucumber-react/v1.0.0...cucumber-react/v1.1.0
[1.0.0]:      https://github.com/cucumber/cucumber/releases/tag/cucumber-react/v1.0.0

<!-- Contributors in alphabetical order -->
[aslakhellesoy]:    https://github.com/aslakhellesoy
[cbliard]:          https://github.com/cbliard
[codemrkay]:        https://github.com/codemrkay
[davidjgoss]:       https://github.com/davidjgoss
[hWorblehat]:       https://github.com/hWorblehat
[sebrose]:          https://github.com/sebrose
