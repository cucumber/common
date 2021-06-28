import { Type } from 'class-transformer'
import 'reflect-metadata'

export class Attachment {

  body: string = ''

  contentEncoding: AttachmentContentEncoding = AttachmentContentEncoding.IDENTITY

  fileName?: string

  mediaType: string = ''

  @Type(() => Source)
  source?: Source

  testCaseStartedId?: string

  testStepId?: string

  url?: string
}

export class Duration {

  seconds: number = 0

  nanos: number = 0
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

  uri?: string

  @Type(() => Feature)
  feature?: Feature

  @Type(() => Comment)
  comments: readonly Comment[] = []
}

export class Background {

  @Type(() => Location)
  location: Location = new Location()

  keyword: string = ''

  name: string = ''

  description: string = ''

  @Type(() => Step)
  steps: readonly Step[] = []

  id: string = ''
}

export class Comment {

  @Type(() => Location)
  location: Location = new Location()

  text: string = ''
}

export class DataTable {

  @Type(() => Location)
  location: Location = new Location()

  @Type(() => TableRow)
  rows: readonly TableRow[] = []
}

export class DocString {

  @Type(() => Location)
  location: Location = new Location()

  mediaType?: string

  content: string = ''

  delimiter: string = ''
}

export class Examples {

  @Type(() => Location)
  location: Location = new Location()

  @Type(() => Tag)
  tags: readonly Tag[] = []

  keyword: string = ''

  name: string = ''

  description: string = ''

  @Type(() => TableRow)
  tableHeader?: TableRow

  @Type(() => TableRow)
  tableBody: readonly TableRow[] = []

  id: string = ''
}

export class Feature {

  @Type(() => Location)
  location: Location = new Location()

  @Type(() => Tag)
  tags: readonly Tag[] = []

  language: string = ''

  keyword: string = ''

  name: string = ''

  description: string = ''

  @Type(() => FeatureChild)
  children: readonly FeatureChild[] = []
}

export class FeatureChild {

  @Type(() => Rule)
  rule?: Rule

  @Type(() => Background)
  background?: Background

  @Type(() => Scenario)
  scenario?: Scenario
}

export class Rule {

  @Type(() => Location)
  location: Location = new Location()

  @Type(() => Tag)
  tags: readonly Tag[] = []

  keyword: string = ''

  name: string = ''

  description: string = ''

  @Type(() => RuleChild)
  children: readonly RuleChild[] = []

  id: string = ''
}

export class RuleChild {

  @Type(() => Background)
  background?: Background

  @Type(() => Scenario)
  scenario?: Scenario
}

export class Scenario {

  @Type(() => Location)
  location: Location = new Location()

  @Type(() => Tag)
  tags: readonly Tag[] = []

  keyword: string = ''

  name: string = ''

  description: string = ''

  @Type(() => Step)
  steps: readonly Step[] = []

  @Type(() => Examples)
  examples: readonly Examples[] = []

  id: string = ''
}

export class Step {

  @Type(() => Location)
  location: Location = new Location()

  keyword: string = ''

  text: string = ''

  @Type(() => DocString)
  docString?: DocString

  @Type(() => DataTable)
  dataTable?: DataTable

  id: string = ''
}

export class TableCell {

  @Type(() => Location)
  location: Location = new Location()

  value: string = ''
}

export class TableRow {

  @Type(() => Location)
  location: Location = new Location()

  @Type(() => TableCell)
  cells: readonly TableCell[] = []

  id: string = ''
}

export class Tag {

  @Type(() => Location)
  location: Location = new Location()

  name: string = ''

  id: string = ''
}

export class Hook {

  id: string = ''

  @Type(() => SourceReference)
  sourceReference: SourceReference = new SourceReference()

  tagExpression?: string
}

export class Location {

  line: number = 0

  column?: number
}

export class Meta {

  protocolVersion: string = ''

  @Type(() => Product)
  implementation: Product = new Product()

  @Type(() => Product)
  runtime: Product = new Product()

  @Type(() => Product)
  os: Product = new Product()

  @Type(() => Product)
  cpu: Product = new Product()

  @Type(() => Ci)
  ci?: Ci
}

export class Ci {

  name: string = ''

  url?: string

  buildNumber?: string

  @Type(() => Git)
  git?: Git
}

export class Git {

  remote: string = ''

  revision: string = ''

  branch?: string

  tag?: string
}

export class Product {

  name: string = ''

  version?: string
}

export class ParameterType {

  name: string = ''

  regularExpressions: readonly string[] = []

  preferForRegularExpressionMatch: boolean = false

  useForSnippets: boolean = false

  id: string = ''
}

export class ParseError {

  @Type(() => SourceReference)
  source: SourceReference = new SourceReference()

  message: string = ''
}

export class Pickle {

  id: string = ''

  uri: string = ''

  name: string = ''

  language: string = ''

  @Type(() => PickleStep)
  steps: readonly PickleStep[] = []

