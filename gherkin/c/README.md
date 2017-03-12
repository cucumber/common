# Gherkin parser/compiler for C. 

See also [Gherkin](https://github.com/cucumber/gherkin).

## Parsing and generating Gherkin events

`bin/gherkin <feature files> | <utility processing Gherkin events>`

## Building the `gin/gherkin` binary

Build with gcc:
`make cli`

Build with clang:
`make CC=clang cli`

Build with other compilers:
Edit `src/Makefile` and set CC, CC_FLAGS, AR, AR_FLAGS, LD, LD_FLAGS appropriately, then run `make cli`
