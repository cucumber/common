SHELL := /usr/bin/env bash
GOPATH := $(shell go env GOPATH)

default: test
.PHONY: default

link: ${GOPATH}/src/github.com/cucumber/cucumber-expressions-go
.PHONY: link

${GOPATH}/src/github.com/cucumber/cucumber-expressions-go:
	mkdir -p ${GOPATH}/src/github.com/cucumber
	rm -rf ${GOPATH}/src/github.com/cucumber/cucumber-expressions-go
	ln -fs ${CURDIR} ${GOPATH}/src/github.com/cucumber/cucumber-expressions-go

# Use env variable ARGS to pass arguments to 'go test'
#   (for running only a specific test or using verbose mode)
#   Example: ARGS='-v -run TestCucumberExpression' make test
test: deps link
	go test ${ARGS}
.PHONY: clean

deps: ${GOPATH}/src/github.com/stretchr/testify
.PHONY: deps

${GOPATH}/src/github.com/stretchr/testify:
	go get github.com/stretchr/testify

clean:
.PHONY: clean
