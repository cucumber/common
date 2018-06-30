package gherkin;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
import java.util.regex.Matcher;

import static gherkin.StringUtils.ltrim;
import static gherkin.SymbolCounter.countSymbols;

public class GherkinLine implements IGherkinLine {
    private final String lineText;
    private final String trimmedLineText;

    public GherkinLine(String lineText) {
        this.lineText = lineText;
        this.trimmedLineText = ltrim(lineText);
    }

    @Override
    public Integer indent() {
        return countSymbols(lineText) - countSymbols(trimmedLineText);
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
    public boolean startsWithTitleKeyword(String text) {
        int textLength = text.length();
        if (trimmedLineText.length() > textLength && trimmedLineText.startsWith(text)) {
            String rest = trimmedLineText.substring(textLength);
            Matcher matcher = GherkinLanguageConstants.TITLE_KEYWORD_SEPARATOR.matcher(rest);
            if(matcher.find() && matcher.start() == 0){
                return  true;
            }
        }
        return false;
        // TODO aslak: extract startsWithFrom method for clarity
    }

    @Override
    public List<GherkinLineSpan> getTableCells() {
        List<GherkinLineSpan> lineSpans = new ArrayList<GherkinLineSpan>();
        StringBuilder cell = new StringBuilder();
        boolean beforeFirst = true;
        int startCol = 0;
        for (int col = 0; col < trimmedLineText.length(); col++) {
            char c = trimmedLineText.charAt(col);
            if (c == '|') {
                if (beforeFirst) {
                    // Skip the first empty span
                    beforeFirst = false;
                } else {
                    int contentStart = 0;
                    while (contentStart < cell.length() && Character.isWhitespace(cell.charAt(contentStart))) {
                        contentStart++;
                    }
                    if (contentStart == cell.length()) {
                        contentStart = 0;
                    }
                    lineSpans.add(new GherkinLineSpan(indent() + startCol + contentStart + 2, cell.toString().trim()));
                    startCol = col;
                }
                cell = new StringBuilder();
            } else if (c == '\\') {
                col++;
                c = trimmedLineText.charAt(col);
                if (c == 'n') {
                    cell.append('\n');
                } else {
                    if (c != '|' && c != '\\') {
                        cell.append('\\');
                    }
                    cell.append(c);
                }
            } else {
                cell.append(c);
            }
        }

        return lineSpans;
    }

    private List<GherkinLineSpan> getSpans(String delimiter) {
        List<GherkinLineSpan> lineSpans = new ArrayList<GherkinLineSpan>();
        Scanner scanner = new Scanner(trimmedLineText).useDelimiter(delimiter);
        while (scanner.hasNext()) {
            String cell = scanner.next();
            int column = scanner.match().start() + indent() + 1;
            lineSpans.add(new GherkinLineSpan(column, cell));
        }
        return lineSpans;
    }
}
