# Cucumber Tag Expressions for JavaScript

[![Build Status](https://travis-ci.org/cucumber/tag-expressions-javascript.svg?branch=master)](https://travis-ci.org/cucumber/tag-expressions-javascript)

[The docs are here](http://docs.cucumber.io/tag-expressions/).

## Example

```js
var TagExpressionParser = require('cucumber-tag-expressions').TagExpressionParser;
var parser = new TagExpressionParser();

var expressionNode = parser.parse('@tagA and @tagB');

expressionNode.evaluate(["@tagA", "@tagB"]); # => true
expressionNode.evaluate(["@tagA", "@tagC"]); # => false
```
