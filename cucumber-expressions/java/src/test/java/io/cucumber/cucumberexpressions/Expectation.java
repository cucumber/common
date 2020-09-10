package io.cucumber.cucumberexpressions;

import java.util.List;
import java.util.Map;

class Expectation {
    String expression;
    String element;
    List<String> elements;
    String exception;

    private Expectation(String expression, String element, List<String> elements, String exception) {
        this.expression = expression;
        this.element = element;
        this.elements = elements;
        this.exception = exception;
    }

    Expectation(String expression, List<String> elements, String exception) {
        this(expression, null, elements, exception);
    }

    Expectation(String expression, String element, String exception) {
        this(expression, element, null, exception);
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
                (String) map.get("element"),
                (List<String>) map.get("elements"),
                (String) map.get("exception"));
    }

    public void setExpression(String expression) {
        this.expression = expression;
    }

    public void setElements(List<String> elements) {
        this.elements = elements;
    }

    public void setException(String exception) {
        this.exception = exception;
    }

    public String getElement() {
        return element;
    }

    public void setElement(String element) {
        this.element = element;
    }

}
