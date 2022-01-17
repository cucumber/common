package io.cucumber.messages;

public class Messages {
    public static class Attachment {
        private final String body;
        private final AttachmentContentEncoding contentEncoding;
        private final String fileName;
        private final String mediaType;
        private final Source source;
        private final String testCaseStartedId;
        private final String testStepId;
        private final String url;

        public Attachment(
            String body,
            AttachmentContentEncoding contentEncoding,
            String fileName,
            String mediaType,
            Source source,
            String testCaseStartedId,
            String testStepId,
            String url
        ) {
            this.body = java.util.Objects.requireNonNull(body, "Attachment.body cannot be null");
            this.contentEncoding = java.util.Objects.requireNonNull(contentEncoding, "Attachment.contentEncoding cannot be null");
            this.fileName = fileName;
            this.mediaType = java.util.Objects.requireNonNull(mediaType, "Attachment.mediaType cannot be null");
            this.source = source;
            this.testCaseStartedId = testCaseStartedId;
            this.testStepId = testStepId;
            this.url = url;
        }

        public String getBody() {
            return body;
        }

        public AttachmentContentEncoding getContentEncoding() {
            return contentEncoding;
        }

        public java.util.Optional<String> getFileName() {
            return java.util.Optional.ofNullable(fileName);
        }

        public String getMediaType() {
            return mediaType;
        }

        public java.util.Optional<Source> getSource() {
            return java.util.Optional.ofNullable(source);
        }

        public java.util.Optional<String> getTestCaseStartedId() {
            return java.util.Optional.ofNullable(testCaseStartedId);
        }

        public java.util.Optional<String> getTestStepId() {
            return java.util.Optional.ofNullable(testStepId);
        }

        public java.util.Optional<String> getUrl() {
            return java.util.Optional.ofNullable(url);
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            Attachment that = (Attachment) o;
            return 
                body.equals(that.body) &&             
                contentEncoding.equals(that.contentEncoding) &&             
                java.util.Objects.equals(fileName, that.fileName) &&             
                mediaType.equals(that.mediaType) &&             
                java.util.Objects.equals(source, that.source) &&             
                java.util.Objects.equals(testCaseStartedId, that.testCaseStartedId) &&             
                java.util.Objects.equals(testStepId, that.testStepId) &&             
                java.util.Objects.equals(url, that.url);            
        }

        @Override
        public int hashCode() {
            return java.util.Objects.hash(
                body,
                contentEncoding,
                fileName,
                mediaType,
                source,
                testCaseStartedId,
                testStepId,
                url
            );
        }

        @Override
        public String toString() {
            return "Attachment{" +
                "body=" + body +
                ", contentEncoding=" + contentEncoding +
                ", fileName=" + fileName +
                ", mediaType=" + mediaType +
                ", source=" + source +
                ", testCaseStartedId=" + testCaseStartedId +
                ", testStepId=" + testStepId +
                ", url=" + url +
                '}';
        }
    }

    public static class Duration {
        private final Long seconds;
        private final Long nanos;

        public Duration(
            Long seconds,
            Long nanos
        ) {
            this.seconds = java.util.Objects.requireNonNull(seconds, "Duration.seconds cannot be null");
            this.nanos = java.util.Objects.requireNonNull(nanos, "Duration.nanos cannot be null");
        }

        public Long getSeconds() {
            return seconds;
        }

        public Long getNanos() {
            return nanos;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            Duration that = (Duration) o;
            return 
                seconds.equals(that.seconds) &&             
                nanos.equals(that.nanos);            
        }

        @Override
        public int hashCode() {
            return java.util.Objects.hash(
                seconds,
                nanos
            );
        }

        @Override
        public String toString() {
            return "Duration{" +
                "seconds=" + seconds +
                ", nanos=" + nanos +
                '}';
        }
    }

    public static class Envelope {
        private final Attachment attachment;
        private final GherkinDocument gherkinDocument;
        private final Hook hook;
        private final Meta meta;
        private final ParameterType parameterType;
        private final ParseError parseError;
        private final Pickle pickle;
        private final Source source;
        private final StepDefinition stepDefinition;
        private final TestCase testCase;
        private final TestCaseFinished testCaseFinished;
        private final TestCaseStarted testCaseStarted;
        private final TestRunFinished testRunFinished;
        private final TestRunStarted testRunStarted;
        private final TestStepFinished testStepFinished;
        private final TestStepStarted testStepStarted;
        private final UndefinedParameterType undefinedParameterType;

        public Envelope(Attachment attachment) {
            this(
                java.util.Objects.requireNonNull(attachment, "Envelope.attachment cannot be null"),
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
            );
        }

        public Envelope(GherkinDocument gherkinDocument) {
            this(
                null,
                java.util.Objects.requireNonNull(gherkinDocument, "Envelope.gherkinDocument cannot be null"),
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
            );
        }

        public Envelope(Hook hook) {
            this(
                null,
                null,
                java.util.Objects.requireNonNull(hook, "Envelope.hook cannot be null"),
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
            );
        }

        public Envelope(Meta meta) {
            this(
                null,
                null,
                null,
                java.util.Objects.requireNonNull(meta, "Envelope.meta cannot be null"),
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
            );
        }

        public Envelope(ParameterType parameterType) {
            this(
                null,
                null,
                null,
                null,
                java.util.Objects.requireNonNull(parameterType, "Envelope.parameterType cannot be null"),
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
            );
        }

        public Envelope(ParseError parseError) {
            this(
                null,
                null,
                null,
                null,
                null,
                java.util.Objects.requireNonNull(parseError, "Envelope.parseError cannot be null"),
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
            );
        }

        public Envelope(Pickle pickle) {
            this(
                null,
                null,
                null,
                null,
                null,
                null,
                java.util.Objects.requireNonNull(pickle, "Envelope.pickle cannot be null"),
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
            );
        }

        public Envelope(Source source) {
            this(
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                java.util.Objects.requireNonNull(source, "Envelope.source cannot be null"),
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
            );
        }

        public Envelope(StepDefinition stepDefinition) {
            this(
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                java.util.Objects.requireNonNull(stepDefinition, "Envelope.stepDefinition cannot be null"),
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
            );
        }

        public Envelope(TestCase testCase) {
            this(
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                java.util.Objects.requireNonNull(testCase, "Envelope.testCase cannot be null"),
                null,
                null,
                null,
                null,
                null,
                null,
                null
            );
        }

        public Envelope(TestCaseFinished testCaseFinished) {
            this(
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                java.util.Objects.requireNonNull(testCaseFinished, "Envelope.testCaseFinished cannot be null"),
                null,
                null,
                null,
                null,
                null,
                null
            );
        }

        public Envelope(TestCaseStarted testCaseStarted) {
            this(
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                java.util.Objects.requireNonNull(testCaseStarted, "Envelope.testCaseStarted cannot be null"),
                null,
                null,
                null,
                null,
                null
            );
        }

        public Envelope(TestRunFinished testRunFinished) {
            this(
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                java.util.Objects.requireNonNull(testRunFinished, "Envelope.testRunFinished cannot be null"),
                null,
                null,
                null,
                null
            );
        }

        public Envelope(TestRunStarted testRunStarted) {
            this(
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                java.util.Objects.requireNonNull(testRunStarted, "Envelope.testRunStarted cannot be null"),
                null,
                null,
                null
            );
        }

        public Envelope(TestStepFinished testStepFinished) {
            this(
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                java.util.Objects.requireNonNull(testStepFinished, "Envelope.testStepFinished cannot be null"),
                null,
                null
            );
        }

        public Envelope(TestStepStarted testStepStarted) {
            this(
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                java.util.Objects.requireNonNull(testStepStarted, "Envelope.testStepStarted cannot be null"),
                null
            );
        }

        public Envelope(UndefinedParameterType undefinedParameterType) {
            this(
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                java.util.Objects.requireNonNull(undefinedParameterType, "Envelope.undefinedParameterType cannot be null")
            );
        }

        public Envelope(
            Attachment attachment,
            GherkinDocument gherkinDocument,
            Hook hook,
            Meta meta,
            ParameterType parameterType,
            ParseError parseError,
            Pickle pickle,
            Source source,
            StepDefinition stepDefinition,
            TestCase testCase,
            TestCaseFinished testCaseFinished,
            TestCaseStarted testCaseStarted,
            TestRunFinished testRunFinished,
            TestRunStarted testRunStarted,
            TestStepFinished testStepFinished,
            TestStepStarted testStepStarted,
            UndefinedParameterType undefinedParameterType
        ) {
            this.attachment = attachment;
            this.gherkinDocument = gherkinDocument;
            this.hook = hook;
            this.meta = meta;
            this.parameterType = parameterType;
            this.parseError = parseError;
            this.pickle = pickle;
            this.source = source;
            this.stepDefinition = stepDefinition;
            this.testCase = testCase;
            this.testCaseFinished = testCaseFinished;
            this.testCaseStarted = testCaseStarted;
            this.testRunFinished = testRunFinished;
            this.testRunStarted = testRunStarted;
            this.testStepFinished = testStepFinished;
            this.testStepStarted = testStepStarted;
            this.undefinedParameterType = undefinedParameterType;
        }

        public java.util.Optional<Attachment> getAttachment() {
            return java.util.Optional.ofNullable(attachment);
        }

        public java.util.Optional<GherkinDocument> getGherkinDocument() {
            return java.util.Optional.ofNullable(gherkinDocument);
        }

        public java.util.Optional<Hook> getHook() {
            return java.util.Optional.ofNullable(hook);
        }

        public java.util.Optional<Meta> getMeta() {
            return java.util.Optional.ofNullable(meta);
        }

        public java.util.Optional<ParameterType> getParameterType() {
            return java.util.Optional.ofNullable(parameterType);
        }

        public java.util.Optional<ParseError> getParseError() {
            return java.util.Optional.ofNullable(parseError);
        }

        public java.util.Optional<Pickle> getPickle() {
            return java.util.Optional.ofNullable(pickle);
        }

        public java.util.Optional<Source> getSource() {
            return java.util.Optional.ofNullable(source);
        }

        public java.util.Optional<StepDefinition> getStepDefinition() {
            return java.util.Optional.ofNullable(stepDefinition);
        }

        public java.util.Optional<TestCase> getTestCase() {
            return java.util.Optional.ofNullable(testCase);
        }

        public java.util.Optional<TestCaseFinished> getTestCaseFinished() {
            return java.util.Optional.ofNullable(testCaseFinished);
        }

        public java.util.Optional<TestCaseStarted> getTestCaseStarted() {
            return java.util.Optional.ofNullable(testCaseStarted);
        }

        public java.util.Optional<TestRunFinished> getTestRunFinished() {
            return java.util.Optional.ofNullable(testRunFinished);
        }

