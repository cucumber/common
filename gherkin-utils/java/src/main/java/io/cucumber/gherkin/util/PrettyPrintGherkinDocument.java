package io.cucumber.gherkin.util;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

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

/**
 * Pretty prints a Gherkin Document
 */
public class PrettyPrintGherkinDocument {

    private static class PrettyPrintGherkinDocumentHandlers implements GherkinDocumentHandlers<String> {
        private final Syntax syntax;
        private int scenarioLevel = 1;

        public PrettyPrintGherkinDocumentHandlers(Syntax syntax) {
            this.syntax = syntax;
        }

        @Override
        public String handleFeature(Feature feature, String content, List<Comment> comments) {
            return content +
                    prettyLanguageHeader(feature.getLanguage()) +
                    prettyKeywordContainer(feature, syntax, 0, comments);
        }

        @Override
        public String handleBackground(Background background, String content, List<Comment> comments) {
            return content.concat(prettyKeywordContainer(background, syntax, scenarioLevel, comments));
        }

        @Override
        public String handleDataTable(DataTable dataTable, String content, List<Comment> comments) {
            int level = syntax == Syntax.markdown ? 1 : scenarioLevel + 2;
            return content.concat(
                    prettyTableRows(dataTable.getRows() == null ? Collections.emptyList() : dataTable.getRows(),
                            syntax, level, comments));
        }

        @Override
        public String handleDocString(DocString docString, String content, List<Comment> comments) {
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
            return content
                    .concat(indent)
                    .concat(delimiter)
                    .concat(docString.getMediaType() != null ? docString.getMediaType() : "")
                    .concat("\n")
                    .concat(docStringContent)
                    .concat("\n")
                    .concat(indent)
                    .concat(delimiter)
                    .concat("\n");
        }

        @Override
        public String handleExamples(Examples examples, String content, List<Comment> comments) {
            List<TableRow> tableRows = new ArrayList<>();
            if (examples.getTableHeader() != null) {
                tableRows.add(examples.getTableHeader());
                tableRows.addAll(examples.getTableBody());
            }
            return content
                    .concat(prettyKeywordContainer(examples, syntax, scenarioLevel + 1, comments))
                    .concat(prettyTableRows(tableRows, syntax, scenarioLevel + 2, comments));
        }

        @Override
        public String handleRule(Rule rule, String content, List<Comment> comments) {
            scenarioLevel = 2;
            return content.concat(prettyKeywordContainer(rule, syntax, 1, comments));
        }

        @Override
        public String handleScenario(Scenario scenario, String content, List<Comment> comments) {
            StringBuilder res = new StringBuilder();
            prettyComments(scenario.getLocation(), comments, scenarioLevel, res);
            return content.concat(prettyKeywordContainer(scenario, syntax, scenarioLevel, comments));
        }

        @Override
        public String handleStep(Step step, String content, List<Comment> comments) {
            StringBuilder res = new StringBuilder(content);
            prettyComments(step.getLocation(), comments, scenarioLevel + 1, res);
            return res.append(stepPrefix(scenarioLevel + 1, syntax))
                    .append(step.getKeyword())
                    .append(step.getText())
                    .append("\n").toString();
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
        return WalkGherkinDocument.walkGherkinDocument(gherkinDocument, "",
                new PrettyPrintGherkinDocumentHandlers(syntax));
    }

    private static String prettyLanguageHeader(String language) {
        return "en".equals(language) ? "" : String.format("# language: %s\n", language);
    }

    private static String prettyKeywordContainer(
            Scenario stepContainer,
            Syntax syntax,
            int level,
            List<Comment> comments) {
        List<Tag> tags = stepContainer.getTags() != null ? stepContainer.getTags() : Collections.emptyList();
        int stepCount = stepContainer.getSteps() != null ? stepContainer.getSteps().size() : 0;
        String description = prettyDescription(stepContainer.getDescription(), syntax);
        StringBuilder res = new StringBuilder();
        prettyComments(stepContainer.getLocation(), comments, level, res);
        res.append(level == 0 ? "" : "\n")
                .append(prettyTags(tags, syntax, level))
                .append(keywordPrefix(level, syntax))
                .append(stepContainer.getKeyword())
                .append(": ")
                .append(stepContainer.getName())
                .append("\n").append(description)
                .append(description != null && !"".equals(description.trim()) && stepCount > 0 ? "\n" : "");
        return res.toString();
    }

    private static String prettyKeywordContainer(
            Feature stepContainer,
            Syntax syntax,
            int level,
            List<Comment> comments
    ) {
        List<Tag> tags = stepContainer.getTags() != null ? stepContainer.getTags() : Collections.emptyList();
        String description = prettyDescription(stepContainer.getDescription(), syntax);
        StringBuilder res = new StringBuilder();
        prettyComments(stepContainer.getLocation(), comments, level, res);
        res.append(level == 0 ? "" : "\n")
                .append(prettyTags(tags, syntax, level))
                .append(keywordPrefix(level, syntax))
                .append(stepContainer.getKeyword())
                .append(": ")
                .append(stepContainer.getName())
                .append("\n")
                .append(description);
        return res.toString();
    }

    private static String prettyKeywordContainer(
            Rule stepContainer,
            Syntax syntax,
            int level,
            List<Comment> comments
    ) {
        List<Tag> tags = stepContainer.getTags() != null ? stepContainer.getTags() : Collections.emptyList();
        String description = prettyDescription(stepContainer.getDescription(), syntax);
        StringBuilder res = new StringBuilder();
        prettyComments(stepContainer.getLocation(), comments, level, res);
        res.append(level == 0 ? "" : "\n")
                .append(prettyTags(tags, syntax, level))
                .append(keywordPrefix(level, syntax))
                .append(stepContainer.getKeyword())
                .append(": ")
                .append(stepContainer.getName())
                .append("\n")
                .append(description);
        return res.toString();
    }

