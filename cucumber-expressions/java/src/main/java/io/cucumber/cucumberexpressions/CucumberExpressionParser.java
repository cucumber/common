package io.cucumber.cucumberexpressions;

import io.cucumber.cucumberexpressions.CucumberExpressionTokenizer.Token;

import java.util.ArrayList;
import java.util.EnumMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import static io.cucumber.cucumberexpressions.CucumberExpressionTokenizer.Token.Type.ALTERNATION;
import static io.cucumber.cucumberexpressions.CucumberExpressionTokenizer.Token.Type.BEGIN_OPTIONAL;
import static io.cucumber.cucumberexpressions.CucumberExpressionTokenizer.Token.Type.BEGIN_PARAMETER;
import static io.cucumber.cucumberexpressions.CucumberExpressionTokenizer.Token.Type.END_OPTIONAL;
import static io.cucumber.cucumberexpressions.CucumberExpressionTokenizer.Token.Type.END_PARAMETER;
import static io.cucumber.cucumberexpressions.CucumberExpressionTokenizer.Token.Type.ESCAPE;
import static io.cucumber.cucumberexpressions.CucumberExpressionTokenizer.Token.Type.ESCAPED_ALTERNATION;
import static io.cucumber.cucumberexpressions.CucumberExpressionTokenizer.Token.Type.ESCAPED_BEGIN_OPTIONAL;
import static io.cucumber.cucumberexpressions.CucumberExpressionTokenizer.Token.Type.ESCAPED_BEGIN_PARAMETER;
import static io.cucumber.cucumberexpressions.CucumberExpressionTokenizer.Token.Type.ESCAPED_END_OPTIONAL;
import static io.cucumber.cucumberexpressions.CucumberExpressionTokenizer.Token.Type.ESCAPED_END_PARAMETER;
import static io.cucumber.cucumberexpressions.CucumberExpressionTokenizer.Token.Type.ESCAPED_ESCAPE;
import static io.cucumber.cucumberexpressions.CucumberExpressionTokenizer.Token.Type.ESCAPED_WHITE_SPACE;
import static io.cucumber.cucumberexpressions.CucumberExpressionTokenizer.Token.Type.WHITE_SPACE;
import static java.util.Arrays.asList;
import static java.util.stream.Collectors.joining;
import static java.util.stream.Collectors.toList;

final class CucumberExpressionParser {

    private static final Token BEGIN_PARAMETER_TOKEN = new Token("{", BEGIN_PARAMETER);
    private static final Token END_PARAMETER_TOKEN = new Token("}", END_PARAMETER);
    private static final Token BEGIN_OPTIONAL_TOKEN = new Token("(", BEGIN_OPTIONAL);
    private static final Token END_OPTIONAL_TOKEN = new Token(")", END_OPTIONAL);
    private static final Token ESCAPE_TOKEN = new Token("\\", ESCAPE);
    private static final Token ALTERNATION_TOKEN = new Token("/", ALTERNATION);
    // Rewrite the token text but retain the type. This allows Cucumber Expressions
    // to validate there are no parameters in alternation but renders escapes correctly.
    private static final Token ESCAPED_BEGIN_PARAMETER_TOKEN_AS_BEGIN_PARAMETER_TOKEN = new Token("{", ESCAPED_BEGIN_PARAMETER);
    private static final Token ESCAPED_END_PARAMETER_TOKEN_AS_END_PARAMETER_TOKEN = new Token("}", ESCAPED_END_PARAMETER);

    private static final Function<Token, Token> escapeOptional;
    private static final Function<Token, Token> escapeAlternation;
    private static final Function<Token, Token> escapeParameter;
    private static final Function<Token, Token> escapeText;


