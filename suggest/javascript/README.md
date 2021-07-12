# Cucumber Suggest

This is a library that can be used to build Gherkin step auto-complete in editors. 
It does not implement a UI component, but it can provide suggestions to a UI component.

An auto-complete engine uses a [search index](https://en.wikipedia.org/wiki/Search_engine_indexing)
that it can query as the user types. It then presents the search hits in the editor as *suggestions*.

A search index indexes *documents*. 

This library uses *Gherkin Steps* and *Step Definitions*
(their Cucumber Expressions and Regular Expressions) to build `StepDocument`s.
These `StepDocument`s can then be added to a search index.

The details of a `StepDocument` is explained below - for now just think of it as a step,
such as `I have 42 cukes in my belly`.

The examples below illustrate how the library works from the perspective of a user.
(Yep, this README.md file is executed by Cucumber.js)!

The suggestions in the examples use the
[LSP Completion Snippet syntax](https://microsoft.github.io/language-server-protocol/specifications/specification-3-17/#snippet_syntax)
to represent search results.

## Rule: Suggestions are based on both steps and step definitions

### Example: Two suggestions

* Given the following Gherkin step texts exist:
  | Gherkin Step                   |
  | ------------------------------ |
  | I have 23 cukes in my belly    |
  | I have 11 cukes on my table    |
  | I have 11 cukes in my suitcase |
  | the weather forecast is rain   |
* And the following Step Definitions exist:
  | Step Definition Expression         |
  | ---------------------------------- |
  | I have {int} cukes in/on my {word} |
  | the weather forecast is {word}     |
* When I type "cukes"
* Then the suggestions should be:
  | LSP Completion Snippet                                        |
  | ------------------------------------------------------------- |
  | I have ${1\|11,23\|} cukes in my ${2\|belly,suitcase,table\|} |
  | I have ${1\|11,23\|} cukes on my ${2\|belly,suitcase,table\|} |

LSP-compatible editors such as
[Monaco Editor](https://microsoft.github.io/monaco-editor/) or 
[Visual Studio Code](https://code.visualstudio.com/) can display these suggestions
as `I have {int} cukes in my {word}` and `I have {int} cukes on my {word}`.

When the user chooses a suggestion, the editor will focus the editor at the first parameter and
let the user choose between `11` or `23` (or type a custom value). When the user has made a choice, 
the focus moves to the next parameter and suggests `belly`, `suitcase` or `table`.

## Rule: Suggestions must have a matching step definition

It isn't enough to type something that matches an existing step -
the existing step must also have a matching step definition.

### Example: Nothing matches

* Given the following Gherkin step texts exist:
  | Gherkin Step                |
  | --------------------------- |
  | I have 42 cukes in my belly |
* And the following Step Definitions exist:
  | Step Definition Expression |
  | -------------------------- |
  | Something else             |
* When I type "cukes"
* Then the suggestions should be empty

## Implementation

This library consists of three parts

* Step Documents
* Search Index
* Presentation

### Step Documents

A `StepDocument` is a representation of an existing Gherkin step, with known possible permutations
of its *parameters*.

Here is an example of a `StepDocument`:

`["I have ", ["42", "54"], " cukes in my ", ["basket", "belly"]]`

That document has the following plain-text permutations:

* `I have 42 cukes in my basket`
* `I have 54 cukes in my basket`
* `I have 42 cukes in my belly`
* `I have 54 cukes in my belly`

The `buildStepDocuments` function takes an array of Gherkin Step texts and another array of Cucumber/Regular Expressions.
and returns an array of `StepDocument`.

The Gherkin Step texts and Cucumber/Regular Expressions can be extracted from a stream of 
[Cucumber Messages](../../messages).

### Search Index

Each `StepDocument` can be added to a *search index*. The search index will return matching
`StepDocument`s for a search term.

The index is a function with the following signature:

`type Index = (text: string) => readonly StepDocument[]`

There are three experimental search index implementations in this library:

* `fuseIndex` (based on [Fuse.js](https://fusejs.io/))
* `jsSearchIndex` (based on [JS Search](http://bvaughn.github.io/js-search/))
* `bruteForceIndex` (based on [String.prototype.includes()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes))

They are currently only in the test code, but one of them might be promoted to be part of the library at a later stage 
when we have tried them out on real data.

See the `Index.test.ts` contract test for more details about how the indexes behave.

### Presentation

The `StepDocument`s coming back from an index search can be converted to an
[LSP Completion Snippet](https://microsoft.github.io/language-server-protocol/specifications/specification-3-17/#snippet_syntax)
using the `lspCompletionSnippet` function.

For example, this `StepDocument`:

`["I have ", ["42", "54"], " cukes in my ", ["basket", "belly"]]`

becomes the following LSP Completion Snippet:

`I have ${1|42,54|} cukes in my ${2|basket,belly|}`

### Not in this library

It's beyond the scope of this library to implement an LSP server.
An LSP server could be built on this library though.

It would also be possible to build a complete in-browser auto-complete
plugin for e.g. CodeMirror by embedding this library in the UI code, and build an
index from Cucumber Messages.
