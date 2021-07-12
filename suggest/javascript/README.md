# Cucumber Suggest

This library provides logic for building an index that can provide autocomplete
suggestions for Gherkin steps. 

The library uses a combination of *Gherkin Steps* and *Step Definitions*
(their Cucumber Expressions and Regular Expressions) to build a *vocabulary* that can be used 
to build a search index.

The examples below illustrate how the library works from the perspective of a user. 
The suggestions in the examples use the
[LSP Completion Snippet syntax](https://microsoft.github.io/language-server-protocol/specifications/specification-3-17/#snippet_syntax)
to represent search results.

## Rule: Two matches

If there are multiple steps that match the same step definition,
suggest a 
using suggestions from all steps.

### Example: Two steps matching the same step definitiom

* Given the following Gherkin steps exist:
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
[Visual Studio Code](https://code.visualstudio.com/) will display these suggestions
as `I have {int} cukes in my {word}` and `I have {int} cukes on my {word}`.

When the user chooses a suggestion, the editor will focus the editor at the first parameter and
suggest `11` or `23`. When the user has made a choice, the focus will move to the next
parameter and suggest `belly`, `suitcase` or `table`.

## Rule: Suggestions must have a matching step definition

It isn't enough to type something that matches an existing step -
the existing step must also have a matching step definition.

### Example: Nothing matches

* Given the following Gherkin steps exist:
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

The suggest functionality in this module consists of two parts:

* Permutation Expressions
* Search Index

The library itself is not dependent on [LSP](https://microsoft.github.io/language-server-protocol/),
but it can be used to build an LSP server.

### Permutation Expressions

A `PermutationExpression` is a partial *vocabulary* that can be used to build a search index.
It is a compact representation of permutations of existing Gherkin steps.

Here is an example of a `PermutationExpression`:

`["I have ", ["42", "54"], " cukes in my ", ["basket", "belly"]]`

The possible permutations of this expression are:

* `I have 42 cukes in my basket`
* `I have 54 cukes in my basket`
* `I have 42 cukes in my belly`
* `I have 54 cukes in my belly`

A `PermutationExpression` can be converted to an *LSP Completion Snippet* using the `lspCompletionSnippet` function:

`I have ${1|42,54|} cukes in my ${2|basket,belly|}`

A `PermutationExcpression` can also be used to update an *index* that can be used to look up matches
for what a user types. For example, if they type `cuke`, the index would return matches based on the
permutation expression above.

The `buildPermutationExpressions` function can be used to build an array of `PermutationExpression`
from Gherkin Steps and Step Definitions (Cucumber Expressions and Regular Expressions).

### Search Index

A Search Index can be built by passing all the Gherkin Step texts and Step Definition expressions
to the `buildPermutationExpressions` to obtain a set of `PermutationExpression`s.

These expressions (which represent the entire vocabulary for auto-completion) can then be used to 
build a search index. 

The index is a function with the following signature:

`type Index = (text: string) => readonly PermutationExpression[]`

It takes a string (what the user has typed) as input, and returns a list of matching `PermutationExpression`.
Depending on the environment, they can be presented in different ways (for example in an LSP environment
they would each be converted to a snippet using `lspCompletionSnippet`).

There are several
[algorithms](https://futurice.com/blog/data-structures-for-fast-autocomplete) for building efficient
search indexes. The `bruteForceIndex` function builds a functional, but not very performant
index.

See the `Index.test.ts` file for more details about how the index should behave. This should
be the basis for more performant index implementations.
