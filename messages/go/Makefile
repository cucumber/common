SHELL := /usr/bin/env bash
GOPATH := $(shell go env GOPATH)
GO_SOURCE_FILES = $(shell find . -name "*.go")

default: .linked .tested

# Symlink this dir to GOPATH
.linked:
	mkdir -p ${GOPATH}/src/github.com/cucumber
	rm -rf ${GOPATH}/src/github.com/cucumber/cucumber-messages-go
	ln -fs ${CURDIR} ${GOPATH}/src/github.com/cucumber/cucumber-messages-go
	touch $@

# Remove symlink
unlink:
	rm -rf .linked ${GOPATH}/src/github.com/cucumber/cucumber-messages-go

.deps:
	go get github.com/gogo/protobuf/protoc-gen-gofast
	go get github.com/golang/protobuf/protoc-gen-go
	go get github.com/stretchr/testify
	touch $@

.tested: .linked .deps $(GO_SOURCE_FILES) messages.pb.go
	go test
	touch $@

messages.pb.go: messages.proto
	PATH="$$(go env GOPATH)/bin:${PATH}" protoc --gofast_out=. $<

clean:
	rm -f .linked .deps .tested messages.pb.go
.PHONY: clean