    static {
        Map<Token.Type, Function<Token, Token>> escapesInOptional = new EnumMap<>(Token.Type.class);
        escapesInOptional.put(ESCAPED_ESCAPE, token -> ESCAPE_TOKEN);
        escapesInOptional.put(ESCAPED_END_OPTIONAL, token -> END_OPTIONAL_TOKEN);
        escapesInOptional.put(ESCAPED_BEGIN_PARAMETER, token -> ESCAPED_BEGIN_PARAMETER_TOKEN_AS_BEGIN_PARAMETER_TOKEN);
        escapeOptional = rewrite(escapesInOptional);

        Map<Token.Type, Function<Token, Token>> escapesInAlternation = new EnumMap<>(Token.Type.class);
        escapesInAlternation.put(ESCAPED_ESCAPE, token -> ESCAPE_TOKEN);
        escapesInAlternation.put(ESCAPED_BEGIN_OPTIONAL, token -> BEGIN_OPTIONAL_TOKEN);
        escapesInAlternation.put(ESCAPED_END_OPTIONAL, token -> END_OPTIONAL_TOKEN);
        escapesInAlternation.put(ESCAPED_WHITE_SPACE, token -> new Token(token.text.substring(1), WHITE_SPACE));
        escapesInAlternation.put(ESCAPED_ALTERNATION, token -> ALTERNATION_TOKEN);
        escapesInAlternation.put(ESCAPED_BEGIN_PARAMETER, token -> ESCAPED_BEGIN_PARAMETER_TOKEN_AS_BEGIN_PARAMETER_TOKEN);
        escapeAlternation = rewrite(escapesInAlternation);

        Map<Token.Type, Function<Token, Token>> escapesInParameter = new EnumMap<>(Token.Type.class);
        escapesInParameter.put(ESCAPED_ESCAPE, token -> ESCAPE_TOKEN);
        escapesInAlternation.put(ESCAPED_ALTERNATION, token -> ALTERNATION_TOKEN);
        escapesInParameter.put(ESCAPED_END_PARAMETER, token -> END_PARAMETER_TOKEN);
        escapeParameter = rewrite(escapesInParameter);

        Map<Token.Type, Function<Token, Token>> escapesInText = new EnumMap<>(Token.Type.class);
        escapesInText.put(ESCAPED_ESCAPE, token -> ESCAPE_TOKEN);
        escapesInText.put(ESCAPED_BEGIN_OPTIONAL, token -> BEGIN_OPTIONAL_TOKEN);
        escapesInText.put(ESCAPED_ALTERNATION, token -> ALTERNATION_TOKEN);
        escapesInText.put(ESCAPED_BEGIN_PARAMETER, token -> BEGIN_PARAMETER_TOKEN);
        escapeText = rewrite(escapesInText);
    }

    private interface Parse {
        int parse(List<Node> ast, List<Token> expression, int current);
    }

    private static final List<Parse> parsers = asList(
            parseBetween(BEGIN_OPTIONAL, END_OPTIONAL, Optional::new, escapeOptional),
            parseAlternation(),
            parseBetween(BEGIN_PARAMETER, END_PARAMETER, Parameter::new, escapeParameter),
            parseText()
    );

    private final CucumberExpressionTokenizer tokenizer = new CucumberExpressionTokenizer();

    List<Node> parse(String expression) {
        List<Token> tokens = tokenizer.tokenize(expression);
        List<Node> ast = new ArrayList<>();
        int length = tokens.size();
        int current = 0;
        while (current < length) {
            boolean parsed = false;
            for (Parse parser : parsers) {
                int consumedChars = parser.parse(ast, tokens, current);
                if (consumedChars != 0) {
                    current += consumedChars;
                    parsed = true;
                    break;
                }
            }
            if (!parsed) {
                // Can't happen if configured properly
                // Leave in to avoid looping if not configured properly
                throw new IllegalStateException("Could not parse " + tokens);
            }
        }
        return ast;
    }

    private static Parse parseText() {
        return (ast, expression, current) -> {
            Token currentToken = expression.get(current);
            Token unescaped = escapeText.apply(currentToken);
            ast.add(new Text(unescaped));
            return 1;
        };
    }

