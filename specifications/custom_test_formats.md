# Custom Test Formats

Cucumber has historically only supported Gherkin as the format for writing tests.

We want to extend Cucumber to support additional formats for writing tests:

* Markdown
* Excel
* Custom

It should be possible to implement support for a new format without making changes to Cucumber itself. This means there has to be a clearly defined
protocol for:

* Translating a custom test format to a format Cucumber understands
* Processing results from Cucumber and present them "close to the source"

Let's take Markdown as an example. A custom Markdown parser must be able to detect tests in a Markdown document. This can be text from a regular paragraph (perhaps recognised by matching against step definitions). It can also be tables in the Markdown document.

The custom Markdown parser must "compile" the interesting bits from the Markdown document into the format that Cucumber understands (pickles).

When Cucumber executes a pickle (which is essentially a test), it will report the results in a format that is defined by Cucumber. These results must then be processed and translated into a representation that can be displayed close to the source.

From a user's perspective there are three activities:

## Formulation

Create or edit a test in a Markdown editor. It's important that the user can use whatever editor they want here - a text editor, a WYSIWYG desktop editor with Markdown support, or something served by a webapp (local or remote).

## Execution

When the user has made the edits they want, they should be able to execute the test(s). Ideally this is done from within the editor. This suggests a custom editor, or at least a plugin to existing editors. All that's needed is a button.

There should also be a way to run tests from the command line, so it can be integrated into developer workflows and build/CI tools.

## Reporting

When the tests have executed, the user should be able to easily see whether their tests passed or failed. Ideally they would see this in the same editor they used to author the test.

With Markdown, there are a few different ways to do this.

### Annotated copy

The reporter could combine the original Markdown document with the test results and produce a new Markdown document with embedded results.

The advantage of this approach is that the annotated copy can be rendered by any Markdown processor. 

The disadvantage is that Markdown offers no support for colours, so it wouldn't be easy to see "coloured" results. It would also be difficult to show/hide details (such as stack traces).

### Render overlay

This approach takes advantage of JavaScript to alter the DOM of a HTML rendering of the original source.

The advantage of this approach is a colourful and interactive way to 
