package io.cucumber.cucumberexpressions;

import java.util.Map;

class Expectation {
    String expression;
    String text;
    String expected;
    String exception;

    Expectation(String expression, String text, String expected, String exception) {
        this.expression = expression;
        this.text = text;
        this.expected = expected;
        this.exception = exception;
    }

    public String getExpression() {
        return expression;
    }


    public String getException() {
        return exception;
    }

    public static Expectation fromMap(Map<?, ?> map) {
        return new Expectation(
                (String) map.get("expression"),
                (String) map.get("text"),
                (String) map.get("expected"),
                (String) map.get("exception"));
    }

    public void setExpression(String expression) {
        this.expression = expression;
    }

    public void setException(String exception) {
        this.exception = exception;
    }

    public String getExpected() {
        return expected;
    }

    public void setExpected(String expected) {
        this.expected = expected;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

}
