# CSS map

Overview of the semantic CSS classes. They should all be prefixed with `cucumber-` to avoid conflicts in integration.

## Gherkin document

Here are the classes used when rendering a `GherkinDocument`.

### Generic elements

Some CSS classes can be applied to multiple places:

 * `cucumber-title`: title for a `Feature`, `Scenario`, `Background` or `Rule`
 * `cucumber-title__keyword`: the keyword of a title
 * `cucumber-title__text`: the text of a title
 * `cucumber-description`: description for the same elements
 * `cucumber-tags`: list of element tags
 * `cucumber-tag`: single tag
 * `cucumber-children`: list of children for a `Feature` or a `Rule`
 * `cucumber-steps`: list of steps
 * `cucumber-step`: single step
 * `cucumber-step__status`: the status of the step
 * `cucumber-step__content`: the content of the step (keyword, text, parameters, attachments ...)
 * `cucumber-step__keyword`: the keyword of a step
 * `cucumber-step__param`: a parameter of a step
 * `cucumber-step__text`: the text of a step
 * `cucumber-table`: a Table rendered by cucumber-react. Can be either `Examples` or `datatable`
 * `cucumber-code`: code rendered (either `docstring` or attachment logs)
 * `cucumber-status`: the status of a step or a Feature
 * `cucumber-status-<status name>`: a specific status

### Specific class by element in the AST

 * `cucumber-feature`: container for a `Feature`
 * `cucumber-background`: container for a `Background`
 * `cucumber-scenario`: container for a `Scenario`
 * `cucumber-rule`: container for a `Rule`
 * `cucumber-examples`: containers for lisst of `Examples`
 * `cucumber-examples-table`: apply for an `Examples` table
 * `cucumber-datatable`: apply for a datatable argument
 * `cucumber-docstring`: apply for a docstring argument

### Other specific elements

 * `cucumber-attachments`: container for the step attachments
 * `cucumber-attachment`: a single attachment
 * `cucumber-attachment__text`: a text attachment
 * `cucumber-attachment__image`: an image attachment
 * `cucumber-error`: an error message
 * `cucumber-anchor`: anchor + link to easily point to a specific part of the document
 * `cucumber-anchor__link`: the link to the anchor
 * `cucumber-anchor__icon`: the icon used to find the link
 * `cucumber-no-documents`: a text displayed when no document can be displayed