# Cucumber Expressions for JavaScript

[![Build Status](https://travis-ci.org/cucumber/cucumber-expressions-javascript.svg?branch=master)](https://travis-ci.org/cucumber/cucumber-expressions-javascript)

[The docs are here](http://docs.cucumber.io/cucumber-expressions/).

## Example

```js
var CucumberExpressions = require('cucumber-expressions')


// Create a transform lookup, add any custom transforms first
var transformLookup = new CucumberExpressions.TransformLookup()
transformLookup.addTransform(new Transform(/* ... */))


// Match using a regular expression
var regExp = /I have (\d+) cukes? in my (.+) now/
var expression = new CucumberExpressions.RegularExpression(regExp, [], transformLookup)

var expressionArguments = expression.match('I have 22 cukes in my belly now')
expressionArguments[0] // => {offset: 7, value: '22', transformedValue: 22}
expressionArguments[1] // => {offset: 22, value: 'belly', transformedValue: 'belly'}

expression.match('I do not have 22 cukes in my belly now') // => null


// Match using a cucumber expression
var pattern = 'I have {n:int} cuke(s) in my {bodypart} now'
var expression = new CucumberExpressions.CucumberExpression(str, [], transformLookup)

var expressionArguments = expression.match('I have 22 cukes in my belly now')
expressionArguments[0] // => {offset: 7, value: '22', transformedValue: 22}
expressionArguments[1] // => {offset: 22, value: 'belly', transformedValue: 'belly'}

expression.match('I do not have 22 cukes in my belly now') // => null


// Create snippets
var generator = new CucumberExpressions.CucumberExpressionGenerator(transformLookup)
var step = 'I have 2 cukes and 1.5 euro'

var generatedExpression = generator.generateExpression(step, true)
generatedExpression.source // => 'I have {arg1:int} cukes and {arg2:float} euro'

var generatedExpression = generator.generateExpression(step, false)
generatedExpression.source // => 'I have {arg1} cukes and {arg2} euro'
```
