package io.cucumber.gherkin.utils;

import io.cucumber.messages.types.Background;
import io.cucumber.messages.types.Comment;
import io.cucumber.messages.types.DataTable;
import io.cucumber.messages.types.DocString;
import io.cucumber.messages.types.Examples;
import io.cucumber.messages.types.Feature;
import io.cucumber.messages.types.GherkinDocument;
import io.cucumber.messages.types.Location;
import io.cucumber.messages.types.Rule;
import io.cucumber.messages.types.Scenario;
import io.cucumber.messages.types.Step;
import io.cucumber.messages.types.TableCell;
import io.cucumber.messages.types.TableRow;
import io.cucumber.messages.types.Tag;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

/**
 * Pretty prints a Gherkin Document
 */
public class PrettyPrintGherkinDocument {
    private static class Result implements Accumulator {
        private Long deepestLine = 0L;
        private final StringBuilder builder = new StringBuilder();

        Result append(String s) {
            builder.append(s);
            return this;
        }

        @Override
        public void setDeepestLine(Long line) {
            deepestLine = line;
        }

        @Override
        public Long getDeepestLine() {
            return deepestLine;
        }

        @Override
        public String toString() {
            return builder.toString();
        }
    }


    private static class PrettyPrintGherkinDocumentHandlers implements GherkinDocumentHandlers<Result> {
        private final Syntax syntax;
        private int scenarioLevel = 1;

        public PrettyPrintGherkinDocumentHandlers(Syntax syntax) {
            this.syntax = syntax;
        }

        @Override
        public Result handleFeature(Feature feature, Result result, List<Comment> comments) {
            result.append(prettyLanguageHeader(feature.getLanguage()));
            return appendFeature(result, feature, syntax, 0, comments);
        }

        @Override
        public Result handleBackground(Background background, Result result, List<Comment> comments) {
            return appendBackground(result, background, syntax, scenarioLevel, comments);
        }

        @Override
        public Result handleDataTable(DataTable dataTable, Result result, List<Comment> comments) {
            int level = syntax == Syntax.markdown ? 1 : scenarioLevel + 2;
            return appendTableRows(result, dataTable.getRows(), syntax, level, comments);
        }

        @Override
        public Result handleComment(Comment comment, Result result) {
            appendComment(0, result, comment);
            return result;
        }

        @Override
        public Result handleDocString(DocString docString, Result result, List<Comment> comments) {
            String delimiter = makeDocStringDelimiter(syntax, docString);
            int level = syntax == Syntax.markdown ? 1 : scenarioLevel + 2;
            String indent = repeatString(level, "  ");
            String docStringContent = docString.getContent().replace("^", indent);
            if (syntax == Syntax.gherkin) {
                if ("\"\"\"".equals(docString.getDelimiter())) {
                    docStringContent = docStringContent.replace("\"", "\\\"\\\"\\\"");
                } else {
                    docStringContent = docStringContent.replace("```", "\\`\\`\\`");
                }
            }
            return result
                    .append(indent)
                    .append(delimiter)
                    .append(docString.getMediaType().orElse(""))
                    .append("\n")
                    .append(docStringContent)
                    .append("\n")
                    .append(indent)
                    .append(delimiter)
                    .append("\n");
        }

        @Override
        public Result handleExamples(Examples examples, Result result, List<Comment> comments) {
            List<TableRow> tableRows = new ArrayList<>();
            if (examples.getTableHeader().isPresent()) {
                tableRows.add(examples.getTableHeader().get());
                tableRows.addAll(examples.getTableBody());
            }
            result = appendExamples(result, examples, syntax, scenarioLevel + 1, comments);
            return appendTableRows(result, tableRows, syntax, scenarioLevel + 2, comments);
        }

        @Override
        public Result handleRule(Rule rule, Result result, List<Comment> comments) {
            scenarioLevel = 2;
            return appendRule(result, rule, syntax, 1, comments);
        }

