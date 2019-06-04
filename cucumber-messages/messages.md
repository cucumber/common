# Protocol Documentation
<a name="top"></a>

## Table of Contents

- [messages.proto](#messages.proto)
    - [Attachment](#io.cucumber.messages.Attachment)
    - [Background](#io.cucumber.messages.Background)
    - [CommandActionComplete](#io.cucumber.messages.CommandActionComplete)
    - [CommandGenerateSnippet](#io.cucumber.messages.CommandGenerateSnippet)
    - [CommandInitializeTestCase](#io.cucumber.messages.CommandInitializeTestCase)
    - [CommandRunAfterTestCaseHook](#io.cucumber.messages.CommandRunAfterTestCaseHook)
    - [CommandRunAfterTestRunHooks](#io.cucumber.messages.CommandRunAfterTestRunHooks)
    - [CommandRunBeforeTestCaseHook](#io.cucumber.messages.CommandRunBeforeTestCaseHook)
    - [CommandRunBeforeTestRunHooks](#io.cucumber.messages.CommandRunBeforeTestRunHooks)
    - [CommandRunTestStep](#io.cucumber.messages.CommandRunTestStep)
    - [CommandStart](#io.cucumber.messages.CommandStart)
    - [Comment](#io.cucumber.messages.Comment)
    - [DataTable](#io.cucumber.messages.DataTable)
    - [DocString](#io.cucumber.messages.DocString)
    - [Examples](#io.cucumber.messages.Examples)
    - [Feature](#io.cucumber.messages.Feature)
    - [FeatureChild](#io.cucumber.messages.FeatureChild)
    - [GeneratedExpression](#io.cucumber.messages.GeneratedExpression)
    - [GherkinDocument](#io.cucumber.messages.GherkinDocument)
    - [Location](#io.cucumber.messages.Location)
    - [Media](#io.cucumber.messages.Media)
    - [ParameterTypeConfig](#io.cucumber.messages.ParameterTypeConfig)
    - [PatternMatch](#io.cucumber.messages.PatternMatch)
    - [Pickle](#io.cucumber.messages.Pickle)
    - [PickleAccepted](#io.cucumber.messages.PickleAccepted)
    - [PickleDocString](#io.cucumber.messages.PickleDocString)
    - [PickleRejected](#io.cucumber.messages.PickleRejected)
    - [PickleStep](#io.cucumber.messages.PickleStep)
    - [PickleStepArgument](#io.cucumber.messages.PickleStepArgument)
    - [PickleTable](#io.cucumber.messages.PickleTable)
    - [PickleTableCell](#io.cucumber.messages.PickleTableCell)
    - [PickleTableRow](#io.cucumber.messages.PickleTableRow)
    - [PickleTag](#io.cucumber.messages.PickleTag)
    - [Rule](#io.cucumber.messages.Rule)
    - [RuleChild](#io.cucumber.messages.RuleChild)
    - [RuntimeConfig](#io.cucumber.messages.RuntimeConfig)
    - [Scenario](#io.cucumber.messages.Scenario)
    - [Source](#io.cucumber.messages.Source)
    - [SourceReference](#io.cucumber.messages.SourceReference)
    - [SourcesConfig](#io.cucumber.messages.SourcesConfig)
    - [SourcesFilterConfig](#io.cucumber.messages.SourcesFilterConfig)
    - [SourcesOrder](#io.cucumber.messages.SourcesOrder)
    - [Step](#io.cucumber.messages.Step)
    - [StepDefinitionConfig](#io.cucumber.messages.StepDefinitionConfig)
    - [StepDefinitionPattern](#io.cucumber.messages.StepDefinitionPattern)
    - [SupportCodeConfig](#io.cucumber.messages.SupportCodeConfig)
    - [TableCell](#io.cucumber.messages.TableCell)
    - [TableRow](#io.cucumber.messages.TableRow)
    - [Tag](#io.cucumber.messages.Tag)
    - [TestCaseFinished](#io.cucumber.messages.TestCaseFinished)
    - [TestCaseHookDefinitionConfig](#io.cucumber.messages.TestCaseHookDefinitionConfig)
    - [TestCasePrepared](#io.cucumber.messages.TestCasePrepared)
    - [TestCasePreparedStep](#io.cucumber.messages.TestCasePreparedStep)
    - [TestCaseStarted](#io.cucumber.messages.TestCaseStarted)
    - [TestCaseStarted.Platform](#io.cucumber.messages.TestCaseStarted.Platform)
    - [TestHookFinished](#io.cucumber.messages.TestHookFinished)
    - [TestHookStarted](#io.cucumber.messages.TestHookStarted)
    - [TestResult](#io.cucumber.messages.TestResult)
    - [TestRunFinished](#io.cucumber.messages.TestRunFinished)
    - [TestRunStarted](#io.cucumber.messages.TestRunStarted)
    - [TestStepFinished](#io.cucumber.messages.TestStepFinished)
    - [TestStepStarted](#io.cucumber.messages.TestStepStarted)
    - [UriToLinesMapping](#io.cucumber.messages.UriToLinesMapping)
    - [Wrapper](#io.cucumber.messages.Wrapper)
  
    - [SourcesOrderType](#io.cucumber.messages.SourcesOrderType)
    - [Status](#io.cucumber.messages.Status)
    - [StepDefinitionPatternType](#io.cucumber.messages.StepDefinitionPatternType)
  
  
  

- [Scalar Value Types](#scalar-value-types)



<a name="messages.proto"></a>
<p align="right"><a href="#top">Top</a></p>

## messages.proto



<a name="io.cucumber.messages.Attachment"></a>

### Attachment



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| source | [SourceReference](#io.cucumber.messages.SourceReference) |  |  |
| data | [string](#string) |  |  |
| media | [Media](#io.cucumber.messages.Media) |  |  |






<a name="io.cucumber.messages.Background"></a>

### Background



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| location | [Location](#io.cucumber.messages.Location) |  |  |
| keyword | [string](#string) |  |  |
| name | [string](#string) |  |  |
| description | [string](#string) |  |  |
| steps | [Step](#io.cucumber.messages.Step) | repeated |  |






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
| pickleId | [string](#string) |  |  |






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
| pickleId | [string](#string) |  |  |






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
| patternMatches | [PatternMatch](#io.cucumber.messages.PatternMatch) | repeated |  |
| pickleId | [string](#string) |  |  |
| pickleStepArgument | [PickleStepArgument](#io.cucumber.messages.PickleStepArgument) |  |  |






<a name="io.cucumber.messages.CommandStart"></a>

### CommandStart



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| baseDirectory | [string](#string) |  |  |
| sourcesConfig | [SourcesConfig](#io.cucumber.messages.SourcesConfig) |  |  |
| runtimeConfig | [RuntimeConfig](#io.cucumber.messages.RuntimeConfig) |  |  |
| supportCodeConfig | [SupportCodeConfig](#io.cucumber.messages.SupportCodeConfig) |  |  |






<a name="io.cucumber.messages.Comment"></a>

### Comment



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| location | [Location](#io.cucumber.messages.Location) |  |  |
| text | [string](#string) |  |  |






<a name="io.cucumber.messages.DataTable"></a>

### DataTable



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| location | [Location](#io.cucumber.messages.Location) |  |  |
| rows | [TableRow](#io.cucumber.messages.TableRow) | repeated |  |






<a name="io.cucumber.messages.DocString"></a>

### DocString



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| location | [Location](#io.cucumber.messages.Location) |  |  |
| content_type | [string](#string) |  |  |
| content | [string](#string) |  |  |
| delimiter | [string](#string) |  |  |






<a name="io.cucumber.messages.Examples"></a>

### Examples



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| location | [Location](#io.cucumber.messages.Location) |  |  |
| tags | [Tag](#io.cucumber.messages.Tag) | repeated |  |
| keyword | [string](#string) |  |  |
| name | [string](#string) |  |  |
| description | [string](#string) |  |  |
| table_header | [TableRow](#io.cucumber.messages.TableRow) |  |  |
| table_body | [TableRow](#io.cucumber.messages.TableRow) | repeated |  |






<a name="io.cucumber.messages.Feature"></a>

### Feature



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| location | [Location](#io.cucumber.messages.Location) |  |  |
| tags | [Tag](#io.cucumber.messages.Tag) | repeated |  |
| language | [string](#string) |  |  |
| keyword | [string](#string) |  |  |
| name | [string](#string) |  |  |
| description | [string](#string) |  |  |
| children | [FeatureChild](#io.cucumber.messages.FeatureChild) | repeated |  |






<a name="io.cucumber.messages.FeatureChild"></a>

### FeatureChild



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| rule | [Rule](#io.cucumber.messages.Rule) |  |  |
| background | [Background](#io.cucumber.messages.Background) |  |  |
| scenario | [Scenario](#io.cucumber.messages.Scenario) |  |  |






<a name="io.cucumber.messages.GeneratedExpression"></a>

### GeneratedExpression



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| text | [string](#string) |  |  |
| parameterTypeNames | [string](#string) | repeated |  |






<a name="io.cucumber.messages.GherkinDocument"></a>

### GherkinDocument



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| uri | [string](#string) |  |  |
| feature | [Feature](#io.cucumber.messages.Feature) |  |  |
| comments | [Comment](#io.cucumber.messages.Comment) | repeated |  |






<a name="io.cucumber.messages.Location"></a>

### Location



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| line | [uint32](#uint32) |  |  |
| column | [uint32](#uint32) |  |  |






<a name="io.cucumber.messages.Media"></a>

### Media



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| encoding | [string](#string) |  |  |
| content_type | [string](#string) |  |  |






<a name="io.cucumber.messages.ParameterTypeConfig"></a>

### ParameterTypeConfig



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| name | [string](#string) |  |  |
| regularExpressions | [string](#string) | repeated |  |
| preferForRegularExpressionMatch | [bool](#bool) |  |  |
| useForSnippets | [bool](#bool) |  |  |






<a name="io.cucumber.messages.PatternMatch"></a>

### PatternMatch



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| captures | [string](#string) | repeated |  |
| parameterTypeName | [string](#string) |  |  |






<a name="io.cucumber.messages.Pickle"></a>

### Pickle



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [string](#string) |  |  |
| uri | [string](#string) |  |  |
| name | [string](#string) |  |  |
| language | [string](#string) |  |  |
| steps | [PickleStep](#io.cucumber.messages.PickleStep) | repeated |  |
| tags | [PickleTag](#io.cucumber.messages.PickleTag) | repeated |  |
| locations | [Location](#io.cucumber.messages.Location) | repeated |  |






<a name="io.cucumber.messages.PickleAccepted"></a>

### PickleAccepted



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| pickleId | [string](#string) |  |  |






<a name="io.cucumber.messages.PickleDocString"></a>

### PickleDocString



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| location | [Location](#io.cucumber.messages.Location) |  |  |
| contentType | [string](#string) |  |  |
| content | [string](#string) |  |  |






<a name="io.cucumber.messages.PickleRejected"></a>

### PickleRejected



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| pickleId | [string](#string) |  |  |






<a name="io.cucumber.messages.PickleStep"></a>

### PickleStep



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| text | [string](#string) |  |  |
| locations | [Location](#io.cucumber.messages.Location) | repeated |  |
| argument | [PickleStepArgument](#io.cucumber.messages.PickleStepArgument) |  |  |






<a name="io.cucumber.messages.PickleStepArgument"></a>

### PickleStepArgument



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| doc_string | [PickleDocString](#io.cucumber.messages.PickleDocString) |  |  |
| data_table | [PickleTable](#io.cucumber.messages.PickleTable) |  |  |






<a name="io.cucumber.messages.PickleTable"></a>

### PickleTable



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| rows | [PickleTableRow](#io.cucumber.messages.PickleTableRow) | repeated |  |






<a name="io.cucumber.messages.PickleTableCell"></a>

### PickleTableCell



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| location | [Location](#io.cucumber.messages.Location) |  |  |
| value | [string](#string) |  |  |






<a name="io.cucumber.messages.PickleTableRow"></a>

### PickleTableRow



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| cells | [PickleTableCell](#io.cucumber.messages.PickleTableCell) | repeated |  |






<a name="io.cucumber.messages.PickleTag"></a>

### PickleTag



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| location | [Location](#io.cucumber.messages.Location) |  |  |
| name | [string](#string) |  |  |






<a name="io.cucumber.messages.Rule"></a>

### Rule



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| location | [Location](#io.cucumber.messages.Location) |  |  |
| keyword | [string](#string) |  |  |
| name | [string](#string) |  |  |
| description | [string](#string) |  |  |
| children | [RuleChild](#io.cucumber.messages.RuleChild) | repeated |  |






<a name="io.cucumber.messages.RuleChild"></a>

### RuleChild



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| background | [Background](#io.cucumber.messages.Background) |  |  |
| scenario | [Scenario](#io.cucumber.messages.Scenario) |  |  |






<a name="io.cucumber.messages.RuntimeConfig"></a>

### RuntimeConfig



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| isFailFast | [bool](#bool) |  |  |
| isDryRun | [bool](#bool) |  |  |
| isStrict | [bool](#bool) |  |  |
| maxParallel | [uint64](#uint64) |  |  |






<a name="io.cucumber.messages.Scenario"></a>

### Scenario



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| location | [Location](#io.cucumber.messages.Location) |  |  |
| tags | [Tag](#io.cucumber.messages.Tag) | repeated |  |
| keyword | [string](#string) |  |  |
| name | [string](#string) |  |  |
| description | [string](#string) |  |  |
| steps | [Step](#io.cucumber.messages.Step) | repeated |  |
| examples | [Examples](#io.cucumber.messages.Examples) | repeated |  |






<a name="io.cucumber.messages.Source"></a>

### Source



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| uri | [string](#string) |  |  |
| data | [string](#string) |  |  |
| media | [Media](#io.cucumber.messages.Media) |  |  |






<a name="io.cucumber.messages.SourceReference"></a>

### SourceReference



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






<a name="io.cucumber.messages.Step"></a>

### Step



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| location | [Location](#io.cucumber.messages.Location) |  |  |
| keyword | [string](#string) |  |  |
| text | [string](#string) |  |  |
| doc_string | [DocString](#io.cucumber.messages.DocString) |  |  |
| data_table | [DataTable](#io.cucumber.messages.DataTable) |  |  |






<a name="io.cucumber.messages.StepDefinitionConfig"></a>

### StepDefinitionConfig



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






<a name="io.cucumber.messages.SupportCodeConfig"></a>

### SupportCodeConfig



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| beforeTestCaseHookDefinitionConfigs | [TestCaseHookDefinitionConfig](#io.cucumber.messages.TestCaseHookDefinitionConfig) | repeated |  |
| afterTestCaseHookDefinitionConfigs | [TestCaseHookDefinitionConfig](#io.cucumber.messages.TestCaseHookDefinitionConfig) | repeated |  |
| stepDefinitionConfigs | [StepDefinitionConfig](#io.cucumber.messages.StepDefinitionConfig) | repeated |  |
| parameterTypeConfigs | [ParameterTypeConfig](#io.cucumber.messages.ParameterTypeConfig) | repeated |  |






<a name="io.cucumber.messages.TableCell"></a>

### TableCell



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| location | [Location](#io.cucumber.messages.Location) |  |  |
| value | [string](#string) |  |  |






<a name="io.cucumber.messages.TableRow"></a>

### TableRow



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| location | [Location](#io.cucumber.messages.Location) |  |  |
| cells | [TableCell](#io.cucumber.messages.TableCell) | repeated |  |






<a name="io.cucumber.messages.Tag"></a>

### Tag



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| location | [Location](#io.cucumber.messages.Location) |  |  |
| name | [string](#string) |  |  |






<a name="io.cucumber.messages.TestCaseFinished"></a>

### TestCaseFinished



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| pickleId | [string](#string) |  |  |
| timestamp | [google.protobuf.Timestamp](#google.protobuf.Timestamp) |  |  |
| testResult | [TestResult](#io.cucumber.messages.TestResult) |  |  |






<a name="io.cucumber.messages.TestCaseHookDefinitionConfig"></a>

### TestCaseHookDefinitionConfig



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [string](#string) |  |  |
| tagExpression | [string](#string) |  |  |
| location | [SourceReference](#io.cucumber.messages.SourceReference) |  |  |






<a name="io.cucumber.messages.TestCasePrepared"></a>

### TestCasePrepared



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| pickleId | [string](#string) |  |  |
| steps | [TestCasePreparedStep](#io.cucumber.messages.TestCasePreparedStep) | repeated |  |






<a name="io.cucumber.messages.TestCasePreparedStep"></a>

### TestCasePreparedStep



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| sourceLocation | [SourceReference](#io.cucumber.messages.SourceReference) |  |  |
| actionLocation | [SourceReference](#io.cucumber.messages.SourceReference) |  |  |






<a name="io.cucumber.messages.TestCaseStarted"></a>

### TestCaseStarted



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| pickleId | [string](#string) |  |  |
| timestamp | [google.protobuf.Timestamp](#google.protobuf.Timestamp) |  |  |
| platform | [TestCaseStarted.Platform](#io.cucumber.messages.TestCaseStarted.Platform) |  |  |






<a name="io.cucumber.messages.TestCaseStarted.Platform"></a>

### TestCaseStarted.Platform



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| implementation | [string](#string) |  | The runner implementation. For example &#34;SpecFlow&#34;, &#34;Cucumber-JVM&#34;, &#34;Behat&#34; etc. |
| version | [string](#string) |  | The version of the runner |
| os | [string](#string) |  | The operating system |
| cpu | [string](#string) |  | The CPU architecture |






<a name="io.cucumber.messages.TestHookFinished"></a>

### TestHookFinished



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| pickleId | [string](#string) |  |  |
| testResult | [TestResult](#io.cucumber.messages.TestResult) |  |  |
| timestamp | [google.protobuf.Timestamp](#google.protobuf.Timestamp) |  |  |






<a name="io.cucumber.messages.TestHookStarted"></a>

### TestHookStarted



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| pickleId | [string](#string) |  |  |
| timestamp | [google.protobuf.Timestamp](#google.protobuf.Timestamp) |  |  |






<a name="io.cucumber.messages.TestResult"></a>

### TestResult



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| status | [Status](#io.cucumber.messages.Status) |  |  |
| message | [string](#string) |  |  |
| durationNanoseconds | [uint64](#uint64) |  |  |






<a name="io.cucumber.messages.TestRunFinished"></a>

### TestRunFinished



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| success | [bool](#bool) |  |  |






<a name="io.cucumber.messages.TestRunStarted"></a>

### TestRunStarted



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| timestamp | [google.protobuf.Timestamp](#google.protobuf.Timestamp) |  |  |






<a name="io.cucumber.messages.TestStepFinished"></a>

### TestStepFinished



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| pickleId | [string](#string) |  |  |
| index | [uint32](#uint32) |  |  |
| testResult | [TestResult](#io.cucumber.messages.TestResult) |  |  |
| timestamp | [google.protobuf.Timestamp](#google.protobuf.Timestamp) |  |  |






<a name="io.cucumber.messages.TestStepStarted"></a>

### TestStepStarted



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| pickleId | [string](#string) |  |  |
| index | [uint32](#uint32) |  |  |
| timestamp | [google.protobuf.Timestamp](#google.protobuf.Timestamp) |  |  |






<a name="io.cucumber.messages.UriToLinesMapping"></a>

### UriToLinesMapping



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| absolutePath | [string](#string) |  |  |
| lines | [uint64](#uint64) | repeated |  |






<a name="io.cucumber.messages.Wrapper"></a>

### Wrapper
All messages sent between processes must be of type Wrapper


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
| testHookStarted | [TestHookStarted](#io.cucumber.messages.TestHookStarted) |  |  |
| testHookFinished | [TestHookFinished](#io.cucumber.messages.TestHookFinished) |  |  |
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





 


<a name="io.cucumber.messages.SourcesOrderType"></a>

### SourcesOrderType


| Name | Number | Description |
| ---- | ------ | ----------- |
| ORDER_OF_DEFINITION | 0 |  |
| RANDOM | 1 |  |



<a name="io.cucumber.messages.Status"></a>

### Status


| Name | Number | Description |
| ---- | ------ | ----------- |
| AMBIGUOUS | 0 |  |
| FAILED | 1 |  |
| PASSED | 2 |  |
| PENDING | 3 |  |
| SKIPPED | 4 |  |
| UNDEFINED | 5 |  |



<a name="io.cucumber.messages.StepDefinitionPatternType"></a>

### StepDefinitionPatternType


| Name | Number | Description |
| ---- | ------ | ----------- |
| CUCUMBER_EXPRESSION | 0 |  |
| REGULAR_EXPRESSION | 1 |  |


 

 

 



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

