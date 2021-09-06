# Cucumber HTML Formatter

This is a cross-platform formatter that produces a HTML report for Cucumber runs.
It is built on top of [@cucumber/react](../react/javascript) and works with *any*
Cucumber implementation with a `message` formatter that outputs [cucumber messages](../messages).

This formatter is built into the following Cucumber implementations:

* cucumber-ruby
* cucumber-jvm
* cucumber-js

For other Cucumber implementations that don't yet bundle this formatter, the `cucumber-html-formatter` can also be used as a standalone tool.

## Installation

Using NPM:

    npm install -g @cucumber/html-formatter

Using Docker:

    docker pull cucumber/cucumber-html-formatter:latest

## Usage

Using NPM:

    cat cucumber-messages.ndjson | cucumber-html-formatter > index.html

Using Docker:

    cat cucumber-messages.ndjson | docker run --interactive --rm cucumber/cucumber-html-formatter:latest > index.html

## Obtaining `cucumber-messages.ndjson`

If you're using a Cucumber version with a `message` formatter, pass `--format message:cucumber-messages.ndjson` to it.
