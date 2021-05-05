# Gherkin Streams

This module contains utilities to use the Gherkin library with streams.

## Usage

```javascript
const { fromPaths } = require('@cucumber/gherkin-streams')

const options = {
  includeSource: true,
  includeGherkinDocument: true,
  includePickles: true,
}
const stream = fromPaths(['features/hello.feature'])

// Pipe the stream to another stream that can read messages.
stream.pipe(...)
```

### Shortening URIs with `relativeTo`

You can include `relativeTo` option to avoid emitting longer or absolute URIs, instead making them only relative to the current working directory (or whatever makes sense for your use case):

```javascript
const { fromPaths } = require('@cucumber/gherkin-streams')

// imagine `discoverPaths()` is a function that returns absolute paths
const paths = discoverPaths();
const options = {
  includeSource: true,
  includeGherkinDocument: true,
  includePickles: true,
  relativeTo: process.cwd()
}
const stream = fromPaths(paths)

// Pipe the stream to another stream that can read messages.
stream.pipe(...)
```