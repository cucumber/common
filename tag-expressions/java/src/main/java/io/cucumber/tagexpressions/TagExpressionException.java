package io.cucumber.tagexpressions;

public final class TagExpressionException extends RuntimeException {
    TagExpressionException(String message, Object... args) {
		super(String.format(message, args));
    }
}
