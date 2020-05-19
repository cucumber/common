package io.cucumber.tagexpressions;

public class TagExpressionException extends RuntimeException {
    public TagExpressionException(final String message, final Object... args) {
		super(String.format(message, args));

    }
}
