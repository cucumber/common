SHELL := /usr/bin/env bash
GOPATH := $(shell go env GOPATH)

default: test
.PHONY: default

test: deps link messages.pb.go
	go test
.PHONY: clean

link: ${GOPATH}/src/github.com/cucumber/cucumber-messages-go
.PHONY: link

${GOPATH}/src/github.com/cucumber/cucumber-messages-go:
	mkdir -p ${GOPATH}/src/github.com/cucumber
	rm -rf ${GOPATH}/src/github.com/cucumber/cucumber-messages-go
	ln -fs ${CURDIR} ${GOPATH}/src/github.com/cucumber/cucumber-messages-go
.PHONY: default

deps: ${GOPATH}/src/github.com/stretchr/testify ${GOPATH}/src/github.com/golang/protobuf/protoc-gen-go
.PHONY: deps

${GOPATH}/src/github.com/stretchr/testify:
	go get github.com/stretchr/testify

${GOPATH}/src/github.com/golang/protobuf/protoc-gen-go:
	go get github.com/golang/protobuf/protoc-gen-go

messages.pb.go: messages.proto
	PATH="$$(go env GOPATH)/bin:${PATH}" protoc --go_out=. $<

clean:
.PHONY: clean

clobber: clean
	rm -f messages.pb.go
.PHONY: clobber
