package io.cucumber.cucumberexpressions;

import io.cucumber.cucumberexpressions.AstNode.Token;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static io.cucumber.cucumberexpressions.AstNode.Token.Type.ALTERNATION;
import static io.cucumber.cucumberexpressions.AstNode.Token.Type.ALTERNATION_ESCAPED;
import static io.cucumber.cucumberexpressions.AstNode.Token.Type.BEGIN_OPTIONAL;
import static io.cucumber.cucumberexpressions.AstNode.Token.Type.BEGIN_OPTIONAL_ESCAPED;
import static io.cucumber.cucumberexpressions.AstNode.Token.Type.BEGIN_PARAMETER;
import static io.cucumber.cucumberexpressions.AstNode.Token.Type.BEGIN_PARAMETER_ESCAPED;
import static io.cucumber.cucumberexpressions.AstNode.Token.Type.END_OPTIONAL;
import static io.cucumber.cucumberexpressions.AstNode.Token.Type.END_OPTIONAL_ESCAPED;
import static io.cucumber.cucumberexpressions.AstNode.Token.Type.END_PARAMETER;
import static io.cucumber.cucumberexpressions.AstNode.Token.Type.END_PARAMETER_ESCAPED;
import static io.cucumber.cucumberexpressions.AstNode.Token.Type.ESCAPE;
import static io.cucumber.cucumberexpressions.AstNode.Token.Type.ESCAPE_ESCAPED;
import static io.cucumber.cucumberexpressions.AstNode.Token.Type.TEXT;
import static io.cucumber.cucumberexpressions.AstNode.Token.Type.WHITE_SPACE;
import static io.cucumber.cucumberexpressions.AstNode.Token.Type.WHITE_SPACE_ESCAPED;

final class CucumberExpressionTokenizer {

    private interface Tokenize {
        int tokenize(List<Token> tokens, String expression, int current);
    }

    private static final List<Tokenize> tokenizers = Arrays.asList(
            tokenizePattern(WHITE_SPACE_ESCAPED, Pattern.compile("\\\\\\s")),
            tokenizePattern(WHITE_SPACE, Pattern.compile("\\s+")),

            tokenizeString(BEGIN_OPTIONAL_ESCAPED, "\\("),
            tokenizeCharacter(BEGIN_OPTIONAL, '('),

            tokenizeString(END_OPTIONAL_ESCAPED, "\\)"),
            tokenizeCharacter(END_OPTIONAL, ')'),

            tokenizeString(BEGIN_PARAMETER_ESCAPED, "\\{"),
            tokenizeCharacter(BEGIN_PARAMETER, '{'),

            tokenizeString(END_PARAMETER_ESCAPED, "\\}"),
            tokenizeCharacter(END_PARAMETER, '}'),

            tokenizeString(ALTERNATION_ESCAPED, "\\/"),
            tokenizeCharacter(ALTERNATION, '/'),

            tokenizeString(ESCAPE_ESCAPED, "\\\\"),
            tokenizeString(ESCAPE, "\\"),

            // Should be `.` but this creates a nicer parse tree.
            tokenizePattern(TEXT, Pattern.compile("[^(){}\\\\/\\s]+"))
    );

    /*
     * token := '\' + whitespace | whitespace | '\(' | '(' | '\)' | ')' |
     *          '\{' | '{' | '\}' | '}' | '\/' | '/' | '\\' | '\' | .
     */
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


}
