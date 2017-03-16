# Cucumber Event Protocol

The Cucumber event protocol is a data exchange format for components in the
Cucumber ecosystem.

When Cucumber runs, it produces (emits) Cucumber events that are consumed by
formatters that report the results in various formats. The protocol is designed
to allow for other producers to emit events, and for other consumers to consume
them.

Events are encoded as [Newline Delimited JSON](http://ndjson.org/).

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

### source {#event-source}

A `source` event indicates that a Gherkin document has been loaded. (The event is
called `source` to permit other document media types in the future).

A `source` event must arrive before any `attachment` events linking to that same source.

Example:

```json
[snippet](examples/events/002_source.json)
```

### pickle

A `pickle' event contains details of a compiled test case.

Example:

```json
[snippet](examples/events/003_pickle.json)
```

### attachment {#event-attachment}

An `attachment` attaches a piece of metadata to a particular line in a `source` file.
Attachments can have many types (specified by a media type), and are typically used for:

* `text/vnd.cucumber.stacktrace.java+plain`, stack trace of a failing step (from java in this case)
* `image/png`, `image/jpg`, `image/gif` - screenshots

Example (PNG image):

```json
[snippet](examples/events/004_attachment-png-embedded.json)
```

Example (Java stack trace):

```json
[snippet](examples/events/005_attachment-stacktrace.json)
```

### Cucumber-specific attachments

Cucumber-specific events such as "a step definition was found for this step" or
"a step failed" could be represented as attachments with special media types, for example:

* `application/vnd.cucumber.step.match+json`, information about the match such as arguments, stepdef line number etc.
* `text/vnd.cucumber.step.status+plain`, status of a failing step (passed, undefined, pending, failed, skipped)

They could also be represented as distinct events with a separate type. The Cucumber team
is currently undecided on this. Once consumers evolve we will have more information about
the tradeoffs of each design. See the [contributing](#contributing) section for details.

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

The design of events should be
[consumer-driven](http://www.martinfowler.com/articles/consumerDrivenContracts.html),
not speculative.

We should consider the needs of several different event consumers to influence the design of the
protocol. This means there may be certain events or event properties that some of
the consumers don't care about. That's ok.

A prerequisite for changing the event protocol is that a consumer is
going to need this change. Ideally there should be code to demonstrate this need,
typically in a git repository and/or pull request for a consumer.

To modify the protocol, start by adding or modifying an example event in `examples/events/`.
When you run `make` this should cause a validation error.

Next, add or modify a schema in `schema/` and ensure `make` runs without validation errors. You can learn about JSON schemas in [this short book](https://spacetelescope.github.io/understanding-json-schema/UnderstandingJSONSchema.pdf).

Also see the general [contributing guidelines](../CONTRIBUTING.md).
