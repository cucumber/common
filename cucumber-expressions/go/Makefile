SHELL := /usr/bin/env bash
export GOPATH = $(realpath ./lib)

default: test
.PHONY: default

# Use env variable ARGS to pass arguments to 'go test'
#   (for running only a specific test or using verbose mode)
#   Example: ARGS='-v -run TestCucumberExpression' make test
test: lib/src/github.com/stretchr/testify
	go test ${ARGS}
.PHONY: clean

lib/src/github.com/stretchr/testify:
	go get github.com/stretchr/testify

clean:
	rm -rf lib/src lib/pkg
.PHONY: clean
