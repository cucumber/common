package io.cucumber.tagexpressions;

public class TagExpressionException extends RuntimeException {
    public TagExpressionException(String message, Object... args) {
        super(String.format(message, args));
    }
}
