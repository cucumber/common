[![Build Status](https://secure.travis-ci.org/cucumber/gherkin-javascript.svg)](http://travis-ci.org/cucumber/gherkin-javascript)

Gherkin parser/compiler for JavaScript. Please see [Gherkin](https://github.com/cucumber/cucumber/tree/master/gherkin) for details.

## Usage

```javascript
const gherkin = require('gherkin')

const options = {
  includeSource: true,
  includeGherkinDocument: true,
  includePickles: true,
}
const stream = gherkin.fromPaths(['features/hello.feature'])

// Pipe the stream to another stream that can read messages.
stream.pipe(...)
```
