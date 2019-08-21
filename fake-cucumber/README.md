# Fake Cucumber

Fake Cucumber produces fake results for Gherkin documents. It's used for testing
other components - in particular formatters that consume cucumber messages.

The algorithm for producing results is simple. If the step matches `.*failed.*`,
then the status will be `FAILED`, if it matches `.*undefined.*` it will be `UNDEFINED`
etc. If it doesn't match a known status it will be `PASSED`.

See [messages.proto](../cucumber-messages/messages.proto) to see all the
possible statuses.

## Usage

    gherkin [FILES] | fake-cucumber > messages.json

## Formats

Fake Cucumber can write messages in 3 different formats:

- For JSON output, define `FORMAT=json` (this is the default).
- For [ndjson](http://ndjson.org/) output, define `FORMAT=ndjson`.
- For binary protobuf output, define `FORMAT=protobuf-binary`.
- For protobuf object output, define `FORMAT=protobuf`.
