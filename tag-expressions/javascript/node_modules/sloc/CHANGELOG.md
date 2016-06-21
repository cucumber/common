# Changelog

## v0.1.10

- new supported languages
  - Assembly
  - Crystal
  - IcedCoffeeScript
  - Jade
  - Mochi
  - Nim
  - Objective-C
  - Objective-C++
  - Ocaml
  - SASS
- fixed problem with coffee-script v1.9.x
- fixed #48
- `cli-table` formatter: group by extension
- add some more extensions like `hxx`, `jsx` etc.

## v0.1.9

- fixed counting empty lines within block comments

## v0.1.8

- new supported languages
    - ClosureScript
    - Hilbert
    - htm,svg,xml as html variants
    - Handlebars
    - Mustache
- syntax alias support (e.g. `sloc -a foo=php5 src/`)

## v0.1.7

- fixed reading empty files
- fixed calculating source lines
- new supported languages
    - Groovy
    - Yaml

## v0.1.6

- added C# support
- use coffee-script 1.8.0
- `package.json´ optimizations

## v0.1.5

- fixed problems with first line comments
- added support for nix

## v0.1.4

- new supported languages
    - Clojure
    - Haskell
    - hy
    - Julia
    - Perl 5
    - R
    - Racket
    - Rust
    - Swift
    - Visual Baisc

## v0.1.3

- new supported languages
    - Ruby
    - TypeScript

## v0.1.2

- added CRLF support
- fixed counting mixed lines
- fixed counting total comments
- new supported languages
    - Scala
    - LiveScript

## v0.1.1

- added Monkey support
- print with colors
- add `--strip-colors` option
- fixed summarize helper method
- fixed path concatenation

## v0.1.0

- changed API (now it has a better readability)
- refactored the algorithm
- relicensed under the MIT license
- support counting mixed lines (comment + source code)
- limit reported numbers by a list of keys
- multiple output formatters
    - csv
    - cli table
    - json
- new supported languages
    - erlang
    - less
    - lua
    - haxe

## v0.0.x

Please run `git log v0.0.1...v0.0.8` ;-)
