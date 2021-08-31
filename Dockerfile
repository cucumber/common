FROM ruby:2.6.8-alpine3.14 AS ruby-base


FROM golang:1.17.0-alpine3.14 AS go-base

RUN apk add gcc musl-dev

#### messages

FROM ruby-base AS messages-codegen

COPY messages/jsonschema /jsonschema

RUN ruby /jsonschema/scripts/codegen.rb Ruby /jsonschema > /tmp/messages.dtos.rb
RUN ruby /jsonschema/scripts/codegen.rb RubyDeserializers /jsonschema > /tmp/messages.deserializers.rb

RUN ruby /jsonschema/scripts/codegen.rb Go /jsonschema > /tmp/messages.go


FROM go-base AS messages-go

WORKDIR /common/messages/go

COPY messages/go .
COPY --from=messages-codegen /tmp/messages.go .

RUN go test ./...

#### gherkin

FROM go-base AS gherkin-go

WORKDIR /common/gherkin/go

COPY gherkin/go .
COPY --from=messages-go /common/messages/go /common/messages/go

# TODO: Use a build argument
RUN GOOS=darwin GOARCH=amd64 go build -buildmode=exe -ldflags "-X main.version=20.0.0" -o dist/gherkin-macos -a ./cmd

FROM scratch AS artefacts
# https://github.com/orgs/cucumber/packages/container/package/build-cache
LABEL org.opencontainers.image.source https://github.com/cucumber/common

# docker buildx build . --target=artefacts --output=.
COPY --from=gherkin-go /common/gherkin/go/dist/gherkin-macos gherkin/go/dist/gherkin-macos
