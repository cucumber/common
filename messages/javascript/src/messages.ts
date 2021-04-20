import { Type } from 'class-transformer'
import 'reflect-metadata'

export type UndefinedParameterType = {
  expression: string
  name: string
}

export class UndefinedParameterTypeImpl implements UndefinedParameterType {

  expression: string = ''

  name: string = ''
}

export type Attachment = {
  body: string
  contentEncoding: 'IDENTITY' | 'BASE64'
  fileName?: string
  mediaType: string
  source?: Source
  testCaseStartedId?: string
  testStepId?: string
  url?: string
}

export class AttachmentImpl implements Attachment {

  body: string = ''

  contentEncoding: 'IDENTITY' | 'BASE64' = 'IDENTITY'

  fileName?: string

  mediaType: string = ''

  @Type(() => SourceImpl)
  source?: Source

  testCaseStartedId?: string

  testStepId?: string

  url?: string
}

export type TestCaseStarted = {
  attempt: number
  id: string
  testCaseId: string
  timestamp: Timestamp
}

export class TestCaseStartedImpl implements TestCaseStarted {

  attempt: number = 0

  id: string = ''

  testCaseId: string = ''

  @Type(() => TimestampImpl)
  timestamp: Timestamp = new TimestampImpl()
}

export type TestStepStarted = {
  testCaseStartedId: string
  testStepId: string
  timestamp: Timestamp
}

export class TestStepStartedImpl implements TestStepStarted {

  testCaseStartedId: string = ''

  testStepId: string = ''

  @Type(() => TimestampImpl)
  timestamp: Timestamp = new TimestampImpl()
}

export type SourceReference = {
  javaMethod?: JavaMethod
  javaStackTraceElement?: JavaStackTraceElement
  location?: Location
  uri?: string
}

export class SourceReferenceImpl implements SourceReference {

  @Type(() => JavaMethodImpl)
  javaMethod?: JavaMethod

  @Type(() => JavaStackTraceElementImpl)
  javaStackTraceElement?: JavaStackTraceElement

  @Type(() => LocationImpl)
  location?: Location

  uri?: string
}

export type JavaMethod = {
  className: string
  methodName: string
  methodParameterTypes: readonly string[]
}

export class JavaMethodImpl implements JavaMethod {

  className: string = ''

  methodName: string = ''

  methodParameterTypes: readonly string[] = []
}

export type JavaStackTraceElement = {
  className: string
  fileName: string
  methodName: string
}

export class JavaStackTraceElementImpl implements JavaStackTraceElement {

  className: string = ''

  fileName: string = ''

  methodName: string = ''
}

export type Timestamp = {
  nanos: number
  seconds: number
}

export class TimestampImpl implements Timestamp {

  nanos: number = 0

  seconds: number = 0
}

export type Source = {
  data: string
  mediaType: string
  uri: string
}

export class SourceImpl implements Source {

  data: string = ''

  mediaType: string = ''

  uri: string = ''
}

export type TestCase = {
  id: string
  pickleId: string
  testSteps: readonly TestStep[]
}

export class TestCaseImpl implements TestCase {

  id: string = ''

  pickleId: string = ''

  @Type(() => TestStepImpl)
  testSteps: readonly TestStep[] = []
}

export type Group = {
  children: readonly Group[]
  start: number
  value: string
}

export class GroupImpl implements Group {

  @Type(() => GroupImpl)
  children: readonly Group[] = []

  start: number = 0

  value: string = ''
}

export type StepMatchArgument = {
  group: Group
  parameterTypeName?: string
}

export class StepMatchArgumentImpl implements StepMatchArgument {

  @Type(() => GroupImpl)
  group: Group = new GroupImpl()

  parameterTypeName?: string
}

export type StepMatchArgumentsList = {
  stepMatchArguments: readonly StepMatchArgument[]
}

export class StepMatchArgumentsListImpl implements StepMatchArgumentsList {

