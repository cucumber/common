# Cucumber HTML Formatter

The Cucumber HTML Formatter renders Gherkin documents as HTML.

It can optionally render extra information such as Cucumber results, stack traces,
screenshots, [Gherkin-Lint results](../../gherkin-lint/README.md) or any other
information that can be embedded in the [Cucumber Event Protocol](../event-protocol/README.md).

`bin/cucumber-html-formatter` is an executable that reads events and outputs HTML.

Events can be read from  `STDIN` or a TCP socket.

HTML can be output to `STDOUT`, a specified directory or directly to a browser.

For more details, see the [technical documentation](https://github.com/cucumber/html-formatter-nodejs).
