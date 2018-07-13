SHELL := /usr/bin/env bash
GOPATH := $(shell go env GOPATH)
GO_SOURCE_FILES = $(shell find . -name "*.go")

default: .linked .tested bin/cucumber-dots

# Symlink this dir to GOPATH
.linked:
	mkdir -p ${GOPATH}/src/github.com/cucumber
	rm -rf ${GOPATH}/src/github.com/cucumber/formatter-dots
	ln -fs ${CURDIR} ${GOPATH}/src/github.com/cucumber/formatter-dots
	touch $@

# Remove symlink
unlink:
	rm -rf .linked ${GOPATH}/src/github.com/cucumber/formatter-dots

.deps:
	go get github.com/fatih/color
	go get github.com/gogo/protobuf/io
	go get github.com/stretchr/testify
	go get github.com/cucumber/cucumber-messages-go
	touch $@

.tested: .linked .deps $(GO_SOURCE_FILES)
	go test
	touch $@

bin/cucumber-dots: .linked .deps $(GO_SOURCE_FILES)
	go build -o $@ ./cli

clean:
	rm -rf .linked .deps .tested
.PHONY: clean