        @Override
        public Result handleScenario(Scenario scenario, Result result, List<Comment> comments) {
            return appendScenario(result, scenario, syntax, scenarioLevel, comments);
        }

        @Override
        public Result handleStep(Step step, Result result, List<Comment> comments) {
            appendComments(step.getLocation(), result, comments, scenarioLevel + 1);
            return result.append(stepPrefix(scenarioLevel + 1, syntax))
                    .append(step.getKeyword())
                    .append(step.getText())
                    .append("\n");
        }

        @Override
        public Result handleTableCell(TableCell tableCell, Result result, List<Comment> comments) {
            return result;
        }

        @Override
        public Result handleTableRow(TableRow tableRow, Result result, List<Comment> comments) {
            return result;
        }

        @Override
        public Result handleTag(Tag tag, Result result, List<Comment> comments) {
            return result;
        }
    }

    /**
     * Pretty print a GherkinDocument as either markdown or gherkin.
     *
     * @param gherkinDocument The GherkinDocument object.
     * @param syntax          What syntax do you want to format to?
     * @return The pretty printed string representation of the Gherkin doc in the syntax indicated.
     */
    public static String prettyPrint(GherkinDocument gherkinDocument, Syntax syntax) {
        WalkGherkinDocument<Result> walker = new WalkGherkinDocument<>();
        Result result = walker.walkGherkinDocument(gherkinDocument, new Result(), new PrettyPrintGherkinDocumentHandlers(syntax));
        return result.toString();
    }

    private static String prettyLanguageHeader(String language) {
        return "en".equals(language) ? "" : String.format("# language: %s\n", language);
    }

    private static Result appendScenario(
            Result result,
            Scenario stepContainer,
            Syntax syntax,
            int level,
            List<Comment> comments) {
        List<Tag> tags = stepContainer.getTags() != null ? stepContainer.getTags() : Collections.emptyList();
        int stepCount = stepContainer.getSteps() != null ? stepContainer.getSteps().size() : 0;
        String description = prettyDescription(stepContainer.getDescription(), syntax);
        result.append(level == 0 ? "" : "\n");
        appendComments(stepContainer.getLocation(), result, comments, level);
        appendTags(result, tags, syntax, level, comments);
        return result
                .append(keywordPrefix(level, syntax))
                .append(stepContainer.getKeyword())
                .append(": ")
                .append(stepContainer.getName())
                .append("\n").append(description)
                .append(!"".equals(description.trim()) && stepCount > 0 ? "\n" : "");
    }

    private static Result appendFeature(
            Result result,
            Feature stepContainer,
            Syntax syntax,
            int level,
            List<Comment> comments) {
        List<Tag> tags = stepContainer.getTags() != null ? stepContainer.getTags() : Collections.emptyList();
        appendComments(stepContainer.getLocation(), result, comments, level);
        appendTags(result, tags, syntax, level, comments);
        return result.append(level == 0 ? "" : "\n")
                .append(keywordPrefix(level, syntax))
                .append(stepContainer.getKeyword())
                .append(": ")
                .append(stepContainer.getName())
                .append("\n")
                .append(prettyDescription(stepContainer.getDescription(), syntax));
    }

    private static Result appendRule(
            Result result,
            Rule stepContainer,
            Syntax syntax,
            int level,
            List<Comment> comments
    ) {
        List<Tag> tags = stepContainer.getTags() != null ? stepContainer.getTags() : Collections.emptyList();
        String description = prettyDescription(stepContainer.getDescription(), syntax);
        appendComments(stepContainer.getLocation(), result, comments, level);
        result.append(level == 0 ? "" : "\n");
        appendTags(result, tags, syntax, level, comments);
        return result
                .append(keywordPrefix(level, syntax))
                .append(stepContainer.getKeyword())
                .append(": ")
                .append(stepContainer.getName())
                .append("\n")
                .append(description);
    }

