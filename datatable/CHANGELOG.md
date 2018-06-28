# CHANGE LOG
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

----
## [Unreleased]

### Added

* Add `DataTableType#entry(Class)` to easily map tables to `List<SomeClass>`
  ([#408](https://github.com/cucumber/cucumber/pull/408)
   [aslakhellesoy])
* Add `DataTableType#cell(Class)` to easily map cells to `SomeOtherClass`
  ([#408](https://github.com/cucumber/cucumber/pull/408)
   [aslakhellesoy])

### Changed

### Deprecated

### Removed
* java: OSGi support has been removed.
  ([#412](https://github.com/cucumber/cucumber/issues/412)
   [aslakhellesoy])

### Fixed

* java: Use jackson-databind 2.9.6.
  ([#405](https://github.com/cucumber/cucumber/issues/405)
   [aslakhellesoy]
   [kuehl])

## [1.1.2] - 2018-05-29

There are no (1.1.0 and 1.1.1 releases).

### Added

* java: Added `DataTable#diff(DataTable actual)` and `DataTable#unorderedDiff(DataTable actual)`
  so that diffing can be done without Hamcrest matchers. Also exposed `TableDiffer` class.
* java: Moved `DataTableHasTheSameRowsAs` to package `io.cucumber.datatable.matchers`. The old class is
  deprecated.

## [1.0.3] - 2018-05-04

### Fixed

* java: OSGI fixes

## [1.0.2] - 2018-05-04

### Fixed

* java: OSGI fixes

## [1.0.1] - 2018-05-04

### Fixed

* java: OSGI fixes

<!-- Releases -->
[Unreleased]: https://github.com/cucumber/cucumber/compare/datatable-v1.1.2...master
[1.1.2]:      https://github.com/cucumber/cucumber/compare/datatable-v1.0.3...datatable-v1.1.2
[1.0.3]:      https://github.com/cucumber/cucumber/compare/datatable-v1.0.2...datatable-v1.0.3
[1.0.2]:      https://github.com/cucumber/cucumber/compare/datatable-v1.0.1...datatable-v1.0.2
[1.0.1]:      https://github.com/cucumber/cucumber/compare/datatable-v1.0.0...datatable-v1.0.1
[1.0.0]:      https://github.com/cucumber/cucumber/releases/tag/datatable-v1.0.0

<!-- Contributors in alphabetical order -->
[aslakhellesoy]:    https://github.com/aslakhellesoy
[kuehl]:            https://github.com/kuehl
[mpkorstanje]:      https://github.com/mpkorstanje
