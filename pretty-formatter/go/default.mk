SHELL := /usr/bin/env bash
ALPINE := $(shell which apk 2> /dev/null)
GOPATH := $(shell go env GOPATH)
PATH := $(PATH):$(GOPATH)/bin
GO_SOURCE_FILES := $(shell find . -name "*.go" | sort)
LIBNAME := $(shell basename $$(dirname $$(pwd)))
GOX_LDFLAGS := "-X main.version=${CIRCLE_TAG}"
EXES := $(shell find dist -name '$(LIBNAME)-*')
UPX_EXES = $(patsubst dist/$(LIBNAME)-%,dist_compressed/$(LIBNAME)-%,$(EXES))
# Determine if we're on linux or osx (ignoring other OSes as we're not building on them)
OS := $(shell [[ "$$(uname)" == "Darwin" ]] && echo "darwin" || echo "linux")
# Determine if we're on 386 or amd64 (ignoring other processors as we're not building on them)
ARCH := $(shell [[ "$$(arch)" == "x86_64" ]] && echo "amd64" || echo "386")
EXE = dist/$(LIBNAME)-$(OS)-$(ARCH)

default: .gofmt .tested
.PHONY: default

# Run the .dist target if there is a main file
ifneq (,$(wildcard ./cmd/main.go))
default: .dist
endif

.deps:
	touch $@

## TODO: Dynamically detect OS/arch using uname and arch (and a bit of regexp)
## TODO: Always place the gherkin exe in dist (and not in bin)
.dist: $(EXE)
	touch $@

$(EXE): .deps $(GO_SOURCE_FILES)
	mkdir -p dist
ifndef ALPINE
	# Cross-compile executable for many platforms if we're not running on Alpine (Docker)
	# where cross-compilation doesn't work. 
	go get github.com/aslakhellesoy/gox
	gox -ldflags $(GOX_LDFLAGS) -output "dist/$(LIBNAME)-{{.OS}}-{{.Arch}}" -rebuild ./cmd
endif
ifdef ALPINE
	go build -ldflags $(GOX_LDFLAGS) -o $@ ./cmd
endif

.dist-compressed: $(UPX_EXES)
	touch $@

dist_compressed/$(LIBNAME)-%: dist/$(LIBNAME)-%
	mkdir -p dist_compressed
	# requires upx in PATH to compress supported binaries
	# may produce an error ARCH not supported
	-upx $< -o $@

	# Test the integrity
	if [ -f "$@" ]; then upx -t $@ || rm $@; fi

.gofmt: $(GO_SOURCE_FILES)
	gofmt -w $^
	touch $@

.tested: .deps $(GO_SOURCE_FILES)
	go test ./...
	touch $@

clean: clean-go
.PHONY: clean

clean-go:
	rm -rf .deps .tested .mod-replaced .gofmt .dist-compressed .dist dist/* dist_compressed
.PHONY: clean-go
