package io.cucumber.gherkin;

import io.cucumber.messages.IdGenerator;
import io.cucumber.messages.Messages.GherkinDocument;
import io.cucumber.messages.Messages.GherkinDocument.Comment;
import io.cucumber.messages.Messages.GherkinDocument.Feature;
import io.cucumber.messages.Messages.GherkinDocument.Feature.Background;
import io.cucumber.messages.Messages.GherkinDocument.Feature.FeatureChild;
import io.cucumber.messages.Messages.GherkinDocument.Feature.FeatureChild.Rule;
import io.cucumber.messages.Messages.GherkinDocument.Feature.FeatureChild.RuleChild;
import io.cucumber.messages.Messages.GherkinDocument.Feature.Scenario;
import io.cucumber.messages.Messages.GherkinDocument.Feature.Scenario.Examples;
import io.cucumber.messages.Messages.GherkinDocument.Feature.Step;
import io.cucumber.messages.Messages.GherkinDocument.Feature.Step.DataTable;
import io.cucumber.messages.Messages.GherkinDocument.Feature.Step.DocString;
import io.cucumber.messages.Messages.GherkinDocument.Feature.TableRow;
import io.cucumber.messages.Messages.GherkinDocument.Feature.TableRow.TableCell;
import io.cucumber.messages.Messages.GherkinDocument.Feature.Tag;
import io.cucumber.messages.Messages.Location;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;
import java.util.stream.Collectors;

import static io.cucumber.gherkin.Parser.Builder;
import static io.cucumber.gherkin.Parser.RuleType;
import static io.cucumber.gherkin.Parser.TokenType;

public class GherkinDocumentBuilder implements Builder<GherkinDocument.Builder> {
    private final IdGenerator idGenerator;

    private Deque<AstNode> stack;
    private GherkinDocument.Builder gherkinDocumentBuilder;

    public GherkinDocumentBuilder(IdGenerator idGenerator) {
        this.idGenerator = idGenerator;
        reset();
    }

    @Override
    public void reset() {
        stack = new ArrayDeque<>();
        stack.push(new AstNode(RuleType.None));
        gherkinDocumentBuilder = GherkinDocument.newBuilder();
    }

    private AstNode currentNode() {
        return stack.peek();
    }

    @Override
    public void build(Token token) {
        RuleType ruleType = RuleType.cast(token.matchedType);
        if (token.matchedType == TokenType.Comment) {
            gherkinDocumentBuilder.addComments(Comment.newBuilder()
                    .setLocation(getLocation(token, 0))
                    .setText(token.matchedText)
            );
        } else {
            currentNode().add(ruleType, token);
        }
    }

    @Override
    public void startRule(RuleType ruleType) {
        stack.push(new AstNode(ruleType));
    }

    @Override
    public void endRule(RuleType ruleType) {
        AstNode node = stack.pop();
        Object transformedNode = getTransformedNode(node);
        currentNode().add(node.ruleType, transformedNode);
    }

