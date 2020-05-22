package io.cucumber.gherkin;

import static java.util.stream.Collectors.joining;

public class TokenFormatter {

    public String formatToken(Token token) {
        if (token.isEOF())
            return "EOF";

        return String.format("(%s:%s)%s:%s/%s/%s",
                toString(token.location.getLine()),
                toString(token.location.getColumn()),
                toString(token.matchedType),
                toString(token.matchedKeyword),
                toString(token.matchedText),
                toString(token.mathcedItems == null ? "" : token.mathcedItems.stream()
                        .map(o ->  o.column + ":" + o.text)
                        .collect(joining(",")))
        );
    }

    private String toString(Object o) {
        return o == null ? "" : o.toString();
    }
}
