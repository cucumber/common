# Cucumber Messages

Each message is an instance of [Envelope](#envelope). The `Envelope` message
will only have one of its fields set, which indicates the payload of the message.

## Attachment

| Field | Type | Required    | Description |
| ----- | ---- | ----------- | ----------- |
| `body` | string | yes | |
| `contentEncoding` | [AttachmentContentEncoding](#attachmentcontentencoding) | yes | |
| `fileName` | string | no | |
| `mediaType` | string | yes | |
| `source` | [Source](#source) | no | |
| `testCaseStartedId` | string | no | |
| `testStepId` | string | no | |
| `url` | string | no | |

## Duration

| Field | Type | Required    | Description |
| ----- | ---- | ----------- | ----------- |
| `seconds` | integer | yes | |
| `nanos` | integer | yes | |

## Envelope

| Field | Type | Required    | Description |
| ----- | ---- | ----------- | ----------- |
| `attachment` | [Attachment](#attachment) | no | |
| `gherkinDocument` | [GherkinDocument](#gherkindocument) | no | |
| `hook` | [Hook](#hook) | no | |
| `meta` | [Meta](#meta) | no | |
| `parameterType` | [ParameterType](#parametertype) | no | |
| `parseError` | [ParseError](#parseerror) | no | |
| `pickle` | [Pickle](#pickle) | no | |
| `source` | [Source](#source) | no | |
| `stepDefinition` | [StepDefinition](#stepdefinition) | no | |
| `testCase` | [TestCase](#testcase) | no | |
| `testCaseFinished` | [TestCaseFinished](#testcasefinished) | no | |
| `testCaseStarted` | [TestCaseStarted](#testcasestarted) | no | |
| `testRunFinished` | [TestRunFinished](#testrunfinished) | no | |
| `testRunStarted` | [TestRunStarted](#testrunstarted) | no | |
| `testStepFinished` | [TestStepFinished](#teststepfinished) | no | |
| `testStepStarted` | [TestStepStarted](#teststepstarted) | no | |
| `undefinedParameterType` | [UndefinedParameterType](#undefinedparametertype) | no | |

## GherkinDocument

| Field | Type | Required    | Description |
| ----- | ---- | ----------- | ----------- |
| `uri` | string | no | |
| `feature` | [Feature](#feature) | no | |
| `comments` | [Comment](#comment)[] | yes | |

## Background

| Field | Type | Required    | Description |
| ----- | ---- | ----------- | ----------- |
| `location` | [Location](#location) | yes | |
| `keyword` | string | yes | |
| `name` | string | yes | |
| `description` | string | yes | |
| `steps` | [Step](#step)[] | yes | |
| `id` | string | yes | |

## Comment

| Field | Type | Required    | Description |
| ----- | ---- | ----------- | ----------- |
| `location` | [Location](#location) | yes | |
| `text` | string | yes | |

## DataTable

| Field | Type | Required    | Description |
| ----- | ---- | ----------- | ----------- |
| `location` | [Location](#location) | yes | |
| `rows` | [TableRow](#tablerow)[] | yes | |

## DocString

| Field | Type | Required    | Description |
| ----- | ---- | ----------- | ----------- |
| `location` | [Location](#location) | yes | |
| `mediaType` | string | no | |
| `content` | string | yes | |
| `delimiter` | string | yes | |

## Examples

| Field | Type | Required    | Description |
| ----- | ---- | ----------- | ----------- |
| `location` | [Location](#location) | yes | |
| `tags` | [Tag](#tag)[] | yes | |
| `keyword` | string | yes | |
| `name` | string | yes | |
| `description` | string | yes | |
| `tableHeader` | [TableRow](#tablerow) | no | |
| `tableBody` | [TableRow](#tablerow)[] | yes | |
| `id` | string | yes | |

## Feature

| Field | Type | Required    | Description |
| ----- | ---- | ----------- | ----------- |
| `location` | [Location](#location) | yes | |
| `tags` | [Tag](#tag)[] | yes | |
| `language` | string | yes | |
| `keyword` | string | yes | |
| `name` | string | yes | |
| `description` | string | yes | |
| `children` | [FeatureChild](#featurechild)[] | yes | |

## FeatureChild

| Field | Type | Required    | Description |
| ----- | ---- | ----------- | ----------- |
| `rule` | [Rule](#rule) | no | |
| `background` | [Background](#background) | no | |
| `scenario` | [Scenario](#scenario) | no | |

## Rule

| Field | Type | Required    | Description |
| ----- | ---- | ----------- | ----------- |
| `location` | [Location](#location) | yes | |
| `tags` | [Tag](#tag)[] | yes | |
| `keyword` | string | yes | |
| `name` | string | yes | |
| `description` | string | yes | |
| `children` | [RuleChild](#rulechild)[] | yes | |
| `id` | string | yes | |

## RuleChild

| Field | Type | Required    | Description |
| ----- | ---- | ----------- | ----------- |
| `background` | [Background](#background) | no | |
| `scenario` | [Scenario](#scenario) | no | |

## Scenario

| Field | Type | Required    | Description |
| ----- | ---- | ----------- | ----------- |
| `location` | [Location](#location) | yes | |
| `tags` | [Tag](#tag)[] | yes | |
| `keyword` | string | yes | |
| `name` | string | yes | |
| `description` | string | yes | |
| `steps` | [Step](#step)[] | yes | |
| `examples` | [Examples](#examples)[] | yes | |
| `id` | string | yes | |

## Step

| Field | Type | Required    | Description |
| ----- | ---- | ----------- | ----------- |
| `location` | [Location](#location) | yes | |
| `keyword` | string | yes | |
| `text` | string | yes | |
| `docString` | [DocString](#docstring) | no | |
| `dataTable` | [DataTable](#datatable) | no | |
| `id` | string | yes | |

## TableCell

| Field | Type | Required    | Description |
| ----- | ---- | ----------- | ----------- |
| `location` | [Location](#location) | yes | |
| `value` | string | yes | |

## TableRow

| Field | Type | Required    | Description |
| ----- | ---- | ----------- | ----------- |
| `location` | [Location](#location) | yes | |
| `cells` | [TableCell](#tablecell)[] | yes | |
| `id` | string | yes | |

## Tag

| Field | Type | Required    | Description |
| ----- | ---- | ----------- | ----------- |
| `location` | [Location](#location) | yes | |
| `name` | string | yes | |
| `id` | string | yes | |

## Hook

| Field | Type | Required    | Description |
| ----- | ---- | ----------- | ----------- |
| `id` | string | yes | |
| `sourceReference` | [SourceReference](#sourcereference) | yes | |
| `tagExpression` | string | no | |

## Location

| Field | Type | Required    | Description |
| ----- | ---- | ----------- | ----------- |
| `line` | integer | yes | |
| `column` | integer | no | |

## Meta

| Field | Type | Required    | Description |
| ----- | ---- | ----------- | ----------- |
| `protocolVersion` | string | yes | |
| `implementation` | [Product](#product) | yes | |
| `runtime` | [Product](#product) | yes | |
| `os` | [Product](#product) | yes | |
| `cpu` | [Product](#product) | yes | |
| `ci` | [Ci](#ci) | no | |

## Ci

| Field | Type | Required    | Description |
| ----- | ---- | ----------- | ----------- |
| `name` | string | yes | |
| `url` | string | no | |
| `git` | [Git](#git) | no | |

## Git

| Field | Type | Required    | Description |
| ----- | ---- | ----------- | ----------- |
| `remote` | string | yes | |
| `revision` | string | yes | |
| `branch` | string | no | |
| `tag` | string | no | |

## Product

| Field | Type | Required    | Description |
| ----- | ---- | ----------- | ----------- |
| `name` | string | yes | |
| `version` | string | no | |

## ParameterType

| Field | Type | Required    | Description |
| ----- | ---- | ----------- | ----------- |
| `name` | string | yes | |
| `regularExpressions` | string[] | yes | |
| `preferForRegularExpressionMatch` | boolean | yes | |
| `useForSnippets` | boolean | yes | |
| `id` | string | yes | |

## ParseError

| Field | Type | Required    | Description |
| ----- | ---- | ----------- | ----------- |
| `source` | [SourceReference](#sourcereference) | yes | |
| `message` | string | yes | |

## Pickle

| Field | Type | Required    | Description |
| ----- | ---- | ----------- | ----------- |
| `id` | string | yes | |
| `uri` | string | yes | |
| `name` | string | yes | |
| `language` | string | yes | |
| `steps` | [PickleStep](#picklestep)[] | yes | |
| `tags` | [PickleTag](#pickletag)[] | yes | |
| `astNodeIds` | string[] | yes | |

## PickleDocString

| Field | Type | Required    | Description |
| ----- | ---- | ----------- | ----------- |
| `mediaType` | string | no | |
| `content` | string | yes | |

## PickleStep

| Field | Type | Required    | Description |
| ----- | ---- | ----------- | ----------- |
| `argument` | [PickleStepArgument](#picklestepargument) | no | |
| `astNodeIds` | string[] | yes | |
| `id` | string | yes | |
| `text` | string | yes | |

## PickleStepArgument

| Field | Type | Required    | Description |
| ----- | ---- | ----------- | ----------- |
| `docString` | [PickleDocString](#pickledocstring) | no | |
| `dataTable` | [PickleTable](#pickletable) | no | |

## PickleTable

| Field | Type | Required    | Description |
| ----- | ---- | ----------- | ----------- |
| `rows` | [PickleTableRow](#pickletablerow)[] | yes | |

## PickleTableCell

| Field | Type | Required    | Description |
| ----- | ---- | ----------- | ----------- |
| `value` | string | yes | |

## PickleTableRow

| Field | Type | Required    | Description |
| ----- | ---- | ----------- | ----------- |
| `cells` | [PickleTableCell](#pickletablecell)[] | yes | |

## PickleTag

| Field | Type | Required    | Description |
| ----- | ---- | ----------- | ----------- |
| `name` | string | yes | |
| `astNodeId` | string | yes | |

## Source

| Field | Type | Required    | Description |
| ----- | ---- | ----------- | ----------- |
| `uri` | string | yes | |
| `data` | string | yes | |
| `mediaType` | [SourceMediaType](#sourcemediatype) | yes | |

## SourceReference

| Field | Type | Required    | Description |
| ----- | ---- | ----------- | ----------- |
| `uri` | string | no | |
| `javaMethod` | [JavaMethod](#javamethod) | no | |
| `javaStackTraceElement` | [JavaStackTraceElement](#javastacktraceelement) | no | |
| `location` | [Location](#location) | no | |

## JavaMethod

| Field | Type | Required    | Description |
| ----- | ---- | ----------- | ----------- |
| `className` | string | yes | |
| `methodName` | string | yes | |
| `methodParameterTypes` | string[] | yes | |

## JavaStackTraceElement

| Field | Type | Required    | Description |
| ----- | ---- | ----------- | ----------- |
| `className` | string | yes | |
| `fileName` | string | yes | |
| `methodName` | string | yes | |

## StepDefinition

| Field | Type | Required    | Description |
| ----- | ---- | ----------- | ----------- |
| `id` | string | yes | |
| `pattern` | [StepDefinitionPattern](#stepdefinitionpattern) | yes | |
| `sourceReference` | [SourceReference](#sourcereference) | yes | |

## StepDefinitionPattern

| Field | Type | Required    | Description |
| ----- | ---- | ----------- | ----------- |
| `source` | string | yes | |
| `type` | [StepDefinitionPatternType](#stepdefinitionpatterntype) | yes | |

## TestCase

| Field | Type | Required    | Description |
| ----- | ---- | ----------- | ----------- |
| `id` | string | yes | |
| `pickleId` | string | yes | |
| `testSteps` | [TestStep](#teststep)[] | yes | |

## Group

| Field | Type | Required    | Description |
| ----- | ---- | ----------- | ----------- |
| `children` | [Group](#group)[] | yes | |
| `start` | integer | no | |
| `value` | string | no | |

## StepMatchArgument

| Field | Type | Required    | Description |
| ----- | ---- | ----------- | ----------- |
| `group` | [Group](#group) | yes | |
| `parameterTypeName` | string | no | |

## StepMatchArgumentsList

| Field | Type | Required    | Description |
| ----- | ---- | ----------- | ----------- |
| `stepMatchArguments` | [StepMatchArgument](#stepmatchargument)[] | yes | |

## TestStep

| Field | Type | Required    | Description |
| ----- | ---- | ----------- | ----------- |
| `hookId` | string | no | |
| `id` | string | yes | |
| `pickleStepId` | string | no | |
| `stepDefinitionIds` | string[] | no | |
| `stepMatchArgumentsLists` | [StepMatchArgumentsList](#stepmatchargumentslist)[] | no | |

## TestCaseFinished

| Field | Type | Required    | Description |
| ----- | ---- | ----------- | ----------- |
| `testCaseStartedId` | string | yes | |
| `timestamp` | [Timestamp](#timestamp) | yes | |
| `willBeRetried` | boolean | yes | |

## TestCaseStarted

| Field | Type | Required    | Description |
| ----- | ---- | ----------- | ----------- |
| `attempt` | integer | yes | |
| `id` | string | yes | |
| `testCaseId` | string | yes | |
| `timestamp` | [Timestamp](#timestamp) | yes | |

## TestRunFinished

| Field | Type | Required    | Description |
| ----- | ---- | ----------- | ----------- |
| `message` | string | no | |
| `success` | boolean | yes | |
| `timestamp` | [Timestamp](#timestamp) | yes | |

## TestRunStarted

| Field | Type | Required    | Description |
| ----- | ---- | ----------- | ----------- |
| `timestamp` | [Timestamp](#timestamp) | yes | |

## TestStepFinished

| Field | Type | Required    | Description |
| ----- | ---- | ----------- | ----------- |
| `testCaseStartedId` | string | yes | |
| `testStepId` | string | yes | |
| `testStepResult` | [TestStepResult](#teststepresult) | yes | |
| `timestamp` | [Timestamp](#timestamp) | yes | |

## TestStepResult

| Field | Type | Required    | Description |
| ----- | ---- | ----------- | ----------- |
| `duration` | [Duration](#duration) | yes | |
| `message` | string | no | |
| `status` | [TestStepResultStatus](#teststepresultstatus) | yes | |

## TestStepStarted

| Field | Type | Required    | Description |
| ----- | ---- | ----------- | ----------- |
| `testCaseStartedId` | string | yes | |
| `testStepId` | string | yes | |
| `timestamp` | [Timestamp](#timestamp) | yes | |

## Timestamp

| Field | Type | Required    | Description |
| ----- | ---- | ----------- | ----------- |
| `seconds` | integer | yes | |
| `nanos` | integer | yes | |

## UndefinedParameterType

| Field | Type | Required    | Description |
| ----- | ---- | ----------- | ----------- |
| `expression` | string | yes | |
| `name` | string | yes | |

## AttachmentContentEncoding

One of the following:

* `"IDENTITY"`
* `"BASE64"`

## SourceMediaType

One of the following:

* `"text/x.cucumber.gherkin+plain"`
* `"text/x.cucumber.gherkin+markdown"`

## StepDefinitionPatternType

One of the following:

* `"CUCUMBER_EXPRESSION"`
* `"REGULAR_EXPRESSION"`

## TestStepResultStatus

One of the following:

* `"UNKNOWN"`
* `"PASSED"`
* `"SKIPPED"`
* `"PENDING"`
* `"UNDEFINED"`
* `"AMBIGUOUS"`
* `"FAILED"`

