# Fake Cucumber

Fake Cucumber produces fake results for Gherkin documents. It's used for testing
other components - in particular formatters that consume cucumber messages.

The algorithm for producing results is simple. If the step matches `.*failed.*`,
then the status will be `FAILED`, if it matches `.*undefined.*` it will be `UNDEFINED`
etc. If it doesn't match a known status it will be `PASSED`.

See [messages.proto](../cucumber-messages/messages.proto) to see all the
possible statuses.

## Usage

    fake-cucumber [--format=json|ndjson|protobuf] [--results=none|random|pattern] [FILES]