        public java.util.Optional<TestRunStarted> getTestRunStarted() {
            return java.util.Optional.ofNullable(testRunStarted);
        }

        public java.util.Optional<TestStepFinished> getTestStepFinished() {
            return java.util.Optional.ofNullable(testStepFinished);
        }

        public java.util.Optional<TestStepStarted> getTestStepStarted() {
            return java.util.Optional.ofNullable(testStepStarted);
        }

        public java.util.Optional<UndefinedParameterType> getUndefinedParameterType() {
            return java.util.Optional.ofNullable(undefinedParameterType);
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            Envelope that = (Envelope) o;
            return 
                java.util.Objects.equals(attachment, that.attachment) &&             
                java.util.Objects.equals(gherkinDocument, that.gherkinDocument) &&             
                java.util.Objects.equals(hook, that.hook) &&             
                java.util.Objects.equals(meta, that.meta) &&             
                java.util.Objects.equals(parameterType, that.parameterType) &&             
                java.util.Objects.equals(parseError, that.parseError) &&             
                java.util.Objects.equals(pickle, that.pickle) &&             
                java.util.Objects.equals(source, that.source) &&             
                java.util.Objects.equals(stepDefinition, that.stepDefinition) &&             
                java.util.Objects.equals(testCase, that.testCase) &&             
                java.util.Objects.equals(testCaseFinished, that.testCaseFinished) &&             
                java.util.Objects.equals(testCaseStarted, that.testCaseStarted) &&             
                java.util.Objects.equals(testRunFinished, that.testRunFinished) &&             
                java.util.Objects.equals(testRunStarted, that.testRunStarted) &&             
                java.util.Objects.equals(testStepFinished, that.testStepFinished) &&             
                java.util.Objects.equals(testStepStarted, that.testStepStarted) &&             
                java.util.Objects.equals(undefinedParameterType, that.undefinedParameterType);            
        }

        @Override
        public int hashCode() {
            return java.util.Objects.hash(
                attachment,
                gherkinDocument,
                hook,
                meta,
                parameterType,
                parseError,
                pickle,
                source,
                stepDefinition,
                testCase,
                testCaseFinished,
                testCaseStarted,
                testRunFinished,
                testRunStarted,
                testStepFinished,
                testStepStarted,
                undefinedParameterType
            );
        }

        @Override
        public String toString() {
            return "Envelope{" +
                "attachment=" + attachment +
                ", gherkinDocument=" + gherkinDocument +
                ", hook=" + hook +
                ", meta=" + meta +
                ", parameterType=" + parameterType +
                ", parseError=" + parseError +
                ", pickle=" + pickle +
                ", source=" + source +
                ", stepDefinition=" + stepDefinition +
                ", testCase=" + testCase +
                ", testCaseFinished=" + testCaseFinished +
                ", testCaseStarted=" + testCaseStarted +
                ", testRunFinished=" + testRunFinished +
                ", testRunStarted=" + testRunStarted +
                ", testStepFinished=" + testStepFinished +
                ", testStepStarted=" + testStepStarted +
                ", undefinedParameterType=" + undefinedParameterType +
                '}';
        }
    }

    public static class GherkinDocument {
        private final String uri;
        private final Feature feature;
        private final java.util.List<Comment> comments;

        public GherkinDocument(
            String uri,
            Feature feature,
            java.util.List<Comment> comments
        ) {
            this.uri = uri;
            this.feature = feature;
            this.comments = java.util.Collections.unmodifiableList(new java.util.ArrayList<>(java.util.Objects.requireNonNull(comments, "GherkinDocument.comments cannot be null")));
        }

        public java.util.Optional<String> getUri() {
            return java.util.Optional.ofNullable(uri);
        }

        public java.util.Optional<Feature> getFeature() {
            return java.util.Optional.ofNullable(feature);
        }

        public java.util.List<Comment> getComments() {
            return comments;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            GherkinDocument that = (GherkinDocument) o;
            return 
                java.util.Objects.equals(uri, that.uri) &&             
                java.util.Objects.equals(feature, that.feature) &&             
                comments.equals(that.comments);            
        }

        @Override
        public int hashCode() {
            return java.util.Objects.hash(
                uri,
                feature,
                comments
            );
        }

        @Override
        public String toString() {
            return "GherkinDocument{" +
                "uri=" + uri +
                ", feature=" + feature +
                ", comments=" + comments +
                '}';
        }
    }

    public static class Background {
        private final Location location;
        private final String keyword;
        private final String name;
        private final String description;
        private final java.util.List<Step> steps;
        private final String id;

        public Background(
            Location location,
            String keyword,
            String name,
            String description,
            java.util.List<Step> steps,
            String id
        ) {
            this.location = java.util.Objects.requireNonNull(location, "Background.location cannot be null");
            this.keyword = java.util.Objects.requireNonNull(keyword, "Background.keyword cannot be null");
            this.name = java.util.Objects.requireNonNull(name, "Background.name cannot be null");
            this.description = java.util.Objects.requireNonNull(description, "Background.description cannot be null");
            this.steps = java.util.Collections.unmodifiableList(new java.util.ArrayList<>(java.util.Objects.requireNonNull(steps, "Background.steps cannot be null")));
            this.id = java.util.Objects.requireNonNull(id, "Background.id cannot be null");
        }

        public Location getLocation() {
            return location;
        }

        public String getKeyword() {
            return keyword;
        }

        public String getName() {
            return name;
        }

        public String getDescription() {
            return description;
        }

        public java.util.List<Step> getSteps() {
            return steps;
        }

        public String getId() {
            return id;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            Background that = (Background) o;
            return 
                location.equals(that.location) &&             
                keyword.equals(that.keyword) &&             
                name.equals(that.name) &&             
                description.equals(that.description) &&             
                steps.equals(that.steps) &&             
                id.equals(that.id);            
        }

        @Override
        public int hashCode() {
            return java.util.Objects.hash(
                location,
                keyword,
                name,
                description,
                steps,
                id
            );
        }

        @Override
        public String toString() {
            return "Background{" +
                "location=" + location +
                ", keyword=" + keyword +
                ", name=" + name +
                ", description=" + description +
                ", steps=" + steps +
                ", id=" + id +
                '}';
        }
    }

    public static class Comment {
        private final Location location;
        private final String text;

        public Comment(
            Location location,
            String text
        ) {
            this.location = java.util.Objects.requireNonNull(location, "Comment.location cannot be null");
            this.text = java.util.Objects.requireNonNull(text, "Comment.text cannot be null");
        }

        public Location getLocation() {
            return location;
        }

        public String getText() {
            return text;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            Comment that = (Comment) o;
            return 
                location.equals(that.location) &&             
                text.equals(that.text);            
        }

        @Override
        public int hashCode() {
            return java.util.Objects.hash(
                location,
                text
            );
        }

        @Override
        public String toString() {
            return "Comment{" +
                "location=" + location +
                ", text=" + text +
                '}';
        }
    }

    public static class DataTable {
        private final Location location;
        private final java.util.List<TableRow> rows;

        public DataTable(
            Location location,
            java.util.List<TableRow> rows
        ) {
            this.location = java.util.Objects.requireNonNull(location, "DataTable.location cannot be null");
            this.rows = java.util.Collections.unmodifiableList(new java.util.ArrayList<>(java.util.Objects.requireNonNull(rows, "DataTable.rows cannot be null")));
        }

        public Location getLocation() {
            return location;
        }

        public java.util.List<TableRow> getRows() {
            return rows;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            DataTable that = (DataTable) o;
            return 
                location.equals(that.location) &&             
                rows.equals(that.rows);            
        }

        @Override
        public int hashCode() {
            return java.util.Objects.hash(
                location,
                rows
            );
        }

        @Override
        public String toString() {
            return "DataTable{" +
                "location=" + location +
                ", rows=" + rows +
                '}';
        }
    }

    public static class DocString {
        private final Location location;
        private final String mediaType;
        private final String content;
        private final String delimiter;

        public DocString(
            Location location,
            String mediaType,
            String content,
            String delimiter
        ) {
            this.location = java.util.Objects.requireNonNull(location, "DocString.location cannot be null");
            this.mediaType = mediaType;
            this.content = java.util.Objects.requireNonNull(content, "DocString.content cannot be null");
            this.delimiter = java.util.Objects.requireNonNull(delimiter, "DocString.delimiter cannot be null");
        }

        public Location getLocation() {
            return location;
        }

        public java.util.Optional<String> getMediaType() {
            return java.util.Optional.ofNullable(mediaType);
        }

        public String getContent() {
            return content;
        }

        public String getDelimiter() {
            return delimiter;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            DocString that = (DocString) o;
            return 
                location.equals(that.location) &&             
                java.util.Objects.equals(mediaType, that.mediaType) &&             
                content.equals(that.content) &&             
                delimiter.equals(that.delimiter);            
        }

        @Override
        public int hashCode() {
            return java.util.Objects.hash(
                location,
                mediaType,
                content,
                delimiter
            );
        }

        @Override
        public String toString() {
            return "DocString{" +
                "location=" + location +
                ", mediaType=" + mediaType +
                ", content=" + content +
                ", delimiter=" + delimiter +
                '}';
        }
    }

    public static class Examples {
        private final Location location;
        private final java.util.List<Tag> tags;
        private final String keyword;
        private final String name;
        private final String description;
        private final TableRow tableHeader;
        private final java.util.List<TableRow> tableBody;
        private final String id;

        public Examples(
            Location location,
            java.util.List<Tag> tags,
            String keyword,
            String name,
            String description,
            TableRow tableHeader,
            java.util.List<TableRow> tableBody,
            String id
        ) {
            this.location = java.util.Objects.requireNonNull(location, "Examples.location cannot be null");
            this.tags = java.util.Collections.unmodifiableList(new java.util.ArrayList<>(java.util.Objects.requireNonNull(tags, "Examples.tags cannot be null")));
            this.keyword = java.util.Objects.requireNonNull(keyword, "Examples.keyword cannot be null");
            this.name = java.util.Objects.requireNonNull(name, "Examples.name cannot be null");
            this.description = java.util.Objects.requireNonNull(description, "Examples.description cannot be null");
            this.tableHeader = tableHeader;
            this.tableBody = java.util.Collections.unmodifiableList(new java.util.ArrayList<>(java.util.Objects.requireNonNull(tableBody, "Examples.tableBody cannot be null")));
            this.id = java.util.Objects.requireNonNull(id, "Examples.id cannot be null");
        }

        public Location getLocation() {
            return location;
        }

        public java.util.List<Tag> getTags() {
            return tags;
        }

        public String getKeyword() {
            return keyword;
        }

        public String getName() {
            return name;
        }

        public String getDescription() {
            return description;
        }

        public java.util.Optional<TableRow> getTableHeader() {
            return java.util.Optional.ofNullable(tableHeader);
        }