    private static Parse parseAlternation() {
        return (ast, expression, current) -> {
            int pivot = findFirst(expression, current, ALTERNATION);
            if (pivot < 0) {
                return 0;
            }

            int leftHandBoundary = findFirst(expression, current, WHITE_SPACE);
            if (leftHandBoundary >= 0 && leftHandBoundary < pivot) {
                return 0;
            }

            List<Token> leftHandSide = expression.subList(current, pivot);
            int leftHandOptional = lookAHeadForOptional(leftHandSide);
            if (leftHandOptional >= 0) {
                return 0;
            }

            int rightHandBoundary = findFirst(expression, pivot, WHITE_SPACE);
            if (rightHandBoundary < 0) {
                rightHandBoundary = expression.size();
            }

            List<Token> rightHandSide = expression.subList(pivot, rightHandBoundary);
            int rightHandOptional = lookAHeadForOptional(rightHandSide);
            if(rightHandOptional > 0){
                rightHandBoundary = pivot + rightHandOptional;
            }

            List<Token> tokens = expression.subList(current, rightHandBoundary);
            List<List<Token>> alternatives = split(tokens, ALTERNATION);
            List<List<Token>> unescapedAlternative = alternatives.stream()
                    .map(alternative -> alternative.stream()
                            .map(escapeAlternation)
                            .collect(toList())
                    ).collect(toList());
            ast.add(new Alternation(unescapedAlternative));
            // Does not consume right hand boundary token
            return rightHandBoundary - current;
        };
    }

    private static int lookAHeadForOptional(List<Token> expression) {
        int beginOptional = findFirst(expression, 0, BEGIN_OPTIONAL);
        if (beginOptional < 0) {
            return -1;
        }

        int endOptional = findFirst(expression, beginOptional, END_OPTIONAL);
        if (endOptional < 0) {
            return -1;
        }
        return beginOptional;
    }

    private static Parse parseBetween(Token.Type startToken,
                                      Token.Type endToken,
                                      Function<List<Token>, Node> createNode,
                                      Function<Token, Token> rewriteEscapes
    ) {
        return (ast, expression, current) -> {
            Token currentToken = expression.get(current);
            if (currentToken.type != startToken) {
                return 0;
            }

            int endIndex = findFirst(expression, current + 1, endToken);
            if (endIndex <= 0) {
                return 0;
            }
            List<Token> tokens = expression.subList(current + 1, endIndex);
            List<Token> unescaped = tokens.stream().map(rewriteEscapes).collect(toList());
            ast.add(createNode.apply(unescaped));
            // Consumes end token
            return endIndex + 1 - current;

        };
    }

    private static Function<Token, Token> rewrite(Map<Token.Type, Function<Token, Token>> rewriteRules) {
        return token -> rewriteRules.computeIfAbsent(token.type, type -> Function.identity()).apply(token);
    }

    private static int findFirst(List<Token> expression, int fromIndex, Token.Type... end) {
        for (int i = fromIndex; i < expression.size(); i++) {
            Token candidate = expression.get(i);
            for (Token.Type type : end) {
                if (candidate.type == type) {
                    return i;
                }
            }
        }
        return -1;
    }

    private static List<List<Token>> split(List<Token> tokens, Token.Type type) {
        List<List<Token>> alternatives = new ArrayList<>();
        List<Token> alternative = new ArrayList<>();
        alternatives.add(alternative);
        for (Token token : tokens) {
            if (token.type == type) {
                alternative = new ArrayList<>();
                alternatives.add(alternative);
            } else {
                alternative.add(token);
            }
        }
        return alternatives;
    }


    static abstract class Node {

    }

    static final class Text extends Node {

        private final Token token;

        Text(Token token) {
            this.token = token;
        }

        @Override
        public String toString() {
            return getText();
        }

        String getText() {
            return token.text;
        }
    }

    static final class Optional extends Node {

        final List<Token> tokens;

        Optional(List<Token> tokens) {
            this.tokens = tokens;
        }

        @Override
        public String toString() {
            return getOptionalText();
        }

        String getOptionalText() {
            return tokens.stream().map(token -> token.text).collect(joining());
        }
    }

    static final class Parameter extends Node {

        private final List<Token> tokens;

        Parameter(List<Token> tokens) {
            this.tokens = tokens;
        }

        @Override
        public String toString() {
            return getParameterName();
        }

        String getParameterName() {
            return tokens.stream().map(token -> token.text).collect(joining());
        }
    }

    static final class Alternation extends Node {

        final List<List<Token>> alternatives;

        Alternation(List<List<Token>> alternatives) {
            this.alternatives = alternatives;
        }

        List<String> getAlternatives() {
            return alternatives.stream()
                    .map(alternatives -> alternatives
                            .stream()
                            .map(token -> token.text)
                            .collect(joining()))
                    .collect(Collectors.toList());
        }

        @Override
        public String toString() {
            return String.join(" - ", getAlternatives());
        }

    }

}
