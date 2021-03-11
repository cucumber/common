# gherkin-utils

This library is a set of utilities to work with Gherkin documents and AST. It does not depend on Gherkin library, so it is lightweight enough for using in a browser.

It provides two main utilities, `pretty` and `gherkinDocumentWalker`.

# pretty(gherkinDocument: messages.GherkinDocument)

This function takes a IGherkinDocument as input and produce the text version of it. The main goal it to use it in tests.

# GherkinDocumentWalker class

The GherkinDocumentWalker is a class for walking and filtering the AST produced by Gherkin after parsing a feature file.
When running `walkGherkinDocument` on a GherkinDocument, it will produce a deep copy of the object.

It takes two arguments upon creation:
 - filters: set of functions used to know if the walked elements are kept in the result. By default, all elements are kept.
 - handlers: set of function that can be used to alter the produced elements.

Filtering keeps the meaning of the original GherkinDocument, which means:
 - if a `Background` was present, it will always be in the `Feature` (or `Rule`)
 - the kept scenarios will have the same steps and examples than the original

By default, all elements are accepted, which means that if you want to do filtering you should reject all other elements. To ease this, we also provide the `rejectAllFilters`.

Here's an example:

```typescript
import { GherkinDocumentWalker, rejectAllFilters } from '@cucumber/gherkin-utils'

// Only keeps scenarios which name include 'magic'
const filter = new GherkinDocumentWalker({
  ...rejectAllFilters,
  ...{ acceptScenario: (scenario) => scenario.name.includes('magic') },
})

// Makes a list with all the scenario names
const allScenarioNames: string[] = []
const scenarioNameFinder = new GherkinDocumentWalker({}, {
  handleScenario: (scenario) => allScenarioNames.push(scenario.name),
})
```
