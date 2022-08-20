package io.cucumber.gherkin;

import io.cucumber.messages.types.StepKeywordType;

import java.util.List;

class Token {
    public final IGherkinLine line;
    public Parser.TokenType matchedType;
    public String matchedKeyword;
    public String matchedText;
    public List<GherkinLineSpan> matchedItems;
    public int matchedIndent;
    public GherkinDialect matchedGherkinDialect;
    public StepKeywordType keywordType;
    public Location location;

    public Token(IGherkinLine line, Location location) {
        this.line = line;
        this.location = location;
    }

    public boolean isEOF() {
        return line == null;
    }

    public void detach() {
        if (line != null)
            line.detach();
    }

    public String getTokenValue() {
        return isEOF() ? "EOF" : line.getLineText(-1);
    }

    @Override
    public String toString() {
        return String.format("%s: %s/%s", matchedType, matchedKeyword, matchedText);
    }
}
