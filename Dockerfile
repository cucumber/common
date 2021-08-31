FROM ruby:2.6.8-alpine3.14 AS ruby-base


FROM golang:1.17.0-alpine3.14 AS go-base

RUN apk add gcc musl-dev


FROM ruby-base AS messages-codegen

COPY messages/jsonschema /jsonschema

RUN ruby /jsonschema/scripts/codegen.rb Ruby /jsonschema > /tmp/messages.dtos.rb
RUN ruby /jsonschema/scripts/codegen.rb RubyDeserializers /jsonschema > /tmp/messages.deserializers.rb

RUN ruby /jsonschema/scripts/codegen.rb Go /jsonschema > /tmp/messages.go


FROM go-base AS go-messages

WORKDIR /messages

COPY messages/go .
COPY --from=messages-codegen /tmp/messages.go .

RUN go test ./...


FROM go-base AS go-gherkin

WORKDIR /gherkin

COPY gherkin/go .


FROM scratch AS messages-codegen-final

COPY --from=messages-codegen /tmp/messages.* /

