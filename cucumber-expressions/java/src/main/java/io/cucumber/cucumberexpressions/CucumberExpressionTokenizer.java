package io.cucumber.cucumberexpressions;

import io.cucumber.cucumberexpressions.Ast.Token;
import io.cucumber.cucumberexpressions.Ast.Token.Type;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.PrimitiveIterator.OfInt;

import static io.cucumber.cucumberexpressions.CucumberExpressionException.createCantEscape;
import static io.cucumber.cucumberexpressions.CucumberExpressionException.createTheEndOfLineCanNotBeEscapedException;

final class CucumberExpressionTokenizer {

    List<Token> tokenize(String expression) {
        List<Token> tokens = new ArrayList<>();
        tokenizeImpl(expression).forEach(tokens::add);
        return tokens;
    }

    private Iterable<Token> tokenizeImpl(String expression) {
        return () -> new TokenIterator(expression);

    }

    private static class TokenIterator implements Iterator<Token> {

        private final String expression;
        private final OfInt codePoints;

        private StringBuilder buffer = new StringBuilder();
        private Type previousTokenType;
        private Type currentTokenType = Type.START_OF_LINE;
        private boolean treatAsText;
        private int index;
        private int escaped;

        TokenIterator(String expression) {
            this.expression = expression;
            this.codePoints = expression.codePoints().iterator();
        }

        @Override
        public boolean hasNext() {
            return previousTokenType != Type.END_OF_LINE;
        }

        @Override
        public Token next() {
            if (!hasNext()) {
                throw new NoSuchElementException();
            }
            if (currentTokenType == Type.START_OF_LINE) {
                Token token = convertBufferToToken(currentTokenType);
                advanceTokenTypes();
                return token;
            }

            while (codePoints.hasNext()) {
                int token = codePoints.nextInt();
                if (!treatAsText && Token.isEscapeCharacter(token)) {
                    escaped++;
                    treatAsText = true;
                    continue;
                }
                currentTokenType = tokenTypeOf(token, treatAsText);
                treatAsText = false;

                if (previousTokenType != Type.START_OF_LINE
                        && (currentTokenType != previousTokenType
                        || (currentTokenType != Type.WHITE_SPACE && currentTokenType != Type.TEXT))) {
                    Token t = convertBufferToToken(previousTokenType);
                    advanceTokenTypes();
                    buffer.appendCodePoint(token);
                    return t;
                } else {
                    advanceTokenTypes();
                    buffer.appendCodePoint(token);
                }
            }

            if (buffer.length() > 0) {
                Token token = convertBufferToToken(previousTokenType);
                advanceTokenTypes();
                return token;
            }

            currentTokenType = Type.END_OF_LINE;
            if (treatAsText) {
                throw createTheEndOfLineCanNotBeEscapedException(expression);
            }
            Token token = convertBufferToToken(currentTokenType);
            advanceTokenTypes();
            return token;
        }

        private void advanceTokenTypes() {
            previousTokenType = currentTokenType;
            currentTokenType = null;
        }

        private Token convertBufferToToken(Type currentTokenType) {
            int escapeTokens = 0;
            if (currentTokenType == Type.TEXT) {
                escapeTokens = escaped;
                escaped = 0;
            }
            int endIndex = index + buffer.codePointCount(0, buffer.length()) + escapeTokens;
            Token t = new Token(buffer.toString(), currentTokenType, index, endIndex);
            buffer = new StringBuilder();
            this.index = endIndex;
            return t;
        }

        private Type tokenTypeOf(Integer token, boolean treatAsText) {
            if (!treatAsText) {
                return Token.typeOf(token);
            }
            if (Token.canEscape(token)) {
                return Type.TEXT;
            }
            throw createCantEscape(expression, index + escaped);
        }

    }

}
