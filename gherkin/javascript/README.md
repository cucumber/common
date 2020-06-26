# Gherkin for JavaScript

Gherkin parser/compiler for JavaScript. Please see [Gherkin](https://github.com/cucumber/cucumber/tree/master/gherkin) for details.

## Usage

```javascript
const Gherkin = require('@cucumber/gherkin');
const fs = require('fs');

const options = {
    includeSource: true,
    includeGherkinDocument: true,
    includePickles: true,
    createReadStream(path) {
        return fs.createReadStream(path, {encoding: 'utf-8'});
    }
};

const stream = new Gherkin.GherkinStreams.fromPaths(['features/hello.feature'], options);

// Pipe the stream to another stream that can read messages.
stream.pipe(...)
```
