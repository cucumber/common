package io.cucumber.cucumberexpressions;

import java.util.List;
import java.util.Map;

class Expectation {
    String expression;
    List<String> tokens;
    String exception;

    Expectation(String expression, List<String> tokens, String exception) {
        this.expression = expression;
        this.tokens = tokens;
        this.exception = exception;
    }

    public String getExpression() {
        return expression;
    }

    public List<String> getTokens() {
        return tokens;
    }

    public String getException() {
        return exception;
    }

    public static Expectation fromMap(Map<?, ?> map) {
        return new Expectation(
                (String) map.get("expression"),
                (List<String>) map.get("tokens"),
                (String) map.get("exception"));
    }

}
