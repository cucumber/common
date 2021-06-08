module Cucumber
  module Messages

    class Attachment
      attr_reader :body
      attr_reader :contentEncoding
      attr_reader :fileName
      attr_reader :mediaType
      attr_reader :source
      attr_reader :testCaseStartedId
      attr_reader :testStepId
      attr_reader :url

      def initialize(
        body: '',
        contentEncoding: AttachmentContentEncoding::IDENTITY,
        fileName: nil,
        mediaType: '',
        source: nil,
        testCaseStartedId: nil,
        testStepId: nil,
        url: nil
      )
        @body = body
        @contentEncoding = contentEncoding
        @fileName = fileName
        @mediaType = mediaType
        @source = source
        @testCaseStartedId = testCaseStartedId
        @testStepId = testStepId
        @url = url
      end
    end

    class Duration
      attr_reader :seconds
      attr_reader :nanos

      def initialize(
        seconds: 0,
        nanos: 0
      )
        @seconds = seconds
        @nanos = nanos
      end
    end

    class Envelope
      attr_reader :attachment
      attr_reader :gherkinDocument
      attr_reader :hook
      attr_reader :meta
      attr_reader :parameterType
      attr_reader :parseError
      attr_reader :pickle
      attr_reader :source
      attr_reader :stepDefinition
      attr_reader :testCase
      attr_reader :testCaseFinished
      attr_reader :testCaseStarted
      attr_reader :testRunFinished
      attr_reader :testRunStarted
      attr_reader :testStepFinished
      attr_reader :testStepStarted
      attr_reader :undefinedParameterType

      def initialize(
        attachment: nil,
        gherkinDocument: nil,
        hook: nil,
        meta: nil,
        parameterType: nil,
        parseError: nil,
        pickle: nil,
        source: nil,
        stepDefinition: nil,
        testCase: nil,
        testCaseFinished: nil,
        testCaseStarted: nil,
        testRunFinished: nil,
        testRunStarted: nil,
        testStepFinished: nil,
        testStepStarted: nil,
        undefinedParameterType: nil
      )
        @attachment = attachment
        @gherkinDocument = gherkinDocument
        @hook = hook
        @meta = meta
        @parameterType = parameterType
        @parseError = parseError
        @pickle = pickle
        @source = source
        @stepDefinition = stepDefinition
        @testCase = testCase
        @testCaseFinished = testCaseFinished
        @testCaseStarted = testCaseStarted
        @testRunFinished = testRunFinished
        @testRunStarted = testRunStarted
        @testStepFinished = testStepFinished
        @testStepStarted = testStepStarted
        @undefinedParameterType = undefinedParameterType
      end
    end

    class GherkinDocument
      attr_reader :uri
      attr_reader :feature
      attr_reader :comments

      def initialize(
        uri: nil,
        feature: nil,
        comments: []
      )
        @uri = uri
        @feature = feature
        @comments = comments
      end
    end

    class Background
      attr_reader :location
      attr_reader :keyword
      attr_reader :name
      attr_reader :description
      attr_reader :steps
      attr_reader :id

      def initialize(
        location: Location.new,
        keyword: '',
        name: '',
        description: '',
        steps: [],
        id: ''
      )
        @location = location
        @keyword = keyword
        @name = name
        @description = description
        @steps = steps
        @id = id
      end
    end

    class Comment
      attr_reader :location
      attr_reader :text

      def initialize(
        location: Location.new,
        text: ''
      )
        @location = location
        @text = text
      end
    end

    class DataTable
      attr_reader :location
      attr_reader :rows

      def initialize(
        location: Location.new,
        rows: []
      )
        @location = location
        @rows = rows
      end
    end

    class DocString
      attr_reader :location
      attr_reader :mediaType
      attr_reader :content
      attr_reader :delimiter

      def initialize(
        location: Location.new,
        mediaType: nil,
        content: '',
        delimiter: ''
      )
        @location = location
        @mediaType = mediaType
        @content = content
        @delimiter = delimiter
      end
    end

    class Examples
      attr_reader :location
      attr_reader :tags
      attr_reader :keyword
      attr_reader :name
      attr_reader :description
      attr_reader :tableHeader
      attr_reader :tableBody
      attr_reader :id

      def initialize(
        location: Location.new,
        tags: [],
        keyword: '',
        name: '',
        description: '',
        tableHeader: nil,
        tableBody: [],
        id: ''
      )
        @location = location
        @tags = tags
        @keyword = keyword
        @name = name
        @description = description
        @tableHeader = tableHeader
        @tableBody = tableBody
        @id = id
      end
    end

    class Feature
      attr_reader :location
      attr_reader :tags
      attr_reader :language
      attr_reader :keyword
      attr_reader :name
      attr_reader :description
      attr_reader :children

      def initialize(
        location: Location.new,
        tags: [],
        language: '',
        keyword: '',
        name: '',
        description: '',
        children: []
      )
        @location = location
        @tags = tags
        @language = language
        @keyword = keyword
        @name = name
        @description = description
        @children = children
      end
    end

    class FeatureChild
      attr_reader :rule
      attr_reader :background
      attr_reader :scenario

      def initialize(
        rule: nil,
        background: nil,
        scenario: nil
      )
        @rule = rule
        @background = background
        @scenario = scenario
      end
    end

    class Rule
      attr_reader :location
      attr_reader :tags
      attr_reader :keyword
      attr_reader :name
      attr_reader :description
      attr_reader :children
      attr_reader :id

      def initialize(
        location: Location.new,
        tags: [],
        keyword: '',
        name: '',
        description: '',
        children: [],
        id: ''
      )
        @location = location
        @tags = tags
        @keyword = keyword
        @name = name
        @description = description
        @children = children
        @id = id
      end
    end

    class RuleChild
      attr_reader :background
      attr_reader :scenario

      def initialize(
        background: nil,
        scenario: nil
      )
        @background = background
        @scenario = scenario
      end
    end

    class Scenario
      attr_reader :location
      attr_reader :tags
      attr_reader :keyword
      attr_reader :name
      attr_reader :description
      attr_reader :steps
      attr_reader :examples
      attr_reader :id

      def initialize(
        location: Location.new,
        tags: [],
        keyword: '',
        name: '',
        description: '',
        steps: [],
        examples: [],
        id: ''
      )
        @location = location
        @tags = tags
        @keyword = keyword
        @name = name
        @description = description
        @steps = steps
        @examples = examples
        @id = id
      end
    end

    class Step
      attr_reader :location
      attr_reader :keyword
      attr_reader :text
      attr_reader :docString
      attr_reader :dataTable
      attr_reader :id

      def initialize(
        location: Location.new,
        keyword: '',
        text: '',
        docString: nil,
        dataTable: nil,
        id: ''
      )
        @location = location
        @keyword = keyword
        @text = text
        @docString = docString
        @dataTable = dataTable
        @id = id
      end
    end

    class TableCell
      attr_reader :location
      attr_reader :value

      def initialize(
        location: Location.new,
        value: ''
      )
        @location = location
        @value = value
      end
    end

    class TableRow
      attr_reader :location
      attr_reader :cells
      attr_reader :id

      def initialize(
        location: Location.new,
        cells: [],
        id: ''
      )
        @location = location
        @cells = cells
        @id = id
      end
    end

    class Tag
      attr_reader :location
      attr_reader :name
      attr_reader :id

      def initialize(
        location: Location.new,
        name: '',
        id: ''
      )
        @location = location
        @name = name
        @id = id
      end
    end

    class Hook
      attr_reader :id
      attr_reader :sourceReference
      attr_reader :tagExpression

      def initialize(
        id: '',
        sourceReference: SourceReference.new,
        tagExpression: nil
      )
        @id = id
        @sourceReference = sourceReference
        @tagExpression = tagExpression
      end
    end

    class Location
      attr_reader :line
      attr_reader :column

      def initialize(
        line: 0,
        column: nil
      )
        @line = line
        @column = column
      end
    end

    class Meta
      attr_reader :protocolVersion
      attr_reader :implementation
      attr_reader :runtime
      attr_reader :os
      attr_reader :cpu
      attr_reader :ci

      def initialize(
        protocolVersion: '',
        implementation: Product.new,
        runtime: Product.new,
        os: Product.new,
        cpu: Product.new,
        ci: nil
      )
        @protocolVersion = protocolVersion
        @implementation = implementation
        @runtime = runtime
        @os = os
        @cpu = cpu
        @ci = ci
      end
    end

    class Ci
      attr_reader :name
      attr_reader :url
      attr_reader :git

      def initialize(
        name: '',
        url: nil,
        git: nil
      )
        @name = name
        @url = url
        @git = git
      end
    end

    class Git
      attr_reader :remote
      attr_reader :revision
      attr_reader :branch
      attr_reader :tag

      def initialize(
        remote: '',
        revision: '',
        branch: nil,
        tag: nil
      )
        @remote = remote
        @revision = revision
        @branch = branch
        @tag = tag
      end
    end

    class Product
      attr_reader :name
      attr_reader :version

      def initialize(
        name: '',
        version: nil
      )
        @name = name
        @version = version
      end
    end

    class ParameterType
      attr_reader :name
      attr_reader :regularExpressions
      attr_reader :preferForRegularExpressionMatch
      attr_reader :useForSnippets
      attr_reader :id

      def initialize(
        name: '',
        regularExpressions: [],
        preferForRegularExpressionMatch: false,
        useForSnippets: false,
        id: ''
      )
        @name = name
        @regularExpressions = regularExpressions
        @preferForRegularExpressionMatch = preferForRegularExpressionMatch
        @useForSnippets = useForSnippets
        @id = id
      end
    end

    class ParseError
      attr_reader :source
      attr_reader :message

      def initialize(
        source: SourceReference.new,
        message: ''
      )
        @source = source
        @message = message
      end
    end

    class Pickle
      attr_reader :id
      attr_reader :uri
      attr_reader :name
      attr_reader :language
      attr_reader :steps
      attr_reader :tags
      attr_reader :astNodeIds

      def initialize(
        id: '',
        uri: '',
        name: '',
        language: '',
        steps: [],
        tags: [],
        astNodeIds: []
      )
        @id = id
        @uri = uri
        @name = name
        @language = language
        @steps = steps
        @tags = tags
        @astNodeIds = astNodeIds
      end
    end

    class PickleDocString
      attr_reader :mediaType
      attr_reader :content

      def initialize(
        mediaType: nil,
        content: ''
      )
        @mediaType = mediaType
        @content = content
      end
    end

    class PickleStep
      attr_reader :argument
      attr_reader :astNodeIds
      attr_reader :id
      attr_reader :text

      def initialize(
        argument: nil,
        astNodeIds: [],
        id: '',
        text: ''
      )
        @argument = argument
        @astNodeIds = astNodeIds
        @id = id
        @text = text
      end
    end

    class PickleStepArgument
      attr_reader :docString
      attr_reader :dataTable

      def initialize(
        docString: nil,
        dataTable: nil
      )
        @docString = docString
        @dataTable = dataTable
      end
    end

    class PickleTable
      attr_reader :rows

      def initialize(
        rows: []
      )
        @rows = rows
      end
    end

    class PickleTableCell
      attr_reader :value

      def initialize(
        value: ''
      )
        @value = value
      end
    end

    class PickleTableRow
      attr_reader :cells

      def initialize(
        cells: []
      )
        @cells = cells
      end
    end

    class PickleTag
      attr_reader :name
      attr_reader :astNodeId

      def initialize(
        name: '',
        astNodeId: ''
      )
        @name = name
        @astNodeId = astNodeId
      end
    end

    class Source
      attr_reader :uri
      attr_reader :data
      attr_reader :mediaType

      def initialize(
        uri: '',
        data: '',
        mediaType: SourceMediaType::TEXT_X_CUCUMBER_GHERKIN_PLAIN
      )
        @uri = uri
        @data = data
        @mediaType = mediaType
      end
    end

    class SourceReference
      attr_reader :uri
      attr_reader :javaMethod
      attr_reader :javaStackTraceElement
      attr_reader :location

      def initialize(
        uri: nil,
        javaMethod: nil,
        javaStackTraceElement: nil,
        location: nil
      )
        @uri = uri
        @javaMethod = javaMethod
        @javaStackTraceElement = javaStackTraceElement
        @location = location
      end
    end

    class JavaMethod
      attr_reader :className
      attr_reader :methodName
      attr_reader :methodParameterTypes

      def initialize(
        className: '',
        methodName: '',
        methodParameterTypes: []
      )
        @className = className
        @methodName = methodName
        @methodParameterTypes = methodParameterTypes
      end
    end

    class JavaStackTraceElement
      attr_reader :className
      attr_reader :fileName
      attr_reader :methodName

      def initialize(
        className: '',
        fileName: '',
        methodName: ''
      )
        @className = className
        @fileName = fileName
        @methodName = methodName
      end
    end

    class StepDefinition
      attr_reader :id
      attr_reader :pattern
      attr_reader :sourceReference

      def initialize(
        id: '',
        pattern: StepDefinitionPattern.new,
        sourceReference: SourceReference.new
      )
        @id = id
        @pattern = pattern
        @sourceReference = sourceReference
      end
    end

    class StepDefinitionPattern
      attr_reader :source
      attr_reader :type

      def initialize(
        source: '',
        type: StepDefinitionPatternType::CUCUMBER_EXPRESSION
      )
        @source = source
        @type = type
      end
    end

    class TestCase
      attr_reader :id
      attr_reader :pickleId
      attr_reader :testSteps

      def initialize(
        id: '',
        pickleId: '',
        testSteps: []
      )
        @id = id
        @pickleId = pickleId
        @testSteps = testSteps
      end
    end

    class Group
      attr_reader :children
      attr_reader :start
      attr_reader :value

      def initialize(
        children: [],
        start: nil,
        value: nil
      )
        @children = children
        @start = start
        @value = value
      end
    end

    class StepMatchArgument
      attr_reader :group
      attr_reader :parameterTypeName

      def initialize(
        group: Group.new,
        parameterTypeName: nil
      )
        @group = group
        @parameterTypeName = parameterTypeName
      end
    end

    class StepMatchArgumentsList
      attr_reader :stepMatchArguments

      def initialize(
        stepMatchArguments: []
      )
        @stepMatchArguments = stepMatchArguments
      end
    end

    class TestStep
      attr_reader :hookId
      attr_reader :id
      attr_reader :pickleStepId
      attr_reader :stepDefinitionIds
      attr_reader :stepMatchArgumentsLists

      def initialize(
        hookId: nil,
        id: '',
        pickleStepId: nil,
        stepDefinitionIds: nil,
        stepMatchArgumentsLists: nil
      )
        @hookId = hookId
        @id = id
        @pickleStepId = pickleStepId
        @stepDefinitionIds = stepDefinitionIds
        @stepMatchArgumentsLists = stepMatchArgumentsLists
      end
    end

    class TestCaseFinished
      attr_reader :testCaseStartedId
      attr_reader :timestamp

      def initialize(
        testCaseStartedId: '',
        timestamp: Timestamp.new
      )
        @testCaseStartedId = testCaseStartedId
        @timestamp = timestamp
      end
    end

    class TestCaseStarted
      attr_reader :attempt
      attr_reader :id
      attr_reader :testCaseId
      attr_reader :timestamp

      def initialize(
        attempt: 0,
        id: '',
        testCaseId: '',
        timestamp: Timestamp.new
      )
        @attempt = attempt
        @id = id
        @testCaseId = testCaseId
        @timestamp = timestamp
      end
    end

    class TestRunFinished
      attr_reader :message
      attr_reader :success
      attr_reader :timestamp

      def initialize(
        message: nil,
        success: false,
        timestamp: Timestamp.new
      )
        @message = message
        @success = success
        @timestamp = timestamp
      end
    end

    class TestRunStarted
      attr_reader :timestamp

      def initialize(
        timestamp: Timestamp.new
      )
        @timestamp = timestamp
      end
    end

    class TestStepFinished
      attr_reader :testCaseStartedId
      attr_reader :testStepId
      attr_reader :testStepResult
      attr_reader :timestamp

      def initialize(
        testCaseStartedId: '',
        testStepId: '',
        testStepResult: TestStepResult.new,
        timestamp: Timestamp.new
      )
        @testCaseStartedId = testCaseStartedId
        @testStepId = testStepId
        @testStepResult = testStepResult
        @timestamp = timestamp
      end
    end

    class TestStepResult
      attr_reader :duration
      attr_reader :message
      attr_reader :status
      attr_reader :willBeRetried

      def initialize(
        duration: Duration.new,
        message: nil,
        status: TestStepResultStatus::UNKNOWN,
        willBeRetried: false
      )
        @duration = duration
        @message = message
        @status = status
        @willBeRetried = willBeRetried
      end
    end

    class TestStepStarted
      attr_reader :testCaseStartedId
      attr_reader :testStepId
      attr_reader :timestamp

      def initialize(
        testCaseStartedId: '',
        testStepId: '',
        timestamp: Timestamp.new
      )
        @testCaseStartedId = testCaseStartedId
        @testStepId = testStepId
        @timestamp = timestamp
      end
    end

    class Timestamp
      attr_reader :seconds
      attr_reader :nanos

      def initialize(
        seconds: 0,
        nanos: 0
      )
        @seconds = seconds
        @nanos = nanos
      end
    end

    class UndefinedParameterType
      attr_reader :expression
      attr_reader :name

      def initialize(
        expression: '',
        name: ''
      )
        @expression = expression
        @name = name
      end
    end

  end
end

class Cucumber::Messages::AttachmentContentEncoding
  IDENTITY = 'IDENTITY'
  BASE64 = 'BASE64'
end

class Cucumber::Messages::SourceMediaType
  TEXT_X_CUCUMBER_GHERKIN_PLAIN = 'text/x.cucumber.gherkin+plain'
  TEXT_X_CUCUMBER_GHERKIN_MARKDOWN = 'text/x.cucumber.gherkin+markdown'
end

class Cucumber::Messages::StepDefinitionPatternType
  CUCUMBER_EXPRESSION = 'CUCUMBER_EXPRESSION'
  REGULAR_EXPRESSION = 'REGULAR_EXPRESSION'
end

class Cucumber::Messages::TestStepResultStatus
  UNKNOWN = 'UNKNOWN'
  PASSED = 'PASSED'
  SKIPPED = 'SKIPPED'
  PENDING = 'PENDING'
  UNDEFINED = 'UNDEFINED'
  AMBIGUOUS = 'AMBIGUOUS'
  FAILED = 'FAILED'
end