        public java.util.List<TableRow> getTableBody() {
            return tableBody;
        }

        public String getId() {
            return id;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            Examples that = (Examples) o;
            return 
                location.equals(that.location) &&             
                tags.equals(that.tags) &&             
                keyword.equals(that.keyword) &&             
                name.equals(that.name) &&             
                description.equals(that.description) &&             
                java.util.Objects.equals(tableHeader, that.tableHeader) &&             
                tableBody.equals(that.tableBody) &&             
                id.equals(that.id);            
        }

        @Override
        public int hashCode() {
            return java.util.Objects.hash(
                location,
                tags,
                keyword,
                name,
                description,
                tableHeader,
                tableBody,
                id
            );
        }

        @Override
        public String toString() {
            return "Examples{" +
                "location=" + location +
                ", tags=" + tags +
                ", keyword=" + keyword +
                ", name=" + name +
                ", description=" + description +
                ", tableHeader=" + tableHeader +
                ", tableBody=" + tableBody +
                ", id=" + id +
                '}';
        }
    }

    public static class Feature {
        private final Location location;
        private final java.util.List<Tag> tags;
        private final String language;
        private final String keyword;
        private final String name;
        private final String description;
        private final java.util.List<FeatureChild> children;

        public Feature(
            Location location,
            java.util.List<Tag> tags,
            String language,
            String keyword,
            String name,
            String description,
            java.util.List<FeatureChild> children
        ) {
            this.location = java.util.Objects.requireNonNull(location, "Feature.location cannot be null");
            this.tags = java.util.Collections.unmodifiableList(new java.util.ArrayList<>(java.util.Objects.requireNonNull(tags, "Feature.tags cannot be null")));
            this.language = java.util.Objects.requireNonNull(language, "Feature.language cannot be null");
            this.keyword = java.util.Objects.requireNonNull(keyword, "Feature.keyword cannot be null");
            this.name = java.util.Objects.requireNonNull(name, "Feature.name cannot be null");
            this.description = java.util.Objects.requireNonNull(description, "Feature.description cannot be null");
            this.children = java.util.Collections.unmodifiableList(new java.util.ArrayList<>(java.util.Objects.requireNonNull(children, "Feature.children cannot be null")));
        }

        public Location getLocation() {
            return location;
        }

        public java.util.List<Tag> getTags() {
            return tags;
        }

        public String getLanguage() {
            return language;
        }

        public String getKeyword() {
            return keyword;
        }

        public String getName() {
            return name;
        }

        public String getDescription() {
            return description;
        }

        public java.util.List<FeatureChild> getChildren() {
            return children;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            Feature that = (Feature) o;
            return 
                location.equals(that.location) &&             
                tags.equals(that.tags) &&             
                language.equals(that.language) &&             
                keyword.equals(that.keyword) &&             
                name.equals(that.name) &&             
                description.equals(that.description) &&             
                children.equals(that.children);            
        }

        @Override
        public int hashCode() {
            return java.util.Objects.hash(
                location,
                tags,
                language,
                keyword,
                name,
                description,
                children
            );
        }

        @Override
        public String toString() {
            return "Feature{" +
                "location=" + location +
                ", tags=" + tags +
                ", language=" + language +
                ", keyword=" + keyword +
                ", name=" + name +
                ", description=" + description +
                ", children=" + children +
                '}';
        }
    }

    public static class FeatureChild {
        private final Rule rule;
        private final Background background;
        private final Scenario scenario;

        public FeatureChild(Rule rule) {
            this(
                java.util.Objects.requireNonNull(rule, "FeatureChild.rule cannot be null"),
                null,
                null
            );
        }

        public FeatureChild(Background background) {
            this(
                null,
                java.util.Objects.requireNonNull(background, "FeatureChild.background cannot be null"),
                null
            );
        }

        public FeatureChild(Scenario scenario) {
            this(
                null,
                null,
                java.util.Objects.requireNonNull(scenario, "FeatureChild.scenario cannot be null")
            );
        }

        public FeatureChild(
            Rule rule,
            Background background,
            Scenario scenario
        ) {
            this.rule = rule;
            this.background = background;
            this.scenario = scenario;
        }

        public java.util.Optional<Rule> getRule() {
            return java.util.Optional.ofNullable(rule);
        }

        public java.util.Optional<Background> getBackground() {
            return java.util.Optional.ofNullable(background);
        }

        public java.util.Optional<Scenario> getScenario() {
            return java.util.Optional.ofNullable(scenario);
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            FeatureChild that = (FeatureChild) o;
            return 
                java.util.Objects.equals(rule, that.rule) &&             
                java.util.Objects.equals(background, that.background) &&             
                java.util.Objects.equals(scenario, that.scenario);            
        }

        @Override
        public int hashCode() {
            return java.util.Objects.hash(
                rule,
                background,
                scenario
            );
        }

        @Override
        public String toString() {
            return "FeatureChild{" +
                "rule=" + rule +
                ", background=" + background +
                ", scenario=" + scenario +
                '}';
        }
    }

    public static class Rule {
        private final Location location;
        private final java.util.List<Tag> tags;
        private final String keyword;
        private final String name;
        private final String description;
        private final java.util.List<RuleChild> children;
        private final String id;

        public Rule(
            Location location,
            java.util.List<Tag> tags,
            String keyword,
            String name,
            String description,
            java.util.List<RuleChild> children,
            String id
        ) {
            this.location = java.util.Objects.requireNonNull(location, "Rule.location cannot be null");
            this.tags = java.util.Collections.unmodifiableList(new java.util.ArrayList<>(java.util.Objects.requireNonNull(tags, "Rule.tags cannot be null")));
            this.keyword = java.util.Objects.requireNonNull(keyword, "Rule.keyword cannot be null");
            this.name = java.util.Objects.requireNonNull(name, "Rule.name cannot be null");
            this.description = java.util.Objects.requireNonNull(description, "Rule.description cannot be null");
            this.children = java.util.Collections.unmodifiableList(new java.util.ArrayList<>(java.util.Objects.requireNonNull(children, "Rule.children cannot be null")));
            this.id = java.util.Objects.requireNonNull(id, "Rule.id cannot be null");
        }

        public Location getLocation() {
            return location;
        }

        public java.util.List<Tag> getTags() {
            return tags;
        }

        public String getKeyword() {
            return keyword;
        }

        public String getName() {
            return name;
        }

        public String getDescription() {
            return description;
        }

        public java.util.List<RuleChild> getChildren() {
            return children;
        }

        public String getId() {
            return id;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            Rule that = (Rule) o;
            return 
                location.equals(that.location) &&             
                tags.equals(that.tags) &&             
                keyword.equals(that.keyword) &&             
                name.equals(that.name) &&             
                description.equals(that.description) &&             
                children.equals(that.children) &&             
                id.equals(that.id);            
        }

        @Override
        public int hashCode() {
            return java.util.Objects.hash(
                location,
                tags,
                keyword,
                name,
                description,
                children,
                id
            );
        }

        @Override
        public String toString() {
            return "Rule{" +
                "location=" + location +
                ", tags=" + tags +
                ", keyword=" + keyword +
                ", name=" + name +
                ", description=" + description +
                ", children=" + children +
                ", id=" + id +
                '}';
        }
    }

    public static class RuleChild {
        private final Background background;
        private final Scenario scenario;

        public RuleChild(Background background) {
            this(
                java.util.Objects.requireNonNull(background, "RuleChild.background cannot be null"),
                null
            );
        }

        public RuleChild(Scenario scenario) {
            this(
                null,
                java.util.Objects.requireNonNull(scenario, "RuleChild.scenario cannot be null")
            );
        }

        public RuleChild(
            Background background,
            Scenario scenario
        ) {
            this.background = background;
            this.scenario = scenario;
        }

        public java.util.Optional<Background> getBackground() {
            return java.util.Optional.ofNullable(background);
        }

        public java.util.Optional<Scenario> getScenario() {
            return java.util.Optional.ofNullable(scenario);
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            RuleChild that = (RuleChild) o;
            return 
                java.util.Objects.equals(background, that.background) &&             
                java.util.Objects.equals(scenario, that.scenario);            
        }

        @Override
        public int hashCode() {
            return java.util.Objects.hash(
                background,
                scenario
            );
        }

        @Override
        public String toString() {
            return "RuleChild{" +
                "background=" + background +
                ", scenario=" + scenario +
                '}';
        }
    }

    public static class Scenario {
        private final Location location;
        private final java.util.List<Tag> tags;
        private final String keyword;
        private final String name;
        private final String description;
        private final java.util.List<Step> steps;
        private final java.util.List<Examples> examples;
        private final String id;

        public Scenario(
            Location location,
            java.util.List<Tag> tags,
            String keyword,
            String name,
            String description,
            java.util.List<Step> steps,
            java.util.List<Examples> examples,
            String id
        ) {
            this.location = java.util.Objects.requireNonNull(location, "Scenario.location cannot be null");
            this.tags = java.util.Collections.unmodifiableList(new java.util.ArrayList<>(java.util.Objects.requireNonNull(tags, "Scenario.tags cannot be null")));
            this.keyword = java.util.Objects.requireNonNull(keyword, "Scenario.keyword cannot be null");
            this.name = java.util.Objects.requireNonNull(name, "Scenario.name cannot be null");
            this.description = java.util.Objects.requireNonNull(description, "Scenario.description cannot be null");
            this.steps = java.util.Collections.unmodifiableList(new java.util.ArrayList<>(java.util.Objects.requireNonNull(steps, "Scenario.steps cannot be null")));
            this.examples = java.util.Collections.unmodifiableList(new java.util.ArrayList<>(java.util.Objects.requireNonNull(examples, "Scenario.examples cannot be null")));
            this.id = java.util.Objects.requireNonNull(id, "Scenario.id cannot be null");
        }

        public Location getLocation() {
            return location;
        }

        public java.util.List<Tag> getTags() {
            return tags;
        }

        public String getKeyword() {
            return keyword;
        }

        public String getName() {
            return name;
        }

        public String getDescription() {
            return description;
        }

        public java.util.List<Step> getSteps() {
            return steps;
        }

        public java.util.List<Examples> getExamples() {
            return examples;
        }

        public String getId() {
            return id;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            Scenario that = (Scenario) o;
            return 
                location.equals(that.location) &&             
                tags.equals(that.tags) &&             
                keyword.equals(that.keyword) &&             
                name.equals(that.name) &&             
                description.equals(that.description) &&             
                steps.equals(that.steps) &&             
                examples.equals(that.examples) &&             
                id.equals(that.id);            
        }

        @Override
        public int hashCode() {
            return java.util.Objects.hash(
                location,
                tags,
                keyword,
                name,
                description,
                steps,
                examples,
                id
            );
        }

