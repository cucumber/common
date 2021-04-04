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

## [4.0.0] - 2021-03-29

### Changed

* Upgrade messages to 15.0.0

## [3.0.0] - 2021-02-09

### Changed

* Upgrade messages to 14.0.1

## [2.0.4] - 2020-10-29

### Fixed

* Handle null values in ci dict
  ([#1228](https://github.com/cucumber/cucumber/issues/1228)
   [#1229](https://github.com/cucumber/cucumber/pull/1229)
   [kgeilmann])

## [2.0.2] - 2020-09-03

### Security fixes

* remove credentials in git remote [#1168](https://github.com/cucumber/cucumber/pull/1168)

## [2.0.1] - 2020-08-18

### Fixed

* Ruby: Add the ci property to meta message

## [2.0.0] - 2020-08-07

### Changed

* Update `messages` to 13.0.1

### Fixed

* Java: Use `java.vm.name` instead of `java.vendor` (which is `N/A` on OpenJDK)
* Java: Use `java.vm.version` instead of `java.version`
* Support GitHub Enterprise by using `GITHUB_SERVER_URL` to construct URLs

## [1.2.0] - 2020-07-31

### Changed

* Updated `messages` to v12.4.0

## [1.1.0] - 2020-07-30

### Changed

* Updated `messages` to v12.3.2

## [1.0.0] - 2020-06-29

### Added

* First release

<!-- Releases -->
[Unreleased]: https://github.com/cucumber/cucumber/compare/create-meta/v4.0.0...master
[4.0.0]:      https://github.com/cucumber/cucumber/compare/create-meta/v3.0.0...create-meta/v4.0.0
[3.0.0]:      https://github.com/cucumber/cucumber/compare/create-meta/v2.0.4...create-meta/v3.0.0
[2.0.4]:      https://github.com/cucumber/cucumber/compare/create-meta/v2.0.2...create-meta/v2.0.4
[2.0.2]:      https://github.com/cucumber/cucumber/compare/create-meta/v2.0.1...create-meta/v2.0.2
[2.0.1]:      https://github.com/cucumber/cucumber/compare/create-meta/v2.0.0...create-meta/v2.0.1
[2.0.0]:      https://github.com/cucumber/cucumber/compare/create-meta/v1.2.0...create-meta/v2.0.0
[1.2.0]:      https://github.com/cucumber/cucumber/compare/create-meta/v1.1.0...create-meta/v1.2.0
[1.1.0]:      https://github.com/cucumber/cucumber/compare/create-meta/v1.0.0...create-meta/v1.1.0
[1.0.0]:      https://github.com/cucumber/cucumber/releases/tag/create-meta/v1.0.0

<!-- Contributors in alphabetical order -->
[aslakhellesoy]:    https://github.com/aslakhellesoy
[kgeilmann]:        https://github.com/kgeilmann
[vincent-psarga]:   https://github.com/vincent-psarga
