package io.cucumber.cucumberexpressions;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

class CucumberExpressionTokenizer {

    private interface Tokenize {
        int tokenize(List<Token> tokens, String expression, int current);
    }

    private static final List<Tokenize> tokenizers = Arrays.asList(
            tokenizePattern(Token.Type.ESCAPED_WHITE_SPACE, Pattern.compile("\\\\\\s")),
            tokenizePattern(Token.Type.WHITE_SPACE, Pattern.compile("\\s+")),

            tokenizeString(Token.Type.ESCAPED_BEGIN_OPTIONAL, "\\("),
            tokenizeCharacter(Token.Type.BEGIN_OPTIONAL, '('),

            tokenizeString(Token.Type.ESCAPED_END_OPTIONAL, "\\)"),
            tokenizeCharacter(Token.Type.END_OPTIONAL, ')'),

            tokenizeString(Token.Type.ESCAPED_BEGIN_PARAMETER, "\\{"),
            tokenizeCharacter(Token.Type.BEGIN_PARAMETER, '{'),

            tokenizeString(Token.Type.ESCAPED_END_PARAMETER, "\\}"),
            tokenizeCharacter(Token.Type.END_PARAMETER, '}'),

            tokenizeString(Token.Type.ESCAPED_ALTERNATION, "\\/"),
            tokenizeCharacter(Token.Type.ALTERNATION, '/'),

            tokenizeString(Token.Type.ESCAPED_ESCAPE, "\\\\"),
            tokenizeString(Token.Type.ESCAPE, "\\"),

            tokenizePattern(Token.Type.TEXT, Pattern.compile("[^(){}\\\\/\\s]+"))
    );

    List<Token> tokenize(String expression) {
        List<Token> tokens = new ArrayList<>();
        int length = expression.length();
        int current = 0;
        while (current < length) {
            boolean tokenized = false;
            for (Tokenize tokenizer : tokenizers) {
                int consumedChars = tokenizer.tokenize(tokens, expression, current);
                if (consumedChars != 0) {
                    current += consumedChars;
                    tokenized = true;
                    break;
                }
            }
            if (!tokenized) {
                // Can't happen if configured properly
                // Leave in to avoid looping if not configured properly
                throw new IllegalStateException("Could not tokenize " + expression);
            }
        }
        return tokens;
    }

    private static Tokenize tokenizeCharacter(Token.Type type, char character) {
        return (tokens, expression, current) -> {
            char c = expression.charAt(current);
            if (character != c) {
                return 0;
            }
            Token e = new Token("" + character, type);
            tokens.add(e);
            return 1;
        };
    }

    private static Tokenize tokenizeString(Token.Type type, String string) {
        return (tokens, expression, current) -> {
            boolean c = expression.regionMatches(current, string, 0, string.length());
            if (!c) {
                return 0;
            }
            tokens.add(new Token(string, type));
            return string.length();
        };
    }

    private static Tokenize tokenizePattern(Token.Type type, Pattern pattern) {
        return (tokens, expression, current) -> {
            String tail = expression.substring(current);
            Matcher matcher = pattern.matcher(tail);
            if (!matcher.lookingAt()) {
                return 0;
            }
            String match = tail.substring(0, matcher.end());
            tokens.add(new Token(match, type));
            return match.length();
        };
    }


    static class Token {
        final String text;
        final Type type;

        Token(String text, Type type) {
            this.text = text;
            this.type = type;
        }


        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            Token token = (Token) o;
            return text.equals(token.text) &&
                    type == token.type;
        }

        @Override
        public int hashCode() {
            return Objects.hash(text, type);
        }

        @Override
        public String toString() {
            return "Token{" +
                    "text='" + text + '\'' +
                    ", type=" + type +
                    '}';
        }

        enum Type {

            ESCAPED_WHITE_SPACE,
            WHITE_SPACE,

            ESCAPED_BEGIN_OPTIONAL,
            BEGIN_OPTIONAL,

            ESCAPED_END_OPTIONAL,
            END_OPTIONAL,

            ESCAPED_BEGIN_PARAMETER,
            BEGIN_PARAMETER,

            ESCAPED_END_PARAMETER,
            END_PARAMETER,

            ESCAPED_ALTERNATION,
            ALTERNATION,

            ESCAPED_ESCAPE,
            ESCAPE,

            TEXT;
        }
    }
}