        @Override
        public String toString() {
            return "Scenario{" +
                "location=" + location +
                ", tags=" + tags +
                ", keyword=" + keyword +
                ", name=" + name +
                ", description=" + description +
                ", steps=" + steps +
                ", examples=" + examples +
                ", id=" + id +
                '}';
        }
    }

    public static class Step {
        private final Location location;
        private final String keyword;
        private final String text;
        private final DocString docString;
        private final DataTable dataTable;
        private final String id;

        public Step(
            Location location,
            String keyword,
            String text,
            DocString docString,
            DataTable dataTable,
            String id
        ) {
            this.location = java.util.Objects.requireNonNull(location, "Step.location cannot be null");
            this.keyword = java.util.Objects.requireNonNull(keyword, "Step.keyword cannot be null");
            this.text = java.util.Objects.requireNonNull(text, "Step.text cannot be null");
            this.docString = docString;
            this.dataTable = dataTable;
            this.id = java.util.Objects.requireNonNull(id, "Step.id cannot be null");
        }

        public Location getLocation() {
            return location;
        }

        public String getKeyword() {
            return keyword;
        }

        public String getText() {
            return text;
        }

        public java.util.Optional<DocString> getDocString() {
            return java.util.Optional.ofNullable(docString);
        }

        public java.util.Optional<DataTable> getDataTable() {
            return java.util.Optional.ofNullable(dataTable);
        }

        public String getId() {
            return id;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            Step that = (Step) o;
            return 
                location.equals(that.location) &&             
                keyword.equals(that.keyword) &&             
                text.equals(that.text) &&             
                java.util.Objects.equals(docString, that.docString) &&             
                java.util.Objects.equals(dataTable, that.dataTable) &&             
                id.equals(that.id);            
        }

        @Override
        public int hashCode() {
            return java.util.Objects.hash(
                location,
                keyword,
                text,
                docString,
                dataTable,
                id
            );
        }

        @Override
        public String toString() {
            return "Step{" +
                "location=" + location +
                ", keyword=" + keyword +
                ", text=" + text +
                ", docString=" + docString +
                ", dataTable=" + dataTable +
                ", id=" + id +
                '}';
        }
    }

    public static class TableCell {
        private final Location location;
        private final String value;

        public TableCell(
            Location location,
            String value
        ) {
            this.location = java.util.Objects.requireNonNull(location, "TableCell.location cannot be null");
            this.value = java.util.Objects.requireNonNull(value, "TableCell.value cannot be null");
        }

        public Location getLocation() {
            return location;
        }

        public String getValue() {
            return value;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            TableCell that = (TableCell) o;
            return 
                location.equals(that.location) &&             
                value.equals(that.value);            
        }

        @Override
        public int hashCode() {
            return java.util.Objects.hash(
                location,
                value
            );
        }

        @Override
        public String toString() {
            return "TableCell{" +
                "location=" + location +
                ", value=" + value +
                '}';
        }
    }

    public static class TableRow {
        private final Location location;
        private final java.util.List<TableCell> cells;
        private final String id;

        public TableRow(
            Location location,
            java.util.List<TableCell> cells,
            String id
        ) {
            this.location = java.util.Objects.requireNonNull(location, "TableRow.location cannot be null");
            this.cells = java.util.Collections.unmodifiableList(new java.util.ArrayList<>(java.util.Objects.requireNonNull(cells, "TableRow.cells cannot be null")));
            this.id = java.util.Objects.requireNonNull(id, "TableRow.id cannot be null");
        }

        public Location getLocation() {
            return location;
        }

        public java.util.List<TableCell> getCells() {
            return cells;
        }

        public String getId() {
            return id;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            TableRow that = (TableRow) o;
            return 
                location.equals(that.location) &&             
                cells.equals(that.cells) &&             
                id.equals(that.id);            
        }

        @Override
        public int hashCode() {
            return java.util.Objects.hash(
                location,
                cells,
                id
            );
        }

        @Override
        public String toString() {
            return "TableRow{" +
                "location=" + location +
                ", cells=" + cells +
                ", id=" + id +
                '}';
        }
    }

    public static class Tag {
        private final Location location;
        private final String name;
        private final String id;

        public Tag(
            Location location,
            String name,
            String id
        ) {
            this.location = java.util.Objects.requireNonNull(location, "Tag.location cannot be null");
            this.name = java.util.Objects.requireNonNull(name, "Tag.name cannot be null");
            this.id = java.util.Objects.requireNonNull(id, "Tag.id cannot be null");
        }

        public Location getLocation() {
            return location;
        }

        public String getName() {
            return name;
        }

        public String getId() {
            return id;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            Tag that = (Tag) o;
            return 
                location.equals(that.location) &&             
                name.equals(that.name) &&             
                id.equals(that.id);            
        }

        @Override
        public int hashCode() {
            return java.util.Objects.hash(
                location,
                name,
                id
            );
        }

        @Override
        public String toString() {
            return "Tag{" +
                "location=" + location +
                ", name=" + name +
                ", id=" + id +
                '}';
        }
    }

    public static class Hook {
        private final String id;
        private final SourceReference sourceReference;
        private final String tagExpression;

        public Hook(
            String id,
            SourceReference sourceReference,
            String tagExpression
        ) {
            this.id = java.util.Objects.requireNonNull(id, "Hook.id cannot be null");
            this.sourceReference = java.util.Objects.requireNonNull(sourceReference, "Hook.sourceReference cannot be null");
            this.tagExpression = tagExpression;
        }

        public String getId() {
            return id;
        }

        public SourceReference getSourceReference() {
            return sourceReference;
        }

        public java.util.Optional<String> getTagExpression() {
            return java.util.Optional.ofNullable(tagExpression);
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            Hook that = (Hook) o;
            return 
                id.equals(that.id) &&             
                sourceReference.equals(that.sourceReference) &&             
                java.util.Objects.equals(tagExpression, that.tagExpression);            
        }

        @Override
        public int hashCode() {
            return java.util.Objects.hash(
                id,
                sourceReference,
                tagExpression
            );
        }

        @Override
        public String toString() {
            return "Hook{" +
                "id=" + id +
                ", sourceReference=" + sourceReference +
                ", tagExpression=" + tagExpression +
                '}';
        }
    }

    public static class Location {
        private final Long line;
        private final Long column;

        public Location(
            Long line,
            Long column
        ) {
            this.line = java.util.Objects.requireNonNull(line, "Location.line cannot be null");
            this.column = column;
        }

        public Long getLine() {
            return line;
        }

        public java.util.Optional<Long> getColumn() {
            return java.util.Optional.ofNullable(column);
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            Location that = (Location) o;
            return 
                line.equals(that.line) &&             
                java.util.Objects.equals(column, that.column);            
        }

        @Override
        public int hashCode() {
            return java.util.Objects.hash(
                line,
                column
            );
        }

        @Override
        public String toString() {
            return "Location{" +
                "line=" + line +
                ", column=" + column +
                '}';
        }
    }

    public static class Meta {
        private final String protocolVersion;
        private final Product implementation;
        private final Product runtime;
        private final Product os;
        private final Product cpu;
        private final Ci ci;

        public Meta(
            String protocolVersion,
            Product implementation,
            Product runtime,
            Product os,
            Product cpu,
            Ci ci
        ) {
            this.protocolVersion = java.util.Objects.requireNonNull(protocolVersion, "Meta.protocolVersion cannot be null");
            this.implementation = java.util.Objects.requireNonNull(implementation, "Meta.implementation cannot be null");
            this.runtime = java.util.Objects.requireNonNull(runtime, "Meta.runtime cannot be null");
            this.os = java.util.Objects.requireNonNull(os, "Meta.os cannot be null");
            this.cpu = java.util.Objects.requireNonNull(cpu, "Meta.cpu cannot be null");
            this.ci = ci;
        }

        public String getProtocolVersion() {
            return protocolVersion;
        }

        public Product getImplementation() {
            return implementation;
        }

        public Product getRuntime() {
            return runtime;
        }

        public Product getOs() {
            return os;
        }

        public Product getCpu() {
            return cpu;
        }

        public java.util.Optional<Ci> getCi() {
            return java.util.Optional.ofNullable(ci);
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            Meta that = (Meta) o;
            return 
                protocolVersion.equals(that.protocolVersion) &&             
                implementation.equals(that.implementation) &&             
                runtime.equals(that.runtime) &&             
                os.equals(that.os) &&             
                cpu.equals(that.cpu) &&             
                java.util.Objects.equals(ci, that.ci);            
        }

        @Override
        public int hashCode() {
            return java.util.Objects.hash(
                protocolVersion,
                implementation,
                runtime,
                os,
                cpu,
                ci
            );
        }

        @Override
        public String toString() {
            return "Meta{" +
                "protocolVersion=" + protocolVersion +
                ", implementation=" + implementation +
                ", runtime=" + runtime +
                ", os=" + os +
                ", cpu=" + cpu +
                ", ci=" + ci +
                '}';
        }
    }

    public static class Ci {
        private final String name;
        private final String url;
        private final String buildNumber;
        private final Git git;

        public Ci(
            String name,
            String url,
            String buildNumber,
            Git git
        ) {
            this.name = java.util.Objects.requireNonNull(name, "Ci.name cannot be null");
            this.url = url;
            this.buildNumber = buildNumber;
            this.git = git;
        }

        public String getName() {
            return name;
        }

        public java.util.Optional<String> getUrl() {
            return java.util.Optional.ofNullable(url);
        }

        public java.util.Optional<String> getBuildNumber() {
            return java.util.Optional.ofNullable(buildNumber);
        }

        public java.util.Optional<Git> getGit() {
            return java.util.Optional.ofNullable(git);
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            Ci that = (Ci) o;
            return 
                name.equals(that.name) &&             
                java.util.Objects.equals(url, that.url) &&             
                java.util.Objects.equals(buildNumber, that.buildNumber) &&             
                java.util.Objects.equals(git, that.git);            
        }

        @Override
        public int hashCode() {
            return java.util.Objects.hash(
                name,
                url,
                buildNumber,
                git
            );
        }

        @Override
        public String toString() {
            return "Ci{" +
                "name=" + name +
                ", url=" + url +
                ", buildNumber=" + buildNumber +
                ", git=" + git +
                '}';
        }
    }

    public static class Git {
        private final String remote;
        private final String revision;
        private final String branch;
        private final String tag;

        public Git(
            String remote,
            String revision,
            String branch,
            String tag
        ) {
            this.remote = java.util.Objects.requireNonNull(remote, "Git.remote cannot be null");
            this.revision = java.util.Objects.requireNonNull(revision, "Git.revision cannot be null");
            this.branch = branch;
            this.tag = tag;
        }

        public String getRemote() {
            return remote;
        }

        public String getRevision() {
            return revision;
        }

        public java.util.Optional<String> getBranch() {
            return java.util.Optional.ofNullable(branch);
        }

