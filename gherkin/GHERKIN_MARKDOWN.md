# Gherkin Markdown

Gherkin Markdown lets you write Cucumber scenarios in Markdown. Plain and simple.

The Gherkin Markdown parser looks for Gherkin keywords in the Markdown document and
ignores lines that don't match the grammar.

The parsing rules are as follows:

- The following keywords (and their translations) must be preceded by *one or more* `#` (Markdown header). Examples:
  - `# Feature`
  - `# Background`
  - `# Rule`
  - `# Scenario`
  - `# Scenario Outline`
  - `# Examples`
- The following step keywords (and their translations) must be preceded by a `-` or `*` (Markdown list item). Examples:
  - `* Given`
  - `* When`
  - `* Then`
  - `* And`
  - `* But`
- Data Tables and `Examples` tables use the [GFM table](https://github.github.com/gfm/#tables-extension-) syntax.
- Doc Strings use the [GFM fenced code blocks](https://github.github.com/gfm/#fenced-code-blocks) syntax.
- Tags must be wrapped by single \` on each side, for example `` `@hello` ``

## HTML rendering

Gherkin Markdown is just [GFM](https://github.github.com/gfm/), so any Markdown engine with support for GFM can render it as HTML.

The [@cucumber/react](../react/javascript) library as well as https://reports.cucumber.io will render
Markdown documents as HTML too, but it will *also* render results.
