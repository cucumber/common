# Cucumber code names

This document shows all major versions of Cucumber and their support for each platform.
A major version of Cucumber comprises certain number of feature and is named after a cucumber variety.

The most recent code names shows on top.

For each code name, the tables show the support for all languages:
 - :x: - the support of the library is not started for the platform
 - :construction: - the library is supported on the master branch or release candidate
 - :white_check_mark: - there is a stable release supporting the library


# Release constraints

 - a final release **must** implement at least one of the required features

# Puzzles

Do we define what goes into an API release retrospectively after making a major platform release? Then that becomes the
standard for the other platforms.

# Cucumber Cobra (draft)

## Features

* `protobuf` results formatter

## Support

| Dependencies | Description | Cucumber-JVM | Cucumber-Ruby | Cucumber-JS | SpecFlow |
|--------------|-------------|--------------|---------------|-------------|----------|
| `Gherkin` 8.0 - 8.2            | `Rule` keyword                                  | :x: | :x: | :x: | :x: |
| `cucumber-messages` 6.0 - 6.3  | Data structure from `protobuf` (ast and pickle) | :x: | :x: | :x: | :x: |
|                                | `protobuf` formatter                            | :x: | :x: | :x: | :x: |
| **Latest release**             | |  | | | |
| **Release candidate**          | |  | | | |


# Cucumber burpless - Q4 2019

## Features

 * `Rule` keyword
 * protobuf output

## Support

| Dependencies | Description | Cucumber-JVM | Cucumber-Ruby | Cucumber-JS | SpecFlow |
|--------------|-------------|--------------|---------------|-------------|----------|
| `Gherkin` 8.0 - 8.2            | `Rule` keyword                                  | :x: | :construction: | :x: | :x: |
| `cucumber-messages` 6.0 - 6.3  | Data structure from `protobuf` (ast and pickle) | :x: | :x: | :x: | :x: |
|                                | `protobuf` formatter                            | :x: | :x: | :x: | :x: |
| **Latest release**             | |  | | | |
| **Release candidate**          | |  | 4.0.0rc1 | | |


# Cucumber Arola - 2018

## Features

## Support

| Dependencies | Description | Cucumber-JVM | Cucumber-Ruby | Cucumber-JS | SpecFlow |
|--------------|-------------|--------------|---------------|-------------|----------|
| `Gherkin` 5  |              | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| **Latest release**             | | 5.0.0 (2019/11/3) | 3.2.4 (2019/10/1) | 6.0.0 (2019/10/4) | 4.1.4 (2019/10/7)|
