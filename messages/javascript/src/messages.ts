export type UndefinedParameterType = {
  name?: string

  expression?: string
}

export type Attachment = {
  source?: Source

  testStepId?: string

  testCaseStartedId?: string

  body?: string

  mediaType?: string

  contentEncoding?: 'IDENTITY' | 'BASE64'

  fileName?: string

  url?: string
}

export type TestCaseStarted = {
  timestamp?: Timestamp

  attempt?: number

  testCaseId?: string

  id?: string
}

export type TestStepStarted = {
  timestamp?: Timestamp

  testStepId?: string

  testCaseStartedId?: string
}

export type SourceReference = {
  uri?: string

  javaMethod?: JavaMethod

  javaStackTraceElement?: JavaStackTraceElement

  location?: Location
}

export type JavaMethod = {
  className?: string

  methodName?: string

  methodParameterTypes?: readonly string[]
}

export type JavaStackTraceElement = {
  className?: string

  methodName?: string

  fileName?: string
}

export type Timestamp = {
  seconds?: number

  nanos?: number
}

export type Source = {
  uri?: string

  data?: string

  mediaType?: string
}

export type TestCase = {
  id?: string

  pickleId?: string

  testSteps?: readonly TestStep[]
}

export type TestStep = {
  id?: string

  pickleStepId?: string

  stepDefinitionIds?: readonly string[]

  stepMatchArgumentsLists?: readonly StepMatchArgumentsList[]

  hookId?: string
}

export type StepMatchArgumentsList = {
  stepMatchArguments?: readonly StepMatchArgument[]
}

export type StepMatchArgument = {
  parameterTypeName?: string

  group?: Group
}

export type Group = {
  start?: number

  value?: string

  children?: readonly Group[]
}

export type Location = {
  line?: number

  column?: number
}

export type Hook = {
  id?: string

  tagExpression?: string

  sourceReference?: SourceReference
}

export type TestRunFinished = {
  success?: boolean

  timestamp?: Timestamp

  message?: string
}

export type ParseError = {
  source?: SourceReference

  message?: string
}

export type Pickle = {
  id?: string

  uri?: string

  name?: string

  language?: string

  steps?: readonly PickleStep[]

  tags?: readonly PickleTag[]

  astNodeIds?: readonly string[]
}

export type PickleTag = {
  name?: string

  astNodeId?: string
}

export type PickleDocString = {
  mediaType?: string

  content?: string
}

export type PickleTableCell = {
  value?: string
}

export type PickleTableRow = {
  cells?: readonly PickleTableCell[]
}

export type PickleTable = {
  rows?: readonly PickleTableRow[]
}

export type PickleStepArgument = {
  docString?: PickleDocString

  dataTable?: PickleTable
}

export type PickleStep = {
  text?: string

  argument?: PickleStepArgument

  id?: string

  astNodeIds?: readonly string[]
}

export type Duration = {
  seconds?: number

  nanos?: number
}

export type ParameterType = {
  name?: string

  regularExpressions?: readonly string[]

  preferForRegularExpressionMatch?: boolean

  useForSnippets?: boolean

  id?: string
}

export type GherkinDocument = {
  uri?: string

  feature?: Feature

  comments?: readonly Comment[]
}

export type Comment = {
  location?: Location

  text?: string
}

export type Feature = {
  location?: Location

  tags?: readonly Tag[]

  language?: string

  keyword?: string

  name?: string

  description?: string

  children?: readonly FeatureChild[]
}

export type FeatureChild = {
  rule?: Rule

  background?: Background

  scenario?: Scenario
}

export type Rule = {
  location?: Location

  tags?: readonly Tag[]

  keyword?: string

  name?: string

  description?: string

  children?: readonly RuleChild[]

  id?: string
}

export type RuleChild = {
  background?: Background

  scenario?: Scenario
}

export type Background = {
  location?: Location

  keyword?: string

  name?: string

  description?: string

  steps?: readonly Step[]

  id?: string
}

export type Scenario = {
  location?: Location

  tags?: readonly Tag[]

  keyword?: string

  name?: string

  description?: string

  steps?: readonly Step[]

  examples?: readonly Examples[]

  id?: string
}

export type Examples = {
  location?: Location

  tags?: readonly Tag[]

  keyword?: string

  name?: string

  description?: string

  tableHeader?: TableRow

  tableBody?: readonly TableRow[]

  id?: string
}

export type Step = {
  location?: Location

  keyword?: string

  text?: string

  docString?: DocString

  dataTable?: DataTable

  id?: string
}

export type DocString = {
  location?: Location

  mediaType?: string

  content?: string

  delimiter?: string
}

export type DataTable = {
  location?: Location

  rows?: readonly TableRow[]
}

export type TableRow = {
  location?: Location

  cells?: readonly TableCell[]

  id?: string
}

export type TableCell = {
  location?: Location

  value?: string
}

export type Tag = {
  location?: Location

  name?: string

  id?: string
}

export type TestStepFinished = {
  test_step_result?: TestStepResult

  timestamp?: Timestamp

  testStepId?: string

  testCaseStartedId?: string
}

export type TestStepResult = {
  status?: 'UNKNOWN' | 'PASSED' | 'SKIPPED' | 'PENDING' | 'UNDEFINED' | 'AMBIGUOUS' | 'FAILED'

  message?: string

  duration?: Duration

  will_be_retried?: boolean
}

export type StepDefinition = {
  id?: string

  pattern?: StepDefinitionPattern

  sourceReference?: SourceReference
}

export type StepDefinitionPattern = {
  source?: string

  type?: 'CUCUMBER_EXPRESSION' | 'REGULAR_EXPRESSION'
}

export type Envelope = {
  source?: Source

  gherkinDocument?: GherkinDocument

  pickle?: Pickle

  stepDefinition?: StepDefinition

  hook?: Hook

  parameterType?: ParameterType

  testCase?: TestCase

  undefinedParameterType?: UndefinedParameterType

  testRunStarted?: TestRunStarted

  testCaseStarted?: TestCaseStarted

  testStepStarted?: TestStepStarted

  attachment?: Attachment

  testStepFinished?: TestStepFinished

  testCaseFinished?: TestCaseFinished

  testRunFinished?: TestRunFinished

  parseError?: ParseError

  meta?: Meta
}

export type TestCaseFinished = {
  timestamp?: Timestamp

  testCaseStartedId?: string
}

export type Meta = {
  protocol_version?: string

  implementation?: Product

  runtime?: Product

  os?: Product

  cpu?: Product

  ci?: Ci
}

export type Ci = {
  name?: string

  url?: string

  git?: Git
}

export type Git = {
  remote?: string

  revision?: string

  branch?: string

  tag?: string
}

export type Product = {
  name?: string

  version?: string
}

export type TestRunStarted = {
  timestamp?: Timestamp
}
