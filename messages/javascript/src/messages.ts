import { Type } from 'class-transformer'
import 'reflect-metadata'

export class Attachment {
  body = ''

  contentEncoding: AttachmentContentEncoding = 'IDENTITY'

  fileName?: string

  mediaType = ''

  @Type(() => Source)
  source?: Source

  testCaseStartedId?: string

  testStepId?: string

  url?: string
}

export class Duration {
  seconds = 0

  nanos = 0
}

export class Envelope {
  @Type(() => Attachment)
  attachment?: Attachment

  @Type(() => GherkinDocument)
  gherkinDocument?: GherkinDocument

  @Type(() => Hook)
  hook?: Hook

  @Type(() => Meta)
  meta?: Meta

  @Type(() => ParameterType)
  parameterType?: ParameterType

  @Type(() => ParseError)
  parseError?: ParseError

  @Type(() => Pickle)
  pickle?: Pickle

  @Type(() => Source)
  source?: Source

  @Type(() => StepDefinition)
  stepDefinition?: StepDefinition

  @Type(() => TestCase)
  testCase?: TestCase

  @Type(() => TestCaseFinished)
  testCaseFinished?: TestCaseFinished

  @Type(() => TestCaseStarted)
  testCaseStarted?: TestCaseStarted

  @Type(() => TestRunFinished)
  testRunFinished?: TestRunFinished

  @Type(() => TestRunStarted)
  testRunStarted?: TestRunStarted

  @Type(() => TestStepFinished)
  testStepFinished?: TestStepFinished

  @Type(() => TestStepStarted)
  testStepStarted?: TestStepStarted

  @Type(() => UndefinedParameterType)
  undefinedParameterType?: UndefinedParameterType
}

export class GherkinDocument {
  @Type(() => Comment)
  comments: readonly Comment[] = []

  @Type(() => Feature)
  feature?: Feature

  uri?: string
}

export class Background {
  description = ''

  id = ''

  keyword = ''

  @Type(() => Location)
  location: Location = new Location()

  name = ''

  @Type(() => Step)
  steps: readonly Step[] = []
}

export class Comment {
  @Type(() => Location)
  location: Location = new Location()

  text = ''
}

export class DataTable {
  @Type(() => Location)
  location: Location = new Location()

  @Type(() => TableRow)
  rows: readonly TableRow[] = []
}

export class DocString {
  content = ''

  delimiter = ''

  @Type(() => Location)
  location: Location = new Location()

  mediaType?: string
}

export class Examples {
  description = ''

  id = ''

  keyword = ''

  @Type(() => Location)
  location: Location = new Location()

  name = ''

  @Type(() => TableRow)
  tableBody: readonly TableRow[] = []

  @Type(() => TableRow)
  tableHeader: TableRow = new TableRow()

  @Type(() => Tag)
  tags: readonly Tag[] = []
}

export class Feature {
  @Type(() => FeatureChild)
  children: readonly FeatureChild[] = []

  description = ''

  keyword = ''

  language = ''

  @Type(() => Location)
  location: Location = new Location()

  name = ''

  @Type(() => Tag)
  tags: readonly Tag[] = []
}

export class FeatureChild {
  @Type(() => Background)
  background?: Background

  @Type(() => Rule)
  rule?: Rule

  @Type(() => Scenario)
  scenario?: Scenario
}

export class Rule {
  @Type(() => RuleChild)
  children: readonly RuleChild[] = []

  description = ''

  id = ''

  keyword = ''

  @Type(() => Location)
  location: Location = new Location()

  name = ''

  @Type(() => Tag)
  tags: readonly Tag[] = []
}

export class RuleChild {
  @Type(() => Background)
  background?: Background

  @Type(() => Scenario)
  scenario?: Scenario
}

export class Scenario {
  description = ''

  @Type(() => Examples)
  examples: readonly Examples[] = []

  id = ''

  keyword = ''

  @Type(() => Location)
  location: Location = new Location()

  name = ''

  @Type(() => Step)
  steps: readonly Step[] = []

  @Type(() => Tag)
  tags: readonly Tag[] = []
}

export class Step {
  @Type(() => DataTable)
  dataTable?: DataTable

  @Type(() => DocString)
  docString?: DocString

  id = ''

  keyword = ''

  @Type(() => Location)
  location: Location = new Location()

  text = ''
}

export class TableCell {
  @Type(() => Location)
  location: Location = new Location()

  value = ''
}

export class TableRow {
  @Type(() => TableCell)
  cells: readonly TableCell[] = []

  id = ''

  @Type(() => Location)
  location: Location = new Location()
}

export class Tag {
  id = ''

  @Type(() => Location)
  location: Location = new Location()

  name = ''
}

export class Hook {
  id = ''

  @Type(() => SourceReference)
  sourceReference: SourceReference = new SourceReference()

  tagExpression?: string
}

export class Location {
  column?: number

  line = 0
}

export class Meta {
  @Type(() => Ci)
  ci?: Ci

  @Type(() => Product)
  cpu: Product = new Product()

  @Type(() => Product)
  implementation: Product = new Product()

  @Type(() => Product)
  os: Product = new Product()

  protocol_version = ''