  @Type(() => StepMatchArgumentImpl)
  stepMatchArguments: readonly StepMatchArgument[] = []
}

export type TestStep = {
  hookId?: string
  id: string
  pickleStepId?: string
  stepDefinitionIds?: readonly string[]
  stepMatchArgumentsLists?: readonly StepMatchArgumentsList[]
}

export class TestStepImpl implements TestStep {

  hookId?: string

  id: string = ''

  pickleStepId?: string

  stepDefinitionIds?: readonly string[]

  @Type(() => StepMatchArgumentsListImpl)
  stepMatchArgumentsLists?: readonly StepMatchArgumentsList[]
}

export type Location = {
  column?: number
  line: number
}

export class LocationImpl implements Location {

  column?: number

  line: number = 0
}

export type Hook = {
  id: string
  sourceReference: SourceReference
  tagExpression?: string
}

export class HookImpl implements Hook {

  id: string = ''

  @Type(() => SourceReferenceImpl)
  sourceReference: SourceReference = new SourceReferenceImpl()

  tagExpression?: string
}

export type TestRunFinished = {
  message?: string
  success: boolean
  timestamp: Timestamp
}

export class TestRunFinishedImpl implements TestRunFinished {

  message?: string

  success: boolean = false

  @Type(() => TimestampImpl)
  timestamp: Timestamp = new TimestampImpl()
}

export type ParseError = {
  message: string
  source: SourceReference
}

export class ParseErrorImpl implements ParseError {

  message: string = ''

  @Type(() => SourceReferenceImpl)
  source: SourceReference = new SourceReferenceImpl()
}

export type Pickle = {
  astNodeIds: readonly string[]
  id: string
  language: string
  name: string
  steps: readonly PickleStep[]
  tags: readonly PickleTag[]
  uri: string
}

export class PickleImpl implements Pickle {

  astNodeIds: readonly string[] = []

  id: string = ''

  language: string = ''

  name: string = ''

  @Type(() => PickleStepImpl)
  steps: readonly PickleStep[] = []

  @Type(() => PickleTagImpl)
  tags: readonly PickleTag[] = []

  uri: string = ''
}

export type PickleDocString = {
  content: string
  mediaType?: string
}

export class PickleDocStringImpl implements PickleDocString {

  content: string = ''

  mediaType?: string
}

export type PickleStep = {
  argument?: PickleStepArgument
  astNodeIds: readonly string[]
  id: string
  text: string
}

export class PickleStepImpl implements PickleStep {

  @Type(() => PickleStepArgumentImpl)
  argument?: PickleStepArgument

  astNodeIds: readonly string[] = []

  id: string = ''

  text: string = ''
}

export type PickleStepArgument = {
  dataTable?: PickleTable
  docString?: PickleDocString
}

export class PickleStepArgumentImpl implements PickleStepArgument {

  @Type(() => PickleTableImpl)
  dataTable?: PickleTable

  @Type(() => PickleDocStringImpl)
  docString?: PickleDocString
}

export type PickleTable = {
  rows: readonly PickleTableRow[]
}

export class PickleTableImpl implements PickleTable {

  @Type(() => PickleTableRowImpl)
  rows: readonly PickleTableRow[] = []
}

export type PickleTableCell = {
  value: string
}

export class PickleTableCellImpl implements PickleTableCell {

  value: string = ''
}

export type PickleTableRow = {
  cells: readonly PickleTableCell[]
}

export class PickleTableRowImpl implements PickleTableRow {

  @Type(() => PickleTableCellImpl)
  cells: readonly PickleTableCell[] = []
}

export type PickleTag = {
  astNodeId: string
  name: string
}

export class PickleTagImpl implements PickleTag {

  astNodeId: string = ''

  name: string = ''
}

export type Duration = {
  nanos: number
  seconds: number
}

export class DurationImpl implements Duration {

  nanos: number = 0

  seconds: number = 0
}

