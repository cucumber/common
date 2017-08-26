# Metadata

Cucumber metadata is a mechanism and format for enriching executable
specification documents (written in Gherkin, Markdown, or another format) 
with extra information.

Typical consumers of Cucumber metadata are reporting and analysis tools that
render the original specification documents enriched with the extra information
from the metadata.

Metadata information may originate from Cucumber (RESULTS, STACK_TRACES,
STEP_DEFINITIONS, SCREEN_SHOTS etc), but it may also originate from other
sources (such as linting tools or other 3rd-party tools).

The format defines a minimal set of properties that must be present (in order to
locate where in the document it belongs), and can be extended by adding custom
properties.

Metadata is represented in JSON and is a list of objects with the following
properties:

* `path` (Path to the document)
* `line` (1-indexed)
* `column` (1-indexed, optional)
* `timestamp` (When was the metadata created, in milliseconds since epoch)
* `mimetype` (What kind of metadata is this)

Additional `mimetype`-specific properties MUST be added in order to provide the actual
metadata.

## MIME types

All metadata MUST have a MIME type associated with it so that consumers can
process them accordingly.

Cucumber defines the following MIME types:

* `application/json+cucumber-step-definition`
* `text/plain+cucumber-stack-trace`
* `text/plain+cucumber-logging`

## Format

To illustrate the format, consider the following
Gherkin document at path `features/hello.feature`:

```gherkin
Feature: Hello
  Scenario: Eat
    Given I have 12 cukes
```

Now assume there is a step definition with regular expression `/I have (\d+) cukes/`.

Cucumber should produce the following metadata for step definitions:

```json
{
  "metadata": [
    {
      "path": "features/hello.feature",
      "line": 3,
      "mime-type": "application/json+cucumber-step-definition",
      "cucumber-step-definition": {
        "matches": [
          {
            "column": 18,
            "text": "12"
          }
        ]
      }
    }
  ]
}
```

A reporting tool could use this to render the Gherkin document in HTML,
highlighting the word *12*.

In order to do this, the reporting tool could parse the original specification
document before rendering.