    private static Result appendExamples(
            Result result,
            Examples stepContainer,
            Syntax syntax,
            int level,
            List<Comment> comments
    ) {
        List<Tag> tags = stepContainer.getTags() != null ? stepContainer.getTags() : Collections.emptyList();
        String description = prettyDescription(stepContainer.getDescription(), syntax);
        result.append(level == 0 ? "" : "\n");
        appendComments(stepContainer.getLocation(), result, comments, level);
        appendTags(result, tags, syntax, level, comments);
        return result
                .append(keywordPrefix(level, syntax))
                .append(stepContainer.getKeyword())
                .append(stepContainer.getName() != null && !stepContainer.getName().isEmpty() ? ": " : ":")
                .append(stepContainer.getName())
                .append("\n")
                .append(description);
    }

    private static Result appendBackground(
            Result result,
            Background stepContainer,
            Syntax syntax,
            int level,
            List<Comment> comments
    ) {
        int stepCount = stepContainer.getSteps() != null ? stepContainer.getSteps().size() : 0;
        String description = prettyDescription(stepContainer.getDescription(), syntax);
        appendComments(stepContainer.getLocation(), result, comments, level);
        return result.append(level == 0 ? "" : "\n")
                .append(keywordPrefix(level, syntax))
                .append(stepContainer.getKeyword())
                .append(": ").append(stepContainer.getName())
                .append("\n").append(description)
                .append(!"".equals(description.trim()) && stepCount > 0 ? "\n" : "");
    }

    private static String prettyDescription(String description, Syntax syntax) {
        if (description == null || "".equals(description.trim())) {
            return "";
        }
        if (syntax == Syntax.gherkin) {
            return description + "\n";
        }
        return description.trim() + "\n";
    }

    private static Result appendTags(Result result, List<Tag> tags, Syntax syntax, int level, List<Comment> comments) {
        if (tags.isEmpty()) {
            return result;
        }
        String prefix = syntax == Syntax.gherkin ? repeatString(level, "  ") : "";
        String tagQuote = syntax == Syntax.gherkin ? "" : "`";
        appendComments(tags.get(0).getLocation(), result, comments, level);
        return result
                .append(prefix)
                .append(tags.stream()
                        .map(tag -> tagQuote + tag.getName() + tagQuote)
                        .collect(Collectors.joining(" ")))
                .append("\n");
    }

    private static String keywordPrefix(int level, Syntax syntax) {
        if (syntax == Syntax.markdown) {
            return repeatString(level + 1, "#") + " ";
        } else {
            return repeatString(level, "  ");
        }
    }

    private static String stepPrefix(int level, Syntax syntax) {
        if (syntax == Syntax.markdown) {
            return "* ";
        }
        return repeatString(level, "  ");
    }

    private static String repeatString(int numRepeats, String stringToRepeat) {
        StringBuilder res = new StringBuilder();
        for (int i = 0; i < numRepeats; ++i) {
            res.append(stringToRepeat);
        }
        return res.toString();
    }

    private static String makeDocStringDelimiter(Syntax syntax, DocString docString) {
        if (syntax == Syntax.gherkin) {
            return docString.getDelimiter().substring(0, 3);
        }

        // The length of the fenced code block delimiter is three backticks when the content inside doesn't have backticks.
        // If the content inside has three or more backticks, the number of backticks in the delimiter must be at least one more
        // https://github.github.com/gfm/#fenced-code-blocks
        Pattern threeOrMoreBackticksPattern = Pattern.compile("```+");
        int maxContentBackTickCount = 2;
        Matcher match;
        do {
            match = threeOrMoreBackticksPattern.matcher(docString.getContent());
            if (match.matches()) {
                maxContentBackTickCount = Math.max(maxContentBackTickCount, match.group(1).length());
            }
        } while (match.matches());
        // Return a delimiter with one more backtick than the max number of backticks in the contents (3 ny default)
        return repeatString(maxContentBackTickCount + 1, "`");
    }