export type ParameterType = {
  id: string
  name: string
  preferForRegularExpressionMatch: boolean
  regularExpressions: readonly string[]
  useForSnippets: boolean
}

export class ParameterTypeImpl implements ParameterType {

  id: string = ''

  name: string = ''

  preferForRegularExpressionMatch: boolean = false

  regularExpressions: readonly string[] = []

  useForSnippets: boolean = false
}

export type GherkinDocument = {
  comments: readonly Comment[]
  feature?: Feature
  uri?: string
}

export class GherkinDocumentImpl implements GherkinDocument {

  @Type(() => CommentImpl)
  comments: readonly Comment[] = []

  @Type(() => FeatureImpl)
  feature?: Feature

  uri?: string
}

export type Background = {
  description: string
  id: string
  keyword: string
  location: Location
  name: string
  steps: readonly Step[]
}

export class BackgroundImpl implements Background {

  description: string = ''

  id: string = ''

  keyword: string = ''

  @Type(() => LocationImpl)
  location: Location = new LocationImpl()

  name: string = ''

  @Type(() => StepImpl)
  steps: readonly Step[] = []
}

export type Comment = {
  location: Location
  text: string
}

export class CommentImpl implements Comment {

  @Type(() => LocationImpl)
  location: Location = new LocationImpl()

  text: string = ''
}

export type DataTable = {
  location: Location
  rows: readonly TableRow[]
}

export class DataTableImpl implements DataTable {

  @Type(() => LocationImpl)
  location: Location = new LocationImpl()

  @Type(() => TableRowImpl)
  rows: readonly TableRow[] = []
}

export type DocString = {
  content: string
  delimiter: string
  location: Location
  mediaType?: string
}

export class DocStringImpl implements DocString {

  content: string = ''

  delimiter: string = ''

  @Type(() => LocationImpl)
  location: Location = new LocationImpl()

  mediaType?: string
}

export type Examples = {
  description: string
  id: string
  keyword: string
  location: Location
  name: string
  tableBody: readonly TableRow[]
  tableHeader: TableRow
  tags: readonly Tag[]
}

export class ExamplesImpl implements Examples {

  description: string = ''

  id: string = ''

  keyword: string = ''

  @Type(() => LocationImpl)
  location: Location = new LocationImpl()

  name: string = ''

  @Type(() => TableRowImpl)
  tableBody: readonly TableRow[] = []

  @Type(() => TableRowImpl)
  tableHeader: TableRow = new TableRowImpl()

  @Type(() => TagImpl)
  tags: readonly Tag[] = []
}

export type Feature = {
  children: readonly FeatureChild[]
  description: string
  keyword: string
  language: string
  location: Location
  name: string
  tags: readonly Tag[]
}

export class FeatureImpl implements Feature {

  @Type(() => FeatureChildImpl)
  children: readonly FeatureChild[] = []

  description: string = ''

  keyword: string = ''

  language: string = ''

  @Type(() => LocationImpl)
  location: Location = new LocationImpl()

  name: string = ''

  @Type(() => TagImpl)
  tags: readonly Tag[] = []
}

export type FeatureChild = {
  background?: Background
  rule?: Rule
  scenario?: Scenario
}

export class FeatureChildImpl implements FeatureChild {

  @Type(() => BackgroundImpl)
  background?: Background

  @Type(() => RuleImpl)
  rule?: Rule

  @Type(() => ScenarioImpl)
  scenario?: Scenario
}

export type Rule = {
  children: readonly RuleChild[]
  description: string
  id: string
  keyword: string
  location: Location
  name: string
  tags: readonly Tag[]
}

export class RuleImpl implements Rule {

  @Type(() => RuleChildImpl)
  children: readonly RuleChild[] = []

  description: string = ''

  id: string = ''

  keyword: string = ''

  @Type(() => LocationImpl)
  location: Location = new LocationImpl()

  name: string = ''

  @Type(() => TagImpl)
  tags: readonly Tag[] = []
}

