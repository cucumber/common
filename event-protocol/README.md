# Cucumber Event Protocol

The Cucumber event protocol is a data exchange format for components in the
Cucumber ecosystem. When Cucumber runs, it uses Cucumber events to communicate
with formatters.

The protocol is transport agnostic, and can be used between processes. This
means some components (such as the [HTML Formatter](../html-formatter/README.md))
can be implemented in a single programming language and used by Cucumber
implementations in different languages.

The Cucumber event protocol can also be used to implement parallel and distributed execution of Cucumber scenarios.

Programs that support the protocol can be producers or consumers (or both).

Examples of producers are:

* Cucumber
* [Gherkin-Lint](../gherkin-lint/README.md)

Examples of consumers are:
* Formatters (HTML, JUnit, Progress, PDF)
* 3rd party tools (Cucumber Pro)

## Implementation

## Validation

This project contains utilities to validate both *producers* and *consumers* of
the Cucumber event protocol.

### Validating Event Producers

Any tool that produces Cucumber events can be validated simply by writing the
produced events to the `STDIN` of `./validate.js`. If the stream is valid, the
exit status is 0, otherwise 1.

You can try the validator like so:

    cat examples/events.ndjson | ./validate.js

The recommended approach is to configure the producer to write events to a
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
