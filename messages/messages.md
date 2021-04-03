# Protocol Documentation
<a name="top"></a>

## Table of Contents

- [messages.proto](#messages.proto)
    - [Attachment](#io.cucumber.messages.Attachment)
    - [Duration](#io.cucumber.messages.Duration)
    - [Envelope](#io.cucumber.messages.Envelope)
    - [GherkinDocument](#io.cucumber.messages.GherkinDocument)
    - [GherkinDocument.Comment](#io.cucumber.messages.GherkinDocument.Comment)
    - [GherkinDocument.Feature](#io.cucumber.messages.GherkinDocument.Feature)
    - [GherkinDocument.Feature.Background](#io.cucumber.messages.GherkinDocument.Feature.Background)
    - [GherkinDocument.Feature.FeatureChild](#io.cucumber.messages.GherkinDocument.Feature.FeatureChild)
    - [GherkinDocument.Feature.FeatureChild.Rule](#io.cucumber.messages.GherkinDocument.Feature.FeatureChild.Rule)
    - [GherkinDocument.Feature.FeatureChild.RuleChild](#io.cucumber.messages.GherkinDocument.Feature.FeatureChild.RuleChild)
    - [GherkinDocument.Feature.Scenario](#io.cucumber.messages.GherkinDocument.Feature.Scenario)
    - [GherkinDocument.Feature.Scenario.Examples](#io.cucumber.messages.GherkinDocument.Feature.Scenario.Examples)
    - [GherkinDocument.Feature.Step](#io.cucumber.messages.GherkinDocument.Feature.Step)
    - [GherkinDocument.Feature.Step.DataTable](#io.cucumber.messages.GherkinDocument.Feature.Step.DataTable)
    - [GherkinDocument.Feature.Step.DocString](#io.cucumber.messages.GherkinDocument.Feature.Step.DocString)
    - [GherkinDocument.Feature.TableRow](#io.cucumber.messages.GherkinDocument.Feature.TableRow)
    - [GherkinDocument.Feature.TableRow.TableCell](#io.cucumber.messages.GherkinDocument.Feature.TableRow.TableCell)
    - [GherkinDocument.Feature.Tag](#io.cucumber.messages.GherkinDocument.Feature.Tag)
    - [Hook](#io.cucumber.messages.Hook)
    - [Location](#io.cucumber.messages.Location)
    - [Meta](#io.cucumber.messages.Meta)
    - [Meta.CI](#io.cucumber.messages.Meta.CI)
    - [Meta.CI.Git](#io.cucumber.messages.Meta.CI.Git)
    - [Meta.Product](#io.cucumber.messages.Meta.Product)
    - [ParameterType](#io.cucumber.messages.ParameterType)
    - [ParseError](#io.cucumber.messages.ParseError)
    - [Pickle](#io.cucumber.messages.Pickle)
    - [Pickle.PickleStep](#io.cucumber.messages.Pickle.PickleStep)
    - [Pickle.PickleTag](#io.cucumber.messages.Pickle.PickleTag)
    - [PickleStepArgument](#io.cucumber.messages.PickleStepArgument)
    - [PickleStepArgument.PickleDocString](#io.cucumber.messages.PickleStepArgument.PickleDocString)
    - [PickleStepArgument.PickleTable](#io.cucumber.messages.PickleStepArgument.PickleTable)
    - [PickleStepArgument.PickleTable.PickleTableRow](#io.cucumber.messages.PickleStepArgument.PickleTable.PickleTableRow)
    - [PickleStepArgument.PickleTable.PickleTableRow.PickleTableCell](#io.cucumber.messages.PickleStepArgument.PickleTable.PickleTableRow.PickleTableCell)
    - [Source](#io.cucumber.messages.Source)
    - [SourceReference](#io.cucumber.messages.SourceReference)
    - [SourceReference.JavaMethod](#io.cucumber.messages.SourceReference.JavaMethod)
    - [SourceReference.JavaStackTraceElement](#io.cucumber.messages.SourceReference.JavaStackTraceElement)
    - [StepDefinition](#io.cucumber.messages.StepDefinition)
    - [StepDefinition.StepDefinitionPattern](#io.cucumber.messages.StepDefinition.StepDefinitionPattern)
    - [TestCase](#io.cucumber.messages.TestCase)
    - [TestCase.TestStep](#io.cucumber.messages.TestCase.TestStep)
    - [TestCase.TestStep.StepMatchArgumentsList](#io.cucumber.messages.TestCase.TestStep.StepMatchArgumentsList)
    - [TestCase.TestStep.StepMatchArgumentsList.StepMatchArgument](#io.cucumber.messages.TestCase.TestStep.StepMatchArgumentsList.StepMatchArgument)
    - [TestCase.TestStep.StepMatchArgumentsList.StepMatchArgument.Group](#io.cucumber.messages.TestCase.TestStep.StepMatchArgumentsList.StepMatchArgument.Group)
    - [TestCaseFinished](#io.cucumber.messages.TestCaseFinished)
    - [TestCaseStarted](#io.cucumber.messages.TestCaseStarted)
    - [TestRunFinished](#io.cucumber.messages.TestRunFinished)
    - [TestRunStarted](#io.cucumber.messages.TestRunStarted)
    - [TestStepFinished](#io.cucumber.messages.TestStepFinished)
    - [TestStepFinished.TestStepResult](#io.cucumber.messages.TestStepFinished.TestStepResult)
    - [TestStepStarted](#io.cucumber.messages.TestStepStarted)
    - [Timestamp](#io.cucumber.messages.Timestamp)
    - [UndefinedParameterType](#io.cucumber.messages.UndefinedParameterType)
  
    - [Attachment.ContentEncoding](#io.cucumber.messages.Attachment.ContentEncoding)
    - [StepDefinition.StepDefinitionPattern.StepDefinitionPatternType](#io.cucumber.messages.StepDefinition.StepDefinitionPattern.StepDefinitionPatternType)
    - [TestStepFinished.TestStepResult.Status](#io.cucumber.messages.TestStepFinished.TestStepResult.Status)
  
- [Scalar Value Types](#scalar-value-types)



<a name="messages.proto"></a>
<p align="right"><a href="#top">Top</a></p>

## messages.proto



<a name="io.cucumber.messages.Attachment"></a>

### Attachment
An attachment represents any kind of data associated with a line in a
[Source](#io.cucumber.messages.Source) file. It can be used for:

* Syntax errors during parse time
* Screenshots captured and attached during execution
* Logs captured and attached during execution

It is not to be used for runtime errors raised/thrown during execution. This
is captured in `TestResult`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| source | [SourceReference](#io.cucumber.messages.SourceReference) |  |  |
| testStepId | [string](#string) |  |  |
| test_case_started_id | [string](#string) |  |  |
| body | [string](#string) |  | The body of the attachment. If `content_encoding` is `IDENTITY`, the attachment is simply the string. If it&#39;s `BASE64`, the string should be Base64 decoded to obtain the attachment. |
| media_type | [string](#string) |  | The media type of the data. This can be any valid [IANA Media Type](https://www.iana.org/assignments/media-types/media-types.xhtml) as well as Cucumber-specific media types such as `text/x.cucumber.gherkin&#43;plain` and `text/x.cucumber.stacktrace&#43;plain` |
| content_encoding | [Attachment.ContentEncoding](#io.cucumber.messages.Attachment.ContentEncoding) |  | Whether to interpret `body` &#34;as-is&#34; (IDENTITY) or if it needs to be Base64-decoded (BASE64).

Content encoding is *not* determined by the media type, but rather by the type of the object being attached:

- string =&gt; IDENTITY - byte array =&gt; BASE64 - stream =&gt; BASE64 |
| file_name | [string](#string) |  | Suggested file name of the attachment. (Provided by the user as an argument to `attach`) |
| url | [string](#string) |  | A URL where the attachment can be retrieved. This field should not be set by Cucumber. It should be set by a program that reads a message stream and does the following for each Attachment message:

- Writes the body (after base64 decoding if necessary) to a new file. - Sets `body` and `content_encoding` to `null` - Writes out the new attachment message

This will result in a smaller message stream, which can improve performance and reduce bandwidth of message consumers. It also makes it easier to process and download attachments separately from reports. |






<a name="io.cucumber.messages.Duration"></a>

### Duration
The structure is pretty close of the Timestamp one. For clarity, a second type
of message is used.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| seconds | [int64](#int64) |  |  |
| nanos | [int32](#int32) |  | Non-negative fractions of a second at nanosecond resolution. Negative second values with fractions must still have non-negative nanos values that count forward in time. Must be from 0 to 999,999,999 inclusive. |






<a name="io.cucumber.messages.Envelope"></a>

### Envelope
All the messages that are passed between different components/processes are Envelope
messages.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| source | [Source](#io.cucumber.messages.Source) |  | Gherkin |
| gherkin_document | [GherkinDocument](#io.cucumber.messages.GherkinDocument) |  |  |
| pickle | [Pickle](#io.cucumber.messages.Pickle) |  | Compiler(s) |
| step_definition | [StepDefinition](#io.cucumber.messages.StepDefinition) |  |  |
| hook | [Hook](#io.cucumber.messages.Hook) |  |  |
| parameter_type | [ParameterType](#io.cucumber.messages.ParameterType) |  |  |
| test_case | [TestCase](#io.cucumber.messages.TestCase) |  |  |
| undefined_parameter_type | [UndefinedParameterType](#io.cucumber.messages.UndefinedParameterType) |  |  |
| test_run_started | [TestRunStarted](#io.cucumber.messages.TestRunStarted) |  | Execution |
| test_case_started | [TestCaseStarted](#io.cucumber.messages.TestCaseStarted) |  |  |
| test_step_started | [TestStepStarted](#io.cucumber.messages.TestStepStarted) |  |  |
| attachment | [Attachment](#io.cucumber.messages.Attachment) |  |  |
| test_step_finished | [TestStepFinished](#io.cucumber.messages.TestStepFinished) |  |  |
| test_case_finished | [TestCaseFinished](#io.cucumber.messages.TestCaseFinished) |  |  |
| test_run_finished | [TestRunFinished](#io.cucumber.messages.TestRunFinished) |  |  |
| parse_error | [ParseError](#io.cucumber.messages.ParseError) |  | Parsing |
| meta | [Meta](#io.cucumber.messages.Meta) |  |  |






<a name="io.cucumber.messages.GherkinDocument"></a>

### GherkinDocument
The [AST](https://en.wikipedia.org/wiki/Abstract_syntax_tree) of a Gherkin document.
Cucumber implementations should *not* depend on `GherkinDocument` or any of its
children for execution - use [Pickle](#io.cucumber.messages.Pickle) instead.

The only consumers of `GherkinDocument` should only be formatters that produce
&#34;rich&#34; output, resembling the original Gherkin document.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| uri | [string](#string) |  | The [URI](https://en.wikipedia.org/wiki/Uniform_Resource_Identifier) of the source, typically a file path relative to the root directory |
| feature | [GherkinDocument.Feature](#io.cucumber.messages.GherkinDocument.Feature) |  |  |
| comments | [GherkinDocument.Comment](#io.cucumber.messages.GherkinDocument.Comment) | repeated | All the comments in the Gherkin document |






<a name="io.cucumber.messages.GherkinDocument.Comment"></a>

### GherkinDocument.Comment
A comment in a Gherkin document


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| location | [Location](#io.cucumber.messages.Location) |  | The location of the comment |
| text | [string](#string) |  | The text of the comment |






<a name="io.cucumber.messages.GherkinDocument.Feature"></a>

### GherkinDocument.Feature
The top level node in the AST


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| location | [Location](#io.cucumber.messages.Location) |  | The location of the `Feature` keyword |
| tags | [GherkinDocument.Feature.Tag](#io.cucumber.messages.GherkinDocument.Feature.Tag) | repeated | All the tags placed above the `Feature` keyword |
| language | [string](#string) |  | The [ISO 639-1](https://en.wikipedia.org/wiki/ISO_639-1) language code of the Gherkin document |
| keyword | [string](#string) |  | The text of the `Feature` keyword (in the language specified by `language`) |
| name | [string](#string) |  | The name of the feature (the text following the `keyword`) |
| description | [string](#string) |  | The line(s) underneath the line with the `keyword` that are used as description |
| children | [GherkinDocument.Feature.FeatureChild](#io.cucumber.messages.GherkinDocument.Feature.FeatureChild) | repeated | Zero or more children |






<a name="io.cucumber.messages.GherkinDocument.Feature.Background"></a>

### GherkinDocument.Feature.Background



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| location | [Location](#io.cucumber.messages.Location) |  | The location of the `Background` keyword |
| keyword | [string](#string) |  |  |
| name | [string](#string) |  |  |
| description | [string](#string) |  |  |
| steps | [GherkinDocument.Feature.Step](#io.cucumber.messages.GherkinDocument.Feature.Step) | repeated |  |
| id | [string](#string) |  |  |






<a name="io.cucumber.messages.GherkinDocument.Feature.FeatureChild"></a>

### GherkinDocument.Feature.FeatureChild
A child node of a `Feature` node


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| rule | [GherkinDocument.Feature.FeatureChild.Rule](#io.cucumber.messages.GherkinDocument.Feature.FeatureChild.Rule) |  |  |
| background | [GherkinDocument.Feature.Background](#io.cucumber.messages.GherkinDocument.Feature.Background) |  |  |
| scenario | [GherkinDocument.Feature.Scenario](#io.cucumber.messages.GherkinDocument.Feature.Scenario) |  |  |






<a name="io.cucumber.messages.GherkinDocument.Feature.FeatureChild.Rule"></a>

### GherkinDocument.Feature.FeatureChild.Rule
A `Rule` node


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| location | [Location](#io.cucumber.messages.Location) |  | The location of the `Rule` keyword |
| keyword | [string](#string) |  |  |
| name | [string](#string) |  |  |
| description | [string](#string) |  |  |
| children | [GherkinDocument.Feature.FeatureChild.RuleChild](#io.cucumber.messages.GherkinDocument.Feature.FeatureChild.RuleChild) | repeated |  |
| id | [string](#string) |  |  |
| tags | [GherkinDocument.Feature.Tag](#io.cucumber.messages.GherkinDocument.Feature.Tag) | repeated |  |






<a name="io.cucumber.messages.GherkinDocument.Feature.FeatureChild.RuleChild"></a>

### GherkinDocument.Feature.FeatureChild.RuleChild



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| background | [GherkinDocument.Feature.Background](#io.cucumber.messages.GherkinDocument.Feature.Background) |  |  |
| scenario | [GherkinDocument.Feature.Scenario](#io.cucumber.messages.GherkinDocument.Feature.Scenario) |  |  |






<a name="io.cucumber.messages.GherkinDocument.Feature.Scenario"></a>

### GherkinDocument.Feature.Scenario



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| location | [Location](#io.cucumber.messages.Location) |  | The location of the `Scenario` keyword |
| tags | [GherkinDocument.Feature.Tag](#io.cucumber.messages.GherkinDocument.Feature.Tag) | repeated |  |
| keyword | [string](#string) |  |  |
| name | [string](#string) |  |  |
| description | [string](#string) |  |  |
| steps | [GherkinDocument.Feature.Step](#io.cucumber.messages.GherkinDocument.Feature.Step) | repeated |  |
| examples | [GherkinDocument.Feature.Scenario.Examples](#io.cucumber.messages.GherkinDocument.Feature.Scenario.Examples) | repeated |  |
| id | [string](#string) |  |  |






<a name="io.cucumber.messages.GherkinDocument.Feature.Scenario.Examples"></a>

### GherkinDocument.Feature.Scenario.Examples



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| location | [Location](#io.cucumber.messages.Location) |  | The location of the `Examples` keyword |
| tags | [GherkinDocument.Feature.Tag](#io.cucumber.messages.GherkinDocument.Feature.Tag) | repeated |  |
| keyword | [string](#string) |  |  |
| name | [string](#string) |  |  |
| description | [string](#string) |  |  |
| table_header | [GherkinDocument.Feature.TableRow](#io.cucumber.messages.GherkinDocument.Feature.TableRow) |  |  |
| table_body | [GherkinDocument.Feature.TableRow](#io.cucumber.messages.GherkinDocument.Feature.TableRow) | repeated |  |
| id | [string](#string) |  |  |






<a name="io.cucumber.messages.GherkinDocument.Feature.Step"></a>

### GherkinDocument.Feature.Step
A step


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| location | [Location](#io.cucumber.messages.Location) |  | The location of the steps&#39; `keyword` |
| keyword | [string](#string) |  |  |
| text | [string](#string) |  |  |
| doc_string | [GherkinDocument.Feature.Step.DocString](#io.cucumber.messages.GherkinDocument.Feature.Step.DocString) |  |  |
| data_table | [GherkinDocument.Feature.Step.DataTable](#io.cucumber.messages.GherkinDocument.Feature.Step.DataTable) |  |  |
| id | [string](#string) |  | Unique ID to be able to reference the Step from PickleStep |






<a name="io.cucumber.messages.GherkinDocument.Feature.Step.DataTable"></a>

### GherkinDocument.Feature.Step.DataTable



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| location | [Location](#io.cucumber.messages.Location) |  |  |
| rows | [GherkinDocument.Feature.TableRow](#io.cucumber.messages.GherkinDocument.Feature.TableRow) | repeated |  |






<a name="io.cucumber.messages.GherkinDocument.Feature.Step.DocString"></a>

### GherkinDocument.Feature.Step.DocString



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| location | [Location](#io.cucumber.messages.Location) |  |  |
| media_type | [string](#string) |  |  |
| content | [string](#string) |  |  |
| delimiter | [string](#string) |  |  |






<a name="io.cucumber.messages.GherkinDocument.Feature.TableRow"></a>

### GherkinDocument.Feature.TableRow
A row in a table


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| location | [Location](#io.cucumber.messages.Location) |  | The location of the first cell in the row |
| cells | [GherkinDocument.Feature.TableRow.TableCell](#io.cucumber.messages.GherkinDocument.Feature.TableRow.TableCell) | repeated | Cells in the row |
| id | [string](#string) |  |  |






<a name="io.cucumber.messages.GherkinDocument.Feature.TableRow.TableCell"></a>

### GherkinDocument.Feature.TableRow.TableCell
A cell in a `TableRow`


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| location | [Location](#io.cucumber.messages.Location) |  | The location of the cell |
| value | [string](#string) |  | The value of the cell |






<a name="io.cucumber.messages.GherkinDocument.Feature.Tag"></a>

### GherkinDocument.Feature.Tag
A tag


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| location | [Location](#io.cucumber.messages.Location) |  | Location of the tag |
| name | [string](#string) |  | The name of the tag (including the leading `@`) |
| id | [string](#string) |  | Unique ID to be able to reference the Tag from PickleTag |






<a name="io.cucumber.messages.Hook"></a>

### Hook



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [string](#string) |  |  |
| tag_expression | [string](#string) |  |  |
| source_reference | [SourceReference](#io.cucumber.messages.SourceReference) |  |  |






<a name="io.cucumber.messages.Location"></a>

### Location
Points to a line and a column in a text file


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| line | [uint32](#uint32) |  |  |
| column | [uint32](#uint32) |  |  |






<a name="io.cucumber.messages.Meta"></a>

### Meta
This message contains meta information about the environment. Consumers can use
this for various purposes.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| protocol_version | [string](#string) |  | The [SEMVER](https://semver.org/) version number of the protocol |
| implementation | [Meta.Product](#io.cucumber.messages.Meta.Product) |  | SpecFlow, Cucumber-JVM, Cucumber.js, Cucumber-Ruby, Behat etc. |
| runtime | [Meta.Product](#io.cucumber.messages.Meta.Product) |  | Java, Ruby, Node.js etc |
| os | [Meta.Product](#io.cucumber.messages.Meta.Product) |  | Windows, Linux, MacOS etc |
| cpu | [Meta.Product](#io.cucumber.messages.Meta.Product) |  | 386, arm, amd64 etc |
| ci | [Meta.CI](#io.cucumber.messages.Meta.CI) |  | CI environment |






<a name="io.cucumber.messages.Meta.CI"></a>

### Meta.CI



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| name | [string](#string) |  | Name of the CI product, e.g. &#34;Jenkins&#34;, &#34;CircleCI&#34; etc. |
| url | [string](#string) |  | Link to the build |
| git | [Meta.CI.Git](#io.cucumber.messages.Meta.CI.Git) |  | Information about Git, provided by the Build/CI server as environment variables. |






<a name="io.cucumber.messages.Meta.CI.Git"></a>

### Meta.CI.Git



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| remote | [string](#string) |  |  |
| revision | [string](#string) |  |  |
| branch | [string](#string) |  |  |
| tag | [string](#string) |  |  |






<a name="io.cucumber.messages.Meta.Product"></a>

### Meta.Product
A product has a name and a version


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| name | [string](#string) |  | The product name |
| version | [string](#string) |  | The product version |






<a name="io.cucumber.messages.ParameterType"></a>

### ParameterType



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| name | [string](#string) |  | The name is unique, so we don&#39;t need an id. |
| regular_expressions | [string](#string) | repeated |  |
| prefer_for_regular_expression_match | [bool](#bool) |  |  |
| use_for_snippets | [bool](#bool) |  |  |
| id | [string](#string) |  |  |






<a name="io.cucumber.messages.ParseError"></a>

### ParseError



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| source | [SourceReference](#io.cucumber.messages.SourceReference) |  |  |
| message | [string](#string) |  |  |






<a name="io.cucumber.messages.Pickle"></a>

### Pickle
A `Pickle` represents a template for a `TestCase`. It is typically derived
from another format, such as [GherkinDocument](#io.cucumber.messages.GherkinDocument).
In the future a `Pickle` may be derived from other formats such as Markdown or
Excel files.

By making `Pickle` the main data structure Cucumber uses for execution, the
implementation of Cucumber itself becomes simpler, as it doesn&#39;t have to deal
with the complex structure of a [GherkinDocument](#io.cucumber.messages.GherkinDocument).

Each `PickleStep` of a `Pickle` is matched with a `StepDefinition` to create a `TestCase`


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [string](#string) |  | A unique id for the pickle. This is a [SHA1](https://en.wikipedia.org/wiki/SHA-1) hash from the source data and the `locations` of the pickle. This ID will change if source the file is modified. |
| uri | [string](#string) |  | The uri of the source file |
| name | [string](#string) |  | The name of the pickle |
| language | [string](#string) |  | The language of the pickle |
| steps | [Pickle.PickleStep](#io.cucumber.messages.Pickle.PickleStep) | repeated | One or more steps |
| tags | [Pickle.PickleTag](#io.cucumber.messages.Pickle.PickleTag) | repeated | One or more tags. If this pickle is constructed from a Gherkin document, It includes inherited tags from the `Feature` as well. |
| ast_node_ids | [string](#string) | repeated | Points to the AST node locations of the pickle. The last one represents the unique id of the pickle. A pickle constructed from `Examples` will have the first id originating from the `Scenario` AST node, and the second from the `TableRow` AST node. |






<a name="io.cucumber.messages.Pickle.PickleStep"></a>

### Pickle.PickleStep
An executable step


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| text | [string](#string) |  |  |
| argument | [PickleStepArgument](#io.cucumber.messages.PickleStepArgument) |  | An optional argument |
| id | [string](#string) |  | A unique ID for the PickleStep |
| ast_node_ids | [string](#string) | repeated | References the IDs of the source of the step. For Gherkin, this can be the ID of a Step, and possibly also the ID of a TableRow |






<a name="io.cucumber.messages.Pickle.PickleTag"></a>

### Pickle.PickleTag
A tag


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| name | [string](#string) |  |  |
| ast_node_id | [string](#string) |  | Points to the AST node this was created from |






<a name="io.cucumber.messages.PickleStepArgument"></a>

### PickleStepArgument
A wrapper for either a doc string or a table.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| doc_string | [PickleStepArgument.PickleDocString](#io.cucumber.messages.PickleStepArgument.PickleDocString) |  |  |
| data_table | [PickleStepArgument.PickleTable](#io.cucumber.messages.PickleStepArgument.PickleTable) |  |  |






<a name="io.cucumber.messages.PickleStepArgument.PickleDocString"></a>

### PickleStepArgument.PickleDocString



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| media_type | [string](#string) |  |  |
| content | [string](#string) |  |  |






<a name="io.cucumber.messages.PickleStepArgument.PickleTable"></a>

### PickleStepArgument.PickleTable



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| rows | [PickleStepArgument.PickleTable.PickleTableRow](#io.cucumber.messages.PickleStepArgument.PickleTable.PickleTableRow) | repeated |  |






<a name="io.cucumber.messages.PickleStepArgument.PickleTable.PickleTableRow"></a>

### PickleStepArgument.PickleTable.PickleTableRow



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| cells | [PickleStepArgument.PickleTable.PickleTableRow.PickleTableCell](#io.cucumber.messages.PickleStepArgument.PickleTable.PickleTableRow.PickleTableCell) | repeated |  |






<a name="io.cucumber.messages.PickleStepArgument.PickleTable.PickleTableRow.PickleTableCell"></a>

### PickleStepArgument.PickleTable.PickleTableRow.PickleTableCell



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| value | [string](#string) |  |  |






<a name="io.cucumber.messages.Source"></a>

### Source
A source file, typically a Gherkin document or Java/Ruby/JavaScript source code


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| uri | [string](#string) |  | The [URI](https://en.wikipedia.org/wiki/Uniform_Resource_Identifier) of the source, typically a file path relative to the root directory |
| data | [string](#string) |  | The contents of the file |
| media_type | [string](#string) |  | The media type of the file. Can be used to specify custom types, such as text/x.cucumber.gherkin&#43;plain |






<a name="io.cucumber.messages.SourceReference"></a>

### SourceReference
Points to a [Source](#io.cucumber.messages.Source) identified by `uri` and a
[Location](#io.cucumber.messages.Location) within that file.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| uri | [string](#string) |  |  |
| java_method | [SourceReference.JavaMethod](#io.cucumber.messages.SourceReference.JavaMethod) |  |  |
| java_stack_trace_element | [SourceReference.JavaStackTraceElement](#io.cucumber.messages.SourceReference.JavaStackTraceElement) |  |  |
| location | [Location](#io.cucumber.messages.Location) |  |  |






<a name="io.cucumber.messages.SourceReference.JavaMethod"></a>

### SourceReference.JavaMethod



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| class_name | [string](#string) |  |  |
| method_name | [string](#string) |  |  |
| method_parameter_types | [string](#string) | repeated |  |






<a name="io.cucumber.messages.SourceReference.JavaStackTraceElement"></a>

### SourceReference.JavaStackTraceElement



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| class_name | [string](#string) |  |  |
| method_name | [string](#string) |  |  |
| file_name | [string](#string) |  |  |






<a name="io.cucumber.messages.StepDefinition"></a>

### StepDefinition



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [string](#string) |  |  |
| pattern | [StepDefinition.StepDefinitionPattern](#io.cucumber.messages.StepDefinition.StepDefinitionPattern) |  |  |
| source_reference | [SourceReference](#io.cucumber.messages.SourceReference) |  |  |






<a name="io.cucumber.messages.StepDefinition.StepDefinitionPattern"></a>

### StepDefinition.StepDefinitionPattern



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| source | [string](#string) |  |  |
| type | [StepDefinition.StepDefinitionPattern.StepDefinitionPatternType](#io.cucumber.messages.StepDefinition.StepDefinitionPattern.StepDefinitionPatternType) |  |  |






<a name="io.cucumber.messages.TestCase"></a>

### TestCase
A `TestCase` contains a sequence of `TestStep`s.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [string](#string) |  |  |
| pickle_id | [string](#string) |  | The ID of the `Pickle` this `TestCase` is derived from. |
| test_steps | [TestCase.TestStep](#io.cucumber.messages.TestCase.TestStep) | repeated |  |






<a name="io.cucumber.messages.TestCase.TestStep"></a>

### TestCase.TestStep
A `TestStep` is derived from either a `PickleStep`
combined with a `StepDefinition`, or from a `Hook`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [string](#string) |  |  |
| pickle_step_id | [string](#string) |  | Pointer to the `PickleStep` (if derived from a PickleStep) |
| step_definition_ids | [string](#string) | repeated | Pointer to all the matching `StepDefinition`s (if derived from a PickleStep) |
| step_match_arguments_lists | [TestCase.TestStep.StepMatchArgumentsList](#io.cucumber.messages.TestCase.TestStep.StepMatchArgumentsList) | repeated | A list of list of StepMatchArgument (if derived from a `StepDefinition`). Each element represents a matching step definition. A size of 0 means `UNDEFINED`, and a size of 2&#43; means `AMBIGUOUS` |
| hook_id | [string](#string) |  | Pointer to the `Hook` (if derived from a Hook) |






<a name="io.cucumber.messages.TestCase.TestStep.StepMatchArgumentsList"></a>

### TestCase.TestStep.StepMatchArgumentsList



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| step_match_arguments | [TestCase.TestStep.StepMatchArgumentsList.StepMatchArgument](#io.cucumber.messages.TestCase.TestStep.StepMatchArgumentsList.StepMatchArgument) | repeated |  |






<a name="io.cucumber.messages.TestCase.TestStep.StepMatchArgumentsList.StepMatchArgument"></a>

### TestCase.TestStep.StepMatchArgumentsList.StepMatchArgument
Represents a single argument extracted from a step match and passed to a step definition.
This is used for the following purposes:
- Construct an argument to pass to a step definition (possibly through a parameter type transform)
- Highlight the matched parameter in rich formatters such as the HTML formatter

This message closely matches the `Argument` class in the `cucumber-expressions` library.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| parameter_type_name | [string](#string) |  |  |
| group | [TestCase.TestStep.StepMatchArgumentsList.StepMatchArgument.Group](#io.cucumber.messages.TestCase.TestStep.StepMatchArgumentsList.StepMatchArgument.Group) |  | Represents the outermost capture group of an argument. This message closely matches the `Group` class in the `cucumber-expressions` library. |






<a name="io.cucumber.messages.TestCase.TestStep.StepMatchArgumentsList.StepMatchArgument.Group"></a>

### TestCase.TestStep.StepMatchArgumentsList.StepMatchArgument.Group



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| start | [uint32](#uint32) |  |  |
| value | [string](#string) |  |  |
| children | [TestCase.TestStep.StepMatchArgumentsList.StepMatchArgument.Group](#io.cucumber.messages.TestCase.TestStep.StepMatchArgumentsList.StepMatchArgument.Group) | repeated |  |






<a name="io.cucumber.messages.TestCaseFinished"></a>

### TestCaseFinished



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| timestamp | [Timestamp](#io.cucumber.messages.Timestamp) |  |  |
| test_case_started_id | [string](#string) |  |  |






<a name="io.cucumber.messages.TestCaseStarted"></a>

### TestCaseStarted



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| timestamp | [Timestamp](#io.cucumber.messages.Timestamp) |  |  |
| attempt | [uint32](#uint32) |  | The first attempt should have value 0, and for each retry the value should increase by 1. |
| test_case_id | [string](#string) |  |  |
| id | [string](#string) |  | Because a `TestCase` can be run multiple times (in case of a retry), we use this field to group messages relating to the same attempt. |






<a name="io.cucumber.messages.TestRunFinished"></a>

### TestRunFinished



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| success | [bool](#bool) |  | success = StrictModeEnabled ? (failed_count == 0 &amp;&amp; ambiguous_count == 0 &amp;&amp; undefined_count == 0 &amp;&amp; pending_count == 0) : (failed_count == 0 &amp;&amp; ambiguous_count == 0) |
| timestamp | [Timestamp](#io.cucumber.messages.Timestamp) |  | Timestamp when the TestRun is finished |
| message | [string](#string) |  | Error message. Can be a stack trace from a failed `BeforeAll` or `AfterAll`. If there are undefined parameter types, the message is simply &#34;The following parameter type(s() are not defined: xxx, yyy&#34;. The independent `UndefinedParameterType` messages can be used to generate snippets for those parameter types. |






<a name="io.cucumber.messages.TestRunStarted"></a>

### TestRunStarted



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| timestamp | [Timestamp](#io.cucumber.messages.Timestamp) |  |  |






<a name="io.cucumber.messages.TestStepFinished"></a>

### TestStepFinished



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| test_step_result | [TestStepFinished.TestStepResult](#io.cucumber.messages.TestStepFinished.TestStepResult) |  |  |
| timestamp | [Timestamp](#io.cucumber.messages.Timestamp) |  |  |
| testStepId | [string](#string) |  |  |
| test_case_started_id | [string](#string) |  |  |






<a name="io.cucumber.messages.TestStepFinished.TestStepResult"></a>

### TestStepFinished.TestStepResult



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| status | [TestStepFinished.TestStepResult.Status](#io.cucumber.messages.TestStepFinished.TestStepResult.Status) |  |  |
| message | [string](#string) |  |  |
| duration | [Duration](#io.cucumber.messages.Duration) |  |  |
| will_be_retried | [bool](#bool) |  |  |






<a name="io.cucumber.messages.TestStepStarted"></a>

### TestStepStarted



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| timestamp | [Timestamp](#io.cucumber.messages.Timestamp) |  |  |
| testStepId | [string](#string) |  |  |
| test_case_started_id | [string](#string) |  |  |






<a name="io.cucumber.messages.Timestamp"></a>

### Timestamp
From https://github.com/protocolbuffers/protobuf/blob/master/src/google/protobuf/timestamp.proto


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| seconds | [int64](#int64) |  | Represents seconds of UTC time since Unix epoch 1970-01-01T00:00:00Z. Must be from 0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z inclusive. |
| nanos | [int32](#int32) |  | Non-negative fractions of a second at nanosecond resolution. Negative second values with fractions must still have non-negative nanos values that count forward in time. Must be from 0 to 999,999,999 inclusive. |






<a name="io.cucumber.messages.UndefinedParameterType"></a>

### UndefinedParameterType



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| name | [string](#string) |  |  |
| expression | [string](#string) |  |  |





 


<a name="io.cucumber.messages.Attachment.ContentEncoding"></a>

### Attachment.ContentEncoding


| Name | Number | Description |
| ---- | ------ | ----------- |
| IDENTITY | 0 |  |
| BASE64 | 1 | When this is used, the data field is a single line base64 string |



<a name="io.cucumber.messages.StepDefinition.StepDefinitionPattern.StepDefinitionPatternType"></a>

### StepDefinition.StepDefinitionPattern.StepDefinitionPatternType


| Name | Number | Description |
| ---- | ------ | ----------- |
| CUCUMBER_EXPRESSION | 0 |  |
| REGULAR_EXPRESSION | 1 |  |



<a name="io.cucumber.messages.TestStepFinished.TestStepResult.Status"></a>

### TestStepFinished.TestStepResult.Status
Status of a `TestStep`.

The ordinal values of statuses are significant. The status of a TestCase
is computed by picking the status with the highest value for all of its steps.

For example, if a TestCase has steps with statuses passed, undefined and skipped,
then the pickle&#39;s status is undefined.

| Name | Number | Description |
| ---- | ------ | ----------- |
| UNKNOWN | 0 | The step hasn&#39;t been matched or executed. |
| PASSED | 1 | The step matched one step definition and passed execution. |
| SKIPPED | 2 | The step matched one step definition but was not executed because the previous step was not PASSED. |
| PENDING | 3 | The step matched one step definition and signalled pending during execution. This is the default behaviour of generated step definitions, which either throw a special PendingException, or return a special value indicating that it&#39;s pending. How to signal the pending status depends on the Cucumber implementation. |
| UNDEFINED | 4 | The step matched no step definitions. |
| AMBIGUOUS | 5 | The step matched two or more step definitions. |
| FAILED | 6 | The step matched one step definition and failed execution. |


 

 

 



## Scalar Value Types

| .proto Type | Notes | C++ | Java | Python | Go | C# | PHP | Ruby |
| ----------- | ----- | --- | ---- | ------ | -- | -- | --- | ---- |
| <a name="double" /> double |  | double | double | float | float64 | double | float | Float |
| <a name="float" /> float |  | float | float | float | float32 | float | float | Float |
| <a name="int32" /> int32 | Uses variable-length encoding. Inefficient for encoding negative numbers – if your field is likely to have negative values, use sint32 instead. | int32 | int | int | int32 | int | integer | Bignum or Fixnum (as required) |
| <a name="int64" /> int64 | Uses variable-length encoding. Inefficient for encoding negative numbers – if your field is likely to have negative values, use sint64 instead. | int64 | long | int/long | int64 | long | integer/string | Bignum |
| <a name="uint32" /> uint32 | Uses variable-length encoding. | uint32 | int | int/long | uint32 | uint | integer | Bignum or Fixnum (as required) |
| <a name="uint64" /> uint64 | Uses variable-length encoding. | uint64 | long | int/long | uint64 | ulong | integer/string | Bignum or Fixnum (as required) |
| <a name="sint32" /> sint32 | Uses variable-length encoding. Signed int value. These more efficiently encode negative numbers than regular int32s. | int32 | int | int | int32 | int | integer | Bignum or Fixnum (as required) |
| <a name="sint64" /> sint64 | Uses variable-length encoding. Signed int value. These more efficiently encode negative numbers than regular int64s. | int64 | long | int/long | int64 | long | integer/string | Bignum |
| <a name="fixed32" /> fixed32 | Always four bytes. More efficient than uint32 if values are often greater than 2^28. | uint32 | int | int | uint32 | uint | integer | Bignum or Fixnum (as required) |
| <a name="fixed64" /> fixed64 | Always eight bytes. More efficient than uint64 if values are often greater than 2^56. | uint64 | long | int/long | uint64 | ulong | integer/string | Bignum |
| <a name="sfixed32" /> sfixed32 | Always four bytes. | int32 | int | int | int32 | int | integer | Bignum or Fixnum (as required) |
| <a name="sfixed64" /> sfixed64 | Always eight bytes. | int64 | long | int/long | int64 | long | integer/string | Bignum |
| <a name="bool" /> bool |  | bool | boolean | boolean | bool | bool | boolean | TrueClass/FalseClass |
| <a name="string" /> string | A string must always contain UTF-8 encoded or 7-bit ASCII text. | string | String | str/unicode | string | string | string | String (UTF-8) |
| <a name="bytes" /> bytes | May contain any arbitrary sequence of bytes. | string | ByteString | str | []byte | ByteString | string | String (ASCII-8BIT) |