  @Type(() => Product)
  runtime: Product = new Product()
}

export class Ci {
  @Type(() => Git)
  git?: Git

  name = ''

  url?: string
}

export class Git {
  branch?: string

  remote = ''

  revision = ''

  tag?: string
}

export class Product {
  name = ''

  version?: string
}

export class ParameterType {
  id = ''

  name = ''

  preferForRegularExpressionMatch = false

  regularExpressions: readonly string[] = []

  useForSnippets = false
}

export class ParseError {
  message = ''

  @Type(() => SourceReference)
  source: SourceReference = new SourceReference()
}

export class Pickle {
  astNodeIds: readonly string[] = []

  id = ''

  language = ''

  name = ''

  @Type(() => PickleStep)
  steps: readonly PickleStep[] = []

  @Type(() => PickleTag)
  tags: readonly PickleTag[] = []

  uri = ''
}

export class PickleDocString {
  content = ''

  mediaType?: string
}

export class PickleStep {
  @Type(() => PickleStepArgument)
  argument?: PickleStepArgument

  astNodeIds: readonly string[] = []

  id = ''

  text = ''
}

export class PickleStepArgument {
  @Type(() => PickleTable)
  dataTable?: PickleTable

  @Type(() => PickleDocString)
  docString?: PickleDocString
}

export class PickleTable {
  @Type(() => PickleTableRow)
  rows: readonly PickleTableRow[] = []
}

export class PickleTableCell {
  value = ''
}

export class PickleTableRow {
  @Type(() => PickleTableCell)
  cells: readonly PickleTableCell[] = []
}

export class PickleTag {
  astNodeId = ''

  name = ''
}

export class Source {
  data = ''

  mediaType = ''

  uri = ''
}

export class SourceReference {
  @Type(() => JavaMethod)
  javaMethod?: JavaMethod

  @Type(() => JavaStackTraceElement)
  javaStackTraceElement?: JavaStackTraceElement

  @Type(() => Location)
  location?: Location

  uri?: string
}

export class JavaMethod {
  className = ''

  methodName = ''

  methodParameterTypes: readonly string[] = []
}

export class JavaStackTraceElement {
  className = ''

  fileName = ''

  methodName = ''
}

export class StepDefinition {
  id = ''

  @Type(() => StepDefinitionPattern)
  pattern: StepDefinitionPattern = new StepDefinitionPattern()

  @Type(() => SourceReference)
  sourceReference: SourceReference = new SourceReference()
}

export class StepDefinitionPattern {
  source = ''

  type: StepDefinitionPatternType = 'CUCUMBER_EXPRESSION'
}

export class TestCase {
  id = ''

  pickleId = ''

  @Type(() => TestStep)
  testSteps: readonly TestStep[] = []
}

export class Group {
  @Type(() => Group)
  children: readonly Group[] = []

  start = 0

  value = ''
}

export class StepMatchArgument {
  @Type(() => Group)
  group: Group = new Group()

  parameterTypeName?: string
}

export class StepMatchArgumentsList {
  @Type(() => StepMatchArgument)
  stepMatchArguments: readonly StepMatchArgument[] = []
}

export class TestStep {
  hookId?: string

  id = ''

  pickleStepId?: string

  stepDefinitionIds?: readonly string[]

  @Type(() => StepMatchArgumentsList)
  stepMatchArgumentsLists?: readonly StepMatchArgumentsList[]
}

export class TestCaseFinished {
  testCaseStartedId = ''

  @Type(() => Timestamp)
  timestamp: Timestamp = new Timestamp()
}

export class TestCaseStarted {
  attempt = 0

  id = ''

  testCaseId = ''

  @Type(() => Timestamp)
  timestamp: Timestamp = new Timestamp()
}

export class TestRunFinished {
  message?: string

  success = false

  @Type(() => Timestamp)
  timestamp: Timestamp = new Timestamp()
}

export class TestRunStarted {
  @Type(() => Timestamp)
  timestamp: Timestamp = new Timestamp()
}

export class TestStepFinished {
  testCaseStartedId = ''

  testStepId = ''

  @Type(() => TestStepResult)
  testStepResult: TestStepResult = new TestStepResult()

  @Type(() => Timestamp)
  timestamp: Timestamp = new Timestamp()
}

export class TestStepResult {
  @Type(() => Duration)
  duration: Duration = new Duration()

  message?: string

  status: TestStepResultStatus = 'UNKNOWN'

  willBeRetried = false
}

export class TestStepStarted {
  testCaseStartedId = ''

  testStepId = ''

  @Type(() => Timestamp)
  timestamp: Timestamp = new Timestamp()
}

export class Timestamp {
  seconds = 0

  nanos = 0
}

export class UndefinedParameterType {
  expression = ''

  name = ''
}

export type AttachmentContentEncoding = 'IDENTITY' | 'BASE64'
export type StepDefinitionPatternType = 'CUCUMBER_EXPRESSION' | 'REGULAR_EXPRESSION'
export type TestStepResultStatus =
  | 'UNKNOWN'
  | 'PASSED'
  | 'SKIPPED'
  | 'PENDING'
  | 'UNDEFINED'
  | 'AMBIGUOUS'
  | 'FAILED'
