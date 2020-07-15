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
        return () -> new Iterator<Token>() {
            final OfInt codePoints = expression.codePoints().iterator();
            StringBuilder buffer = new StringBuilder();
            Type previousTokenType = null;
            Type currentTokenType = Type.START_OF_LINE;
            boolean treatAsText = false;
            int index = 0;
            int escaped = 0;

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
                    if (!treatAsText && token == '\\') {
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
                if (treatAsText) {
                    switch (token) {
                        case (int) '\\':
                        case (int) '/':
                        case (int) '{':
                        case (int) '}':
                        case (int) '(':
                        case (int) ')':
                            return Type.TEXT;
                    }
                    if (Character.isWhitespace(token)) {
                        return Type.TEXT;
                    }
                    throw createCantEscape(expression, index + escaped);
                }

                if (Character.isWhitespace(token)) {
                    return Type.WHITE_SPACE;
                }

                switch (token) {
                    case (int) '/':
                        return Type.ALTERNATION;
                    case (int) '{':
                        return Type.BEGIN_PARAMETER;
                    case (int) '}':
                        return Type.END_PARAMETER;
                    case (int) '(':
                        return Type.BEGIN_OPTIONAL;
                    case (int) ')':
                        return Type.END_OPTIONAL;
                }
                return Type.TEXT;
            }
        };

    }

}
