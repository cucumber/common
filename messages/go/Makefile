SHELL := /usr/bin/env bash
PROTO_FILES = $(shell find . -name "*.proto")
PROTO_CLASSES = $(patsubst %.proto,%_pb.go,$(PROTO_FILES))
export GOPATH = $(realpath ./lib)

default: test
.PHONY: default

test: lib/src/github.com/stretchr/testify $(PROTO_CLASSES)
	go test
.PHONY: clean

lib/src/github.com/stretchr/testify:
	go get github.com/stretchr/testify

%_pb.go: %.proto
	go get github.com/golang/protobuf/protoc-gen-go
	protoc --go_out=. $<

clean:
	rm -rf lib/src lib/pkg
.PHONY: clean
