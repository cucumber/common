# Cucumber Event Protocol

The Cucumber Event Protocol allows various components in the Cucumber
ecosystem to exchange information. For example, it's how Cucumber notifies
formatters (such as [HTML Formatter](../../html-formatter/README.md) or
JUnit Formatter) about the results of a Cucumber run.

This protocol enables more reuse of complicated components because a Cucumber implementation
written in one programming language can integrate with components written in
another programming language.

Reusable formatters is one example, but it doesn't stop there. The
[Gherkin-Lint](../gherkin-lint/README.md) tool emits Cucumber Events (just like
Cucumber itself), allowing both Cucumber and Gherkin-Lint to use the same
formatters for results. They can even be combined.

### Design considerations

* Independent of Gherkin - should work with other doc types such as Markdown
  * Use path, line and column to link certain events to source
* Encoding
  * Stream of lines
  * Each line represents a single event, encoded as JSON (on a single line)
* The following transport should be supported by all producers/consumers:
  * Raw socket
  * STDIN/STDOUT
* Alternative transports
  * W3C EventSource (each event is a JSON-encoded event. The ES event name is unspecified)
  * W3C WebSocket
* Events should be usable as [Redux Actions](http://redux.js.org/docs/basics/Actions.html)
* Also see https://github.com/cucumber/cucumber-ruby/tree/document-events

## Event types

This is an incomplete list. It should be expanded as various tools implement support for
additional events.

### Start

Example:

```javascript
{
  type: "start",
  timestamp: 1471420027068,
  series: "df1d3970-644e-11e6-8b77-86f30ca893d3"
}
```

### Finish

Example:

```javascript
{
  type: finish,
  timestamp: 1471420027068,
  series: "df1d3970-644e-11e6-8b77-86f30ca893d3"
}
```

### Source

Example:

```javascript
{
  type: "source",
  timestamp: 1471420027078,
  series: "df1d3970-644e-11e6-8b77-86f30ca893d3",
  contentType: "text/plain+gherkin",
  uri: "features/hello.feature",
  data: "Feature: Hello\n",
  dataEncoding: "utf-8"
}
```

### Attachment

#### Embedded data

Small attachments can embed the `data` into the event itself:

Example:

```javascript
{
  type: "attachment",
  timestamp: 1471420027078,
  series: "df1d3970-644e-11e6-8b77-86f30ca893d3",
  source: {
    uri: "features/hello.feature"
    startLine: 22,
    startColumn: null,
    endLine: null,
    endColumn: null,
  },
  contentType: "image/png",
  uri: "build/screenshots/hello.png",
  data: "[some base64 encoded binary data]",
  dataEncoding: "base64"
}
```

In this case, the `uri` is purely informational - it's not retrieved.

Attachments aren't just for images - they can also be used for other things such
as:

* Cucumber stack traces (`"contentType": "text/plain+java-stacktrace"`
  * When a Step Definition fails
  * When a Gherkin parse error occurs
* Gherkin-Lint warnings

#### Linked data

Big attachments (such as movies or big images) can refer to an external
source for the data. When the `data` property is null, the consumer of the event
should retrieve the data from the `uri`.

Please note that if the data behind `uri` is removed or changed, it will not be retrieved
again - the event consumer should only retrieve the data when the event is processed.
