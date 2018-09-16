SHELL := /usr/bin/env bash
ALPINE := $(shell which apk 2> /dev/null)
GOPATH := $(shell go env GOPATH)
PATH := $(PATH):$(GOPATH)/bin
GO_SOURCE_FILES = $(shell find . -name "*.go")

SUBREPO := $(shell cat .subrepo)
LIBNAME := $(shell cat .subrepo | cut -d'/' -f2)
GOX_LDFLAGS := "-X main.version=${TRAVIS_TAG}"
EXES := $(shell find dist -name '$(LIBNAME)-*')
UPX_EXES = $(patsubst dist/$(LIBNAME)-%,dist_compressed/$(LIBNAME)-%,$(EXES))
IN_GOPATH := $(shell [[ "$$(pwd)" == ${GOPATH}/* ]] && echo 1 || echo 0)
ifeq ($(IN_GOPATH), 0)
.deps: .linked
endif

default: .gofmt .tested
.PHONY: default

ifneq (,$(wildcard ./cli))
ifndef ALPINE
# Cross-compile executables if there is a CLI. Disabled on Alpine Linux builds
# (monorepo build in Docker) where cross compilation fails for certain platforms.
# Subrepo builds don't run in Docker/Alpine, so cross compile will happen there.
default: .dist
endif
endif

.dist: .deps dist/$(LIBNAME)-darwin-amd64
	touch $@

dist/$(LIBNAME)-%: $(GO_SOURCE_FILES)
	mkdir -p dist
	gox -ldflags $(GOX_LDFLAGS) -output "dist/$(LIBNAME)-{{.OS}}-{{.Arch}}" -rebuild ./cli

.dist-compressed: $(UPX_EXES)
	touch $@

dist_compressed/$(LIBNAME)-%: dist/$(LIBNAME)-%
	mkdir -p dist_compressed
	# requires upx in PATH to compress supported binaries
	# may produce an error ARCH not supported
	-upx $< -o $@

	# Test the integrity
	if [ -f "$@" ]; then upx -t $@ || rm $@; fi

# Symlink this dir to GOPATH
.linked:
	mkdir -p $$(dirname ${GOPATH}/src/github.com/${SUBREPO})
	rm -rf ${GOPATH}/src/github.com/${SUBREPO}
	ln -fs ${CURDIR} ${GOPATH}/src/github.com/${SUBREPO}
	touch $@

# Remove symlink
unlink:
	rm -rf .linked ${GOPATH}/src/github.com/${SUBREPO}

.gofmt: $(GO_SOURCE_FILES)
	gofmt -w $^
	touch $@

# Use env variable ARGS to pass arguments to 'go test'
#   (for running only a specific test or using verbose mode)
#   Example: ARGS='-v -run TestCucumberExpression' make test
.tested: .deps $(GO_SOURCE_FILES)
	go test ${ARGS}
	touch $@

clean: clean-go
.PHONY: clean

clean-go:
	rm -rf .deps .linked .tested dist/* dist_compressed
.PHONY: clean-go
