package messages

type Attachment struct {
  Body string `json:"body"`
  ContentEncoding *AttachmentContentEncoding `json:"contentEncoding"`
  FileName string `json:"fileName"`
  MediaType string `json:"mediaType"`
  Source *Source `json:"source"`
  TestCaseStartedId string `json:"testCaseStartedId"`
  TestStepId string `json:"testStepId"`
  Url string `json:"url"`
}

type Duration struct {
  Seconds int64 `json:"seconds"`
  Nanos int64 `json:"nanos"`
}

type Envelope struct {
  Attachment *Attachment `json:"attachment"`
  GherkinDocument *GherkinDocument `json:"gherkinDocument"`
  Hook *Hook `json:"hook"`
  Meta *Meta `json:"meta"`
  ParameterType *ParameterType `json:"parameterType"`
  ParseError *ParseError `json:"parseError"`
  Pickle *Pickle `json:"pickle"`
  Source *Source `json:"source"`
  StepDefinition *StepDefinition `json:"stepDefinition"`
  TestCase *TestCase `json:"testCase"`
  TestCaseFinished *TestCaseFinished `json:"testCaseFinished"`
  TestCaseStarted *TestCaseStarted `json:"testCaseStarted"`
  TestRunFinished *TestRunFinished `json:"testRunFinished"`
  TestRunStarted *TestRunStarted `json:"testRunStarted"`
  TestStepFinished *TestStepFinished `json:"testStepFinished"`
  TestStepStarted *TestStepStarted `json:"testStepStarted"`
  UndefinedParameterType *UndefinedParameterType `json:"undefinedParameterType"`
}

type GherkinDocument struct {
  Uri string `json:"uri"`
  Feature *Feature `json:"feature"`
  Comments *[]Comment `json:"comments"`
}

type Background struct {
  Location *Location `json:"location"`
  Keyword string `json:"keyword"`
  Name string `json:"name"`
  Description string `json:"description"`
  Steps *[]Step `json:"steps"`
  Id string `json:"id"`
}

type Comment struct {
  Location *Location `json:"location"`
  Text string `json:"text"`
}

type DataTable struct {
  Location *Location `json:"location"`
  Rows *[]TableRow `json:"rows"`
}

type DocString struct {
  Location *Location `json:"location"`
  MediaType string `json:"mediaType"`
  Content string `json:"content"`
  Delimiter string `json:"delimiter"`
}

type Examples struct {
  Location *Location `json:"location"`
  Tags *[]Tag `json:"tags"`
  Keyword string `json:"keyword"`
  Name string `json:"name"`
  Description string `json:"description"`
  TableHeader *TableRow `json:"tableHeader"`
  TableBody *[]TableRow `json:"tableBody"`
  Id string `json:"id"`
}

type Feature struct {
  Location *Location `json:"location"`
  Tags *[]Tag `json:"tags"`
  Language string `json:"language"`
  Keyword string `json:"keyword"`
  Name string `json:"name"`
  Description string `json:"description"`
  Children *[]FeatureChild `json:"children"`
}

type FeatureChild struct {
  Rule *Rule `json:"rule"`
  Background *Background `json:"background"`
  Scenario *Scenario `json:"scenario"`
}

type Rule struct {
  Location *Location `json:"location"`
  Tags *[]Tag `json:"tags"`
  Keyword string `json:"keyword"`
  Name string `json:"name"`
  Description string `json:"description"`
  Children *[]RuleChild `json:"children"`
  Id string `json:"id"`
}

type RuleChild struct {
  Background *Background `json:"background"`
  Scenario *Scenario `json:"scenario"`
}

type Scenario struct {
  Location *Location `json:"location"`
  Tags *[]Tag `json:"tags"`
  Keyword string `json:"keyword"`
  Name string `json:"name"`
  Description string `json:"description"`
  Steps *[]Step `json:"steps"`
  Examples *[]Examples `json:"examples"`
  Id string `json:"id"`
}

type Step struct {
  Location *Location `json:"location"`
  Keyword string `json:"keyword"`
  Text string `json:"text"`
  DocString *DocString `json:"docString"`
  DataTable *DataTable `json:"dataTable"`
  Id string `json:"id"`
}

type TableCell struct {
  Location *Location `json:"location"`
  Value string `json:"value"`
}

type TableRow struct {
  Location *Location `json:"location"`
  Cells *[]TableCell `json:"cells"`
  Id string `json:"id"`
}

type Tag struct {
  Location *Location `json:"location"`
  Name string `json:"name"`
  Id string `json:"id"`
}

type Hook struct {
  Id string `json:"id"`
  SourceReference *SourceReference `json:"sourceReference"`
  TagExpression string `json:"tagExpression"`
}

type Location struct {
  Line int64 `json:"line"`
  Column int64 `json:"column"`
}

type Meta struct {
  ProtocolVersion string `json:"protocolVersion"`
  Implementation *Product `json:"implementation"`
  Runtime *Product `json:"runtime"`
  Os *Product `json:"os"`
  Cpu *Product `json:"cpu"`
  Ci *Ci `json:"ci"`
}

type Ci struct {
  Name string `json:"name"`
  Url string `json:"url"`
  Git *Git `json:"git"`
}

type Git struct {
  Remote string `json:"remote"`
  Revision string `json:"revision"`
  Branch string `json:"branch"`
  Tag string `json:"tag"`
}

type Product struct {
  Name string `json:"name"`
  Version string `json:"version"`
}

type ParameterType struct {
  Name string `json:"name"`
  RegularExpressions *[]string `json:"regularExpressions"`
  PreferForRegularExpressionMatch bool `json:"preferForRegularExpressionMatch"`
  UseForSnippets bool `json:"useForSnippets"`
  Id string `json:"id"`
}

