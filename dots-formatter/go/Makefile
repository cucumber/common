include default.mk

EXES := $(shell find dist -name 'dots-formatter-go-*')
UPX_EXES = $(patsubst dist/dots-formatter-go-%,dist_compressed/dots-formatter-go-%,$(EXES))

default: bin/dots-formatter

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
	gox -ldflags "-X main.version=${CIRCLE_TAG}" -output "dist/dots-formatter-go-{{.OS}}-{{.Arch}}" -rebuild ./cli
	touch $@

dist/dots-formatter-go-%: .dist

.dist-compressed: $(UPX_EXES)
	touch $@

dist_compressed/dots-formatter-go-%: dist/dots-formatter-go-%
	mkdir -p dist_compressed
	# requires upx in PATH to compress supported binaries
	# may produce an error ARCH not supported
	-upx $< -o $@

	# Test the integrity
	if [ -f "$@" ]; then upx -t $@ || rm $@; fi

bin/dots-formatter: .deps $(GO_SOURCE_FILES)
	go build -o $@ ./cli

clean:
	rm -rf bin/dots-formatter dist/* dist_compressed
