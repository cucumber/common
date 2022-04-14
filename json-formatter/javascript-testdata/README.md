# JSON Formatter test harness

This module is only used for testing the Go implementation. It generates ndjson
files (`.ndjson`) from test data in `../ruby`, using `../fake-cucumber`.
These files are then piped to the Go JSON formatter during acceptance tests.
