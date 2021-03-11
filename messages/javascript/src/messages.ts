export type UndefinedParameterType = {
  
    name?: string
  
    expression?: string
  
}

export type Attachment = {
  
    source?: Source
  
    test_step_id?: string
  
    test_case_started_id?: string
  
    body?: string
  
    media_type?: string
  
    content_encoding?: "IDENTITY" | "BASE64"
  
    file_name?: string
  
    url?: string
  
}

export type TestCaseStarted = {
  
    timestamp?: Timestamp
  
    attempt?: number
  
    test_case_id?: string
  
    id?: string
  
}

export type TestStepStarted = {
  
    timestamp?: Timestamp
  
    test_step_id?: string
  
    test_case_started_id?: string
  
}

export type SourceReference = {
  
    uri?: string
  
    java_method?: JavaMethod
  
    java_stack_trace_element?: JavaStackTraceElement
  
    location?: Location
  
}

export type JavaMethod = {
  
    class_name?: string
  
    method_name?: string
  
    method_parameter_types?: readonly string[]
  
}

export type JavaStackTraceElement = {
  
    class_name?: string
  
    method_name?: string
  
    file_name?: string
  
}

export type Timestamp = {
  
    seconds?: number
  
    nanos?: number
  
}

export type Source = {
  
    uri?: string
  
    data?: string
  
    media_type?: string
  
}

export type TestCase = {
  
    id?: string
  
    pickle_id?: string
  
    test_steps?: readonly TestStep[]
  
}

export type TestStep = {
  
    id?: string
  
    pickle_step_id?: string
  
    step_definition_ids?: readonly string[]
  
    step_match_arguments_lists?: readonly StepMatchArgumentsList[]
  
    hook_id?: string
  
}

export type StepMatchArgumentsList = {
  
    step_match_arguments?: readonly StepMatchArgument[]
  
}

export type StepMatchArgument = {
  
    parameter_type_name?: string
  
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
  
    tag_expression?: string
  
    source_reference?: SourceReference
  
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
  
    ast_node_ids?: readonly string[]
  
}

export type PickleTag = {
  
    name?: string
  
    ast_node_id?: string
  
}

export type PickleDocString = {
  
    media_type?: string
  
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
  
    doc_string?: PickleDocString
  
    data_table?: PickleTable
  
}

export type PickleStep = {
  
    text?: string
  
    argument?: PickleStepArgument
  
    id?: string
  
    ast_node_ids?: readonly string[]
  
}

export type Duration = {
  
    seconds?: number
  
    nanos?: number
  
}

export type ParameterType = {
  
    name?: string
  
    regular_expressions?: readonly string[]
  
    prefer_for_regular_expression_match?: boolean
  
    use_for_snippets?: boolean
  
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
  
    table_header?: TableRow
  
    table_body?: readonly TableRow[]
  
    id?: string
  
}

export type Step = {
  
    location?: Location
  
    keyword?: string
  
    text?: string
  
    doc_string?: DocString
  
    data_table?: DataTable
  
    id?: string
  
}

export type DocString = {
  
    location?: Location
  
    media_type?: string
  
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
  
    test_step_id?: string
  
    test_case_started_id?: string
  
}

export type TestStepResult = {
  
    status?: "UNKNOWN" | "PASSED" | "SKIPPED" | "PENDING" | "UNDEFINED" | "AMBIGUOUS" | "FAILED"
  
    message?: string
  
    duration?: Duration
  
    will_be_retried?: boolean
  
}

export type StepDefinition = {
  
    id?: string
  
    pattern?: StepDefinitionPattern
  
    source_reference?: SourceReference
  
}

export type StepDefinitionPattern = {
  
    source?: string
  
    type?: "CUCUMBER_EXPRESSION" | "REGULAR_EXPRESSION"
  
}

export type Envelope = {
  
    source?: Source
  
    gherkin_document?: GherkinDocument
  
    pickle?: Pickle
  
    step_definition?: StepDefinition
  
    hook?: Hook
  
    parameter_type?: ParameterType
  
    test_case?: TestCase
  
    undefined_parameter_type?: UndefinedParameterType
  
    test_run_started?: TestRunStarted
  
    test_case_started?: TestCaseStarted
  
    test_step_started?: TestStepStarted
  
    attachment?: Attachment
  
    test_step_finished?: TestStepFinished
  
    test_case_finished?: TestCaseFinished
  
    test_run_finished?: TestRunFinished
  
    parse_error?: ParseError
  
    meta?: Meta
  
}

export type TestCaseFinished = {
  
    timestamp?: Timestamp
  
    test_case_started_id?: string
  
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