        public java.util.Optional<String> getTag() {
            return java.util.Optional.ofNullable(tag);
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            Git that = (Git) o;
            return 
                remote.equals(that.remote) &&             
                revision.equals(that.revision) &&             
                java.util.Objects.equals(branch, that.branch) &&             
                java.util.Objects.equals(tag, that.tag);            
        }

        @Override
        public int hashCode() {
            return java.util.Objects.hash(
                remote,
                revision,
                branch,
                tag
            );
        }

        @Override
        public String toString() {
            return "Git{" +
                "remote=" + remote +
                ", revision=" + revision +
                ", branch=" + branch +
                ", tag=" + tag +
                '}';
        }
    }

    public static class Product {
        private final String name;
        private final String version;

        public Product(
            String name,
            String version
        ) {
            this.name = java.util.Objects.requireNonNull(name, "Product.name cannot be null");
            this.version = version;
        }

        public String getName() {
            return name;
        }

        public java.util.Optional<String> getVersion() {
            return java.util.Optional.ofNullable(version);
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            Product that = (Product) o;
            return 
                name.equals(that.name) &&             
                java.util.Objects.equals(version, that.version);            
        }

        @Override
        public int hashCode() {
            return java.util.Objects.hash(
                name,
                version
            );
        }

        @Override
        public String toString() {
            return "Product{" +
                "name=" + name +
                ", version=" + version +
                '}';
        }
    }

    public static class ParameterType {
        private final String name;
        private final java.util.List<String> regularExpressions;
        private final Boolean preferForRegularExpressionMatch;
        private final Boolean useForSnippets;
        private final String id;

        public ParameterType(
            String name,
            java.util.List<String> regularExpressions,
            Boolean preferForRegularExpressionMatch,
            Boolean useForSnippets,
            String id
        ) {
            this.name = java.util.Objects.requireNonNull(name, "ParameterType.name cannot be null");
            this.regularExpressions = java.util.Collections.unmodifiableList(new java.util.ArrayList<>(java.util.Objects.requireNonNull(regularExpressions, "ParameterType.regularExpressions cannot be null")));
            this.preferForRegularExpressionMatch = java.util.Objects.requireNonNull(preferForRegularExpressionMatch, "ParameterType.preferForRegularExpressionMatch cannot be null");
            this.useForSnippets = java.util.Objects.requireNonNull(useForSnippets, "ParameterType.useForSnippets cannot be null");
            this.id = java.util.Objects.requireNonNull(id, "ParameterType.id cannot be null");
        }

        public String getName() {
            return name;
        }

        public java.util.List<String> getRegularExpressions() {
            return regularExpressions;
        }

        public Boolean getPreferForRegularExpressionMatch() {
            return preferForRegularExpressionMatch;
        }

        public Boolean getUseForSnippets() {
            return useForSnippets;
        }

        public String getId() {
            return id;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            ParameterType that = (ParameterType) o;
            return 
                name.equals(that.name) &&             
                regularExpressions.equals(that.regularExpressions) &&             
                preferForRegularExpressionMatch.equals(that.preferForRegularExpressionMatch) &&             
                useForSnippets.equals(that.useForSnippets) &&             
                id.equals(that.id);            
        }

        @Override
        public int hashCode() {
            return java.util.Objects.hash(
                name,
                regularExpressions,
                preferForRegularExpressionMatch,
                useForSnippets,
                id
            );
        }

        @Override
        public String toString() {
            return "ParameterType{" +
                "name=" + name +
                ", regularExpressions=" + regularExpressions +
                ", preferForRegularExpressionMatch=" + preferForRegularExpressionMatch +
                ", useForSnippets=" + useForSnippets +
                ", id=" + id +
                '}';
        }
    }

    public static class ParseError {
        private final SourceReference source;
        private final String message;

        public ParseError(
            SourceReference source,
            String message
        ) {
            this.source = java.util.Objects.requireNonNull(source, "ParseError.source cannot be null");
            this.message = java.util.Objects.requireNonNull(message, "ParseError.message cannot be null");
        }

        public SourceReference getSource() {
            return source;
        }

        public String getMessage() {
            return message;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            ParseError that = (ParseError) o;
            return 
                source.equals(that.source) &&             
                message.equals(that.message);            
        }

        @Override
        public int hashCode() {
            return java.util.Objects.hash(
                source,
                message
            );
        }

        @Override
        public String toString() {
            return "ParseError{" +
                "source=" + source +
                ", message=" + message +
                '}';
        }
    }

    public static class Pickle {
        private final String id;
        private final String uri;
        private final String name;
        private final String language;
        private final java.util.List<PickleStep> steps;
        private final java.util.List<PickleTag> tags;
        private final java.util.List<String> astNodeIds;

        public Pickle(
            String id,
            String uri,
            String name,
            String language,
            java.util.List<PickleStep> steps,
            java.util.List<PickleTag> tags,
            java.util.List<String> astNodeIds
        ) {
            this.id = java.util.Objects.requireNonNull(id, "Pickle.id cannot be null");
            this.uri = java.util.Objects.requireNonNull(uri, "Pickle.uri cannot be null");
            this.name = java.util.Objects.requireNonNull(name, "Pickle.name cannot be null");
            this.language = java.util.Objects.requireNonNull(language, "Pickle.language cannot be null");
            this.steps = java.util.Collections.unmodifiableList(new java.util.ArrayList<>(java.util.Objects.requireNonNull(steps, "Pickle.steps cannot be null")));
            this.tags = java.util.Collections.unmodifiableList(new java.util.ArrayList<>(java.util.Objects.requireNonNull(tags, "Pickle.tags cannot be null")));
            this.astNodeIds = java.util.Collections.unmodifiableList(new java.util.ArrayList<>(java.util.Objects.requireNonNull(astNodeIds, "Pickle.astNodeIds cannot be null")));
        }

        public String getId() {
            return id;
        }

        public String getUri() {
            return uri;
        }

        public String getName() {
            return name;
        }

        public String getLanguage() {
            return language;
        }

        public java.util.List<PickleStep> getSteps() {
            return steps;
        }

        public java.util.List<PickleTag> getTags() {
            return tags;
        }

        public java.util.List<String> getAstNodeIds() {
            return astNodeIds;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            Pickle that = (Pickle) o;
            return 
                id.equals(that.id) &&             
                uri.equals(that.uri) &&             
                name.equals(that.name) &&             
                language.equals(that.language) &&             
                steps.equals(that.steps) &&             
                tags.equals(that.tags) &&             
                astNodeIds.equals(that.astNodeIds);            
        }

        @Override
        public int hashCode() {
            return java.util.Objects.hash(
                id,
                uri,
                name,
                language,
                steps,
                tags,
                astNodeIds
            );
        }

        @Override
        public String toString() {
            return "Pickle{" +
                "id=" + id +
                ", uri=" + uri +
                ", name=" + name +
                ", language=" + language +
                ", steps=" + steps +
                ", tags=" + tags +
                ", astNodeIds=" + astNodeIds +
                '}';
        }
    }

    public static class PickleDocString {
        private final String mediaType;
        private final String content;

        public PickleDocString(
            String mediaType,
            String content
        ) {
            this.mediaType = mediaType;
            this.content = java.util.Objects.requireNonNull(content, "PickleDocString.content cannot be null");
        }

        public java.util.Optional<String> getMediaType() {
            return java.util.Optional.ofNullable(mediaType);
        }

        public String getContent() {
            return content;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            PickleDocString that = (PickleDocString) o;
            return 
                java.util.Objects.equals(mediaType, that.mediaType) &&             
                content.equals(that.content);            
        }

        @Override
        public int hashCode() {
            return java.util.Objects.hash(
                mediaType,
                content
            );
        }

        @Override
        public String toString() {
            return "PickleDocString{" +
                "mediaType=" + mediaType +
                ", content=" + content +
                '}';
        }
    }

    public static class PickleStep {
        private final PickleStepArgument argument;
        private final java.util.List<String> astNodeIds;
        private final String id;
        private final String text;

        public PickleStep(
            PickleStepArgument argument,
            java.util.List<String> astNodeIds,
            String id,
            String text
        ) {
            this.argument = argument;
            this.astNodeIds = java.util.Collections.unmodifiableList(new java.util.ArrayList<>(java.util.Objects.requireNonNull(astNodeIds, "PickleStep.astNodeIds cannot be null")));
            this.id = java.util.Objects.requireNonNull(id, "PickleStep.id cannot be null");
            this.text = java.util.Objects.requireNonNull(text, "PickleStep.text cannot be null");
        }

        public java.util.Optional<PickleStepArgument> getArgument() {
            return java.util.Optional.ofNullable(argument);
        }

        public java.util.List<String> getAstNodeIds() {
            return astNodeIds;
        }

        public String getId() {
            return id;
        }

        public String getText() {
            return text;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            PickleStep that = (PickleStep) o;
            return 
                java.util.Objects.equals(argument, that.argument) &&             
                astNodeIds.equals(that.astNodeIds) &&             
                id.equals(that.id) &&             
                text.equals(that.text);            
        }

        @Override
        public int hashCode() {
            return java.util.Objects.hash(
                argument,
                astNodeIds,
                id,
                text
            );
        }

        @Override
        public String toString() {
            return "PickleStep{" +
                "argument=" + argument +
                ", astNodeIds=" + astNodeIds +
                ", id=" + id +
                ", text=" + text +
                '}';
        }
    }

    public static class PickleStepArgument {
        private final PickleDocString docString;
        private final PickleTable dataTable;

        public PickleStepArgument(PickleDocString docString) {
            this(
                java.util.Objects.requireNonNull(docString, "PickleStepArgument.docString cannot be null"),
                null
            );
        }

        public PickleStepArgument(PickleTable dataTable) {
            this(
                null,
                java.util.Objects.requireNonNull(dataTable, "PickleStepArgument.dataTable cannot be null")
            );
        }

        public PickleStepArgument(
            PickleDocString docString,
            PickleTable dataTable
        ) {
            this.docString = docString;
            this.dataTable = dataTable;
        }

        public java.util.Optional<PickleDocString> getDocString() {
            return java.util.Optional.ofNullable(docString);
        }

        public java.util.Optional<PickleTable> getDataTable() {
            return java.util.Optional.ofNullable(dataTable);
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            PickleStepArgument that = (PickleStepArgument) o;
            return 
                java.util.Objects.equals(docString, that.docString) &&             
                java.util.Objects.equals(dataTable, that.dataTable);            
        }

        @Override
        public int hashCode() {
            return java.util.Objects.hash(
                docString,
                dataTable
            );
        }

        @Override
        public String toString() {
            return "PickleStepArgument{" +
                "docString=" + docString +
                ", dataTable=" + dataTable +
                '}';
        }
    }

