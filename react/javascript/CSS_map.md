# CSS map

Overview of the semantic CSS classes. They sshould all be prefixed with `cucumberReact-` to avoid conflicts in integration.

## Gherkin document

Here are the classes used when rendering a `GherkinDocument`.

### Generic elements

Some CSS classes can be applied to multiple places:

 * `cucumberReact-title`: title for a `Feature`, `Scenario`, `Background` or `Rule`
 * `cucumberReact-descrition`: description for the same elements
 * `cucumberReact-tags`: list of element tags
 * `cucumberReact-tag`: single tag
 * `cucumberReact-steps`: list of steps
 * `cucumberReact-step`: single step
 * `cucumberReact-table`: a Table rendered by cucumber-react. Can be either `Examples` or `datatable`
 * `cucumberReact-code`: code rendered (either `docstring` or attachment logs)
 * `cucumberReact-attachments`: container for the step attachments
 * `cucumberReact-attachment`: a single attachment
 * `cucumberReact-status`: the status of a step or a Feature

### Specific class by element in the AST

 * `cucumberReact-feature`: container for a Feature
 * `cucumberReact-background`: container for a Background
 * `cucumberReact-scenario`: container for a Scenario
 * `cucumberReact-rule`: container for a Rule
 * `cucumberReact-examples`: apply for an `Example` table
 * `cucumberReact-datatable`: apply for a datatable argument
 * `cucumberReact-docstring`: apply for a docstring argument