type ParseError struct {
  Source *SourceReference `json:"source"`
  Message string `json:"message"`
}

type Pickle struct {
  Id string `json:"id"`
  Uri string `json:"uri"`
  Name string `json:"name"`
  Language string `json:"language"`
  Steps *[]PickleStep `json:"steps"`
  Tags *[]PickleTag `json:"tags"`
  AstNodeIds *[]string `json:"astNodeIds"`
}

type PickleDocString struct {
  MediaType string `json:"mediaType"`
  Content string `json:"content"`
}

type PickleStep struct {
  Argument *PickleStepArgument `json:"argument"`
  AstNodeIds *[]string `json:"astNodeIds"`
  Id string `json:"id"`
  Text string `json:"text"`
}

type PickleStepArgument struct {
  DocString *PickleDocString `json:"docString"`
  DataTable *PickleTable `json:"dataTable"`
}

type PickleTable struct {
  Rows *[]PickleTableRow `json:"rows"`
}

type PickleTableCell struct {
  Value string `json:"value"`
}

type PickleTableRow struct {
  Cells *[]PickleTableCell `json:"cells"`
}

type PickleTag struct {
  Name string `json:"name"`
  AstNodeId string `json:"astNodeId"`
}

type Source struct {
  Uri string `json:"uri"`
  Data string `json:"data"`
  MediaType string `json:"mediaType"`
}

type SourceReference struct {
  Uri string `json:"uri"`
  JavaMethod *JavaMethod `json:"javaMethod"`
  JavaStackTraceElement *JavaStackTraceElement `json:"javaStackTraceElement"`
  Location *Location `json:"location"`
}

type JavaMethod struct {
  ClassName string `json:"className"`
  MethodName string `json:"methodName"`
  MethodParameterTypes *[]string `json:"methodParameterTypes"`
}

type JavaStackTraceElement struct {
  ClassName string `json:"className"`
  FileName string `json:"fileName"`
  MethodName string `json:"methodName"`
}

type StepDefinition struct {
  Id string `json:"id"`
  Pattern *StepDefinitionPattern `json:"pattern"`
  SourceReference *SourceReference `json:"sourceReference"`
}

type StepDefinitionPattern struct {
  Source string `json:"source"`
  Type *StepDefinitionPatternType `json:"type"`
}

type TestCase struct {
  Id string `json:"id"`
  PickleId string `json:"pickleId"`
  TestSteps *[]TestStep `json:"testSteps"`
}

type Group struct {
  Children *[]Group `json:"children"`
  Start int64 `json:"start"`
  Value string `json:"value"`
}

type StepMatchArgument struct {
  Group *Group `json:"group"`
  ParameterTypeName string `json:"parameterTypeName"`
}

type StepMatchArgumentsList struct {
  StepMatchArguments *[]StepMatchArgument `json:"stepMatchArguments"`
}

type TestStep struct {
  HookId string `json:"hookId"`
  Id string `json:"id"`
  PickleStepId string `json:"pickleStepId"`
  StepDefinitionIds *[]string `json:"stepDefinitionIds"`
  StepMatchArgumentsLists *[]StepMatchArgumentsList `json:"stepMatchArgumentsLists"`
}

type TestCaseFinished struct {
  TestCaseStartedId string `json:"testCaseStartedId"`
  Timestamp *Timestamp `json:"timestamp"`
}

type TestCaseStarted struct {
  Attempt int64 `json:"attempt"`
  Id string `json:"id"`
  TestCaseId string `json:"testCaseId"`
  Timestamp *Timestamp `json:"timestamp"`
}

type TestRunFinished struct {
  Message string `json:"message"`
  Success bool `json:"success"`
  Timestamp *Timestamp `json:"timestamp"`
}

type TestRunStarted struct {
  Timestamp *Timestamp `json:"timestamp"`
}

type TestStepFinished struct {
  TestCaseStartedId string `json:"testCaseStartedId"`
  TestStepId string `json:"testStepId"`
  TestStepResult *TestStepResult `json:"testStepResult"`
  Timestamp *Timestamp `json:"timestamp"`
}

type TestStepResult struct {
  Duration *Duration `json:"duration"`
  Message string `json:"message"`
  Status *TestStepResultStatus `json:"status"`
  WillBeRetried bool `json:"willBeRetried"`
}

type TestStepStarted struct {
  TestCaseStartedId string `json:"testCaseStartedId"`
  TestStepId string `json:"testStepId"`
  Timestamp *Timestamp `json:"timestamp"`
}

type Timestamp struct {
  Seconds int64 `json:"seconds"`
  Nanos int64 `json:"nanos"`
}

type UndefinedParameterType struct {
  Expression string `json:"expression"`
  Name string `json:"name"`
}

type AttachmentContentEncoding string
const(
  IDENTITY AttachmentContentEncoding = "IDENTITY"
  BASE64 AttachmentContentEncoding = "BASE64"
)

type StepDefinitionPatternType string
const(
  CUCUMBER_EXPRESSION StepDefinitionPatternType = "CUCUMBER_EXPRESSION"
  REGULAR_EXPRESSION StepDefinitionPatternType = "REGULAR_EXPRESSION"
)

type TestStepResultStatus string
const(
  UNKNOWN TestStepResultStatus = "UNKNOWN"
  PASSED TestStepResultStatus = "PASSED"
  SKIPPED TestStepResultStatus = "SKIPPED"
  PENDING TestStepResultStatus = "PENDING"
  UNDEFINED TestStepResultStatus = "UNDEFINED"
  AMBIGUOUS TestStepResultStatus = "AMBIGUOUS"
  FAILED TestStepResultStatus = "FAILED"
)

