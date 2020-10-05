# Gherkin Markdown

Gherkin Markdown is not a Markdown dialect per se, but rather a set of rules for
extracting scenarios from Markdown documents.

The rules are as follows:

- `#` - Feature
- `##` - Scenario, Background or Rule, depending on context
- `###` - Examples, Scenario or Background, depending on context
- `####` - Examples
- `* {Keyword}` - Given, When, Then, And and But
- `|` - Tables (DataTable and ExamplesTable)
- `\`\`\`` - DocString
- `>` - prefix for @tags

Here are some example documents:

* TODO
* TODO

## HTML rendering

Since Gherkin Markdown is just Markdown, any Markdown engine (such as GitHub where you are
probably reading this) can turn it into HTML, which is handy.

Here is an actual example:

* Given I have 5 apples
* When I eat 1 apple
* Then I should have 2 apples

There is obviously an error here, but how obvious is it really? Wouldn't it
be more obvious if the last step were red?

With Cucumber Reports you can. Set `CUCUMBER_PUBLISH_ENABLED=1` in your terminal,
run Cucumber and see your Markdown document rendered with colourful results,
attachments ans more.
