# JSON Formatter protobuf test harness

This module is only used for testing the Go implementation. It generates ndjson 
protobuf files (`.ndjson`) from test data in `../ruby`, using `../fake-cucumber`.
These files are then piped to the Go JSON formatter during acceptance tests.
