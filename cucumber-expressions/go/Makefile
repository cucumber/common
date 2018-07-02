SHELL := /usr/bin/env bash
GOPATH := $(shell go env GOPATH)

default: test
.PHONY: default

# Use env variable ARGS to pass arguments to 'go test'
#   (for running only a specific test or using verbose mode)
#   Example: ARGS='-v -run TestCucumberExpression' make test
test: deps
	go test ${ARGS}
.PHONY: clean

deps: ${GOPATH}/src/github.com/stretchr/testify
.PHONY: deps

${GOPATH}/src/github.com/stretchr/testify:
	go get github.com/stretchr/testify

clean:
.PHONY: clean
