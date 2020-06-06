package io.cucumber.cucumberexpressions;

import io.cucumber.cucumberexpressions.Ast.Token;
import io.cucumber.cucumberexpressions.Ast.Token.Type;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.PrimitiveIterator.OfInt;

final class CucumberExpressionTokenizer {

    List<Token> tokenize(String expression){
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

            @Override
            public boolean hasNext() {
                return previousTokenType != Type.END_OF_LINE;
            }

            @Override
            public Token next() {
                if (!hasNext()) {
                    throw new NoSuchElementException();
                }

                if(currentTokenType == Type.START_OF_LINE){
                    currentTokenType = null;
                    return new Token("", Type.START_OF_LINE);
                }

                while (codePoints.hasNext()) {
                    int current = codePoints.nextInt();
                    if (!treatAsText && current == '\\') {
                        treatAsText = true;
                        continue;
                    }
                    currentTokenType = tokenTypeOf(current, treatAsText);
                    treatAsText = false;

                    if (previousTokenType != null
                            && (currentTokenType != previousTokenType
                            || (currentTokenType != Type.WHITE_SPACE && currentTokenType != Type.TEXT))) {
                        Token t = new Token(buffer.toString(), previousTokenType);
                        buffer = new StringBuilder();
                        buffer.appendCodePoint(current);
                        previousTokenType = currentTokenType;
                        return t;
                    }
                    buffer.appendCodePoint(current);
                    previousTokenType = currentTokenType;
                }

                if (buffer.length() > 0) {
                    Token t = new Token(buffer.toString(), previousTokenType);
                    buffer = new StringBuilder();
                    currentTokenType = Type.END_OF_LINE;
                    return t;
                }

                if (treatAsText) {
                    throw new CucumberExpressionException("End of line can not be escaped");
                }

                currentTokenType = null;
                previousTokenType = Type.END_OF_LINE;
                Token t = new Token(buffer.toString(), previousTokenType);
                buffer = new StringBuilder();
                return t;
            }
        };

    }

    private Type tokenTypeOf(Integer c, boolean treatAsText) {
        if (treatAsText) {
            return Type.TEXT;
        }

        if (Character.isWhitespace(c)) {
            return Type.WHITE_SPACE;
        }

        switch (c) {
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

}
