SHELL := /usr/bin/env bash

default: test
	mkdir -p ${GOPATH}/src/github.com/cucumber
	ln -s ${CURDIR} ${GOPATH}/src/github.com/cucumber/cucumber-messages-go
.PHONY: default

test: ${GOPATH}/src/github.com/stretchr/testify ${GOPATH}/src/github.com/golang/protobuf/protoc-gen-go messages.pb.go
	go test
.PHONY: clean

${GOPATH}/src/github.com/stretchr/testify:
	go get github.com/stretchr/testify

${GOPATH}/src/github.com/golang/protobuf/protoc-gen-go:
	go get github.com/golang/protobuf/protoc-gen-go

messages.pb.go: messages.proto
	PATH="${GOPATH}/bin:${PATH}" protoc --go_out=. $<

clean:
	rm -rf lib/*
.PHONY: clean

clobber: clean
	rm -f messages.pb.go
.PHONY: clobber