    private static Result appendTableRows(
            Result result,
            List<TableRow> tableRows,
            Syntax syntax,
            int level, List<Comment> comments) {
        if (tableRows.isEmpty()) {
            return result;
        }
        int[] maxWidths = new int[tableRows.get(0).getCells().size()];
        Arrays.fill(maxWidths, 0);
        for (TableRow tableRow : tableRows) {
            for (int j = 0; j < tableRow.getCells().size(); ++j) {
                TableCell tableCell = tableRow.getCells().get(j);
                maxWidths[j] = Math.max(maxWidths[j], escapeCell(tableCell.getValue()).length());
            }
        }

        int n = 0;
        for (TableRow row : tableRows) {
            appendTableRow(result, row, level, maxWidths, syntax, comments);
            if (n == 0 && syntax == Syntax.markdown) {
                List<TableCell> mappedCells = new ArrayList<>();
                for (int j = 0; j < row.getCells().size(); ++j) {
                    mappedCells.add(new TableCell(row.getCells().get(j).getLocation(),
                            repeatString(maxWidths[j], "-")));
                }
                TableRow separatorRow = new TableRow(row.getLocation(),
                        mappedCells,
                        row.getId() + "-separator");
                appendTableRow(result, separatorRow, level, maxWidths, syntax, comments);
            }
            n++;
        }
        return result;
    }

    private static List<Comment> popComments(Location currentLocation, List<Comment> comments) {
        List<Comment> res = new ArrayList<>();
        Iterator<Comment> iter = comments.iterator();
        while (iter.hasNext()) {
            Comment comment = iter.next();
            if (currentLocation.getLine() > comment.getLocation().getLine()) {
                res.add(comment);
                iter.remove();
            }
        }
        return res;
    }

    private static Result appendTableRow(
            Result result,
            TableRow row,
            int level,
            int[] maxWidths,
            Syntax syntax,
            List<Comment> comments) {
        int actualLevel = syntax == Syntax.markdown ? 1 : level;

        appendComments(row.getLocation(), result, comments, actualLevel);

        result.append(repeatString(actualLevel, "  "))
                .append("| ");
        for (int j = 0; j < row.getCells().size(); ++j) {
            if (j > 0) {
                result.append(" | ");
            }
            TableCell tableCell = row.getCells().get(j);
            String escapedCellValue = escapeCell(tableCell.getValue());
            int spaceCount = maxWidths[j] - escapedCellValue.length();
            String spaces = repeatString(spaceCount, " ");
            //res.append(isNumeric(escapedCellValue) ? spaces + escapedCellValue : escapedCellValue + spaces);
            result.append(escapedCellValue + spaces);
        }
        return result.append(" |\n");
    }

    private static void appendComments(Location location, Result result, List<Comment> comments, int actualLevel) {
        for (Comment nextComment : popComments(location, comments)) {
            appendComment(actualLevel, result, nextComment);
        }
    }

    private static void appendComment(int actualLevel, Result result, Comment nextComment) {
        if (nextComment.getText() == null || nextComment.getText().trim().isEmpty()) {
            return;
        }
        String comment = nextComment.getText().trim();
        if (!comment.isEmpty()) {
            result.append(repeatString(actualLevel, "  "))
                    .append("# " + comment.substring(1).trim())
                    .append("\n");
        }
    }


    private static String escapeCell(String s) {
        StringBuilder e = new StringBuilder();
        for (int i = 0; i < s.length(); ++i) {
            char c = s.charAt(i);
            switch (c) {
                case '\\':
                    e.append("\\\\");
                    break;
                case '\n':
                    e.append("\\n");
                    break;
                case '|':
                    e.append("\\|");
                    break;
                default:
                    e.append(c);
            }
        }
        return e.toString();
    }
}