export type RuleChild = {
  background?: Background
  scenario?: Scenario
}

export class RuleChildImpl implements RuleChild {

  @Type(() => BackgroundImpl)
  background?: Background

  @Type(() => ScenarioImpl)
  scenario?: Scenario
}

export type Scenario = {
  description: string
  examples: readonly Examples[]
  id: string
  keyword: string
  location: Location
  name: string
  steps: readonly Step[]
  tags: readonly Tag[]
}

export class ScenarioImpl implements Scenario {

  description: string = ''

  @Type(() => ExamplesImpl)
  examples: readonly Examples[] = []

  id: string = ''

  keyword: string = ''

  @Type(() => LocationImpl)
  location: Location = new LocationImpl()

  name: string = ''

  @Type(() => StepImpl)
  steps: readonly Step[] = []

  @Type(() => TagImpl)
  tags: readonly Tag[] = []
}

export type Step = {
  dataTable?: DataTable
  docString?: DocString
  id: string
  keyword: string
  location: Location
  text: string
}

export class StepImpl implements Step {

  @Type(() => DataTableImpl)
  dataTable?: DataTable

  @Type(() => DocStringImpl)
  docString?: DocString

  id: string = ''

  keyword: string = ''

  @Type(() => LocationImpl)
  location: Location = new LocationImpl()

  text: string = ''
}

export type TableCell = {
  location: Location
  value: string
}

export class TableCellImpl implements TableCell {

  @Type(() => LocationImpl)
  location: Location = new LocationImpl()

  value: string = ''
}

export type TableRow = {
  cells: readonly TableCell[]
  id: string
  location: Location
}

export class TableRowImpl implements TableRow {

  @Type(() => TableCellImpl)
  cells: readonly TableCell[] = []

  id: string = ''

  @Type(() => LocationImpl)
  location: Location = new LocationImpl()
}

export type Tag = {
  id: string
  location: Location
  name: string
}

export class TagImpl implements Tag {

  id: string = ''

  @Type(() => LocationImpl)
  location: Location = new LocationImpl()

  name: string = ''
}

export type TestStepFinished = {
  testCaseStartedId: string
  testStepId: string
  testStepResult: TestStepResult
  timestamp: Timestamp
}

export class TestStepFinishedImpl implements TestStepFinished {

  testCaseStartedId: string = ''

  testStepId: string = ''

  @Type(() => TestStepResultImpl)
  testStepResult: TestStepResult = new TestStepResultImpl()

  @Type(() => TimestampImpl)
  timestamp: Timestamp = new TimestampImpl()
}

export type TestStepResult = {
  duration: Duration
  message?: string
  status: 'UNKNOWN' | 'PASSED' | 'SKIPPED' | 'PENDING' | 'UNDEFINED' | 'AMBIGUOUS' | 'FAILED'
  willBeRetried: boolean
}

export class TestStepResultImpl implements TestStepResult {

  @Type(() => DurationImpl)
  duration: Duration = new DurationImpl()

  message?: string

  status: 'UNKNOWN' | 'PASSED' | 'SKIPPED' | 'PENDING' | 'UNDEFINED' | 'AMBIGUOUS' | 'FAILED' = 'UNKNOWN'

  willBeRetried: boolean = false
}

export type StepDefinition = {
  id: string
  pattern: StepDefinitionPattern
  sourceReference: SourceReference
}

export class StepDefinitionImpl implements StepDefinition {

  id: string = ''

  @Type(() => StepDefinitionPatternImpl)
  pattern: StepDefinitionPattern = new StepDefinitionPatternImpl()

  @Type(() => SourceReferenceImpl)
  sourceReference: SourceReference = new SourceReferenceImpl()
}

export type StepDefinitionPattern = {
  source: string
  type: 'CUCUMBER_EXPRESSION' | 'REGULAR_EXPRESSION'
}

export class StepDefinitionPatternImpl implements StepDefinitionPattern {

