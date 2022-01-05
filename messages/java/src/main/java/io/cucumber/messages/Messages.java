package io.cucumber.messages;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

import static java.util.Objects.requireNonNull;
import static java.util.Optional.empty;
import static java.util.Optional.of;
import static java.util.Optional.ofNullable;

public class Messages {
  
    public static class Attachment {
        private final String body;
        public String getBody() {
            return body;
        }

        private final AttachmentContentEncoding contentEncoding;
        public AttachmentContentEncoding getContentEncoding() {
            return contentEncoding;
        }

        private final String fileName;
        public Optional<String> getFileName() {
            return ofNullable(fileName);
        }

        private final String mediaType;
        public String getMediaType() {
            return mediaType;
        }

        private final Source source;
        public Optional<Source> getSource() {
            return ofNullable(source);
        }

        private final String testCaseStartedId;
        public Optional<String> getTestCaseStartedId() {
            return ofNullable(testCaseStartedId);
        }

        private final String testStepId;
        public Optional<String> getTestStepId() {
            return ofNullable(testStepId);
        }

        private final String url;
        public Optional<String> getUrl() {
            return ofNullable(url);
        }


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
            this.body = requireNonNull(body);
            this.contentEncoding = requireNonNull(contentEncoding);
            this.fileName = fileName;
            this.mediaType = requireNonNull(mediaType);
            this.source = source;
            this.testCaseStartedId = testCaseStartedId;
            this.testStepId = testStepId;
            this.url = url;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            Attachment that = (Attachment) o;
            return 
                body.equals(that.body) &&             
                contentEncoding.equals(that.contentEncoding) &&             
                Objects.equals(fileName, that.fileName) &&             
                mediaType.equals(that.mediaType) &&             
                Objects.equals(source, that.source) &&             
                Objects.equals(testCaseStartedId, that.testCaseStartedId) &&             
                Objects.equals(testStepId, that.testStepId) &&             
                Objects.equals(url, that.url);            
        }

