package gherkin;

public class TokenFormatter {
    private static final StringUtils.ToString<GherkinLineSpan> SPAN_TO_STRING = new StringUtils.ToString<GherkinLineSpan>() {
        @Override
        public String toString(GherkinLineSpan o) {
            return o.column + ":" + o.text;
        }
    };

    public String formatToken(Token token) {
        if (token.isEOF())
            return "EOF";

        return String.format("(%s:%s)%s:%s/%s/%s",
                toString(token.location.getLine()),
                toString(token.location.getColumn()),
                toString(token.matchedType),
                toString(token.matchedKeyword),
                toString(token.matchedText),
                toString(token.mathcedItems == null ? "" : StringUtils.join(SPAN_TO_STRING, ",", token.mathcedItems))
        );
    }

    private String toString(Object o) {
        return o == null ? "" : o.toString();
    }
}
