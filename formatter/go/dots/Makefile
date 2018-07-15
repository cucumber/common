include default.mk

EXES := $(shell find dist -name 'cucumber-dots-formatter-*')
UPX_EXES = $(patsubst dist/cucumber-dots-formatter-%,dist_compressed/cucumber-dots-formatter-%,$(EXES))

default: bin/cucumber-dots-formatter

.deps:
	go get github.com/fatih/color
	go get github.com/gogo/protobuf/io
	go get github.com/stretchr/testify
	go get github.com/cucumber/cucumber-messages-go
	# Using aslakhellesoy's fork until this is merged:
	# https://github.com/mitchellh/gox/pull/112
	go get github.com/aslakhellesoy/gox
	touch $@

.dist: .deps
	mkdir -p dist
	gox -ldflags "-X main.version=${CIRCLE_TAG}" -output "dist/cucumber-dots-formatter-{{.OS}}-{{.Arch}}" -rebuild ./cli
	touch $@

dist/cucumber-dots-formatter-%: .dist

.dist-compressed: $(UPX_EXES)
	touch $@

dist_compressed/cucumber-dots-formatter-%: dist/cucumber-dots-formatter-%
	mkdir -p dist_compressed
	# requires upx in PATH to compress supported binaries
	# may produce an error ARCH not supported
	-upx $< -o $@

	# Test the integrity
	if [ -f "$@" ]; then upx -t $@ || rm $@; fi

bin/cucumber-dots-formatter: .deps $(GO_SOURCE_FILES)
	go build -o $@ ./cli

clean: clean-custom

clean-custom:
	rm -rf bin/cucumber-dots-formatter dist/* dist_compressed
.PHONY: clean-custom