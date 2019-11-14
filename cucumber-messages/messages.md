# Protocol Documentation
<a name="top"></a>

## Table of Contents

- [messages.proto](#messages.proto)
    - [Attachment](#io.cucumber.messages.Attachment)
    - [CommandActionComplete](#io.cucumber.messages.CommandActionComplete)
    - [CommandGenerateSnippet](#io.cucumber.messages.CommandGenerateSnippet)
    - [CommandInitializeTestCase](#io.cucumber.messages.CommandInitializeTestCase)
    - [CommandRunAfterTestCaseHook](#io.cucumber.messages.CommandRunAfterTestCaseHook)
    - [CommandRunAfterTestRunHooks](#io.cucumber.messages.CommandRunAfterTestRunHooks)
    - [CommandRunBeforeTestCaseHook](#io.cucumber.messages.CommandRunBeforeTestCaseHook)
    - [CommandRunBeforeTestRunHooks](#io.cucumber.messages.CommandRunBeforeTestRunHooks)
    - [CommandRunTestStep](#io.cucumber.messages.CommandRunTestStep)
    - [CommandStart](#io.cucumber.messages.CommandStart)
    - [Duration](#io.cucumber.messages.Duration)
    - [Envelope](#io.cucumber.messages.Envelope)
    - [GeneratedExpression](#io.cucumber.messages.GeneratedExpression)
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
    - [Location](#io.cucumber.messages.Location)
    - [Media](#io.cucumber.messages.Media)
    - [ParameterTypeConfig](#io.cucumber.messages.ParameterTypeConfig)
    - [Pickle](#io.cucumber.messages.Pickle)
    - [Pickle.PickleStep](#io.cucumber.messages.Pickle.PickleStep)
    - [Pickle.PickleTag](#io.cucumber.messages.Pickle.PickleTag)
    - [PickleAccepted](#io.cucumber.messages.PickleAccepted)
    - [PickleRejected](#io.cucumber.messages.PickleRejected)
    - [PickleStepArgument](#io.cucumber.messages.PickleStepArgument)
    - [PickleStepArgument.PickleDocString](#io.cucumber.messages.PickleStepArgument.PickleDocString)
    - [PickleStepArgument.PickleTable](#io.cucumber.messages.PickleStepArgument.PickleTable)
    - [PickleStepArgument.PickleTable.PickleTableRow](#io.cucumber.messages.PickleStepArgument.PickleTable.PickleTableRow)
    - [PickleStepArgument.PickleTable.PickleTableRow.PickleTableCell](#io.cucumber.messages.PickleStepArgument.PickleTable.PickleTableRow.PickleTableCell)
    - [RuntimeConfig](#io.cucumber.messages.RuntimeConfig)
    - [Source](#io.cucumber.messages.Source)
    - [SourceReference](#io.cucumber.messages.SourceReference)
    - [SourcesConfig](#io.cucumber.messages.SourcesConfig)
    - [SourcesFilterConfig](#io.cucumber.messages.SourcesFilterConfig)
    - [SourcesOrder](#io.cucumber.messages.SourcesOrder)
    - [StepDefinitionConfig](#io.cucumber.messages.StepDefinitionConfig)
    - [StepDefinitionPattern](#io.cucumber.messages.StepDefinitionPattern)
    - [StepMatchArgument](#io.cucumber.messages.StepMatchArgument)
    - [StepMatchArgument.Group](#io.cucumber.messages.StepMatchArgument.Group)
    - [SupportCodeConfig](#io.cucumber.messages.SupportCodeConfig)
    - [TestCase](#io.cucumber.messages.TestCase)
    - [TestCase.TestStep](#io.cucumber.messages.TestCase.TestStep)
    - [TestCaseFinished](#io.cucumber.messages.TestCaseFinished)
    - [TestCaseHookDefinitionConfig](#io.cucumber.messages.TestCaseHookDefinitionConfig)
    - [TestCasePrepared](#io.cucumber.messages.TestCasePrepared)
    - [TestCasePreparedStep](#io.cucumber.messages.TestCasePreparedStep)
    - [TestCaseStarted](#io.cucumber.messages.TestCaseStarted)
    - [TestCaseStarted.Platform](#io.cucumber.messages.TestCaseStarted.Platform)
    - [TestResult](#io.cucumber.messages.TestResult)
    - [TestRunFinished](#io.cucumber.messages.TestRunFinished)
    - [TestRunStarted](#io.cucumber.messages.TestRunStarted)
    - [TestStepFinished](#io.cucumber.messages.TestStepFinished)
    - [TestStepStarted](#io.cucumber.messages.TestStepStarted)
    - [Timestamp](#io.cucumber.messages.Timestamp)
    - [UriToLinesMapping](#io.cucumber.messages.UriToLinesMapping)
  
    - [Media.Encoding](#io.cucumber.messages.Media.Encoding)
    - [SourcesOrderType](#io.cucumber.messages.SourcesOrderType)
    - [StepDefinitionPatternType](#io.cucumber.messages.StepDefinitionPatternType)
    - [TestResult.Status](#io.cucumber.messages.TestResult.Status)
  
  
  

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
* Runtime errors raised/thrown during execution (TODO: Conflicts with `TestResult#message`?)


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| source | [SourceReference](#io.cucumber.messages.SourceReference) |  |  |
| data | [string](#string) |  |  |
| media | [Media](#io.cucumber.messages.Media) |  |  |






<a name="io.cucumber.messages.CommandActionComplete"></a>

### CommandActionComplete



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| completedId | [string](#string) |  |  |
| testResult | [TestResult](#io.cucumber.messages.TestResult) |  | Used for responses to CommandRunBeforeTestCaseHook / CommandRunTestStep / CommandRunAfterTestCaseHook |
| snippet | [string](#string) |  | Used for response to CommandGenerateSnippet |






<a name="io.cucumber.messages.CommandGenerateSnippet"></a>

### CommandGenerateSnippet



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| actionId | [string](#string) |  |  |
| generatedExpressions | [GeneratedExpression](#io.cucumber.messages.GeneratedExpression) | repeated |  |
| pickleStepArgument | [PickleStepArgument](#io.cucumber.messages.PickleStepArgument) |  |  |






<a name="io.cucumber.messages.CommandInitializeTestCase"></a>

### CommandInitializeTestCase



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| actionId | [string](#string) |  |  |
| pickle | [Pickle](#io.cucumber.messages.Pickle) |  |  |






<a name="io.cucumber.messages.CommandRunAfterTestCaseHook"></a>

### CommandRunAfterTestCaseHook



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| actionId | [string](#string) |  |  |
| testCaseHookDefinitionId | [string](#string) |  |  |
| testCaseId | [string](#string) |  |  |






<a name="io.cucumber.messages.CommandRunAfterTestRunHooks"></a>

### CommandRunAfterTestRunHooks



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| actionId | [string](#string) |  |  |






<a name="io.cucumber.messages.CommandRunBeforeTestCaseHook"></a>

### CommandRunBeforeTestCaseHook



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| actionId | [string](#string) |  |  |
| testCaseHookDefinitionId | [string](#string) |  |  |
| testCaseId | [string](#string) |  |  |






<a name="io.cucumber.messages.CommandRunBeforeTestRunHooks"></a>

### CommandRunBeforeTestRunHooks



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| actionId | [string](#string) |  |  |






<a name="io.cucumber.messages.CommandRunTestStep"></a>

### CommandRunTestStep



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| actionId | [string](#string) |  |  |
| stepDefinitionId | [string](#string) |  |  |
| stepMatchArguments | [StepMatchArgument](#io.cucumber.messages.StepMatchArgument) | repeated |  |
| pickleStepArgument | [PickleStepArgument](#io.cucumber.messages.PickleStepArgument) |  |  |
| testCaseId | [string](#string) |  |  |






<a name="io.cucumber.messages.CommandStart"></a>

### CommandStart



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| baseDirectory | [string](#string) |  |  |
| sourcesConfig | [SourcesConfig](#io.cucumber.messages.SourcesConfig) |  |  |
| runtimeConfig | [RuntimeConfig](#io.cucumber.messages.RuntimeConfig) |  |  |
| supportCodeConfig | [SupportCodeConfig](#io.cucumber.messages.SupportCodeConfig) |  |  |






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
| source | [Source](#io.cucumber.messages.Source) |  | Gherkin messages |
| gherkinDocument | [GherkinDocument](#io.cucumber.messages.GherkinDocument) |  |  |
| pickle | [Pickle](#io.cucumber.messages.Pickle) |  |  |
| attachment | [Attachment](#io.cucumber.messages.Attachment) |  |  |
| testCaseStarted | [TestCaseStarted](#io.cucumber.messages.TestCaseStarted) |  | Execution messages |
| testStepStarted | [TestStepStarted](#io.cucumber.messages.TestStepStarted) |  |  |
| testStepFinished | [TestStepFinished](#io.cucumber.messages.TestStepFinished) |  |  |
| testCaseFinished | [TestCaseFinished](#io.cucumber.messages.TestCaseFinished) |  |  |
| pickleAccepted | [PickleAccepted](#io.cucumber.messages.PickleAccepted) |  |  |
| pickleRejected | [PickleRejected](#io.cucumber.messages.PickleRejected) |  |  |
| testCasePrepared | [TestCasePrepared](#io.cucumber.messages.TestCasePrepared) |  |  |
| testRunStarted | [TestRunStarted](#io.cucumber.messages.TestRunStarted) |  |  |
| testRunFinished | [TestRunFinished](#io.cucumber.messages.TestRunFinished) |  |  |
| commandStart | [CommandStart](#io.cucumber.messages.CommandStart) |  | Cucumber-Engine Messages |
| commandActionComplete | [CommandActionComplete](#io.cucumber.messages.CommandActionComplete) |  |  |
| commandRunBeforeTestRunHooks | [CommandRunBeforeTestRunHooks](#io.cucumber.messages.CommandRunBeforeTestRunHooks) |  |  |
| commandInitializeTestCase | [CommandInitializeTestCase](#io.cucumber.messages.CommandInitializeTestCase) |  |  |
| commandRunBeforeTestCaseHook | [CommandRunBeforeTestCaseHook](#io.cucumber.messages.CommandRunBeforeTestCaseHook) |  |  |
| commandRunTestStep | [CommandRunTestStep](#io.cucumber.messages.CommandRunTestStep) |  |  |
| commandRunAfterTestCaseHook | [CommandRunAfterTestCaseHook](#io.cucumber.messages.CommandRunAfterTestCaseHook) |  |  |
| commandRunAfterTestRunHooks | [CommandRunAfterTestRunHooks](#io.cucumber.messages.CommandRunAfterTestRunHooks) |  |  |
| commandGenerateSnippet | [CommandGenerateSnippet](#io.cucumber.messages.CommandGenerateSnippet) |  |  |
| commandError | [string](#string) |  |  |
| testCase | [TestCase](#io.cucumber.messages.TestCase) |  |  |
| stepDefinitionConfig | [StepDefinitionConfig](#io.cucumber.messages.StepDefinitionConfig) |  |  |
| testCaseHookDefinitionConfig | [TestCaseHookDefinitionConfig](#io.cucumber.messages.TestCaseHookDefinitionConfig) |  |  |






<a name="io.cucumber.messages.GeneratedExpression"></a>

### GeneratedExpression



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| text | [string](#string) |  |  |
| parameterTypeNames | [string](#string) | repeated |  |






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
| content_type | [string](#string) |  |  |
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






<a name="io.cucumber.messages.Location"></a>

### Location
Points to a line and a column in a text file


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| line | [uint32](#uint32) |  |  |
| column | [uint32](#uint32) |  |  |






<a name="io.cucumber.messages.Media"></a>

### Media
Meta information about encoded contents


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| encoding | [Media.Encoding](#io.cucumber.messages.Media.Encoding) |  | The encoding of the data |
| content_type | [string](#string) |  | The content type of the data. This can be any valid [IANA Media Type](https://www.iana.org/assignments/media-types/media-types.xhtml) as well as Cucumber-specific media types such as `text/x.cucumber.gherkin&#43;plain` and `text/x.cucumber.stacktrace&#43;plain` |






<a name="io.cucumber.messages.ParameterTypeConfig"></a>

### ParameterTypeConfig



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| name | [string](#string) |  |  |
| regularExpressions | [string](#string) | repeated |  |
| preferForRegularExpressionMatch | [bool](#bool) |  |  |
| useForSnippets | [bool](#bool) |  |  |






<a name="io.cucumber.messages.Pickle"></a>

### Pickle
A `Pickle` represents a test case Cucumber can *execute*. It is typically derived
from another format, such as [GherkinDocument](#io.cucumber.messages.GherkinDocument).
In the future a `Pickle` may be derived from other formats such as Markdown or
Excel files.

By making `Pickle` the main data structure Cucumber uses for execution, the
implementation of Cucumber itself becomes simpler, as it doesn&#39;t have to deal
with the complex structure of a [GherkinDocument](#io.cucumber.messages.GherkinDocument).


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [string](#string) |  | A unique id for the pickle. This is a [SHA1](https://en.wikipedia.org/wiki/SHA-1) hash from the source data and the `locations` of the pickle. This ID will change if source the file is modified. |
| uri | [string](#string) |  | The uri of the source file |
| name | [string](#string) |  | The name of the pickle |
| language | [string](#string) |  | The language of the pickle |
| steps | [Pickle.PickleStep](#io.cucumber.messages.Pickle.PickleStep) | repeated | One or more steps |
| tags | [Pickle.PickleTag](#io.cucumber.messages.Pickle.PickleTag) | repeated | One or more tags. If this pickle is constructed from a Gherkin document, It includes inherited tags from the `Feature` as well. |
| sourceIds | [string](#string) | repeated | Points to the source locations of the pickle. The last one represents the unique id of the pickle. A pickle constructed from `Examples` will have the first sourceId originating from the `Scenario`, and the second from the table row. |






<a name="io.cucumber.messages.Pickle.PickleStep"></a>

### Pickle.PickleStep
An executable step


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| text | [string](#string) |  |  |
| argument | [PickleStepArgument](#io.cucumber.messages.PickleStepArgument) |  | An optional argument |
| id | [string](#string) |  | A unique ID for the PickleStep |
| sourceIds | [string](#string) | repeated | References the IDs of the source of the step. For Gherkin, this can be the ID of a Step, and possibly also the ID of a TableRow |






<a name="io.cucumber.messages.Pickle.PickleTag"></a>

### Pickle.PickleTag
A tag


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| name | [string](#string) |  |  |
| sourceId | [string](#string) |  | Reference to the source id |






<a name="io.cucumber.messages.PickleAccepted"></a>

### PickleAccepted



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| pickleId | [string](#string) |  |  |






<a name="io.cucumber.messages.PickleRejected"></a>

### PickleRejected



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| pickleId | [string](#string) |  |  |






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
| contentType | [string](#string) |  |  |
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






<a name="io.cucumber.messages.RuntimeConfig"></a>

### RuntimeConfig



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| isFailFast | [bool](#bool) |  |  |
| isDryRun | [bool](#bool) |  |  |
| isStrict | [bool](#bool) |  |  |
| maxParallel | [uint64](#uint64) |  |  |






<a name="io.cucumber.messages.Source"></a>

### Source
A source file, typically a Gherkin document


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| uri | [string](#string) |  | The [URI](https://en.wikipedia.org/wiki/Uniform_Resource_Identifier) of the source, typically a file path relative to the root directory |
| data | [string](#string) |  | The contents of the file |
| media | [Media](#io.cucumber.messages.Media) |  | The media type of the file |






<a name="io.cucumber.messages.SourceReference"></a>

### SourceReference
Points to a [Source](#io.cucumber.messages.Source) identified by `uri` and a
[Location](#io.cucumber.messages.Location) within that file.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| uri | [string](#string) |  |  |
| location | [Location](#io.cucumber.messages.Location) |  |  |






<a name="io.cucumber.messages.SourcesConfig"></a>

### SourcesConfig



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| absolutePaths | [string](#string) | repeated |  |
| language | [string](#string) |  |  |
| filters | [SourcesFilterConfig](#io.cucumber.messages.SourcesFilterConfig) |  |  |
| order | [SourcesOrder](#io.cucumber.messages.SourcesOrder) |  |  |






<a name="io.cucumber.messages.SourcesFilterConfig"></a>

### SourcesFilterConfig



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| tagExpression | [string](#string) |  |  |
| nameRegularExpressions | [string](#string) | repeated |  |
| uriToLinesMapping | [UriToLinesMapping](#io.cucumber.messages.UriToLinesMapping) | repeated |  |






<a name="io.cucumber.messages.SourcesOrder"></a>

### SourcesOrder



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| type | [SourcesOrderType](#io.cucumber.messages.SourcesOrderType) |  |  |
| seed | [uint64](#uint64) |  |  |






<a name="io.cucumber.messages.StepDefinitionConfig"></a>

### StepDefinitionConfig
TODO: Rename to StepDefinition


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [string](#string) |  |  |
| pattern | [StepDefinitionPattern](#io.cucumber.messages.StepDefinitionPattern) |  |  |
| location | [SourceReference](#io.cucumber.messages.SourceReference) |  |  |






<a name="io.cucumber.messages.StepDefinitionPattern"></a>

### StepDefinitionPattern



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| source | [string](#string) |  |  |
| type | [StepDefinitionPatternType](#io.cucumber.messages.StepDefinitionPatternType) |  |  |






<a name="io.cucumber.messages.StepMatchArgument"></a>

### StepMatchArgument
Represents a single argument extracted from a step match and passed to a step definition.
This is used for the following purposes:
- Construct an argument to pass to a step definition (possibly through a parameter type transform)
- Highlight the matched parameter in rich formatters such as the HTML formatter

This message closely matches the `Argument` class in the `cucumber-expressions` library.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| parameterTypeName | [string](#string) |  |  |
| group | [StepMatchArgument.Group](#io.cucumber.messages.StepMatchArgument.Group) |  | Represents the outermost capture group of an argument. This message closely matches the `Group` class in the `cucumber-expressions` library. |






<a name="io.cucumber.messages.StepMatchArgument.Group"></a>

### StepMatchArgument.Group



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| start | [uint32](#uint32) |  |  |
| value | [string](#string) |  |  |
| children | [StepMatchArgument.Group](#io.cucumber.messages.StepMatchArgument.Group) | repeated |  |






<a name="io.cucumber.messages.SupportCodeConfig"></a>

### SupportCodeConfig



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| beforeTestCaseHookDefinitionConfigs | [TestCaseHookDefinitionConfig](#io.cucumber.messages.TestCaseHookDefinitionConfig) | repeated |  |
| afterTestCaseHookDefinitionConfigs | [TestCaseHookDefinitionConfig](#io.cucumber.messages.TestCaseHookDefinitionConfig) | repeated |  |
| stepDefinitionConfigs | [StepDefinitionConfig](#io.cucumber.messages.StepDefinitionConfig) | repeated |  |
| parameterTypeConfigs | [ParameterTypeConfig](#io.cucumber.messages.ParameterTypeConfig) | repeated |  |






<a name="io.cucumber.messages.TestCase"></a>

### TestCase



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [string](#string) |  |  |
| pickleId | [string](#string) |  |  |
| testSteps | [TestCase.TestStep](#io.cucumber.messages.TestCase.TestStep) | repeated |  |






<a name="io.cucumber.messages.TestCase.TestStep"></a>

### TestCase.TestStep



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [string](#string) |  |  |
| pickleStepId | [string](#string) |  | Pointer to the PickleStep (if derived from a PickleStep) |
| stepDefinitionId | [string](#string) | repeated | Pointer to all the matching StepDefinitions (if derived from a PickleStep) |
| stepMatchArguments | [StepMatchArgument](#io.cucumber.messages.StepMatchArgument) | repeated | All the arguments from the match (if derived from a PickleStep and there was exactly 1 StepDefinition) |
| hookId | [string](#string) |  | Pointer to the TestCaseHookDefinitionConfig (if derived from a Hook) |






<a name="io.cucumber.messages.TestCaseFinished"></a>

### TestCaseFinished



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| timestamp | [Timestamp](#io.cucumber.messages.Timestamp) |  |  |
| testResult | [TestResult](#io.cucumber.messages.TestResult) |  |  |
| testCaseStartedId | [string](#string) |  |  |






<a name="io.cucumber.messages.TestCaseHookDefinitionConfig"></a>

### TestCaseHookDefinitionConfig
TODO: Rename to Hook


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [string](#string) |  |  |
| tagExpression | [string](#string) |  |  |
| location | [SourceReference](#io.cucumber.messages.SourceReference) |  | TODO: rename to sourceReference as Location is another type and this is ambiguous. |






<a name="io.cucumber.messages.TestCasePrepared"></a>

### TestCasePrepared
DEPRECATED. Use TestCase


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| pickleId | [string](#string) |  |  |
| steps | [TestCasePreparedStep](#io.cucumber.messages.TestCasePreparedStep) | repeated |  |






<a name="io.cucumber.messages.TestCasePreparedStep"></a>

### TestCasePreparedStep
DEPRECATED. Use TestCase.TestStep


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| sourceLocation | [SourceReference](#io.cucumber.messages.SourceReference) |  |  |
| actionLocation | [SourceReference](#io.cucumber.messages.SourceReference) |  |  |






<a name="io.cucumber.messages.TestCaseStarted"></a>

### TestCaseStarted



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| timestamp | [Timestamp](#io.cucumber.messages.Timestamp) |  |  |
| platform | [TestCaseStarted.Platform](#io.cucumber.messages.TestCaseStarted.Platform) |  |  |
| attempt | [uint32](#uint32) |  | The first attempt should have value 0, and for each retry the value should increase by 1. |
| testCaseId | [string](#string) |  |  |
| id | [string](#string) |  | Because a `TestCase` can be run multiple times (in case of a retry), we use this field to group messages relating to the same attempt. |






<a name="io.cucumber.messages.TestCaseStarted.Platform"></a>

### TestCaseStarted.Platform



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| implementation | [string](#string) |  | The runner implementation. For example &#34;SpecFlow&#34;, &#34;Cucumber-JVM&#34;, &#34;Behat&#34; etc. |
| version | [string](#string) |  | The version of the runner |
| os | [string](#string) |  | The operating system |
| cpu | [string](#string) |  | The CPU architecture |






<a name="io.cucumber.messages.TestResult"></a>

### TestResult



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| status | [TestResult.Status](#io.cucumber.messages.TestResult.Status) |  |  |
| message | [string](#string) |  |  |
| duration | [Duration](#io.cucumber.messages.Duration) |  |  |
| willBeRetried | [bool](#bool) |  |  |






<a name="io.cucumber.messages.TestRunFinished"></a>

### TestRunFinished



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| success | [bool](#bool) |  | success = StrictModeEnabled ? (failed_count == 0 &amp;&amp; ambiguous_count == 0 &amp;&amp; undefined_count == 0 &amp;&amp; pending_count == 0) : (failed_count == 0 &amp;&amp; ambiguous_count == 0) |
| timestamp | [Timestamp](#io.cucumber.messages.Timestamp) |  | Timestamp when the TestRun is finished |






<a name="io.cucumber.messages.TestRunStarted"></a>

### TestRunStarted



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| timestamp | [Timestamp](#io.cucumber.messages.Timestamp) |  |  |






<a name="io.cucumber.messages.TestStepFinished"></a>

### TestStepFinished



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| testResult | [TestResult](#io.cucumber.messages.TestResult) |  |  |
| timestamp | [Timestamp](#io.cucumber.messages.Timestamp) |  |  |
| testStepId | [string](#string) |  |  |
| testCaseStartedId | [string](#string) |  |  |






<a name="io.cucumber.messages.TestStepStarted"></a>

### TestStepStarted



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| timestamp | [Timestamp](#io.cucumber.messages.Timestamp) |  |  |
| testStepId | [string](#string) |  |  |
| testCaseStartedId | [string](#string) |  |  |






<a name="io.cucumber.messages.Timestamp"></a>

### Timestamp
From https://github.com/protocolbuffers/protobuf/blob/master/src/google/protobuf/timestamp.proto


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| seconds | [int64](#int64) |  | Represents seconds of UTC time since Unix epoch 1970-01-01T00:00:00Z. Must be from 0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z inclusive. |
| nanos | [int32](#int32) |  | Non-negative fractions of a second at nanosecond resolution. Negative second values with fractions must still have non-negative nanos values that count forward in time. Must be from 0 to 999,999,999 inclusive. |






<a name="io.cucumber.messages.UriToLinesMapping"></a>

### UriToLinesMapping



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| absolutePath | [string](#string) |  |  |
| lines | [uint64](#uint64) | repeated |  |





 


<a name="io.cucumber.messages.Media.Encoding"></a>

### Media.Encoding


| Name | Number | Description |
| ---- | ------ | ----------- |
| BASE64 | 0 | Base64 encoded binary data |
| UTF8 | 1 | UTF8 encoded string |



<a name="io.cucumber.messages.SourcesOrderType"></a>

### SourcesOrderType


| Name | Number | Description |
| ---- | ------ | ----------- |
| ORDER_OF_DEFINITION | 0 |  |
| RANDOM | 1 |  |



<a name="io.cucumber.messages.StepDefinitionPatternType"></a>

### StepDefinitionPatternType


| Name | Number | Description |
| ---- | ------ | ----------- |
| CUCUMBER_EXPRESSION | 0 |  |
| REGULAR_EXPRESSION | 1 |  |



<a name="io.cucumber.messages.TestResult.Status"></a>

### TestResult.Status
Status of a step. Can also represent status of a Pickle (aggregated
from the status of its steps).

The ordinal values of statuses are significant. The status of a Pickle
is determined by the union of statuses of its steps. The
status of the Pickle is the status with the highest ordinal
in the enum.

For example, if a pickle has steps with statuses passed, undefined and skipped,
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

| .proto Type | Notes | C++ Type | Java Type | Python Type |
| ----------- | ----- | -------- | --------- | ----------- |
| <a name="double" /> double |  | double | double | float |
| <a name="float" /> float |  | float | float | float |
| <a name="int32" /> int32 | Uses variable-length encoding. Inefficient for encoding negative numbers – if your field is likely to have negative values, use sint32 instead. | int32 | int | int |
| <a name="int64" /> int64 | Uses variable-length encoding. Inefficient for encoding negative numbers – if your field is likely to have negative values, use sint64 instead. | int64 | long | int/long |
| <a name="uint32" /> uint32 | Uses variable-length encoding. | uint32 | int | int/long |
| <a name="uint64" /> uint64 | Uses variable-length encoding. | uint64 | long | int/long |
| <a name="sint32" /> sint32 | Uses variable-length encoding. Signed int value. These more efficiently encode negative numbers than regular int32s. | int32 | int | int |
| <a name="sint64" /> sint64 | Uses variable-length encoding. Signed int value. These more efficiently encode negative numbers than regular int64s. | int64 | long | int/long |
| <a name="fixed32" /> fixed32 | Always four bytes. More efficient than uint32 if values are often greater than 2^28. | uint32 | int | int |
| <a name="fixed64" /> fixed64 | Always eight bytes. More efficient than uint64 if values are often greater than 2^56. | uint64 | long | int/long |
| <a name="sfixed32" /> sfixed32 | Always four bytes. | int32 | int | int |
| <a name="sfixed64" /> sfixed64 | Always eight bytes. | int64 | long | int/long |
| <a name="bool" /> bool |  | bool | boolean | boolean |
| <a name="string" /> string | A string must always contain UTF-8 encoded or 7-bit ASCII text. | string | String | str/unicode |
| <a name="bytes" /> bytes | May contain any arbitrary sequence of bytes. | string | ByteString | str |

