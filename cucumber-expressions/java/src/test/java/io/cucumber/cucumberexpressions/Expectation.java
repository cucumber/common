package io.cucumber.cucumberexpressions;

import java.util.List;
import java.util.Map;

class Expectation {
    String expression;
    String element;
    String exception;

    Expectation(String expression, String element, String exception) {
        this.expression = expression;
        this.element = element;
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
                (String) map.get("element"),
                (String) map.get("exception"));
    }

    public void setExpression(String expression) {
        this.expression = expression;
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