  @Type(() => PickleTag)
  tags: readonly PickleTag[] = []

  astNodeIds: readonly string[] = []
}

export class PickleDocString {

  mediaType?: string

  content: string = ''
}

export class PickleStep {

  @Type(() => PickleStepArgument)
  argument?: PickleStepArgument

  astNodeIds: readonly string[] = []

  id: string = ''

  text: string = ''
}

export class PickleStepArgument {

  @Type(() => PickleDocString)
  docString?: PickleDocString

  @Type(() => PickleTable)
  dataTable?: PickleTable
}

export class PickleTable {

  @Type(() => PickleTableRow)
  rows: readonly PickleTableRow[] = []
}

export class PickleTableCell {

  value: string = ''
}

export class PickleTableRow {

  @Type(() => PickleTableCell)
  cells: readonly PickleTableCell[] = []
}

export class PickleTag {

  name: string = ''

  astNodeId: string = ''
}

export class Source {

  uri: string = ''

  data: string = ''

  mediaType: SourceMediaType = SourceMediaType.TEXT_X_CUCUMBER_GHERKIN_PLAIN
}

export class SourceReference {

  uri?: string

  @Type(() => JavaMethod)
  javaMethod?: JavaMethod

  @Type(() => JavaStackTraceElement)
  javaStackTraceElement?: JavaStackTraceElement

  @Type(() => Location)
  location?: Location
}

export class JavaMethod {

  className: string = ''

  methodName: string = ''

  methodParameterTypes: readonly string[] = []
}

export class JavaStackTraceElement {

  className: string = ''

  fileName: string = ''

  methodName: string = ''
}

export class StepDefinition {

  id: string = ''

  @Type(() => StepDefinitionPattern)
  pattern: StepDefinitionPattern = new StepDefinitionPattern()

  @Type(() => SourceReference)
  sourceReference: SourceReference = new SourceReference()
}

export class StepDefinitionPattern {

  source: string = ''

  type: StepDefinitionPatternType = StepDefinitionPatternType.CUCUMBER_EXPRESSION
}

export class TestCase {

  id: string = ''

  pickleId: string = ''

  @Type(() => TestStep)
  testSteps: readonly TestStep[] = []
}

export class Group {

  @Type(() => Group)
  children: readonly Group[] = []

  start?: number

  value?: string
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

  id: string = ''

  pickleStepId?: string

  stepDefinitionIds?: readonly string[]

  @Type(() => StepMatchArgumentsList)
  stepMatchArgumentsLists?: readonly StepMatchArgumentsList[]
}

export class TestCaseFinished {

  testCaseStartedId: string = ''

  @Type(() => Timestamp)
  timestamp: Timestamp = new Timestamp()
}

export class TestCaseStarted {

  attempt: number = 0

  id: string = ''

  testCaseId: string = ''

  @Type(() => Timestamp)
  timestamp: Timestamp = new Timestamp()
}

export class TestRunFinished {

  message?: string

  success: boolean = false

  @Type(() => Timestamp)
  timestamp: Timestamp = new Timestamp()
}

export class TestRunStarted {

  @Type(() => Timestamp)
  timestamp: Timestamp = new Timestamp()
}

export class TestStepFinished {

  testCaseStartedId: string = ''

  testStepId: string = ''

  @Type(() => TestStepResult)
  testStepResult: TestStepResult = new TestStepResult()

  @Type(() => Timestamp)
  timestamp: Timestamp = new Timestamp()
}

export class TestStepResult {

  @Type(() => Duration)
  duration: Duration = new Duration()

  message?: string

  status: TestStepResultStatus = TestStepResultStatus.UNKNOWN

  willBeRetried: boolean = false
}

export class TestStepStarted {

  testCaseStartedId: string = ''

  testStepId: string = ''

  @Type(() => Timestamp)
  timestamp: Timestamp = new Timestamp()
}

export class Timestamp {

  seconds: number = 0

  nanos: number = 0
}

export class UndefinedParameterType {

  expression: string = ''

  name: string = ''
}

export enum AttachmentContentEncoding {
  IDENTITY = 'IDENTITY',
  BASE64 = 'BASE64',
}

export enum SourceMediaType {
  TEXT_X_CUCUMBER_GHERKIN_PLAIN = 'text/x.cucumber.gherkin+plain',
  TEXT_X_CUCUMBER_GHERKIN_MARKDOWN = 'text/x.cucumber.gherkin+markdown',
}

export enum StepDefinitionPatternType {
  CUCUMBER_EXPRESSION = 'CUCUMBER_EXPRESSION',
  REGULAR_EXPRESSION = 'REGULAR_EXPRESSION',
}

export enum TestStepResultStatus {
  UNKNOWN = 'UNKNOWN',
  PASSED = 'PASSED',
  SKIPPED = 'SKIPPED',
  PENDING = 'PENDING',
  UNDEFINED = 'UNDEFINED',
  AMBIGUOUS = 'AMBIGUOUS',
  FAILED = 'FAILED',
}