    public static class PickleTable {
        private final java.util.List<PickleTableRow> rows;

        public PickleTable(
            java.util.List<PickleTableRow> rows
        ) {
            this.rows = java.util.Collections.unmodifiableList(new java.util.ArrayList<>(java.util.Objects.requireNonNull(rows, "PickleTable.rows cannot be null")));
        }

        public java.util.List<PickleTableRow> getRows() {
            return rows;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            PickleTable that = (PickleTable) o;
            return 
                rows.equals(that.rows);            
        }

        @Override
        public int hashCode() {
            return java.util.Objects.hash(
                rows
            );
        }

        @Override
        public String toString() {
            return "PickleTable{" +
                "rows=" + rows +
                '}';
        }
    }

    public static class PickleTableCell {
        private final String value;

        public PickleTableCell(
            String value
        ) {
            this.value = java.util.Objects.requireNonNull(value, "PickleTableCell.value cannot be null");
        }

        public String getValue() {
            return value;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            PickleTableCell that = (PickleTableCell) o;
            return 
                value.equals(that.value);            
        }

        @Override
        public int hashCode() {
            return java.util.Objects.hash(
                value
            );
        }

        @Override
        public String toString() {
            return "PickleTableCell{" +
                "value=" + value +
                '}';
        }
    }

    public static class PickleTableRow {
        private final java.util.List<PickleTableCell> cells;

        public PickleTableRow(
            java.util.List<PickleTableCell> cells
        ) {
            this.cells = java.util.Collections.unmodifiableList(new java.util.ArrayList<>(java.util.Objects.requireNonNull(cells, "PickleTableRow.cells cannot be null")));
        }

        public java.util.List<PickleTableCell> getCells() {
            return cells;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            PickleTableRow that = (PickleTableRow) o;
            return 
                cells.equals(that.cells);            
        }

        @Override
        public int hashCode() {
            return java.util.Objects.hash(
                cells
            );
        }

        @Override
        public String toString() {
            return "PickleTableRow{" +
                "cells=" + cells +
                '}';
        }
    }

    public static class PickleTag {
        private final String name;
        private final String astNodeId;

        public PickleTag(
            String name,
            String astNodeId
        ) {
            this.name = java.util.Objects.requireNonNull(name, "PickleTag.name cannot be null");
            this.astNodeId = java.util.Objects.requireNonNull(astNodeId, "PickleTag.astNodeId cannot be null");
        }

        public String getName() {
            return name;
        }

        public String getAstNodeId() {
            return astNodeId;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            PickleTag that = (PickleTag) o;
            return 
                name.equals(that.name) &&             
                astNodeId.equals(that.astNodeId);            
        }

        @Override
        public int hashCode() {
            return java.util.Objects.hash(
                name,
                astNodeId
            );
        }

        @Override
        public String toString() {
            return "PickleTag{" +
                "name=" + name +
                ", astNodeId=" + astNodeId +
                '}';
        }
    }

    public static class Source {
        private final String uri;
        private final String data;
        private final SourceMediaType mediaType;

        public Source(
            String uri,
            String data,
            SourceMediaType mediaType
        ) {
            this.uri = java.util.Objects.requireNonNull(uri, "Source.uri cannot be null");
            this.data = java.util.Objects.requireNonNull(data, "Source.data cannot be null");
            this.mediaType = java.util.Objects.requireNonNull(mediaType, "Source.mediaType cannot be null");
        }

        public String getUri() {
            return uri;
        }

        public String getData() {
            return data;
        }

        public SourceMediaType getMediaType() {
            return mediaType;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            Source that = (Source) o;
            return 
                uri.equals(that.uri) &&             
                data.equals(that.data) &&             
                mediaType.equals(that.mediaType);            
        }

        @Override
        public int hashCode() {
            return java.util.Objects.hash(
                uri,
                data,
                mediaType
            );
        }

        @Override
        public String toString() {
            return "Source{" +
                "uri=" + uri +
                ", data=" + data +
                ", mediaType=" + mediaType +
                '}';
        }
    }

    public static class SourceReference {
        private final String uri;
        private final JavaMethod javaMethod;
        private final JavaStackTraceElement javaStackTraceElement;
        private final Location location;

        public SourceReference(String uri) {
            this(
                java.util.Objects.requireNonNull(uri, "SourceReference.uri cannot be null"),
                null,
                null,
                null
            );
        }

        public SourceReference(JavaMethod javaMethod) {
            this(
                null,
                java.util.Objects.requireNonNull(javaMethod, "SourceReference.javaMethod cannot be null"),
                null,
                null
            );
        }

        public SourceReference(JavaStackTraceElement javaStackTraceElement) {
            this(
                null,
                null,
                java.util.Objects.requireNonNull(javaStackTraceElement, "SourceReference.javaStackTraceElement cannot be null"),
                null
            );
        }

        public SourceReference(Location location) {
            this(
                null,
                null,
                null,
                java.util.Objects.requireNonNull(location, "SourceReference.location cannot be null")
            );
        }

        public SourceReference(
            String uri,
            JavaMethod javaMethod,
            JavaStackTraceElement javaStackTraceElement,
            Location location
        ) {
            this.uri = uri;
            this.javaMethod = javaMethod;
            this.javaStackTraceElement = javaStackTraceElement;
            this.location = location;
        }

        public java.util.Optional<String> getUri() {
            return java.util.Optional.ofNullable(uri);
        }

        public java.util.Optional<JavaMethod> getJavaMethod() {
            return java.util.Optional.ofNullable(javaMethod);
        }

        public java.util.Optional<JavaStackTraceElement> getJavaStackTraceElement() {
            return java.util.Optional.ofNullable(javaStackTraceElement);
        }

        public java.util.Optional<Location> getLocation() {
            return java.util.Optional.ofNullable(location);
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            SourceReference that = (SourceReference) o;
            return 
                java.util.Objects.equals(uri, that.uri) &&             
                java.util.Objects.equals(javaMethod, that.javaMethod) &&             
                java.util.Objects.equals(javaStackTraceElement, that.javaStackTraceElement) &&             
                java.util.Objects.equals(location, that.location);            
        }

        @Override
        public int hashCode() {
            return java.util.Objects.hash(
                uri,
                javaMethod,
                javaStackTraceElement,
                location
            );
        }

        @Override
        public String toString() {
            return "SourceReference{" +
                "uri=" + uri +
                ", javaMethod=" + javaMethod +
                ", javaStackTraceElement=" + javaStackTraceElement +
                ", location=" + location +
                '}';
        }
    }

    public static class JavaMethod {
        private final String className;
        private final String methodName;
        private final java.util.List<String> methodParameterTypes;

        public JavaMethod(
            String className,
            String methodName,
            java.util.List<String> methodParameterTypes
        ) {
            this.className = java.util.Objects.requireNonNull(className, "JavaMethod.className cannot be null");
            this.methodName = java.util.Objects.requireNonNull(methodName, "JavaMethod.methodName cannot be null");
            this.methodParameterTypes = java.util.Collections.unmodifiableList(new java.util.ArrayList<>(java.util.Objects.requireNonNull(methodParameterTypes, "JavaMethod.methodParameterTypes cannot be null")));
        }

        public String getClassName() {
            return className;
        }

        public String getMethodName() {
            return methodName;
        }

        public java.util.List<String> getMethodParameterTypes() {
            return methodParameterTypes;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            JavaMethod that = (JavaMethod) o;
            return 
                className.equals(that.className) &&             
                methodName.equals(that.methodName) &&             
                methodParameterTypes.equals(that.methodParameterTypes);            
        }

        @Override
        public int hashCode() {
            return java.util.Objects.hash(
                className,
                methodName,
                methodParameterTypes
            );
        }

        @Override
        public String toString() {
            return "JavaMethod{" +
                "className=" + className +
                ", methodName=" + methodName +
                ", methodParameterTypes=" + methodParameterTypes +
                '}';
        }
    }

    public static class JavaStackTraceElement {
        private final String className;
        private final String fileName;
        private final String methodName;

        public JavaStackTraceElement(
            String className,
            String fileName,
            String methodName
        ) {
            this.className = java.util.Objects.requireNonNull(className, "JavaStackTraceElement.className cannot be null");
            this.fileName = java.util.Objects.requireNonNull(fileName, "JavaStackTraceElement.fileName cannot be null");
            this.methodName = java.util.Objects.requireNonNull(methodName, "JavaStackTraceElement.methodName cannot be null");
        }

        public String getClassName() {
            return className;
        }

        public String getFileName() {
            return fileName;
        }

        public String getMethodName() {
            return methodName;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            JavaStackTraceElement that = (JavaStackTraceElement) o;
            return 
                className.equals(that.className) &&             
                fileName.equals(that.fileName) &&             
                methodName.equals(that.methodName);            
        }

        @Override
        public int hashCode() {
            return java.util.Objects.hash(
                className,
                fileName,
                methodName
            );
        }

        @Override
        public String toString() {
            return "JavaStackTraceElement{" +
                "className=" + className +
                ", fileName=" + fileName +
                ", methodName=" + methodName +
                '}';
        }
    }

    public static class StepDefinition {
        private final String id;
        private final StepDefinitionPattern pattern;
        private final SourceReference sourceReference;

        public StepDefinition(
            String id,
            StepDefinitionPattern pattern,
            SourceReference sourceReference
        ) {
            this.id = java.util.Objects.requireNonNull(id, "StepDefinition.id cannot be null");
            this.pattern = java.util.Objects.requireNonNull(pattern, "StepDefinition.pattern cannot be null");
            this.sourceReference = java.util.Objects.requireNonNull(sourceReference, "StepDefinition.sourceReference cannot be null");
        }

        public String getId() {
            return id;
        }

        public StepDefinitionPattern getPattern() {
            return pattern;
        }

        public SourceReference getSourceReference() {
            return sourceReference;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            StepDefinition that = (StepDefinition) o;
            return 
                id.equals(that.id) &&             
                pattern.equals(that.pattern) &&             
                sourceReference.equals(that.sourceReference);            
        }

        @Override
        public int hashCode() {
            return java.util.Objects.hash(
                id,
                pattern,
                sourceReference
            );
        }

        @Override
        public String toString() {
            return "StepDefinition{" +
                "id=" + id +
                ", pattern=" + pattern +
                ", sourceReference=" + sourceReference +
                '}';
        }
    }

    public static class StepDefinitionPattern {
        private final String source;
        private final StepDefinitionPatternType type;

        public StepDefinitionPattern(
            String source,
            StepDefinitionPatternType type
        ) {
            this.source = java.util.Objects.requireNonNull(source, "StepDefinitionPattern.source cannot be null");
            this.type = java.util.Objects.requireNonNull(type, "StepDefinitionPattern.type cannot be null");
        }

        public String getSource() {
            return source;
        }

