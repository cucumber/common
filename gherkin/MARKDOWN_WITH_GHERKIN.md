# Markdown with Gherkin

Markdown with Gherkin (MDG) is a dialect of Markdown that is supported by
the Gherkin parser[^1].

MDG is a strict superset of [GitHub Flavored Markdown](https://github.github.com/gfm/) (GFM).
MDG files must use the `.feature.md` extension. This is to prevent regular `.md` files from
being parsed by Gherkin, and also to provide a hint to editors.

MDG makes it possible to embed Gherkin scenarios directly in Markdown, using
conventional Markdown syntax. MDG documents can be rendered by any GFM compliant library.

The parsing rules are as follows:

- The following keywords (and their translations) must be preceded by *one or more* `#` (Markdown header). Examples:
  - `# Feature`
    - The `# Feature` header is optional in MDG. If the document doesn't start with it,
      the first line of the document will be used as the name of the feature.
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
- Data Tables and `Examples` tables use the [GFM table](https://github.github.com/gfm/#tables-extension-)
syntax. *IMPORTANT:* In order to recognise Data Tables and Examples Tables, they have to be indented 2-5 spaces. Unindented GFM tables will not be recognised as Data Tables or Examples Tables.
- Doc Strings use the [GFM fenced code blocks](https://github.github.com/gfm/#fenced-code-blocks) syntax.
- Tags must be wrapped by single \` on each side, for example `` `@hello` ``, and be placed on a line *above* the keyword (as with Gherkin Classic).

## Why Markdown with Gherkin

Markdown has become the de-facto standard for authoring rich text content in
plain text. There is a vast ecosystem of platforms and tools that support
editing and rendering of Markdown documents.

You can create beautiful documentation with Markdown, so it makes sense to
use it for [living documentation](https://leanpub.com/bddbooks-formulation).

Here is a short example that illustrates the similarities and differences between
classic Gherkin and MDG.

Classic Gherkin:

```gherkin
Feature: Staying alive
  This is about actually staying alive,
  not the Bee Gees song.

  Rule: If you don't eat you die
    ![xkcd](https://imgs.xkcd.com/comics/lunch_2x.png)

    @important @essential
    Scenario Outline: eating
      Given there are <start> cucumbers
      When I eat <eat> cucumbers
      Then I should have <left> cucumbers

      Examples:
        | start | eat | left |
        |    12 |   5 |    7 |
        |    20 |   5 |   15 |
```

Markdown with Gherkin:

```markdown
# Feature: Staying alive

This is about actually staying alive,
not the [Bee Gees song](https://www.youtube.com/watch?v=I_izvAbhExY).

## Rule: If you don't eat you die

![xkcd](https://imgs.xkcd.com/comics/lunch_2x.png)

`@important` `@essential`
### Scenario Outline: eating

* Given there are <start> cucumbers
* When I eat <eat> cucumbers
* Then I should have <left> cucumbers

#### Examples:

  | start | eat | left |
  | ----- | --- | ---- |
  |    12 |   5 |    7 |
  |    20 |   5 |   15 |

```

This Markdown document can be rendered beautifully by any GMF-compliant tool.

## Rendering MDG with results

The [@cucumber/react](../react/javascript) library provides an `<MDG>` React component that
renders a Markdown document with results coming from Cucumber (using [Cucumber Messages](../messages)).

The rendered HTML contains the original contents from the Markdown file, with
steps and scenarios coloured according to the results from the message stream.
It also renders attachments from Cucumber (screenshots, videos, logs etc).

## Some notes about parsing MDG

The same `Parser` class is used to parse Gherkin Classic documents and MDG documents, but
they use a different `TokenMatcher` (scanner/lexer).

The `GherkinInMarkdownTokenMatcher` will consider *all* lines that aren't recognised as a
special token as *Empty*. The reason for this is that Markdown documents will typically
have lines that have nothing to do with Gherkin - they are just prose.

For this reason, the `GherkinDocument` AST will have *empty description properties*. This means
that the JSON formatter will not include a `description` property for scenarios.

[^1]: Support for MDG is currently only supported in the [@cucumber/gherkin](../gherkin/javascript) (the JavaScript implementation), version `19.0.0` and above. The Cucumber team will gather feedback from users of [@cucumber/cucumber](https://www.npmjs.com/package/@cucumber/cucumber) before porting MDG to other programming languages.
