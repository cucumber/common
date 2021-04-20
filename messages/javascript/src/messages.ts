import { Type } from 'class-transformer'
import 'reflect-metadata'

export class Attachment {

  body: string = ''

  contentEncoding: 'IDENTITY' | 'BASE64' = 'IDENTITY'

  fileName?: string

  mediaType: string = ''

  @Type(() => Source)
  source?: Source

  testCaseStartedId?: string

  testStepId?: string

  url?: string
}

export class Duration {

  nanos: number = 0

  seconds: number = 0
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

  description: string = ''

  id: string = ''

  keyword: string = ''

  @Type(() => Location)
  location: Location = new Location()

  name: string = ''

  @Type(() => Step)
  steps: readonly Step[] = []
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

  content: string = ''

  delimiter: string = ''

  @Type(() => Location)
  location: Location = new Location()

  mediaType?: string
}

export class Examples {

  description: string = ''

  id: string = ''

  keyword: string = ''

  @Type(() => Location)
  location: Location = new Location()

  name: string = ''

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

  description: string = ''

  keyword: string = ''

  language: string = ''

  @Type(() => Location)
  location: Location = new Location()

  name: string = ''

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

  description: string = ''

  id: string = ''

  keyword: string = ''

  @Type(() => Location)
  location: Location = new Location()

  name: string = ''

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

  description: string = ''

  @Type(() => Examples)
  examples: readonly Examples[] = []

  id: string = ''

  keyword: string = ''

  @Type(() => Location)
  location: Location = new Location()

  name: string = ''

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

  id: string = ''

  keyword: string = ''

  @Type(() => Location)
  location: Location = new Location()

  text: string = ''
}

export class TableCell {

  @Type(() => Location)
  location: Location = new Location()

  value: string = ''
}

export class TableRow {

  @Type(() => TableCell)
  cells: readonly TableCell[] = []

  id: string = ''

  @Type(() => Location)
  location: Location = new Location()
}

export class Tag {

  id: string = ''

  @Type(() => Location)
  location: Location = new Location()

  name: string = ''
}

export class Hook {

  id: string = ''

  @Type(() => SourceReference)
  sourceReference: SourceReference = new SourceReference()

  tagExpression?: string
}

export class Location {

  column?: number

  line: number = 0
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

  protocol_version: string = ''

  @Type(() => Product)
  runtime: Product = new Product()
}

export class Ci {

  @Type(() => Git)
  git?: Git

  name: string = ''

  url?: string
}

export class Git {

  branch?: string

  remote: string = ''

  revision: string = ''

  tag?: string
}

export class Product {

  name: string = ''

  version?: string
}

export class ParameterType {

  id: string = ''

  name: string = ''

  preferForRegularExpressionMatch: boolean = false

  regularExpressions: readonly string[] = []

  useForSnippets: boolean = false
}

export class ParseError {

  message: string = ''

  @Type(() => SourceReference)
  source: SourceReference = new SourceReference()
}

export class Pickle {

  astNodeIds: readonly string[] = []

  id: string = ''

  language: string = ''

  name: string = ''

  @Type(() => PickleStep)
  steps: readonly PickleStep[] = []

  @Type(() => PickleTag)
  tags: readonly PickleTag[] = []

  uri: string = ''
}

export class PickleDocString {

  content: string = ''

  mediaType?: string
}

export class PickleStep {

  @Type(() => PickleStepArgument)
  argument?: PickleStepArgument

  astNodeIds: readonly string[] = []

  id: string = ''

  text: string = ''
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

  value: string = ''
}

export class PickleTableRow {

  @Type(() => PickleTableCell)
  cells: readonly PickleTableCell[] = []
}

export class PickleTag {

  astNodeId: string = ''

  name: string = ''
}

export class Source {

  data: string = ''

  mediaType: string = ''

  uri: string = ''
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

  type: 'CUCUMBER_EXPRESSION' | 'REGULAR_EXPRESSION' = 'CUCUMBER_EXPRESSION'
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

  start: number = 0

  value: string = ''
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

  status: 'UNKNOWN' | 'PASSED' | 'SKIPPED' | 'PENDING' | 'UNDEFINED' | 'AMBIGUOUS' | 'FAILED' = 'UNKNOWN'

  willBeRetried: boolean = false
}

export class TestStepStarted {

  testCaseStartedId: string = ''

  testStepId: string = ''

  @Type(() => Timestamp)
  timestamp: Timestamp = new Timestamp()
}

export class Timestamp {

  nanos: number = 0

  seconds: number = 0
}

export class UndefinedParameterType {

  expression: string = ''

  name: string = ''
}

