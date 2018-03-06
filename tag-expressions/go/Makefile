SHELL := /usr/bin/env bash
export GOPATH = $(realpath ./lib)

default: test
.PHONY: default

test: lib/src/github.com/stretchr/testify
	go test
.PHONY: clean

lib/src/github.com/stretchr/testify:
	go get github.com/stretchr/testify

clean:
	rm -rf lib/src lib/pkg
.PHONY: clean
