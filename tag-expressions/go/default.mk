SHELL := /usr/bin/env bash
GOPATH := $(shell go env GOPATH)
PATH := $(PATH):$(GOPATH)/bin
GO_SOURCE_FILES := $(shell find . -name "*.go" | sort)
MOD_DIR := $(shell dirname $$(find . -name go.mod))
LIBNAME := $(shell basename $$(dirname $$(pwd)))
GOX_LDFLAGS := "-X main.version=${NEW_VERSION}"
EXES := $(shell find dist -name '$(LIBNAME)-*')
UPX_EXES = $(patsubst dist/$(LIBNAME)-%,dist_compressed/$(LIBNAME)-%,$(EXES))
# Determine if we're on linux or osx (ignoring other OSes as we're not building on them)
OS := $(shell [[ "$$(uname)" == "Darwin" ]] && echo "darwin" || echo "linux")
# Determine if we're on 386 or amd64 (ignoring other processors as we're not building on them)
ARCH := $(shell [[ "$$(uname -m)" == "x86_64" ]] && echo "amd64" || echo "386")
EXE = dist/$(LIBNAME)-$(OS)-$(ARCH)

default: .linted .tested
.PHONY: default

# Run the .dist target if there is a main file
ifneq (,$(wildcard ./cmd/main.go))
default: dist
endif

.deps:
	touch $@

dist: $(EXE)
ifndef NO_UPX_COMPRESSION
	make .dist-compressed
endif
	touch $@

$(EXE): .deps $(GO_SOURCE_FILES)
	mkdir -p dist
ifndef NO_CROSS_COMPILE
	# Cross-compile executable for many platforms if we're not running on Alpine (Docker)
	# where cross-compilation doesn't work.
	go get github.com/aslakhellesoy/gox
	gox -cgo -buildmode=exe -ldflags $(GOX_LDFLAGS) -output "dist/$(LIBNAME)-{{.OS}}-{{.Arch}}" -rebuild ./cmd
else
	go build -ldflags $(GOX_LDFLAGS) -o $@ ./cmd
endif

.dist-compressed: $(UPX_EXES)
	touch $@

update-dependencies:
	cd $(MOD_DIR) && go get -u && go mod tidy
.PHONY: update-dependencies

update-version:
	# no-op
.PHONY: update-version

ifneq (,$(wildcard ./cmd/main.go))
publish: dist
ifdef NEW_VERSION
	./scripts/github-release $(NEW_VERSION)
else
	@echo -e "\033[0;31mNEW_VERSION is not defined. Can't publish :-(\033[0m"
	exit 1
endif
else
publish:
	# no-op
endif
.PHONY: publish

dist_compressed/$(LIBNAME)-%: dist/$(LIBNAME)-%
	mkdir -p dist_compressed
	# requires upx in PATH to compress supported binaries
	# may produce an error ARCH not supported
	-upx $< -o $@

	# Test the integrity
	if [ -f "$@" ]; then upx -t $@ && cp $@ $< || rm $@; fi

.linted: $(GO_SOURCE_FILES)
	gofmt -w $^
	touch $@

.tested: .deps $(GO_SOURCE_FILES)
	go test ./...
	touch $@

post-release:
	@echo "No post-release needed for go"
.PHONY: post-release

clean: clean-go
.PHONY: clean

clean-go:
	rm -rf .deps .tested .linted dist/ .dist-compressed dist_compressed/ acceptance/
.PHONY: clean-go
