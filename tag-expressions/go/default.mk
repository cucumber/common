SHELL := /usr/bin/env bash
GOPATH := $(shell go env GOPATH)
GO_SOURCE_FILES = $(shell find . -name "*.go")

SUBREPO := $(shell cat .subrepo)
IN_GOPATH := $(shell [[ "$$(pwd)" == ${GOPATH}/* ]] && echo 1 || echo 0)
ifeq ($(IN_GOPATH), 0)
.deps: .linked
endif

default: .tested
.PHONY: default

# Symlink this dir to GOPATH
.linked:
	mkdir -p $$(dirname ${GOPATH}/src/github.com/${SUBREPO})
	rm -rf ${GOPATH}/src/github.com/${SUBREPO}
	ln -fs ${CURDIR} ${GOPATH}/src/github.com/${SUBREPO}
	touch $@

# Remove symlink
unlink:
	rm -rf .linked ${GOPATH}/src/github.com/${SUBREPO}

# Use env variable ARGS to pass arguments to 'go test'
#   (for running only a specific test or using verbose mode)
#   Example: ARGS='-v -run TestCucumberExpression' make test
.tested: .deps $(GO_SOURCE_FILES)
	go test ${ARGS}
	touch $@

clean: clean-go
.PHONY: clean

clean-go:
	rm -f .deps .linked .tested
.PHONY: clean-go