        public StepDefinitionPatternType getType() {
            return type;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            StepDefinitionPattern that = (StepDefinitionPattern) o;
            return 
                source.equals(that.source) &&             
                type.equals(that.type);            
        }

        @Override
        public int hashCode() {
            return java.util.Objects.hash(
                source,
                type
            );
        }

        @Override
        public String toString() {
            return "StepDefinitionPattern{" +
                "source=" + source +
                ", type=" + type +
                '}';
        }
    }

    public static class TestCase {
        private final String id;
        private final String pickleId;
        private final java.util.List<TestStep> testSteps;

        public TestCase(
            String id,
            String pickleId,
            java.util.List<TestStep> testSteps
        ) {
            this.id = java.util.Objects.requireNonNull(id, "TestCase.id cannot be null");
            this.pickleId = java.util.Objects.requireNonNull(pickleId, "TestCase.pickleId cannot be null");
            this.testSteps = java.util.Collections.unmodifiableList(new java.util.ArrayList<>(java.util.Objects.requireNonNull(testSteps, "TestCase.testSteps cannot be null")));
        }

        public String getId() {
            return id;
        }

        public String getPickleId() {
            return pickleId;
        }

        public java.util.List<TestStep> getTestSteps() {
            return testSteps;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            TestCase that = (TestCase) o;
            return 
                id.equals(that.id) &&             
                pickleId.equals(that.pickleId) &&             
                testSteps.equals(that.testSteps);            
        }

        @Override
        public int hashCode() {
            return java.util.Objects.hash(
                id,
                pickleId,
                testSteps
            );
        }

        @Override
        public String toString() {
            return "TestCase{" +
                "id=" + id +
                ", pickleId=" + pickleId +
                ", testSteps=" + testSteps +
                '}';
        }
    }

    public static class Group {
        private final java.util.List<Group> children;
        private final Long start;
        private final String value;

        public Group(
            java.util.List<Group> children,
            Long start,
            String value
        ) {
            this.children = java.util.Collections.unmodifiableList(new java.util.ArrayList<>(java.util.Objects.requireNonNull(children, "Group.children cannot be null")));
            this.start = start;
            this.value = value;
        }

        public java.util.List<Group> getChildren() {
            return children;
        }

        public java.util.Optional<Long> getStart() {
            return java.util.Optional.ofNullable(start);
        }

        public java.util.Optional<String> getValue() {
            return java.util.Optional.ofNullable(value);
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            Group that = (Group) o;
            return 
                children.equals(that.children) &&             
                java.util.Objects.equals(start, that.start) &&             
                java.util.Objects.equals(value, that.value);            
        }

        @Override
        public int hashCode() {
            return java.util.Objects.hash(
                children,
                start,
                value
            );
        }

        @Override
        public String toString() {
            return "Group{" +
                "children=" + children +
                ", start=" + start +
                ", value=" + value +
                '}';
        }
    }

    public static class StepMatchArgument {
        private final Group group;
        private final String parameterTypeName;

        public StepMatchArgument(
            Group group,
            String parameterTypeName
        ) {
            this.group = java.util.Objects.requireNonNull(group, "StepMatchArgument.group cannot be null");
            this.parameterTypeName = parameterTypeName;
        }

        public Group getGroup() {
            return group;
        }

        public java.util.Optional<String> getParameterTypeName() {
            return java.util.Optional.ofNullable(parameterTypeName);
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            StepMatchArgument that = (StepMatchArgument) o;
            return 
                group.equals(that.group) &&             
                java.util.Objects.equals(parameterTypeName, that.parameterTypeName);            
        }

        @Override
        public int hashCode() {
            return java.util.Objects.hash(
                group,
                parameterTypeName
            );
        }

        @Override
        public String toString() {
            return "StepMatchArgument{" +
                "group=" + group +
                ", parameterTypeName=" + parameterTypeName +
                '}';
        }
    }

    public static class StepMatchArgumentsList {
        private final java.util.List<StepMatchArgument> stepMatchArguments;

        public StepMatchArgumentsList(
            java.util.List<StepMatchArgument> stepMatchArguments
        ) {
            this.stepMatchArguments = java.util.Collections.unmodifiableList(new java.util.ArrayList<>(java.util.Objects.requireNonNull(stepMatchArguments, "StepMatchArgumentsList.stepMatchArguments cannot be null")));
        }

        public java.util.List<StepMatchArgument> getStepMatchArguments() {
            return stepMatchArguments;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            StepMatchArgumentsList that = (StepMatchArgumentsList) o;
            return 
                stepMatchArguments.equals(that.stepMatchArguments);            
        }

        @Override
        public int hashCode() {
            return java.util.Objects.hash(
                stepMatchArguments
            );
        }

        @Override
        public String toString() {
            return "StepMatchArgumentsList{" +
                "stepMatchArguments=" + stepMatchArguments +
                '}';
        }
    }

    public static class TestStep {
        private final String hookId;
        private final String id;
        private final String pickleStepId;
        private final java.util.List<String> stepDefinitionIds;
        private final java.util.List<StepMatchArgumentsList> stepMatchArgumentsLists;

        public TestStep(
            String hookId,
            String id,
            String pickleStepId,
            java.util.List<String> stepDefinitionIds,
            java.util.List<StepMatchArgumentsList> stepMatchArgumentsLists
        ) {
            this.hookId = hookId;
            this.id = java.util.Objects.requireNonNull(id, "TestStep.id cannot be null");
            this.pickleStepId = pickleStepId;
            this.stepDefinitionIds = stepDefinitionIds == null ? null : java.util.Collections.unmodifiableList(new java.util.ArrayList<>(stepDefinitionIds));
            this.stepMatchArgumentsLists = stepMatchArgumentsLists == null ? null : java.util.Collections.unmodifiableList(new java.util.ArrayList<>(stepMatchArgumentsLists));
        }

        public java.util.Optional<String> getHookId() {
            return java.util.Optional.ofNullable(hookId);
        }

        public String getId() {
            return id;
        }

        public java.util.Optional<String> getPickleStepId() {
            return java.util.Optional.ofNullable(pickleStepId);
        }

        public java.util.Optional<java.util.List<String>> getStepDefinitionIds() {
            return java.util.Optional.ofNullable(stepDefinitionIds);
        }

        public java.util.Optional<java.util.List<StepMatchArgumentsList>> getStepMatchArgumentsLists() {
            return java.util.Optional.ofNullable(stepMatchArgumentsLists);
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            TestStep that = (TestStep) o;
            return 
                java.util.Objects.equals(hookId, that.hookId) &&             
                id.equals(that.id) &&             
                java.util.Objects.equals(pickleStepId, that.pickleStepId) &&             
                java.util.Objects.equals(stepDefinitionIds, that.stepDefinitionIds) &&             
                java.util.Objects.equals(stepMatchArgumentsLists, that.stepMatchArgumentsLists);            
        }

        @Override
        public int hashCode() {
            return java.util.Objects.hash(
                hookId,
                id,
                pickleStepId,
                stepDefinitionIds,
                stepMatchArgumentsLists
            );
        }

        @Override
        public String toString() {
            return "TestStep{" +
                "hookId=" + hookId +
                ", id=" + id +
                ", pickleStepId=" + pickleStepId +
                ", stepDefinitionIds=" + stepDefinitionIds +
                ", stepMatchArgumentsLists=" + stepMatchArgumentsLists +
                '}';
        }
    }

    public static class TestCaseFinished {
        private final String testCaseStartedId;
        private final Timestamp timestamp;
        private final Boolean willBeRetried;

        public TestCaseFinished(
            String testCaseStartedId,
            Timestamp timestamp,
            Boolean willBeRetried
        ) {
            this.testCaseStartedId = java.util.Objects.requireNonNull(testCaseStartedId, "TestCaseFinished.testCaseStartedId cannot be null");
            this.timestamp = java.util.Objects.requireNonNull(timestamp, "TestCaseFinished.timestamp cannot be null");
            this.willBeRetried = java.util.Objects.requireNonNull(willBeRetried, "TestCaseFinished.willBeRetried cannot be null");
        }

        public String getTestCaseStartedId() {
            return testCaseStartedId;
        }

        public Timestamp getTimestamp() {
            return timestamp;
        }

        public Boolean getWillBeRetried() {
            return willBeRetried;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            TestCaseFinished that = (TestCaseFinished) o;
            return 
                testCaseStartedId.equals(that.testCaseStartedId) &&             
                timestamp.equals(that.timestamp) &&             
                willBeRetried.equals(that.willBeRetried);            
        }

        @Override
        public int hashCode() {
            return java.util.Objects.hash(
                testCaseStartedId,
                timestamp,
                willBeRetried
            );
        }

        @Override
        public String toString() {
            return "TestCaseFinished{" +
                "testCaseStartedId=" + testCaseStartedId +
                ", timestamp=" + timestamp +
                ", willBeRetried=" + willBeRetried +
                '}';
        }
    }

    public static class TestCaseStarted {
        private final Long attempt;
        private final String id;
        private final String testCaseId;
        private final Timestamp timestamp;

        public TestCaseStarted(
            Long attempt,
            String id,
            String testCaseId,
            Timestamp timestamp
        ) {
            this.attempt = java.util.Objects.requireNonNull(attempt, "TestCaseStarted.attempt cannot be null");
            this.id = java.util.Objects.requireNonNull(id, "TestCaseStarted.id cannot be null");
            this.testCaseId = java.util.Objects.requireNonNull(testCaseId, "TestCaseStarted.testCaseId cannot be null");
            this.timestamp = java.util.Objects.requireNonNull(timestamp, "TestCaseStarted.timestamp cannot be null");
        }

        public Long getAttempt() {
            return attempt;
        }

        public String getId() {
            return id;
        }

        public String getTestCaseId() {
            return testCaseId;
        }

        public Timestamp getTimestamp() {
            return timestamp;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            TestCaseStarted that = (TestCaseStarted) o;
            return 
                attempt.equals(that.attempt) &&             
                id.equals(that.id) &&             
                testCaseId.equals(that.testCaseId) &&             
                timestamp.equals(that.timestamp);            
        }

        @Override
        public int hashCode() {
            return java.util.Objects.hash(
                attempt,
                id,
                testCaseId,
                timestamp
            );
        }

        @Override
        public String toString() {
            return "TestCaseStarted{" +
                "attempt=" + attempt +
                ", id=" + id +
                ", testCaseId=" + testCaseId +
                ", timestamp=" + timestamp +
                '}';
        }
    }

    public static class TestRunFinished {
        private final String message;
        private final Boolean success;
        private final Timestamp timestamp;

        public TestRunFinished(
            String message,
            Boolean success,
            Timestamp timestamp
        ) {
            this.message = message;
            this.success = java.util.Objects.requireNonNull(success, "TestRunFinished.success cannot be null");
            this.timestamp = java.util.Objects.requireNonNull(timestamp, "TestRunFinished.timestamp cannot be null");
        }

