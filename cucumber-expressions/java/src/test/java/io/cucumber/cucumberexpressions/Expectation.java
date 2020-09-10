package io.cucumber.cucumberexpressions;

import java.util.List;
import java.util.Map;

class Expectation {
    String expression;
    List<String> elements;
    String exception;

    Expectation(String expression, List<String> elements, String exception) {
        this.expression = expression;
        this.elements = elements;
        this.exception = exception;
    }

    public String getExpression() {
        return expression;
    }

    public List<String> getElements() {
        return elements;
    }

    public String getException() {
        return exception;
    }

    public static Expectation fromMap(Map<?, ?> map) {
        return new Expectation(
                (String) map.get("expression"),
                (List<String>) map.get("elements"),
                (String) map.get("exception"));
    }

}
