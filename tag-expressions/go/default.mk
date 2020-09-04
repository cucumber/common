# Please update /.templates/go/default.mk and sync:
#  source /scripts/functions.sh && rsync_files

SHELL := /usr/bin/env bash
GOPATH := $(shell go env GOPATH)
PATH := $(PATH):$(GOPATH)/bin
GO_SOURCE_FILES := $(shell find . -name "*.go" | sort)
LIBNAME := $(shell basename $$(dirname $$(pwd)))
EXE_BASE_NAME := cucumber-$(LIBNAME)
GOX_LDFLAGS := "-X main.version=${NEW_VERSION}"
EXES := $(shell find dist -name '$(EXE_BASE_NAME)-*')
UPX_EXES = $(patsubst dist/$(EXE_BASE_NAME)-%,dist_compressed/$(EXE_BASE_NAME)-%,$(EXES))
# Determine if we're on linux or osx (ignoring other OSes as we're not building on them)
OS := $(shell [[ "$$(uname)" == "Darwin" ]] && echo "darwin" || echo "linux")
# Determine if we're on 386 or amd64 (ignoring other processors as we're not building on them)
ARCH := $(shell [[ "$$(uname -m)" == "x86_64" ]] && echo "amd64" || echo "386")
EXE = dist/$(EXE_BASE_NAME)-$(OS)-$(ARCH)
REPLACEMENTS := $(shell sed -n "/^\s*github.com\/cucumber/p" go.mod | perl -wpe 's/\s*(github.com\/cucumber\/(.*)-go\/v\d+).*/q{replace } . $$1 . q{ => ..\/..\/} . $$2 . q{\/go}/eg')
CURRENT_MAJOR := $(shell sed -n "/^module/p" go.mod | awk '{ print $$0 "/v1" }' | cut -d'/' -f4 | cut -d'v' -f2)
NEW_MAJOR := $(shell echo ${NEW_VERSION} | awk -F'.' '{print $$1}')
# Enumerating Cross compilation targets 
PLATFORMS = darwin/amd64 linux/386 linux/amd64 linux/arm freebsd/386 freebsd/amd64 openbsd/386 openbsd/amd64 windows/386 windows/amd64 freebsd/arm netbsd/386 netbsd/amd64 netbsd/arm
TMP = $(subst /, ,$@)
X-OS = $(word 1, $(TMP))
X-ARCH = $(word 2, $(TMP))
GO_MAJOR_V = $(shell go version | cut -c 14- | cut -d' ' -f1 | cut -d'.' -f1)
GO_MINOR_V = $(shell go version | cut -c 14- | cut -d' ' -f1 | cut -d'.' -f2)
MIN_SUPPORTED_GO_MAJOR_V = 1
MIN_SUPPORTED_GO_MINOR_V = 13

# https://stackoverflow.com/questions/2483182/recursive-wildcards-in-gnu-make
rwildcard=$(foreach d,$(wildcard $(1:=/*)),$(call rwildcard,$d,$2) $(filter $(subst *,%,$2),$d))

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

# Define build $(EXE) target differentially depending on NO_CROSS_COMPILE flag
ifndef NO_CROSS_COMPILE
$(EXE): $(PLATFORMS)
	# Rename windows compilations to include .exe extension
	rm -f dist/*windows*.exe
	for f in dist/*windows*; do mv -f $${f} $${f}.exe; done
else
$(EXE): .deps $(GO_SOURCE_FILES)
	# Compile executable for the local platform only
	go build -ldflags $(GOX_LDFLAGS) -o $@ ./cmd
endif

$(PLATFORMS): .deps $(GO_SOURCE_FILES) supported-go-version
	mkdir -p dist
	# Cross-compile executable for many platforms
	echo "Building $(X-OS)-$(X-ARCH)"
	GOOS=$(X-OS) GOARCH=$(X-ARCH) go build -buildmode=exe -ldflags $(GOX_LDFLAGS) -o "dist/$(EXE_BASE_NAME)-$(X-OS)-$(X-ARCH)" -a ./cmd
.PHONY: $(PLATFORMS)

supported-go-version: #Determine if we're on a supported go platform
	@if [ $(GO_MAJOR_V) -gt $(MIN_SUPPORTED_GO_MAJOR_V) ]; then \
		exit 0 ;\
	elif [ $(GO_MAJOR_V) -lt $(MIN_SUPPORTED_GO_MAJOR_V) ]; then \
		echo '$(GO_MAJOR_V).$(GO_MINOR_V) is not a supported version, $(MIN_SUPPORTED_GO_MAJOR_V).$(MIN_SUPPORTED_GO_MINOR_V) is required';\
		exit 1; \
	elif [ $(GO_MINOR_V) -lt $(MIN_SUPPORTED_GO_MINOR_V) ] ; then \
		echo '$(GO_MAJOR_V).$(GO_MINOR_V) is not a supported version, $(MIN_SUPPORTED_GO_MAJOR_V).$(MIN_SUPPORTED_GO_MINOR_V) is required';\
		exit 1; \
	fi
.PHONY: supported-go-version

.dist-compressed: $(UPX_EXES)
	touch $@

update-dependencies:
	go get -u && go mod tidy
.PHONY: update-dependencies

pre-release: remove-replaces update-version update-dependencies clean default
.PHONY: pre-release

update-version: update-major
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

dist_compressed/$(EXE_BASE_NAME)-%: dist/$(EXE_BASE_NAME)-%
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

post-release: add-replaces
.PHONY: post-release

clean: clean-go
.PHONY: clean

clean-go:
	rm -rf .deps .tested* .linted dist/ .dist-compressed dist_compressed/ acceptance/
.PHONY: clean-go

remove-replaces:
	sed -i '/^replace/d' go.mod
	sed -i 'N;/^\n$$/D;P;D;' go.mod
.PHONY: remove-replaces

add-replaces:
ifeq ($(shell sed -n "/^\s*github.com\/cucumber/p" go.mod | wc -l), 0)
	# No replacements here
else
	sed -i '/^go .*/i $(REPLACEMENTS)\n' go.mod
endif
.PHONY: add-replaces

update-major:
ifeq ($(CURRENT_MAJOR), $(NEW_MAJOR))
	# echo "No major version change"
else
	echo "Updating major from $(CURRENT_MAJOR) to $(NEW_MAJOR)"
	sed -Ei "s/$(LIBNAME)-go(\/v$(CURRENT_MAJOR))?/$(LIBNAME)-go\/v$(NEW_MAJOR)/" go.mod
	sed -Ei "s/$(LIBNAME)-go(\/v$(CURRENT_MAJOR))?/$(LIBNAME)-go\/v$(NEW_MAJOR)/" $(shell find . -name "*.go")
endif
.PHONY: update-major
