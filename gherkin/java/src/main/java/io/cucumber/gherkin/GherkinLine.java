package io.cucumber.gherkin;

import java.util.ArrayList;
import java.util.List;
import java.util.PrimitiveIterator;
import java.util.Scanner;

import static io.cucumber.gherkin.StringUtils.ltrim;
import static io.cucumber.gherkin.StringUtils.rtrim;
import static io.cucumber.gherkin.StringUtils.symbolCount;
import static io.cucumber.gherkin.StringUtils.trim;

public class GherkinLine implements IGherkinLine {
    // TODO: set this to 0 when/if we change to 0-indexed columns
    private static final int OFFSET = 1;
    private final String lineText;
    private final String trimmedLineText;
    private final int indent;

    public GherkinLine(String lineText) {
        this.lineText = lineText;
        this.trimmedLineText = trim(lineText);
        indent = symbolCount(lineText) - symbolCount(ltrim(lineText));
    }

    @Override
    public int indent() {
        return indent;
    }

    @Override
    public void detach() {

    }

    @Override
    public String getLineText(int indentToRemove) {
        if (indentToRemove < 0 || indentToRemove > indent())
            return trimmedLineText;
        return lineText.substring(indentToRemove);
    }

    @Override
    public boolean isEmpty() {
        return trimmedLineText.length() == 0;
    }

    @Override
    public boolean startsWith(String prefix) {
        return trimmedLineText.startsWith(prefix);
    }

    @Override
    public String getRestTrimmed(int length) {
        return trimmedLineText.substring(length).trim();
    }

    @Override
    public List<GherkinLineSpan> getTags() {
        return getSpans("\\s+");
    }

    @Override
    public List<GherkinLineSpan> getTableCells() {
        List<GherkinLineSpan> lineSpans = new ArrayList<>();
        StringBuilder cellBuilder = new StringBuilder();
        boolean beforeFirst = true;
        int col = 0;
        int cellStart = 0;
        boolean escape = false;
        PrimitiveIterator.OfInt iterator = lineText.codePoints().iterator();
        while (iterator.hasNext() ) {
            int c = iterator.next() ;
            if (escape) {
                switch (c) {
                    case 'n':
                        cellBuilder.append('\n');
                        break;
                    case '\\':
                        cellBuilder.append('\\');
                        break;
                    case '|':
                        cellBuilder.append('|');
                        break;
                    default:
                        // Invalid escape. We'll just ignore it.
                        cellBuilder.append("\\");
                        cellBuilder.appendCodePoint(c);
                        break;
                }
                escape = false;
            } else {
                if (c == '\\') {
                    escape = true;
                } else if (c == '|') {
                    if (beforeFirst) {
                        // Skip the first empty span
                        beforeFirst = false;
                    } else {
                        String cell = cellBuilder.toString();
                        String leftTrimmedCell = ltrim(cell);
                        int cellIndent = symbolCount(cell) - symbolCount(leftTrimmedCell);
                        lineSpans.add(new GherkinLineSpan(cellStart + cellIndent + OFFSET, rtrim(leftTrimmedCell)));
                    }
                    cellBuilder = new StringBuilder();
                    cellStart = col + 1;
                } else {
                    cellBuilder.appendCodePoint(c);
                }
            }
            col++;
        }
        return lineSpans;
    }

    @Override
    public boolean startsWithTitleKeyword(String text) {
        int textLength = text.length();
        return trimmedLineText.length() > textLength &&
                trimmedLineText.startsWith(text) &&
                trimmedLineText.substring(textLength, textLength + GherkinLanguageConstants.TITLE_KEYWORD_SEPARATOR.length())
                        .equals(GherkinLanguageConstants.TITLE_KEYWORD_SEPARATOR);
    }

    private List<GherkinLineSpan> getSpans(String delimiter) {
        List<GherkinLineSpan> lineSpans = new ArrayList<GherkinLineSpan>();
        Scanner scanner = new Scanner(trimmedLineText).useDelimiter(delimiter);
        while (scanner.hasNext()) {
            String cell = scanner.next();
            String leftTrimmedCell = ltrim(cell);
            int cellIndent = symbolCount(cell) - symbolCount(leftTrimmedCell);

            String trimmedCell = rtrim(leftTrimmedCell);
            int scannerStart = scanner.match().start();
            int symbolLength = trimmedLineText.codePointCount(0, scannerStart);
            int column = 1 + indent() + symbolLength + cellIndent;
            lineSpans.add(new GherkinLineSpan(column, trimmedCell));
        }
        return lineSpans;
    }
}
