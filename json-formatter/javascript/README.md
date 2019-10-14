# JSON Formatter protobuf test harness

This module is only used for testing the Go implementation. It generates binary protobuf files (`.bin`) from test data in `../ruby`, using `../fake-cucumber`.
These files are then piped to the Go JSON formatter during acceptance tests.
