# Cucumber Tag Expressions for JavaScript

[![Greenkeeper badge](https://badges.greenkeeper.io/cucumber/tag-expressions-javascript.svg)](https://greenkeeper.io/)


[The docs are here](https://cucumber.io/docs/cucumber/api/#tag-expressions).

## Example

```js
const tagExpressions = require("@cucumber/tag-expressions");

const expressionNode = tagExpressions.parse('@tagA and @tagB');

expressionNode.evaluate(["@tagA", "@tagB"]) // => true
expressionNode.evaluate(["@tagA", "@tagC"]) // => false
```