    private Object getTransformedNode(AstNode node) {
        switch (node.ruleType) {
            case Step: {
                Step.Builder builder = Step.newBuilder();
                Token stepLine = node.getToken(TokenType.StepLine);
                builder
                        .setId(idGenerator.newId())
                        .setLocation(getLocation(stepLine, 0))
                        .setKeyword(stepLine.matchedKeyword)
                        .setText(stepLine.matchedText);

                DataTable dataTable = node.getSingle(RuleType.DataTable, null);
                if (dataTable != null)
                    builder.setDataTable(dataTable);
                DocString docString = node.getSingle(RuleType.DocString, null);
                if (docString != null)
                    builder.setDocString(docString);
                return builder.build();
            }
            case DocString: {
                Token separatorToken = node.getTokens(TokenType.DocStringSeparator).get(0);
                String contentType = separatorToken.matchedText.length() > 0 ? separatorToken.matchedText : null;
                List<Token> lineTokens = node.getTokens(TokenType.Other);
                StringBuilder content = new StringBuilder();
                boolean newLine = false;
                for (Token lineToken : lineTokens) {
                    if (newLine) content.append("\n");
                    newLine = true;
                    content.append(lineToken.matchedText);
                }
                DocString.Builder builder = DocString.newBuilder();
                if (contentType != null)
                    builder.setContentType(contentType);

                return builder
                        .setLocation(getLocation(separatorToken, 0))
                        .setContent(content.toString())
                        .setDelimiter(separatorToken.matchedKeyword)
                        .build();
            }
            case DataTable: {
                List<TableRow> rows = getTableRows(node);
                return DataTable.newBuilder()
                        .setLocation(rows.get(0).getLocation())
                        .addAllRows(rows)
                        .build();
            }
            case Background: {
                Token backgroundLine = node.getToken(TokenType.BackgroundLine);
                String description = getDescription(node);
                List<Step> steps = getSteps(node);
                Background.Builder builder = Background.newBuilder();
                if (description != null)
                    builder.setDescription(description);

                return builder
                        .setLocation(getLocation(backgroundLine, 0))
                        .setKeyword(backgroundLine.matchedKeyword)
                        .setName(backgroundLine.matchedText)
                        .addAllSteps(steps)
                        .build();
            }
            case ScenarioDefinition: {
                List<Tag> tags = getTags(node);
                AstNode scenarioNode = node.getSingle(RuleType.Scenario, null);

                Token scenarioLine = scenarioNode.getToken(TokenType.ScenarioLine);
                String description = getDescription(scenarioNode);
                List<Step> steps = getSteps(scenarioNode);
                List<Examples> examplesList = scenarioNode.getItems(RuleType.ExamplesDefinition);

                Scenario.Builder builder = Scenario.newBuilder();
                if (description != null) builder.setDescription(description);

                return builder
                        .setId(idGenerator.newId())
                        .setLocation(getLocation(scenarioLine, 0))
                        .setKeyword(scenarioLine.matchedKeyword)
                        .setName(scenarioLine.matchedText)
                        .addAllTags(tags)
                        .addAllSteps(steps)
                        .addAllExamples(examplesList)
                        .build();
            }
            case ExamplesDefinition: {
                Examples.Builder builder = Examples.newBuilder();

                List<Tag> tags = getTags(node);
                AstNode examplesNode = node.getSingle(RuleType.Examples, null);
                Token examplesLine = examplesNode.getToken(TokenType.ExamplesLine);
                String description = getDescription(examplesNode);
                List<TableRow> rows = examplesNode.getSingle(RuleType.ExamplesTable, null);
                TableRow tableHeader = rows != null && !rows.isEmpty() ? rows.get(0) : null;
                List<TableRow> tableBody = rows != null && !rows.isEmpty() ? rows.subList(1, rows.size()) : null;

                if (tableHeader != null)
                    builder.setTableHeader(tableHeader);
                if (tableBody != null)
                    builder.addAllTableBody(tableBody);

                builder
                        .setLocation(getLocation(examplesLine, 0))
                        .setKeyword(examplesLine.matchedKeyword)
                        .setName(examplesLine.matchedText)
                        .addAllTags(tags);

                if (description != null)
                    builder.setDescription(description);

                return builder.build();
            }
            case ExamplesTable: {
                return getTableRows(node);
            }
            case Description: {
                List<Token> lineTokens = node.getTokens(TokenType.Other);
                // Trim trailing empty lines
                int end = lineTokens.size();
                while (end > 0 && lineTokens.get(end - 1).matchedText.matches("\\s*")) {
                    end--;
                }
                lineTokens = lineTokens.subList(0, end);

                return lineTokens
                        .stream()
                        .map(t -> t.matchedText)
                        .collect(Collectors.joining("\n"));
            }
            case Feature: {
                Feature.Builder builder = Feature.newBuilder();
                AstNode header = node.getSingle(RuleType.FeatureHeader, new AstNode(RuleType.FeatureHeader));
                if (header == null) return null;
                List<Tag> tags = getTags(header);
                Token featureLine = header.getToken(TokenType.FeatureLine);
                if (featureLine == null) return null;

                Background background = node.getSingle(RuleType.Background, null);
                if (background != null) {
                    builder.addChildren(FeatureChild.newBuilder().setBackground(background).build());
                }
                for (Scenario scenario : node.<Scenario>getItems(RuleType.ScenarioDefinition)) {
                    builder.addChildren(FeatureChild.newBuilder().setScenario(scenario).build());
                }
                for (Rule rule : node.<Rule>getItems(RuleType.Rule)) {
                    builder.addChildren(FeatureChild.newBuilder().setRule(rule).build());
                }
                String description = getDescription(header);
                if (description != null) builder.setDescription(description);
                if (featureLine.matchedGherkinDialect == null) return null;
                String language = featureLine.matchedGherkinDialect.getLanguage();

                return builder
                        .addAllTags(tags)
                        .setLocation(getLocation(featureLine, 0))
                        .setLanguage(language)
                        .setKeyword(featureLine.matchedKeyword)
                        .setName(featureLine.matchedText)
                        .build();
            }
            case Rule: {
                Rule.Builder builder = Rule.newBuilder();
                AstNode header = node.getSingle(RuleType.RuleHeader, new AstNode(RuleType.RuleHeader));
                if (header == null) return null;
                Token ruleLine = header.getToken(TokenType.RuleLine);
                if (ruleLine == null) return null;

                String description = getDescription(header);
                if (description != null)
                    builder.setDescription(description);
                Background background = node.getSingle(RuleType.Background, null);
                if (background != null) {
                    builder.addChildren(RuleChild.newBuilder().setBackground(background).build());
                }
                List<Scenario> scenarios = node.getItems(RuleType.ScenarioDefinition);
                for (Scenario scenario : scenarios) {
                    builder.addChildren(RuleChild.newBuilder().setScenario(scenario).build());
                }

                return builder
                        .setLocation(getLocation(ruleLine, 0))
                        .setKeyword(ruleLine.matchedKeyword)
                        .setName(ruleLine.matchedText)
                        .build();

            }
            case GherkinDocument: {
                Feature feature = node.getSingle(RuleType.Feature, null);

                if (feature != null)
                    gherkinDocumentBuilder.setFeature(feature);

                return gherkinDocumentBuilder;
            }

        }
        return node;
    }

