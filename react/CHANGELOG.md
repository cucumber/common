# CHANGE LOG
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

----
## [Unreleased]

### Added

### Changed

* Do not rely on line number to obtain Step or Row status.

### Deprecated

### Removed

### Fixed

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
[Unreleased]: https://github.com/cucumber/cucumber/compare/react/v7.0.0...master
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
[codemrkay]:        https://github.com/codemrkay
