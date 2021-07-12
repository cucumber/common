# Cucumber Suggest

This library provides suggestions for Gherkin steps. It can be used to implement editor plugins.

All suggestions are based on existing Gherkin steps. 

Cucumber Expressions and Regular Expressions in Step Definitions are not suitable
for suggestions as they cannot be inserted directly into a text document as-is.

The library uses Cucumber Expressions and Regular Expressions to provide *better*
suggestions than what would have been possible using only Gherkin steps.

## Rule: Suggestions must have a matching step definition

It isn't enough to type something that matches an existing step,
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
* Then the lsp completion snippets should be empty

## Rule: Two matches

If there are multiple steps that match the same step definition,
suggest a [snippet](https://microsoft.github.io/language-server-protocol/specifications/specification-3-17/#snippet_syntax)
using suggestions from all steps.

### Example: Two steps matching the same step definitiom

* Given the following Gherkin steps exist:
  | Gherkin Step                   |
  | ------------------------------ |
  | I have 23 cukes in my belly    |
  | I have 11 cukes on my table    |
  | I have 11 cukes in my suitcase |
* And the following Step Definitions exist:
  | Step Definition Expression         |
  | ---------------------------------- |
  | I have {int} cukes in/on my {word} |
* When I type "cukes"
* Then the lsp completion snippets should be:
  | LSP Completion Snippet                                        |
  | ------------------------------------------------------------- |
  | I have ${1\|11,23\|} cukes in my ${2\|belly,suitcase,table\|} |
  | I have ${1\|11,23\|} cukes on my ${2\|belly,suitcase,table\|} |

## Implementation

The suggest functionality in this module consists of two parts:

* Permutation Expressions
* Search Index

### Permutation Expressions

A `PermutationExpression` is a compact representation of permutations of the same sentence.
The *vocabulary* of the search index is based on a set of `PermutationExpression`.

Here is an example of a `PermutationExpression`:

`["I have ", ["42", "54"], " cukes in my ", ["basket", "belly"]]`

The possible permutations of this expression are:

* `I have 42 cukes in my basket`
* `I have 54 cukes in my basket`
* `I have 42 cukes in my belly`
* `I have 54 cukes in my belly`

A `PermutationExpression` can be converted to a string using the `lspSnippet` function:

`I have ${1|42,54|} cukes in my ${2|basket,belly|}`

This is the syntax used for IntelliSense auto-complete
[snippets](https://microsoft.github.io/language-server-protocol/specifications/specification-3-17/#snippet_syntax)

A `PermutationExcpression` can also be used to update an *index* that can be used to look up matches
for what a user types. For example, if they type `cuke`, the index would return matches based on the
permutation expression above.

The `buildPermutationExpressions` function can be used to build an array of `PermutationExpression`
from Gherkin steps and Step Definitions (Cucumber Expressions and Regular Expressions).

### Search Index

A set of `PermutationExpression`s can be used to build a search index. There are several
[algorithms](https://futurice.com/blog/data-structures-for-fast-autocomplete) for building efficient
search indexes. The `bruteForceIndex`
