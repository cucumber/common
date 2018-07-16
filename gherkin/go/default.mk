SHELL := /usr/bin/env bash
GOPATH := $(shell go env GOPATH)
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

ifneq (,$(wildcard ./cli))
default: .dist
endif

default: .tested
.PHONY: default

.dist: .deps
	mkdir -p dist
	gox -ldflags $(GOX_LDFLAGS) -output "dist/$(LIBNAME)-{{.OS}}-{{.Arch}}" -rebuild ./cli
	touch $@

dist/$(LIBNAME)-%: .dist

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
