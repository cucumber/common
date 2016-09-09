# Cucumber Event Protocol

The Cucumber event protocol is a data exchange format for components in the
Cucumber ecosystem.

When Cucumber runs, it produces (emits) Cucumber events that are consumed by
formatters that report the results in various formats. The protocol is designed
to allow for other producers to emit events, and for other consumers to consume
them.

The protocol is transport agnostic, and can be transmitted in-process as well as
between processes. This means some components (such as the [HTML Formatter](../html-formatter/README.md))
can be implemented in a single programming language and used by Cucumber
implementations in different languages.

The Cucumber event protocol can also be used to implement parallel and distributed
execution of Cucumber scenarios.

Programs that support the protocol can be producers or consumers (or both).

Examples of producers are:

* Cucumber
* [Gherkin-Lint](../gherkin-lint/README.md)

Examples of consumers are:
* Formatters (HTML, JUnit, Progress, PDF)
* 3rd party tools (Cucumber Pro)

## Events {#events}

### start {#event-start}

Example:
[import](examples/events/001_start.json)

### source {#event-source}

Example:
[import](examples/events/002_source.json)

### attachment {#event-attachment}

An `attachment` attaches a piece of metadata to a particular line in a `source` file.
Attachments can have many types (specified by a media type), and are typically used for:

* `text/vnd.cucumber.step.status+plain`, status of a failing step (passed, undefined, pending, failed, skipped)
* `text/vnd.cucumber.stacktrace.java+plain`, stack trace of a failing step (from java in this case)
* `image/png`, `image/jpg`, `image/gif` - screenshots

Example:
[import](examples/events/003_attachment-png-embedded.json)

## Implementation

* Cucumber events are formatted as [Newline Delimited JSON](http://ndjson.org)
* The transport protocol can use one or more of the following:
  * `STDIN`/`STDOUT`
  * Raw socket
  * W3C WebSocket
  * W3C EventSource (each event is a JSON-encoded event without `event:` type - it's in the payload itself)

### Philosophy

As the event specification evolves to support a richer set of events there are some
key principles to consider:

#### File format agnostic

While Gherkin is currently the only file format that will be used in `source`
events, no events should assume that all files will be Gherkin documents. This
allows for alternative document formats in the future.

#### No Cucumber execution semantics

Some consumers (such as the [HTML Formatter](../html-formatter/README.md)) may
consume events emitted by other producers than Cucumber (for example [Gherkin-Lint](../gherkin-lint/README.md)).

For this reason, events containing information about execution should be represented
in a more generic way.

#### Errors are attachments

When an error occurs, that's just an attachment to a `source` file, with a [special
media type](#event-attachment). This goes for parse errors, execution errors/exceptions, linting
errors etc.

## Event order {#order}

There are a few constraints about the order of events:

* The first event must be [start](#start)
* A [source](#event-source) event must be received before any
  [attachment](#event-attachment) events referring to it

## Event validation {#validation}

This project contains utilities to validate both *producers* and *consumers* of
the Cucumber event protocol.

### Validating Event Producers

Any tool that produces Cucumber events can be validated simply by writing the
produced events to the `STDIN` of `./validate.js`. If the stream is valid, the
exit status is 0, otherwise 1. This tool uses [JSON Schema](http://json-schema.org/)
to validate each event. The schemas are stored in the `schemas` directory of this
project.

You can try the validator like so:

    cat examples/events.ndjson | ./validate.js

The recommended approach to validate a producer is to configure it to write events to a
`.ndjson` file. This file can then be sent to the validator using `cat`, and
if it fails validation, having a file to look at makes it easier to diagnose
the problem.

### Validating Event Consumers

Tools that consume Cucumber events can be validated by writing
`examples/events.ndjson` to that tool (The events in this file have already been
validated with `./validate.js`).

You can then determine whether the tool processed the events as expected. This
may involve automated verification, manual verification, or a combination of both.

If the tool reads from `STDIN`:

    cat examples/events.ndjson | your/tool

If it reads from a socket:

    cat examples/events.ndjson | nc localhost PORT

## Contributing {#contributing}

If you have suggestions to improve the event protocol, start by making sure your
can run its current tests:

    make clean
    make

Add or modify `schema/*.json` files as well as `examples/events*.json` files,
then run `make` again.

Your contribution should be [consumer-driven](http://www.martinfowler.com/articles/consumerDrivenContracts.html).
Your contribution is more likely to be accepted if you can point to some code for
a consumer that would like to consume the new/modified events you are proposing.

Also see the general [contributing guidelines](../CONTRIBUTING.md).
