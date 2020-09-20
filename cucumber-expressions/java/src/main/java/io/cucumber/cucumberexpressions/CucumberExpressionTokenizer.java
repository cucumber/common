package io.cucumber.cucumberexpressions;

import io.cucumber.cucumberexpressions.Ast.Token;
import io.cucumber.cucumberexpressions.Ast.Token.Type;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.PrimitiveIterator.OfInt;

import static io.cucumber.cucumberexpressions.CucumberExpressionException.createCantEscape;
import static io.cucumber.cucumberexpressions.CucumberExpressionException.createTheEndOfLineCanNotBeEscaped;

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
        private Type previousTokenType = null;
        private Type currentTokenType = Type.START_OF_LINE;
        private boolean treatAsText;
        private int bufferStartIndex;
        private int escaped;

        TokenIterator(String expression) {
            this.expression = expression;
            this.codePoints = expression.codePoints().iterator();
        }

        private Token convertBufferToToken(Type tokenType) {
            int escapeTokens = 0;
            if (tokenType == Type.TEXT) {
                escapeTokens = escaped;
                escaped = 0;
            }
            int consumedIndex = bufferStartIndex + buffer.codePointCount(0, buffer.length()) + escapeTokens;
            Token t = new Token(buffer.toString(), tokenType, bufferStartIndex, consumedIndex);
            buffer = new StringBuilder();
            this.bufferStartIndex = consumedIndex;
            return t;
        }

        private void advanceTokenTypes() {
            previousTokenType = currentTokenType;
            currentTokenType = null;
        }

        private Type tokenTypeOf(Integer token, boolean treatAsText) {
            if (!treatAsText) {
                return Token.typeOf(token);
            }
            if (Token.canEscape(token)) {
                return Type.TEXT;
            }
            throw createCantEscape(expression, bufferStartIndex + buffer.codePointCount(0, buffer.length()) + escaped);
        }

        private boolean shouldContinueTokenType(Type previousTokenType,
                Type currentTokenType) {
            return currentTokenType == previousTokenType
                    && (currentTokenType == Type.WHITE_SPACE || currentTokenType == Type.TEXT);
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
                int codePoint = codePoints.nextInt();
                if (!treatAsText && Token.isEscapeCharacter(codePoint)) {
                    escaped++;
                    treatAsText = true;
                    continue;
                }
                currentTokenType = tokenTypeOf(codePoint, treatAsText);
                treatAsText = false;

                if (previousTokenType == Type.START_OF_LINE ||
                        shouldContinueTokenType(previousTokenType, currentTokenType)) {
                    advanceTokenTypes();
                    buffer.appendCodePoint(codePoint);
                } else {
                    Token t = convertBufferToToken(previousTokenType);
                    advanceTokenTypes();
                    buffer.appendCodePoint(codePoint);
                    return t;
                }
            }

            if (buffer.length() > 0) {
                Token token = convertBufferToToken(previousTokenType);
                advanceTokenTypes();
                return token;
            }

            currentTokenType = Type.END_OF_LINE;
            if (treatAsText) {
                throw createTheEndOfLineCanNotBeEscaped(expression);
            }
            Token token = convertBufferToToken(currentTokenType);
            advanceTokenTypes();
            return token;
        }

    }

}