    private static String prettyKeywordContainer(
            Examples stepContainer,
            Syntax syntax,
            int level,
            List<Comment> comments
    ) {
        List<Tag> tags = stepContainer.getTags() != null ? stepContainer.getTags() : Collections.emptyList();
        String description = prettyDescription(stepContainer.getDescription(), syntax);
        StringBuilder res = new StringBuilder();
        res.append(level == 0 ? "" : "\n");
        prettyComments(stepContainer.getLocation(), comments, level, res);
        res.append(prettyTags(tags, syntax, level))
                .append(keywordPrefix(level, syntax))
                .append(stepContainer.getKeyword())
                .append(": ")
                .append(stepContainer.getName())
                .append("\n")
                .append(description);
        return res.toString();
    }

    private static String prettyKeywordContainer(
            Background stepContainer,
            Syntax syntax,
            int level,
            List<Comment> comments
    ) {
        int stepCount = stepContainer.getSteps() != null ? stepContainer.getSteps().size() : 0;
        String description = prettyDescription(stepContainer.getDescription(), syntax);
        StringBuilder res = new StringBuilder();
        prettyComments(stepContainer.getLocation(), comments, level, res);
        res.append(level == 0 ? "" : "\n")
                .append(prettyTags(Collections.emptyList(), syntax, level))
                .append(keywordPrefix(level, syntax))
                .append(stepContainer.getKeyword())
                .append(": ").append(stepContainer.getName())
                .append("\n").append(description)
                .append(!"".equals(description.trim()) && stepCount > 0 ? "\n" : "");
        return res.toString();
    }

    private static String prettyDescription(String description, Syntax syntax) {
        if (description != null && "".equals(description.trim())) {
            return "";
        }
        if (syntax == Syntax.gherkin) {
            return description + "\n";
        }
        return description.trim() + "\n";
    }

    private static String prettyTags(List<Tag> tags, Syntax syntax, int level) {
        if (tags == null || tags.isEmpty()) {
            return "";
        }
        String prefix = syntax == Syntax.gherkin ? repeatString(level, "  ") : "";
        String tagQuote = syntax == Syntax.gherkin ? "" : "`";
        return prefix + String.join(" ", tags.stream().map(tag -> tagQuote + tag.getName() + tagQuote).collect(
                Collectors.toList())) + "\n";
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

    private static String prettyTableRows(
            List<TableRow> tableRows,
            Syntax syntax,
            int level, List<Comment> comments) {
        if (tableRows.isEmpty()) {
            return "";
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
        StringBuilder s = new StringBuilder();
        for (TableRow row : tableRows) {
            s.append(prettyTableRow(row, level, maxWidths, syntax, comments));
            if (n == 0 && syntax == Syntax.markdown) {
                List<TableCell> mappedCells = new ArrayList<>();
                for (int j = 0; j < row.getCells().size(); ++j) {
                    mappedCells.add(new TableCell(row.getCells().get(j).getLocation(),
                            repeatString(maxWidths[j], "-")));
                }
                TableRow separatorRow = new TableRow(row.getLocation(),
                        mappedCells,
                        row.getId() + "-separator");
                s.append(prettyTableRow(separatorRow, level, maxWidths, syntax, comments));
            }
            n++;
        }
        return s.toString();
    }

    private static List<Comment> popComments(Location curLoc, List<Comment> comments) {
        List<Comment> res = new ArrayList<>();
        Iterator<Comment> iter = comments.iterator();
        while (iter.hasNext()) {
            Comment comment = iter.next();
            if (curLoc.getLine() > comment.getLocation().getLine()) {
                res.add(comment);
                iter.remove();
            }
        }
        return res;
    }

    private static String prettyTableRow(
            TableRow row,
            int level,
            int[] maxWidths,
            Syntax syntax,
            List<Comment> comments) {

        int actualLevel = syntax == Syntax.markdown ? 1 : level;
        StringBuilder res = new StringBuilder();

        prettyComments(row.getLocation(), comments, actualLevel, res);

        res.append(repeatString(actualLevel, "  "))
                .append("| ");
        for (int j = 0; j < row.getCells().size(); ++j) {
            if (j > 0) {
                res.append(" | ");
            }
            TableCell tableCell = row.getCells().get(j);
            String escapedCellValue = escapeCell(tableCell.getValue());
            int spaceCount = maxWidths[j] - escapedCellValue.length();
            String spaces = repeatString(spaceCount, " ");
            res.append(isNumeric(escapedCellValue) ? spaces + escapedCellValue : escapedCellValue + spaces);
        }
        return res.append(" |\n")
                .toString();
    }

    private static void prettyComments(Location location, List<Comment> comments, int actualLevel, StringBuilder res) {
        for (Comment nextComment : popComments(location, comments)) {
            if (nextComment.getText() == null || nextComment.getText().trim().isEmpty()) {
                continue;
            }
            String comment = nextComment.getText().trim();
            if (!comment.isEmpty()) {
                res.append(repeatString(actualLevel, "  "))
                        .append("# " + comment.substring(1).trim())
                        .append("\n");
            }
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

    private static boolean isNumeric(String s) {
        try {
            Float.parseFloat(s);
            return true;
        } catch (NumberFormatException nfe) {
            return false;
        }
    }
}