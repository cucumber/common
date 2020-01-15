# Cucumber Tag Expressions for JavaScript

[![Greenkeeper badge](https://badges.greenkeeper.io/cucumber/tag-expressions-javascript.svg)](https://greenkeeper.io/)

[![Build Status](https://travis-ci.org/cucumber/tag-expressions-javascript.svg?branch=master)](https://travis-ci.org/cucumber/tag-expressions-javascript)

[The docs are here](https://cucumber.io/docs/cucumber/api/#tag-expressions).

## Example

```js
import {TagExpressionParser} from '@cucumber/tag-expressions'
const parser = new TagExpressionParser()

const expressionNode = parser.parse('@tagA and @tagB')

expressionNode.evaluate(["@tagA", "@tagB"]) // => true
expressionNode.evaluate(["@tagA", "@tagC"]) // => false
```
