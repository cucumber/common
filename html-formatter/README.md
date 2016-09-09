# Cucumber HTML Formatter

The Cucumber HTML Formatter renders Cucumber features as HTML. It can optionally include
extra information such as Cucumber results, stack traces, screenshots,
[Gherkin-Lint results](../../gherkin-lint/README.md) or any other information that can be embedded
in the [Cucumber Event Protocol](../event-protocol/README.md).

It is a standalone executable that reads events from `STDIN` or a TCP socket and
writes output (HTML) to `STDOUT`, a specified directory or directly to a browser
(when run in server-mode).

(The [standard library](../docs/standard-library.adoc#implementations) list indicates
what Cucumber implementations currently support the Cucumber Event Protocol).

## Implementation

Cucumber HTML Formatter consists of two main components:

* React component (JavaScript)
* Command-line program (JavaScript / Node.js)

We may reimplement the command-line program in Go later, if it makes installation
and cross-platform usage easier. We may also consider packaging the whole thing
as a Docker image.

## Trying it out

Make sure you `cd /cucumber/html-formatter/nodejs` first.

### Build it

    npm install
    npm run build
    npm test

### Events to STDIN, HTML to STDOUT

    cat ../../event-protocol/examples/events.ndjson | bin/cucumber-html-formatter

This should print a HTML report to `STDOUT`. You probably want to direct it to a file, then
open it in a browser:

    cat ../../event-protocol/examples/events.ndjson | bin/cucumber-html-formatter > cucumber.html
    open cucumber.html

Or, you can pipe it straight to your browser if you `gem install bcat` first:

    cat ../../event-protocol/examples/events.ndjson | bin/cucumber-html-formatter | bcat

### Events via socket, HTML to browser

In the first shell:

    npm run build
    bin/cucumber-html-formatter

Now, open up a browser:

    open http://localhost:2222

And optionally, in a new shell:

    curl --header "Accept: text/event-stream" http://localhost:2222/sse

Write some events over the socket:

    cat ../../event-protocol/examples/events.ndjson | nc localhost 2223

You should see the browser update with HTML (and if you ran `curl` you should see events there too)