  source: string = ''

  type: 'CUCUMBER_EXPRESSION' | 'REGULAR_EXPRESSION' = 'CUCUMBER_EXPRESSION'
}

export type Envelope = {
  attachment?: Attachment
  gherkinDocument?: GherkinDocument
  hook?: Hook
  meta?: Meta
  parameterType?: ParameterType
  parseError?: ParseError
  pickle?: Pickle
  source?: Source
  stepDefinition?: StepDefinition
  testCase?: TestCase
  testCaseFinished?: TestCaseFinished
  testCaseStarted?: TestCaseStarted
  testRunFinished?: TestRunFinished
  testRunStarted?: TestRunStarted
  testStepFinished?: TestStepFinished
  testStepStarted?: TestStepStarted
  undefinedParameterType?: UndefinedParameterType
}

export class EnvelopeImpl implements Envelope {

  @Type(() => AttachmentImpl)
  attachment?: Attachment

  @Type(() => GherkinDocumentImpl)
  gherkinDocument?: GherkinDocument

  @Type(() => HookImpl)
  hook?: Hook

  @Type(() => MetaImpl)
  meta?: Meta

  @Type(() => ParameterTypeImpl)
  parameterType?: ParameterType

  @Type(() => ParseErrorImpl)
  parseError?: ParseError

  @Type(() => PickleImpl)
  pickle?: Pickle

  @Type(() => SourceImpl)
  source?: Source

  @Type(() => StepDefinitionImpl)
  stepDefinition?: StepDefinition

  @Type(() => TestCaseImpl)
  testCase?: TestCase

  @Type(() => TestCaseFinishedImpl)
  testCaseFinished?: TestCaseFinished

  @Type(() => TestCaseStartedImpl)
  testCaseStarted?: TestCaseStarted

  @Type(() => TestRunFinishedImpl)
  testRunFinished?: TestRunFinished

  @Type(() => TestRunStartedImpl)
  testRunStarted?: TestRunStarted

  @Type(() => TestStepFinishedImpl)
  testStepFinished?: TestStepFinished

  @Type(() => TestStepStartedImpl)
  testStepStarted?: TestStepStarted

  @Type(() => UndefinedParameterTypeImpl)
  undefinedParameterType?: UndefinedParameterType
}

export type TestCaseFinished = {
  testCaseStartedId: string
  timestamp: Timestamp
}

export class TestCaseFinishedImpl implements TestCaseFinished {

  testCaseStartedId: string = ''

  @Type(() => TimestampImpl)
  timestamp: Timestamp = new TimestampImpl()
}

export type Meta = {
  ci?: Ci
  cpu: Product
  implementation: Product
  os: Product
  protocol_version: string
  runtime: Product
}

export class MetaImpl implements Meta {

  @Type(() => CiImpl)
  ci?: Ci

  @Type(() => ProductImpl)
  cpu: Product = new ProductImpl()

  @Type(() => ProductImpl)
  implementation: Product = new ProductImpl()

  @Type(() => ProductImpl)
  os: Product = new ProductImpl()

  protocol_version: string = ''

  @Type(() => ProductImpl)
  runtime: Product = new ProductImpl()
}

export type Ci = {
  git?: Git
  name: string
  url?: string
}

export class CiImpl implements Ci {

  @Type(() => GitImpl)
  git?: Git

  name: string = ''

  url?: string
}

export type Git = {
  branch?: string
  remote: string
  revision: string
  tag?: string
}

export class GitImpl implements Git {

  branch?: string

  remote: string = ''

  revision: string = ''

  tag?: string
}

export type Product = {
  name: string
  version?: string
}

export class ProductImpl implements Product {

  name: string = ''

  version?: string
}

export type TestRunStarted = {
  timestamp: Timestamp
}

export class TestRunStartedImpl implements TestRunStarted {

  @Type(() => TimestampImpl)
  timestamp: Timestamp = new TimestampImpl()
}

