# Cucumber HTML Formatter

This is a cross-platform formatter that produces a HTML report for Cucumber runs.
It is built on top of [cucumber-react](../cucumber-react/javascript) and works with *any* 
Cucumber implementation with a `protobuf` formatter that outputs [cucumber messages](../cucumber-messages).

## Installation

Using NPM:

    npm install -g cucumber-html-formatter

Using Docker:

    docker pull cucumber/cucumber-html-formatter:latest
    
## Usage

Using NPM:

    cat cucumber-messages.bin | cucumber-html-formatter > index.html

Using Docker:

    cat cucumber-messages.bin | docker run --interactive --rm cucumber/cucumber-html-formatter:latest > index.html

## Obtaining `cucumber-messages.bin`

If you're using a Cucumber version with a `protobuf` formatter, pass `--format protobuf:cucumber-messages.bin` to it.
Alternatively you can generate it with [fake-cucumber](../fake-cucumber)