#!/usr/bin/env sh

./bin/gherkin --no-ast --no-pickles test.feature | ./bin/gherkin
