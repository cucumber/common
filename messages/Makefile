LANGUAGES ?= javascript go java ruby python dotnet
include default.mk

ifndef ALPINE
# Rebuild the docs unless we're already running in the build docker image (running
# docker from docker doesn't work).
default: messages.md
endif

messages.md: messages.proto
	docker run --rm -v $$(pwd):/out -v $$(pwd):/protos pseudomuto/protoc-gen-doc --doc_opt=markdown,$@