    private List<TableRow> getTableRows(AstNode node) {
        List<TableRow> rows = new ArrayList<>();

        for (Token token : node.getTokens(TokenType.TableRow)) {
            rows.add(TableRow.newBuilder()
                    .setId(idGenerator.newId())
                    .setLocation(getLocation(token, 0))
                    .addAllCells(getCells(token))
                    .build());
        }
        ensureCellCount(rows);
        return rows;
    }

    private void ensureCellCount(List<TableRow> rows) {
        if (rows.isEmpty()) return;

        int cellCount = rows.get(0).getCellsCount();
        for (TableRow row : rows) {
            if (row.getCellsCount() != cellCount) {
                io.cucumber.gherkin.Location location = new io.cucumber.gherkin.Location(row.getLocation().getLine(), row.getLocation().getColumn());
                throw new ParserException.AstBuilderException("inconsistent cell count within the table", location);
            }
        }
    }

    private List<TableCell> getCells(Token token) {
        List<TableCell> cells = new ArrayList<>();
        for (GherkinLineSpan cellItem : token.mathcedItems) {
            cells.add(TableCell.newBuilder().setLocation(getLocation(token, cellItem.column)).setValue(cellItem.text).build());
        }
        return cells;
    }

    private List<Step> getSteps(AstNode node) {
        return node.getItems(RuleType.Step);
    }

    private Location getLocation(Token token, int column) {
        column = column == 0 ? token.location.getColumn() : column;
        return Location.newBuilder()
                .setLine(token.location.getLine())
                .setColumn(column)
                .build();
    }

    private String getDescription(AstNode node) {
        return node.getSingle(RuleType.Description, null);
    }

    private List<Tag> getTags(AstNode node) {
        AstNode tagsNode = node.getSingle(RuleType.Tags, new AstNode(RuleType.None));
        if (tagsNode == null)
            return new ArrayList<>();

        List<Token> tokens = tagsNode.getTokens(TokenType.TagLine);
        List<Tag> tags = new ArrayList<>();
        for (Token token : tokens) {
            for (GherkinLineSpan tagItem : token.mathcedItems) {
                tags.add(
                    Tag.newBuilder()
                        .setLocation(getLocation(token, tagItem.column))
                        .setName(tagItem.text)
                        .setId(idGenerator.newId())
                        .build());
            }
        }
        return tags;
    }

    @Override
    public GherkinDocument.Builder getResult() {
        return currentNode().getSingle(RuleType.GherkinDocument, null);
    }
}
