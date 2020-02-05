# CHANGE LOG
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

----
## [Unreleased]

### Added
 * [Java] Allow Object and String datatable types to be redefined
    ([#885](https://github.com/cucumber/cucumber/pull/885)
     [mpkorstanje])
### Changed

### Deprecated

### Removed

### Fixed

## [3.2.1] - 2020-01-25

### Fixed
 * [Java] Avoid collisions when converting to maps
     ([#877](https://github.com/cucumber/cucumber/pull/877)
     [mpkorstanje])

## [3.2.0] - 2020-01-10

### Added
 * [Java] Add getter for TableConverter
     ([#853](https://github.com/cucumber/cucumber/pull/853)
     [mpkorstanje])

## [3.1.0] - 2019-12-15

### Fixed
 * [Java] Replace wildcard type with its upper bound
    ([#829](https://github.com/cucumber/cucumber/pull/829)
    [mpkorstanje])

## [3.0.0] - 2019-08-17

### Removed
 * [Java] Remove shaded dependency on Jackson Databind
    ([#682](https://github.com/cucumber/cucumber/pull/682)
    [#679](https://github.com/cucumber/cucumber/issues/679)
    [mpkorstanje])
### Fixed

## [2.0.0] 2019-08-11

### Added
* [Java] Annotate function interfaces with @FunctionalInterface
    ([cucumber/cucumber-jvm#1716](https://github.com/cucumber/cucumber-jvm/issues/1716)
    [mpkorstanje])
* [Java] Mark public api with @API Guardian annotations
    ([cucumber/cucumber-jvm#1536](https://github.com/cucumber/cucumber-jvm/issues/1536)
    [mpkorstanje])        

### Changed
 * Upgrades to `cucumber-parent:2.0.2`
 * Allow `null` values in `DataTable`.
     ([cucumber/cucumber-jvm#1617](https://github.com/cucumber/cucumber-jvm/issues/1617)
     [mpkorstanje])        
 * Improve handling of tables without header ([#540](https://github.com/cucumber/cucumber/pull/540) [mpkorstanje])

### Removed
 * Remove DataTableType convenience methods
     ([cucumber/cucumber-jvm#1643](https://github.com/cucumber/cucumber-jvm/issues/1643)
     [mpkorstanje])    

### Fixed

## [1.1.14] - 2019-06-14

### Fixed
 *  Empty cell are not converted to `null`'s for `Double` class
        ([#1617](https://github.com/cucumber/cucumber-jvm/issues/1617) [gkalnytskyi])

## [1.1.8] - 2018-11-29

### Fixed
* Fix parsing BigDecimal with locale ([#539](https://github.com/cucumber/cucumber/pull/539) [lsuski], [mpkorstanje])

## [1.1.7] - 2018-10-26

### Fixed
* Fix priority of default converters
  ([#514](https://github.com/cucumber/cucumber/pull/514)
   [mpkorstanje])

## [1.1.3] - 2018-07-27

### Added
* Add ability to register default transformers for table cell and entry
  ([#429](https://github.com/cucumber/cucumber/pull/429)
   [lsuski])
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
[Unreleased]: https://github.com/cucumber/cucumber/compare/datatable/v3.2.1...master
[3.2.1]:      https://github.com/cucumber/cucumber/compare/datatable/v3.2.0...datatable/v3.2.1
[3.2.0]:      https://github.com/cucumber/cucumber/compare/datatable/v3.1.0...datatable/v3.2.0
[3.1.0]:      https://github.com/cucumber/cucumber/compare/datatable/v3.0.0...datatable/v3.1.0
[3.0.0]:      https://github.com/cucumber/cucumber/compare/datatable/v2.0.0...datatable/v3.0.0
[2.0.0]:      https://github.com/cucumber/cucumber/compare/datatable/v1.1.14...datatable/v2.0.0
[1.1.14]:     https://github.com/cucumber/cucumber/compare/datatable-v1.1.7...datatable/v1.1.14
[1.1.7]:      https://github.com/cucumber/cucumber/compare/datatable-v1.1.2...datatable-v1.1.7
[1.1.2]:      https://github.com/cucumber/cucumber/compare/datatable-v1.0.3...datatable-v1.1.2
[1.0.3]:      https://github.com/cucumber/cucumber/compare/datatable-v1.0.2...datatable-v1.0.3
[1.0.2]:      https://github.com/cucumber/cucumber/compare/datatable-v1.0.1...datatable-v1.0.2
[1.0.1]:      https://github.com/cucumber/cucumber/compare/datatable-v1.0.0...datatable-v1.0.1
[1.0.0]:      https://github.com/cucumber/cucumber/releases/tag/datatable-v1.0.0

<!-- Contributors in alphabetical order -->
[aslakhellesoy]:    https://github.com/aslakhellesoy
[gkalnytskyi]:      https://github.com/gkalnytskyi
[kuehl]:            https://github.com/kuehl
[lsuski]:           https://github.com/lsuski
[mpkorstanje]:      https://github.com/mpkorstanje