        @Override
        public int hashCode() {
            return Objects.hash(
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
    }

  
    public static class Duration {
        private final Integer seconds;
        public Integer getSeconds() {
            return seconds;
        }

        private final Integer nanos;
        public Integer getNanos() {
            return nanos;
        }


        public Duration(
            Integer seconds,
            Integer nanos
        ) {
            this.seconds = requireNonNull(seconds);
            this.nanos = requireNonNull(nanos);
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
            return Objects.hash(
                seconds,
                nanos
            );
        }
    }

  
    public static class Envelope {
        private final Attachment attachment;
        public Optional<Attachment> getAttachment() {
            return ofNullable(attachment);
        }

        private final GherkinDocument gherkinDocument;
        public Optional<GherkinDocument> getGherkinDocument() {
            return ofNullable(gherkinDocument);
        }

        private final Hook hook;
        public Optional<Hook> getHook() {
            return ofNullable(hook);
        }

        private final Meta meta;
        public Optional<Meta> getMeta() {
            return ofNullable(meta);
        }

        private final ParameterType parameterType;
        public Optional<ParameterType> getParameterType() {
            return ofNullable(parameterType);
        }

        private final ParseError parseError;
        public Optional<ParseError> getParseError() {
            return ofNullable(parseError);
        }

        private final Pickle pickle;
        public Optional<Pickle> getPickle() {
            return ofNullable(pickle);
        }

        private final Source source;
        public Optional<Source> getSource() {
            return ofNullable(source);
        }

        private final StepDefinition stepDefinition;
        public Optional<StepDefinition> getStepDefinition() {
            return ofNullable(stepDefinition);
        }

        private final TestCase testCase;
        public Optional<TestCase> getTestCase() {
            return ofNullable(testCase);
        }

        private final TestCaseFinished testCaseFinished;
        public Optional<TestCaseFinished> getTestCaseFinished() {
            return ofNullable(testCaseFinished);
        }

        private final TestCaseStarted testCaseStarted;
        public Optional<TestCaseStarted> getTestCaseStarted() {
            return ofNullable(testCaseStarted);
        }

        private final TestRunFinished testRunFinished;
        public Optional<TestRunFinished> getTestRunFinished() {
            return ofNullable(testRunFinished);
        }

        private final TestRunStarted testRunStarted;
        public Optional<TestRunStarted> getTestRunStarted() {
            return ofNullable(testRunStarted);
        }

        private final TestStepFinished testStepFinished;
        public Optional<TestStepFinished> getTestStepFinished() {
            return ofNullable(testStepFinished);
        }

        private final TestStepStarted testStepStarted;
        public Optional<TestStepStarted> getTestStepStarted() {
            return ofNullable(testStepStarted);
        }

        private final UndefinedParameterType undefinedParameterType;
        public Optional<UndefinedParameterType> getUndefinedParameterType() {
            return ofNullable(undefinedParameterType);
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

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            Envelope that = (Envelope) o;
            return 
                Objects.equals(attachment, that.attachment) &&             
                Objects.equals(gherkinDocument, that.gherkinDocument) &&             
                Objects.equals(hook, that.hook) &&             
                Objects.equals(meta, that.meta) &&             
                Objects.equals(parameterType, that.parameterType) &&             
                Objects.equals(parseError, that.parseError) &&             
                Objects.equals(pickle, that.pickle) &&             
                Objects.equals(source, that.source) &&             
                Objects.equals(stepDefinition, that.stepDefinition) &&             
                Objects.equals(testCase, that.testCase) &&             
                Objects.equals(testCaseFinished, that.testCaseFinished) &&             
                Objects.equals(testCaseStarted, that.testCaseStarted) &&             
                Objects.equals(testRunFinished, that.testRunFinished) &&             
                Objects.equals(testRunStarted, that.testRunStarted) &&             
                Objects.equals(testStepFinished, that.testStepFinished) &&             
                Objects.equals(testStepStarted, that.testStepStarted) &&             
                Objects.equals(undefinedParameterType, that.undefinedParameterType);            
        }

        @Override
        public int hashCode() {
            return Objects.hash(
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
    }

  
    public static class GherkinDocument {
        private final String uri;
        public Optional<String> getUri() {
            return ofNullable(uri);
        }

        private final Feature feature;
        public Optional<Feature> getFeature() {
            return ofNullable(feature);
        }

        private final List<Comment> comments;
        public List<Comment> getComments() {
            return comments;
        }


        public GherkinDocument(
            String uri,
            Feature feature,
            List<Comment> comments
        ) {
            this.uri = uri;
            this.feature = feature;
            this.comments = requireNonNull(comments);
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            GherkinDocument that = (GherkinDocument) o;
            return 
                Objects.equals(uri, that.uri) &&             
                Objects.equals(feature, that.feature) &&             
                comments.equals(that.comments);            
        }

        @Override
        public int hashCode() {
            return Objects.hash(
                uri,
                feature,
                comments
            );
        }
    }

  
    public static class Background {
        private final Location location;
        public Location getLocation() {
            return location;
        }

        private final String keyword;
        public String getKeyword() {
            return keyword;
        }

        private final String name;
        public String getName() {
            return name;
        }

        private final String description;
        public String getDescription() {
            return description;
        }

        private final List<Step> steps;
        public List<Step> getSteps() {
            return steps;
        }

        private final String id;
        public String getId() {
            return id;
        }


        public Background(
            Location location,
            String keyword,
            String name,
            String description,
            List<Step> steps,
            String id
        ) {
            this.location = requireNonNull(location);
            this.keyword = requireNonNull(keyword);
            this.name = requireNonNull(name);
            this.description = requireNonNull(description);
            this.steps = requireNonNull(steps);
            this.id = requireNonNull(id);
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
            return Objects.hash(
                location,
                keyword,
                name,
                description,
                steps,
                id
            );
        }
    }

  
    public static class Comment {
        private final Location location;
        public Location getLocation() {
            return location;
        }

        private final String text;
        public String getText() {
            return text;
        }


        public Comment(
            Location location,
            String text
        ) {
            this.location = requireNonNull(location);
            this.text = requireNonNull(text);
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
            return Objects.hash(
                location,
                text
            );
        }
    }

  
    public static class DataTable {
        private final Location location;
        public Location getLocation() {
            return location;
        }

        private final List<TableRow> rows;
        public List<TableRow> getRows() {
            return rows;
        }


        public DataTable(
            Location location,
            List<TableRow> rows
        ) {
            this.location = requireNonNull(location);
            this.rows = requireNonNull(rows);
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
            return Objects.hash(
                location,
                rows
            );
        }
    }

  
    public static class DocString {
        private final Location location;
        public Location getLocation() {
            return location;
        }

        private final String mediaType;
        public Optional<String> getMediaType() {
            return ofNullable(mediaType);
        }

        private final String content;
        public String getContent() {
            return content;
        }

        private final String delimiter;
        public String getDelimiter() {
            return delimiter;
        }


        public DocString(
            Location location,
            String mediaType,
            String content,
            String delimiter
        ) {
            this.location = requireNonNull(location);
            this.mediaType = mediaType;
            this.content = requireNonNull(content);
            this.delimiter = requireNonNull(delimiter);
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            DocString that = (DocString) o;
            return 
                location.equals(that.location) &&             
                Objects.equals(mediaType, that.mediaType) &&             
                content.equals(that.content) &&             
                delimiter.equals(that.delimiter);            
        }

        @Override
        public int hashCode() {
            return Objects.hash(
                location,
                mediaType,
                content,
                delimiter
            );
        }
    }

  
    public static class Examples {
        private final Location location;
        public Location getLocation() {
            return location;
        }

        private final List<Tag> tags;
        public List<Tag> getTags() {
            return tags;
        }

        private final String keyword;
        public String getKeyword() {
            return keyword;
        }

        private final String name;
        public String getName() {
            return name;
        }

        private final String description;
        public String getDescription() {
            return description;
        }

        private final TableRow tableHeader;
        public Optional<TableRow> getTableHeader() {
            return ofNullable(tableHeader);
        }

        private final List<TableRow> tableBody;
        public List<TableRow> getTableBody() {
            return tableBody;
        }

        private final String id;
        public String getId() {
            return id;
        }


        public Examples(
            Location location,
            List<Tag> tags,
            String keyword,
            String name,
            String description,
            TableRow tableHeader,
            List<TableRow> tableBody,
            String id
        ) {
            this.location = requireNonNull(location);
            this.tags = requireNonNull(tags);
            this.keyword = requireNonNull(keyword);
            this.name = requireNonNull(name);
            this.description = requireNonNull(description);
            this.tableHeader = tableHeader;
            this.tableBody = requireNonNull(tableBody);
            this.id = requireNonNull(id);
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
                Objects.equals(tableHeader, that.tableHeader) &&             
                tableBody.equals(that.tableBody) &&             
                id.equals(that.id);            
        }

        @Override
        public int hashCode() {
            return Objects.hash(
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
    }

  
    public static class Feature {
        private final Location location;
        public Location getLocation() {
            return location;
        }

        private final List<Tag> tags;
        public List<Tag> getTags() {
            return tags;
        }

        private final String language;
        public String getLanguage() {
            return language;
        }

        private final String keyword;
        public String getKeyword() {
            return keyword;
        }

        private final String name;
        public String getName() {
            return name;
        }

        private final String description;
        public String getDescription() {
            return description;
        }

        private final List<FeatureChild> children;
        public List<FeatureChild> getChildren() {
            return children;
        }


        public Feature(
            Location location,
            List<Tag> tags,
            String language,
            String keyword,
            String name,
            String description,
            List<FeatureChild> children
        ) {
            this.location = requireNonNull(location);
            this.tags = requireNonNull(tags);
            this.language = requireNonNull(language);
            this.keyword = requireNonNull(keyword);
            this.name = requireNonNull(name);
            this.description = requireNonNull(description);
            this.children = requireNonNull(children);
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
            return Objects.hash(
                location,
                tags,
                language,
                keyword,
                name,
                description,
                children
            );
        }
    }

  
    public static class FeatureChild {
        private final Rule rule;
        public Optional<Rule> getRule() {
            return ofNullable(rule);
        }

        private final Background background;
        public Optional<Background> getBackground() {
            return ofNullable(background);
        }

        private final Scenario scenario;
        public Optional<Scenario> getScenario() {
            return ofNullable(scenario);
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

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            FeatureChild that = (FeatureChild) o;
            return 
                Objects.equals(rule, that.rule) &&             
                Objects.equals(background, that.background) &&             
                Objects.equals(scenario, that.scenario);            
        }

        @Override
        public int hashCode() {
            return Objects.hash(
                rule,
                background,
                scenario
            );
        }
    }

  
    public static class Rule {
        private final Location location;
        public Location getLocation() {
            return location;
        }

        private final List<Tag> tags;
        public List<Tag> getTags() {
            return tags;
        }

        private final String keyword;
        public String getKeyword() {
            return keyword;
        }

        private final String name;
        public String getName() {
            return name;
        }

        private final String description;
        public String getDescription() {
            return description;
        }

        private final List<RuleChild> children;
        public List<RuleChild> getChildren() {
            return children;
        }

        private final String id;
        public String getId() {
            return id;
        }


        public Rule(
            Location location,
            List<Tag> tags,
            String keyword,
            String name,
            String description,
            List<RuleChild> children,
            String id
        ) {
            this.location = requireNonNull(location);
            this.tags = requireNonNull(tags);
            this.keyword = requireNonNull(keyword);
            this.name = requireNonNull(name);
            this.description = requireNonNull(description);
            this.children = requireNonNull(children);
            this.id = requireNonNull(id);
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
            return Objects.hash(
                location,
                tags,
                keyword,
                name,
                description,
                children,
                id
            );
        }
    }

  
    public static class RuleChild {
        private final Background background;
        public Optional<Background> getBackground() {
            return ofNullable(background);
        }

        private final Scenario scenario;
        public Optional<Scenario> getScenario() {
            return ofNullable(scenario);
        }


        public RuleChild(
            Background background,
            Scenario scenario
        ) {
            this.background = background;
            this.scenario = scenario;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            RuleChild that = (RuleChild) o;
            return 
                Objects.equals(background, that.background) &&             
                Objects.equals(scenario, that.scenario);            
        }

        @Override
        public int hashCode() {
            return Objects.hash(
                background,
                scenario
            );
        }
    }

  
    public static class Scenario {
        private final Location location;
        public Location getLocation() {
            return location;
        }

        private final List<Tag> tags;
        public List<Tag> getTags() {
            return tags;
        }

        private final String keyword;
        public String getKeyword() {
            return keyword;
        }

        private final String name;
        public String getName() {
            return name;
        }

        private final String description;
        public String getDescription() {
            return description;
        }

        private final List<Step> steps;
        public List<Step> getSteps() {
            return steps;
        }

        private final List<Examples> examples;
        public List<Examples> getExamples() {
            return examples;
        }

        private final String id;
        public String getId() {
            return id;
        }


        public Scenario(
            Location location,
            List<Tag> tags,
            String keyword,
            String name,
            String description,
            List<Step> steps,
            List<Examples> examples,
            String id
        ) {
            this.location = requireNonNull(location);
            this.tags = requireNonNull(tags);
            this.keyword = requireNonNull(keyword);
            this.name = requireNonNull(name);
            this.description = requireNonNull(description);
            this.steps = requireNonNull(steps);
            this.examples = requireNonNull(examples);
            this.id = requireNonNull(id);
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
            return Objects.hash(
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
    }

  
    public static class Step {
        private final Location location;
        public Location getLocation() {
            return location;
        }

        private final String keyword;
        public String getKeyword() {
            return keyword;
        }

        private final String text;
        public String getText() {
            return text;
        }

        private final DocString docString;
        public Optional<DocString> getDocString() {
            return ofNullable(docString);
        }

        private final DataTable dataTable;
        public Optional<DataTable> getDataTable() {
            return ofNullable(dataTable);
        }

        private final String id;
        public String getId() {
            return id;
        }


        public Step(
            Location location,
            String keyword,
            String text,
            DocString docString,
            DataTable dataTable,
            String id
        ) {
            this.location = requireNonNull(location);
            this.keyword = requireNonNull(keyword);
            this.text = requireNonNull(text);
            this.docString = docString;
            this.dataTable = dataTable;
            this.id = requireNonNull(id);
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
                Objects.equals(docString, that.docString) &&             
                Objects.equals(dataTable, that.dataTable) &&             
                id.equals(that.id);            
        }

        @Override
        public int hashCode() {
            return Objects.hash(
                location,
                keyword,
                text,
                docString,
                dataTable,
                id
            );
        }
    }

  
    public static class TableCell {
        private final Location location;
        public Location getLocation() {
            return location;
        }

        private final String value;
        public String getValue() {
            return value;
        }


        public TableCell(
            Location location,
            String value
        ) {
            this.location = requireNonNull(location);
            this.value = requireNonNull(value);
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
            return Objects.hash(
                location,
                value
            );
        }
    }

  
    public static class TableRow {
        private final Location location;
        public Location getLocation() {
            return location;
        }

        private final List<TableCell> cells;
        public List<TableCell> getCells() {
            return cells;
        }

        private final String id;
        public String getId() {
            return id;
        }


        public TableRow(
            Location location,
            List<TableCell> cells,
            String id
        ) {
            this.location = requireNonNull(location);
            this.cells = requireNonNull(cells);
            this.id = requireNonNull(id);
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
            return Objects.hash(
                location,
                cells,
                id
            );
        }
    }

  
    public static class Tag {
        private final Location location;
        public Location getLocation() {
            return location;
        }

        private final String name;
        public String getName() {
            return name;
        }

        private final String id;
        public String getId() {
            return id;
        }


        public Tag(
            Location location,
            String name,
            String id
        ) {
            this.location = requireNonNull(location);
            this.name = requireNonNull(name);
            this.id = requireNonNull(id);
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
            return Objects.hash(
                location,
                name,
                id
            );
        }
    }

  
    public static class Hook {
        private final String id;
        public String getId() {
            return id;
        }

        private final SourceReference sourceReference;
        public SourceReference getSourceReference() {
            return sourceReference;
        }

        private final String tagExpression;
        public Optional<String> getTagExpression() {
            return ofNullable(tagExpression);
        }


        public Hook(
            String id,
            SourceReference sourceReference,
            String tagExpression
        ) {
            this.id = requireNonNull(id);
            this.sourceReference = requireNonNull(sourceReference);
            this.tagExpression = tagExpression;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            Hook that = (Hook) o;
            return 
                id.equals(that.id) &&             
                sourceReference.equals(that.sourceReference) &&             
                Objects.equals(tagExpression, that.tagExpression);            
        }

        @Override
        public int hashCode() {
            return Objects.hash(
                id,
                sourceReference,
                tagExpression
            );
        }
    }

  
    public static class Location {
        private final Integer line;
        public Integer getLine() {
            return line;
        }

        private final Integer column;
        public Optional<Integer> getColumn() {
            return ofNullable(column);
        }


        public Location(
            Integer line,
            Integer column
        ) {
            this.line = requireNonNull(line);
            this.column = column;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            Location that = (Location) o;
            return 
                line.equals(that.line) &&             
                Objects.equals(column, that.column);            
        }

        @Override
        public int hashCode() {
            return Objects.hash(
                line,
                column
            );
        }
    }

  
    public static class Meta {
        private final String protocolVersion;
        public String getProtocolVersion() {
            return protocolVersion;
        }

        private final Product implementation;
        public Product getImplementation() {
            return implementation;
        }

        private final Product runtime;
        public Product getRuntime() {
            return runtime;
        }

        private final Product os;
        public Product getOs() {
            return os;
        }

        private final Product cpu;
        public Product getCpu() {
            return cpu;
        }

        private final Ci ci;
        public Optional<Ci> getCi() {
            return ofNullable(ci);
        }


        public Meta(
            String protocolVersion,
            Product implementation,
            Product runtime,
            Product os,
            Product cpu,
            Ci ci
        ) {
            this.protocolVersion = requireNonNull(protocolVersion);
            this.implementation = requireNonNull(implementation);
            this.runtime = requireNonNull(runtime);
            this.os = requireNonNull(os);
            this.cpu = requireNonNull(cpu);
            this.ci = ci;
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
                Objects.equals(ci, that.ci);            
        }

        @Override
        public int hashCode() {
            return Objects.hash(
                protocolVersion,
                implementation,
                runtime,
                os,
                cpu,
                ci
            );
        }
    }

  
    public static class Ci {
        private final String name;
        public String getName() {
            return name;
        }

        private final String url;
        public Optional<String> getUrl() {
            return ofNullable(url);
        }

        private final String buildNumber;
        public Optional<String> getBuildNumber() {
            return ofNullable(buildNumber);
        }

        private final Git git;
        public Optional<Git> getGit() {
            return ofNullable(git);
        }


        public Ci(
            String name,
            String url,
            String buildNumber,
            Git git
        ) {
            this.name = requireNonNull(name);
            this.url = url;
            this.buildNumber = buildNumber;
            this.git = git;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            Ci that = (Ci) o;
            return 
                name.equals(that.name) &&             
                Objects.equals(url, that.url) &&             
                Objects.equals(buildNumber, that.buildNumber) &&             
                Objects.equals(git, that.git);            
        }

        @Override
        public int hashCode() {
            return Objects.hash(
                name,
                url,
                buildNumber,
                git
            );
        }
    }

  
    public static class Git {
        private final String remote;
        public String getRemote() {
            return remote;
        }

        private final String revision;
        public String getRevision() {
            return revision;
        }

        private final String branch;
        public Optional<String> getBranch() {
            return ofNullable(branch);
        }

        private final String tag;
        public Optional<String> getTag() {
            return ofNullable(tag);
        }


        public Git(
            String remote,
            String revision,
            String branch,
            String tag
        ) {
            this.remote = requireNonNull(remote);
            this.revision = requireNonNull(revision);
            this.branch = branch;
            this.tag = tag;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            Git that = (Git) o;
            return 
                remote.equals(that.remote) &&             
                revision.equals(that.revision) &&             
                Objects.equals(branch, that.branch) &&             
                Objects.equals(tag, that.tag);            
        }

        @Override
        public int hashCode() {
            return Objects.hash(
                remote,
                revision,
                branch,
                tag
            );
        }
    }

  
    public static class Product {
        private final String name;
        public String getName() {
            return name;
        }

        private final String version;
        public Optional<String> getVersion() {
            return ofNullable(version);
        }


        public Product(
            String name,
            String version
        ) {
            this.name = requireNonNull(name);
            this.version = version;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            Product that = (Product) o;
            return 
                name.equals(that.name) &&             
                Objects.equals(version, that.version);            
        }

        @Override
        public int hashCode() {
            return Objects.hash(
                name,
                version
            );
        }
    }

  
    public static class ParameterType {
        private final String name;
        public String getName() {
            return name;
        }

        private final List<String> regularExpressions;
        public List<String> getRegularExpressions() {
            return regularExpressions;
        }

        private final Boolean preferForRegularExpressionMatch;
        public Boolean getPreferForRegularExpressionMatch() {
            return preferForRegularExpressionMatch;
        }

        private final Boolean useForSnippets;
        public Boolean getUseForSnippets() {
            return useForSnippets;
        }

        private final String id;
        public String getId() {
            return id;
        }


        public ParameterType(
            String name,
            List<String> regularExpressions,
            Boolean preferForRegularExpressionMatch,
            Boolean useForSnippets,
            String id
        ) {
            this.name = requireNonNull(name);
            this.regularExpressions = requireNonNull(regularExpressions);
            this.preferForRegularExpressionMatch = requireNonNull(preferForRegularExpressionMatch);
            this.useForSnippets = requireNonNull(useForSnippets);
            this.id = requireNonNull(id);
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
            return Objects.hash(
                name,
                regularExpressions,
                preferForRegularExpressionMatch,
                useForSnippets,
                id
            );
        }
    }

  
    public static class ParseError {
        private final SourceReference source;
        public SourceReference getSource() {
            return source;
        }

        private final String message;
        public String getMessage() {
            return message;
        }


        public ParseError(
            SourceReference source,
            String message
        ) {
            this.source = requireNonNull(source);
            this.message = requireNonNull(message);
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
            return Objects.hash(
                source,
                message
            );
        }
    }

  
    public static class Pickle {
        private final String id;
        public String getId() {
            return id;
        }

        private final String uri;
        public String getUri() {
            return uri;
        }

        private final String name;
        public String getName() {
            return name;
        }

        private final String language;
        public String getLanguage() {
            return language;
        }

        private final List<PickleStep> steps;
        public List<PickleStep> getSteps() {
            return steps;
        }

        private final List<PickleTag> tags;
        public List<PickleTag> getTags() {
            return tags;
        }

        private final List<String> astNodeIds;
        public List<String> getAstNodeIds() {
            return astNodeIds;
        }


        public Pickle(
            String id,
            String uri,
            String name,
            String language,
            List<PickleStep> steps,
            List<PickleTag> tags,
            List<String> astNodeIds
        ) {
            this.id = requireNonNull(id);
            this.uri = requireNonNull(uri);
            this.name = requireNonNull(name);
            this.language = requireNonNull(language);
            this.steps = requireNonNull(steps);
            this.tags = requireNonNull(tags);
            this.astNodeIds = requireNonNull(astNodeIds);
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
            return Objects.hash(
                id,
                uri,
                name,
                language,
                steps,
                tags,
                astNodeIds
            );
        }
    }

  
    public static class PickleDocString {
        private final String mediaType;
        public Optional<String> getMediaType() {
            return ofNullable(mediaType);
        }

        private final String content;
        public String getContent() {
            return content;
        }


        public PickleDocString(
            String mediaType,
            String content
        ) {
            this.mediaType = mediaType;
            this.content = requireNonNull(content);
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            PickleDocString that = (PickleDocString) o;
            return 
                Objects.equals(mediaType, that.mediaType) &&             
                content.equals(that.content);            
        }

        @Override
        public int hashCode() {
            return Objects.hash(
                mediaType,
                content
            );
        }
    }

  
    public static class PickleStep {
        private final PickleStepArgument argument;
        public Optional<PickleStepArgument> getArgument() {
            return ofNullable(argument);
        }

        private final List<String> astNodeIds;
        public List<String> getAstNodeIds() {
            return astNodeIds;
        }

        private final String id;
        public String getId() {
            return id;
        }

        private final String text;
        public String getText() {
            return text;
        }


        public PickleStep(
            PickleStepArgument argument,
            List<String> astNodeIds,
            String id,
            String text
        ) {
            this.argument = argument;
            this.astNodeIds = requireNonNull(astNodeIds);
            this.id = requireNonNull(id);
            this.text = requireNonNull(text);
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            PickleStep that = (PickleStep) o;
            return 
                Objects.equals(argument, that.argument) &&             
                astNodeIds.equals(that.astNodeIds) &&             
                id.equals(that.id) &&             
                text.equals(that.text);            
        }

        @Override
        public int hashCode() {
            return Objects.hash(
                argument,
                astNodeIds,
                id,
                text
            );
        }
    }

  
    public static class PickleStepArgument {
        private final PickleDocString docString;
        public Optional<PickleDocString> getDocString() {
            return ofNullable(docString);
        }

        private final PickleTable dataTable;
        public Optional<PickleTable> getDataTable() {
            return ofNullable(dataTable);
        }


        public PickleStepArgument(
            PickleDocString docString,
            PickleTable dataTable
        ) {
            this.docString = docString;
            this.dataTable = dataTable;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            PickleStepArgument that = (PickleStepArgument) o;
            return 
                Objects.equals(docString, that.docString) &&             
                Objects.equals(dataTable, that.dataTable);            
        }

        @Override
        public int hashCode() {
            return Objects.hash(
                docString,
                dataTable
            );
        }
    }

  
    public static class PickleTable {
        private final List<PickleTableRow> rows;
        public List<PickleTableRow> getRows() {
            return rows;
        }


        public PickleTable(
            List<PickleTableRow> rows
        ) {
            this.rows = requireNonNull(rows);
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
            return Objects.hash(
                rows
            );
        }
    }

  
    public static class PickleTableCell {
        private final String value;
        public String getValue() {
            return value;
        }


        public PickleTableCell(
            String value
        ) {
            this.value = requireNonNull(value);
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
            return Objects.hash(
                value
            );
        }
    }

  
    public static class PickleTableRow {
        private final List<PickleTableCell> cells;
        public List<PickleTableCell> getCells() {
            return cells;
        }


        public PickleTableRow(
            List<PickleTableCell> cells
        ) {
            this.cells = requireNonNull(cells);
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
            return Objects.hash(
                cells
            );
        }
    }

  
    public static class PickleTag {
        private final String name;
        public String getName() {
            return name;
        }

        private final String astNodeId;
        public String getAstNodeId() {
            return astNodeId;
        }


        public PickleTag(
            String name,
            String astNodeId
        ) {
            this.name = requireNonNull(name);
            this.astNodeId = requireNonNull(astNodeId);
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
            return Objects.hash(
                name,
                astNodeId
            );
        }
    }

  
    public static class Source {
        private final String uri;
        public String getUri() {
            return uri;
        }

        private final String data;
        public String getData() {
            return data;
        }

        private final SourceMediaType mediaType;
        public SourceMediaType getMediaType() {
            return mediaType;
        }


        public Source(
            String uri,
            String data,
            SourceMediaType mediaType
        ) {
            this.uri = requireNonNull(uri);
            this.data = requireNonNull(data);
            this.mediaType = requireNonNull(mediaType);
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
            return Objects.hash(
                uri,
                data,
                mediaType
            );
        }
    }

  
    public static class SourceReference {
        private final String uri;
        public Optional<String> getUri() {
            return ofNullable(uri);
        }

        private final JavaMethod javaMethod;
        public Optional<JavaMethod> getJavaMethod() {
            return ofNullable(javaMethod);
        }

        private final JavaStackTraceElement javaStackTraceElement;
        public Optional<JavaStackTraceElement> getJavaStackTraceElement() {
            return ofNullable(javaStackTraceElement);
        }

        private final Location location;
        public Optional<Location> getLocation() {
            return ofNullable(location);
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

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            SourceReference that = (SourceReference) o;
            return 
                Objects.equals(uri, that.uri) &&             
                Objects.equals(javaMethod, that.javaMethod) &&             
                Objects.equals(javaStackTraceElement, that.javaStackTraceElement) &&             
                Objects.equals(location, that.location);            
        }

        @Override
        public int hashCode() {
            return Objects.hash(
                uri,
                javaMethod,
                javaStackTraceElement,
                location
            );
        }
    }

  
    public static class JavaMethod {
        private final String className;
        public String getClassName() {
            return className;
        }

        private final String methodName;
        public String getMethodName() {
            return methodName;
        }

        private final List<String> methodParameterTypes;
        public List<String> getMethodParameterTypes() {
            return methodParameterTypes;
        }


        public JavaMethod(
            String className,
            String methodName,
            List<String> methodParameterTypes
        ) {
            this.className = requireNonNull(className);
            this.methodName = requireNonNull(methodName);
            this.methodParameterTypes = requireNonNull(methodParameterTypes);
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
            return Objects.hash(
                className,
                methodName,
                methodParameterTypes
            );
        }
    }

  
    public static class JavaStackTraceElement {
        private final String className;
        public String getClassName() {
            return className;
        }

        private final String fileName;
        public String getFileName() {
            return fileName;
        }

        private final String methodName;
        public String getMethodName() {
            return methodName;
        }


        public JavaStackTraceElement(
            String className,
            String fileName,
            String methodName
        ) {
            this.className = requireNonNull(className);
            this.fileName = requireNonNull(fileName);
            this.methodName = requireNonNull(methodName);
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
            return Objects.hash(
                className,
                fileName,
                methodName
            );
        }
    }

  
    public static class StepDefinition {
        private final String id;
        public String getId() {
            return id;
        }

        private final StepDefinitionPattern pattern;
        public StepDefinitionPattern getPattern() {
            return pattern;
        }

        private final SourceReference sourceReference;
        public SourceReference getSourceReference() {
            return sourceReference;
        }


        public StepDefinition(
            String id,
            StepDefinitionPattern pattern,
            SourceReference sourceReference
        ) {
            this.id = requireNonNull(id);
            this.pattern = requireNonNull(pattern);
            this.sourceReference = requireNonNull(sourceReference);
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
            return Objects.hash(
                id,
                pattern,
                sourceReference
            );
        }
    }

  
    public static class StepDefinitionPattern {
        private final String source;
        public String getSource() {
            return source;
        }

        private final StepDefinitionPatternType type;
        public StepDefinitionPatternType getType() {
            return type;
        }


        public StepDefinitionPattern(
            String source,
            StepDefinitionPatternType type
        ) {
            this.source = requireNonNull(source);
            this.type = requireNonNull(type);
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
            return Objects.hash(
                source,
                type
            );
        }
    }

  
    public static class TestCase {
        private final String id;
        public String getId() {
            return id;
        }

        private final String pickleId;
        public String getPickleId() {
            return pickleId;
        }

        private final List<TestStep> testSteps;
        public List<TestStep> getTestSteps() {
            return testSteps;
        }


        public TestCase(
            String id,
            String pickleId,
            List<TestStep> testSteps
        ) {
            this.id = requireNonNull(id);
            this.pickleId = requireNonNull(pickleId);
            this.testSteps = requireNonNull(testSteps);
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
            return Objects.hash(
                id,
                pickleId,
                testSteps
            );
        }
    }

  
    public static class Group {
        private final List<Group> children;
        public List<Group> getChildren() {
            return children;
        }

        private final Integer start;
        public Optional<Integer> getStart() {
            return ofNullable(start);
        }

        private final String value;
        public Optional<String> getValue() {
            return ofNullable(value);
        }


        public Group(
            List<Group> children,
            Integer start,
            String value
        ) {
            this.children = requireNonNull(children);
            this.start = start;
            this.value = value;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            Group that = (Group) o;
            return 
                children.equals(that.children) &&             
                Objects.equals(start, that.start) &&             
                Objects.equals(value, that.value);            
        }

        @Override
        public int hashCode() {
            return Objects.hash(
                children,
                start,
                value
            );
        }
    }

  
    public static class StepMatchArgument {
        private final Group group;
        public Group getGroup() {
            return group;
        }

        private final String parameterTypeName;
        public Optional<String> getParameterTypeName() {
            return ofNullable(parameterTypeName);
        }


        public StepMatchArgument(
            Group group,
            String parameterTypeName
        ) {
            this.group = requireNonNull(group);
            this.parameterTypeName = parameterTypeName;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            StepMatchArgument that = (StepMatchArgument) o;
            return 
                group.equals(that.group) &&             
                Objects.equals(parameterTypeName, that.parameterTypeName);            
        }

        @Override
        public int hashCode() {
            return Objects.hash(
                group,
                parameterTypeName
            );
        }
    }

  
    public static class StepMatchArgumentsList {
        private final List<StepMatchArgument> stepMatchArguments;
        public List<StepMatchArgument> getStepMatchArguments() {
            return stepMatchArguments;
        }


        public StepMatchArgumentsList(
            List<StepMatchArgument> stepMatchArguments
        ) {
            this.stepMatchArguments = requireNonNull(stepMatchArguments);
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
            return Objects.hash(
                stepMatchArguments
            );
        }
    }

  
    public static class TestStep {
        private final String hookId;
        public Optional<String> getHookId() {
            return ofNullable(hookId);
        }

        private final String id;
        public String getId() {
            return id;
        }

        private final String pickleStepId;
        public Optional<String> getPickleStepId() {
            return ofNullable(pickleStepId);
        }

        private final List<String> stepDefinitionIds;
        public Optional<List<String>> getStepDefinitionIds() {
            return ofNullable(stepDefinitionIds);
        }

        private final List<StepMatchArgumentsList> stepMatchArgumentsLists;
        public Optional<List<StepMatchArgumentsList>> getStepMatchArgumentsLists() {
            return ofNullable(stepMatchArgumentsLists);
        }


        public TestStep(
            String hookId,
            String id,
            String pickleStepId,
            List<String> stepDefinitionIds,
            List<StepMatchArgumentsList> stepMatchArgumentsLists
        ) {
            this.hookId = hookId;
            this.id = requireNonNull(id);
            this.pickleStepId = pickleStepId;
            this.stepDefinitionIds = stepDefinitionIds;
            this.stepMatchArgumentsLists = stepMatchArgumentsLists;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            TestStep that = (TestStep) o;
            return 
                Objects.equals(hookId, that.hookId) &&             
                id.equals(that.id) &&             
                Objects.equals(pickleStepId, that.pickleStepId) &&             
                Objects.equals(stepDefinitionIds, that.stepDefinitionIds) &&             
                Objects.equals(stepMatchArgumentsLists, that.stepMatchArgumentsLists);            
        }

        @Override
        public int hashCode() {
            return Objects.hash(
                hookId,
                id,
                pickleStepId,
                stepDefinitionIds,
                stepMatchArgumentsLists
            );
        }
    }

  
    public static class TestCaseFinished {
        private final String testCaseStartedId;
        public String getTestCaseStartedId() {
            return testCaseStartedId;
        }

        private final Timestamp timestamp;
        public Timestamp getTimestamp() {
            return timestamp;
        }

        private final Boolean willBeRetried;
        public Boolean getWillBeRetried() {
            return willBeRetried;
        }


        public TestCaseFinished(
            String testCaseStartedId,
            Timestamp timestamp,
            Boolean willBeRetried
        ) {
            this.testCaseStartedId = requireNonNull(testCaseStartedId);
            this.timestamp = requireNonNull(timestamp);
            this.willBeRetried = requireNonNull(willBeRetried);
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
            return Objects.hash(
                testCaseStartedId,
                timestamp,
                willBeRetried
            );
        }
    }

  
    public static class TestCaseStarted {
        private final Integer attempt;
        public Integer getAttempt() {
            return attempt;
        }

        private final String id;
        public String getId() {
            return id;
        }

        private final String testCaseId;
        public String getTestCaseId() {
            return testCaseId;
        }

        private final Timestamp timestamp;
        public Timestamp getTimestamp() {
            return timestamp;
        }


        public TestCaseStarted(
            Integer attempt,
            String id,
            String testCaseId,
            Timestamp timestamp
        ) {
            this.attempt = requireNonNull(attempt);
            this.id = requireNonNull(id);
            this.testCaseId = requireNonNull(testCaseId);
            this.timestamp = requireNonNull(timestamp);
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
            return Objects.hash(
                attempt,
                id,
                testCaseId,
                timestamp
            );
        }
    }

  
    public static class TestRunFinished {
        private final String message;
        public Optional<String> getMessage() {
            return ofNullable(message);
        }

        private final Boolean success;
        public Boolean getSuccess() {
            return success;
        }

        private final Timestamp timestamp;
        public Timestamp getTimestamp() {
            return timestamp;
        }


        public TestRunFinished(
            String message,
            Boolean success,
            Timestamp timestamp
        ) {
            this.message = message;
            this.success = requireNonNull(success);
            this.timestamp = requireNonNull(timestamp);
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            TestRunFinished that = (TestRunFinished) o;
            return 
                Objects.equals(message, that.message) &&             
                success.equals(that.success) &&             
                timestamp.equals(that.timestamp);            
        }

        @Override
        public int hashCode() {
            return Objects.hash(
                message,
                success,
                timestamp
            );
        }
    }

  
    public static class TestRunStarted {
        private final Timestamp timestamp;
        public Timestamp getTimestamp() {
            return timestamp;
        }


        public TestRunStarted(
            Timestamp timestamp
        ) {
            this.timestamp = requireNonNull(timestamp);
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
            return Objects.hash(
                timestamp
            );
        }
    }

  
    public static class TestStepFinished {
        private final String testCaseStartedId;
        public String getTestCaseStartedId() {
            return testCaseStartedId;
        }

        private final String testStepId;
        public String getTestStepId() {
            return testStepId;
        }

        private final TestStepResult testStepResult;
        public TestStepResult getTestStepResult() {
            return testStepResult;
        }

        private final Timestamp timestamp;
        public Timestamp getTimestamp() {
            return timestamp;
        }


        public TestStepFinished(
            String testCaseStartedId,
            String testStepId,
            TestStepResult testStepResult,
            Timestamp timestamp
        ) {
            this.testCaseStartedId = requireNonNull(testCaseStartedId);
            this.testStepId = requireNonNull(testStepId);
            this.testStepResult = requireNonNull(testStepResult);
            this.timestamp = requireNonNull(timestamp);
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
            return Objects.hash(
                testCaseStartedId,
                testStepId,
                testStepResult,
                timestamp
            );
        }
    }

  
    public static class TestStepResult {
        private final Duration duration;
        public Duration getDuration() {
            return duration;
        }

        private final String message;
        public Optional<String> getMessage() {
            return ofNullable(message);
        }

        private final TestStepResultStatus status;
        public TestStepResultStatus getStatus() {
            return status;
        }


        public TestStepResult(
            Duration duration,
            String message,
            TestStepResultStatus status
        ) {
            this.duration = requireNonNull(duration);
            this.message = message;
            this.status = requireNonNull(status);
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            TestStepResult that = (TestStepResult) o;
            return 
                duration.equals(that.duration) &&             
                Objects.equals(message, that.message) &&             
                status.equals(that.status);            
        }

        @Override
        public int hashCode() {
            return Objects.hash(
                duration,
                message,
                status
            );
        }
    }

  
    public static class TestStepStarted {
        private final String testCaseStartedId;
        public String getTestCaseStartedId() {
            return testCaseStartedId;
        }

        private final String testStepId;
        public String getTestStepId() {
            return testStepId;
        }

        private final Timestamp timestamp;
        public Timestamp getTimestamp() {
            return timestamp;
        }


        public TestStepStarted(
            String testCaseStartedId,
            String testStepId,
            Timestamp timestamp
        ) {
            this.testCaseStartedId = requireNonNull(testCaseStartedId);
            this.testStepId = requireNonNull(testStepId);
            this.timestamp = requireNonNull(timestamp);
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
            return Objects.hash(
                testCaseStartedId,
                testStepId,
                timestamp
            );
        }
    }

  
    public static class Timestamp {
        private final Integer seconds;
        public Integer getSeconds() {
            return seconds;
        }

        private final Integer nanos;
        public Integer getNanos() {
            return nanos;
        }


        public Timestamp(
            Integer seconds,
            Integer nanos
        ) {
            this.seconds = requireNonNull(seconds);
            this.nanos = requireNonNull(nanos);
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
            return Objects.hash(
                seconds,
                nanos
            );
        }
    }

  
    public static class UndefinedParameterType {
        private final String expression;
        public String getExpression() {
            return expression;
        }

        private final String name;
        public String getName() {
            return name;
        }


        public UndefinedParameterType(
            String expression,
            String name
        ) {
            this.expression = requireNonNull(expression);
            this.name = requireNonNull(name);
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
            return Objects.hash(
                expression,
                name
            );
        }
    }

  }
public enum AttachmentContentEncoding {
    IDENTITY("IDENTITY"),
    BASE64("BASE64");

    private final String value;
    private final static java.util.Map<String, AttachmentContentEncoding> CONSTANTS = new java.util.HashMap<String, AttachmentContentEncoding>();

    static {
        for (AttachmentContentEncoding c: values()) {
            CONSTANTS.put(c.value, c);
        }
    }

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
        AttachmentContentEncoding constant = CONSTANTS.get(value);
        if (constant == null) {
            throw new IllegalArgumentException(value);
        } else {
            return constant;
        }
    }
}
public enum SourceMediaType {
    TEXT_X_CUCUMBER_GHERKIN_PLAIN("text/x.cucumber.gherkin+plain"),
    TEXT_X_CUCUMBER_GHERKIN_MARKDOWN("text/x.cucumber.gherkin+markdown");

    private final String value;
    private final static java.util.Map<String, SourceMediaType> CONSTANTS = new java.util.HashMap<String, SourceMediaType>();

    static {
        for (SourceMediaType c: values()) {
            CONSTANTS.put(c.value, c);
        }
    }

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
        SourceMediaType constant = CONSTANTS.get(value);
        if (constant == null) {
            throw new IllegalArgumentException(value);
        } else {
            return constant;
        }
    }
}
public enum StepDefinitionPatternType {
    CUCUMBER_EXPRESSION("CUCUMBER_EXPRESSION"),
    REGULAR_EXPRESSION("REGULAR_EXPRESSION");

    private final String value;
    private final static java.util.Map<String, StepDefinitionPatternType> CONSTANTS = new java.util.HashMap<String, StepDefinitionPatternType>();

    static {
        for (StepDefinitionPatternType c: values()) {
            CONSTANTS.put(c.value, c);
        }
    }

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
        StepDefinitionPatternType constant = CONSTANTS.get(value);
        if (constant == null) {
            throw new IllegalArgumentException(value);
        } else {
            return constant;
        }
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
    private final static java.util.Map<String, TestStepResultStatus> CONSTANTS = new java.util.HashMap<String, TestStepResultStatus>();

    static {
        for (TestStepResultStatus c: values()) {
            CONSTANTS.put(c.value, c);
        }
    }

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
        TestStepResultStatus constant = CONSTANTS.get(value);
        if (constant == null) {
            throw new IllegalArgumentException(value);
        } else {
            return constant;
        }
    }
}
