SHELL := /usr/bin/env bash
export GOPATH = $(realpath ./lib)

default: test
.PHONY: default

test: lib/src/github.com/stretchr/testify lib/src/github.com/golang/protobuf/protoc-gen-go messages.pb.go
	go test
.PHONY: clean

lib/src/github.com/stretchr/testify:
	mkdir -p lib
	go get github.com/stretchr/testify

lib/src/github.com/golang/protobuf/protoc-gen-go:
	mkdir -p lib
	go get github.com/golang/protobuf/protoc-gen-go

messages.pb.go: messages.proto
	PATH="${GOPATH}/bin:${PATH}" protoc --go_out=. $<

clean:
	rm -rf lib messages.pb.go
.PHONY: clean