        public java.util.Optional<String> getMessage() {
            return java.util.Optional.ofNullable(message);
        }

        public Boolean getSuccess() {
            return success;
        }

        public Timestamp getTimestamp() {
            return timestamp;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            TestRunFinished that = (TestRunFinished) o;
            return 
                java.util.Objects.equals(message, that.message) &&             
                success.equals(that.success) &&             
                timestamp.equals(that.timestamp);            
        }

        @Override
        public int hashCode() {
            return java.util.Objects.hash(
                message,
                success,
                timestamp
            );
        }

        @Override
        public String toString() {
            return "TestRunFinished{" +
                "message=" + message +
                ", success=" + success +
                ", timestamp=" + timestamp +
                '}';
        }
    }

    public static class TestRunStarted {
        private final Timestamp timestamp;

        public TestRunStarted(
            Timestamp timestamp
        ) {
            this.timestamp = java.util.Objects.requireNonNull(timestamp, "TestRunStarted.timestamp cannot be null");
        }

        public Timestamp getTimestamp() {
            return timestamp;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            TestRunStarted that = (TestRunStarted) o;
            return 
                timestamp.equals(that.timestamp);            
        }

        @Override
        public int hashCode() {
            return java.util.Objects.hash(
                timestamp
            );
        }

        @Override
        public String toString() {
            return "TestRunStarted{" +
                "timestamp=" + timestamp +
                '}';
        }
    }

    public static class TestStepFinished {
        private final String testCaseStartedId;
        private final String testStepId;
        private final TestStepResult testStepResult;
        private final Timestamp timestamp;

        public TestStepFinished(
            String testCaseStartedId,
            String testStepId,
            TestStepResult testStepResult,
            Timestamp timestamp
        ) {
            this.testCaseStartedId = java.util.Objects.requireNonNull(testCaseStartedId, "TestStepFinished.testCaseStartedId cannot be null");
            this.testStepId = java.util.Objects.requireNonNull(testStepId, "TestStepFinished.testStepId cannot be null");
            this.testStepResult = java.util.Objects.requireNonNull(testStepResult, "TestStepFinished.testStepResult cannot be null");
            this.timestamp = java.util.Objects.requireNonNull(timestamp, "TestStepFinished.timestamp cannot be null");
        }

        public String getTestCaseStartedId() {
            return testCaseStartedId;
        }

        public String getTestStepId() {
            return testStepId;
        }

        public TestStepResult getTestStepResult() {
            return testStepResult;
        }

        public Timestamp getTimestamp() {
            return timestamp;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            TestStepFinished that = (TestStepFinished) o;
            return 
                testCaseStartedId.equals(that.testCaseStartedId) &&             
                testStepId.equals(that.testStepId) &&             
                testStepResult.equals(that.testStepResult) &&             
                timestamp.equals(that.timestamp);            
        }

        @Override
        public int hashCode() {
            return java.util.Objects.hash(
                testCaseStartedId,
                testStepId,
                testStepResult,
                timestamp
            );
        }

        @Override
        public String toString() {
            return "TestStepFinished{" +
                "testCaseStartedId=" + testCaseStartedId +
                ", testStepId=" + testStepId +
                ", testStepResult=" + testStepResult +
                ", timestamp=" + timestamp +
                '}';
        }
    }

    public static class TestStepResult {
        private final Duration duration;
        private final String message;
        private final TestStepResultStatus status;

        public TestStepResult(
            Duration duration,
            String message,
            TestStepResultStatus status
        ) {
            this.duration = java.util.Objects.requireNonNull(duration, "TestStepResult.duration cannot be null");
            this.message = message;
            this.status = java.util.Objects.requireNonNull(status, "TestStepResult.status cannot be null");
        }

        public Duration getDuration() {
            return duration;
        }

        public java.util.Optional<String> getMessage() {
            return java.util.Optional.ofNullable(message);
        }

        public TestStepResultStatus getStatus() {
            return status;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            TestStepResult that = (TestStepResult) o;
            return 
                duration.equals(that.duration) &&             
                java.util.Objects.equals(message, that.message) &&             
                status.equals(that.status);            
        }

        @Override
        public int hashCode() {
            return java.util.Objects.hash(
                duration,
                message,
                status
            );
        }

        @Override
        public String toString() {
            return "TestStepResult{" +
                "duration=" + duration +
                ", message=" + message +
                ", status=" + status +
                '}';
        }
    }

    public static class TestStepStarted {
        private final String testCaseStartedId;
        private final String testStepId;
        private final Timestamp timestamp;

        public TestStepStarted(
            String testCaseStartedId,
            String testStepId,
            Timestamp timestamp
        ) {
            this.testCaseStartedId = java.util.Objects.requireNonNull(testCaseStartedId, "TestStepStarted.testCaseStartedId cannot be null");
            this.testStepId = java.util.Objects.requireNonNull(testStepId, "TestStepStarted.testStepId cannot be null");
            this.timestamp = java.util.Objects.requireNonNull(timestamp, "TestStepStarted.timestamp cannot be null");
        }

        public String getTestCaseStartedId() {
            return testCaseStartedId;
        }

        public String getTestStepId() {
            return testStepId;
        }

        public Timestamp getTimestamp() {
            return timestamp;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            TestStepStarted that = (TestStepStarted) o;
            return 
                testCaseStartedId.equals(that.testCaseStartedId) &&             
                testStepId.equals(that.testStepId) &&             
                timestamp.equals(that.timestamp);            
        }

        @Override
        public int hashCode() {
            return java.util.Objects.hash(
                testCaseStartedId,
                testStepId,
                timestamp
            );
        }

        @Override
        public String toString() {
            return "TestStepStarted{" +
                "testCaseStartedId=" + testCaseStartedId +
                ", testStepId=" + testStepId +
                ", timestamp=" + timestamp +
                '}';
        }
    }

    public static class Timestamp {
        private final Long seconds;
        private final Long nanos;

        public Timestamp(
            Long seconds,
            Long nanos
        ) {
            this.seconds = java.util.Objects.requireNonNull(seconds, "Timestamp.seconds cannot be null");
            this.nanos = java.util.Objects.requireNonNull(nanos, "Timestamp.nanos cannot be null");
        }

        public Long getSeconds() {
            return seconds;
        }

        public Long getNanos() {
            return nanos;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            Timestamp that = (Timestamp) o;
            return 
                seconds.equals(that.seconds) &&             
                nanos.equals(that.nanos);            
        }

        @Override
        public int hashCode() {
            return java.util.Objects.hash(
                seconds,
                nanos
            );
        }

        @Override
        public String toString() {
            return "Timestamp{" +
                "seconds=" + seconds +
                ", nanos=" + nanos +
                '}';
        }
    }

    public static class UndefinedParameterType {
        private final String expression;
        private final String name;

        public UndefinedParameterType(
            String expression,
            String name
        ) {
            this.expression = java.util.Objects.requireNonNull(expression, "UndefinedParameterType.expression cannot be null");
            this.name = java.util.Objects.requireNonNull(name, "UndefinedParameterType.name cannot be null");
        }

        public String getExpression() {
            return expression;
        }

        public String getName() {
            return name;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            UndefinedParameterType that = (UndefinedParameterType) o;
            return 
                expression.equals(that.expression) &&             
                name.equals(that.name);            
        }

        @Override
        public int hashCode() {
            return java.util.Objects.hash(
                expression,
                name
            );
        }

        @Override
        public String toString() {
            return "UndefinedParameterType{" +
                "expression=" + expression +
                ", name=" + name +
                '}';
        }
    }

    public enum AttachmentContentEncoding {
        IDENTITY("IDENTITY"),
        BASE64("BASE64");
    
        private final String value;

        AttachmentContentEncoding(String value) {
            this.value = value;
        }

        @Override
        public String toString() {
            return this.value;
        }

        public String value() {
            return this.value;
        }

        public static AttachmentContentEncoding fromValue(String value) {
            if ("IDENTITY".equals(value)) return IDENTITY;
            if ("BASE64".equals(value)) return BASE64;
            throw new IllegalArgumentException(value);
        }
    }

    public enum SourceMediaType {
        TEXT_X_CUCUMBER_GHERKIN_PLAIN("text/x.cucumber.gherkin+plain"),
        TEXT_X_CUCUMBER_GHERKIN_MARKDOWN("text/x.cucumber.gherkin+markdown");
    
        private final String value;

        SourceMediaType(String value) {
            this.value = value;
        }

        @Override
        public String toString() {
            return this.value;
        }

        public String value() {
            return this.value;
        }

        public static SourceMediaType fromValue(String value) {
            if ("text/x.cucumber.gherkin+plain".equals(value)) return TEXT_X_CUCUMBER_GHERKIN_PLAIN;
            if ("text/x.cucumber.gherkin+markdown".equals(value)) return TEXT_X_CUCUMBER_GHERKIN_MARKDOWN;
            throw new IllegalArgumentException(value);
        }
    }

    public enum StepDefinitionPatternType {
        CUCUMBER_EXPRESSION("CUCUMBER_EXPRESSION"),
        REGULAR_EXPRESSION("REGULAR_EXPRESSION");
    
        private final String value;

        StepDefinitionPatternType(String value) {
            this.value = value;
        }

        @Override
        public String toString() {
            return this.value;
        }

        public String value() {
            return this.value;
        }

        public static StepDefinitionPatternType fromValue(String value) {
            if ("CUCUMBER_EXPRESSION".equals(value)) return CUCUMBER_EXPRESSION;
            if ("REGULAR_EXPRESSION".equals(value)) return REGULAR_EXPRESSION;
            throw new IllegalArgumentException(value);
        }
    }

    public enum TestStepResultStatus {
        UNKNOWN("UNKNOWN"),
        PASSED("PASSED"),
        SKIPPED("SKIPPED"),
        PENDING("PENDING"),
        UNDEFINED("UNDEFINED"),
        AMBIGUOUS("AMBIGUOUS"),
        FAILED("FAILED");
    
        private final String value;

        TestStepResultStatus(String value) {
            this.value = value;
        }

        @Override
        public String toString() {
            return this.value;
        }

        public String value() {
            return this.value;
        }

        public static TestStepResultStatus fromValue(String value) {
            if ("UNKNOWN".equals(value)) return UNKNOWN;
            if ("PASSED".equals(value)) return PASSED;
            if ("SKIPPED".equals(value)) return SKIPPED;
            if ("PENDING".equals(value)) return PENDING;
            if ("UNDEFINED".equals(value)) return UNDEFINED;
            if ("AMBIGUOUS".equals(value)) return AMBIGUOUS;
            if ("FAILED".equals(value)) return FAILED;
            throw new IllegalArgumentException(value);
        }
    }

}
