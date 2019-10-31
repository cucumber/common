package io.cucumber.cucumberexpressions;

import io.cucumber.cucumberexpressions.CucumberExpressionTokenizer.Token;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

import static io.cucumber.cucumberexpressions.CucumberExpressionTokenizer.Token.Type.ALTERNATION;
import static io.cucumber.cucumberexpressions.CucumberExpressionTokenizer.Token.Type.BEGIN_OPTIONAL;
import static io.cucumber.cucumberexpressions.CucumberExpressionTokenizer.Token.Type.BEGIN_PARAMETER;
import static io.cucumber.cucumberexpressions.CucumberExpressionTokenizer.Token.Type.END_OPTIONAL;
import static io.cucumber.cucumberexpressions.CucumberExpressionTokenizer.Token.Type.END_PARAMETER;
import static io.cucumber.cucumberexpressions.CucumberExpressionTokenizer.Token.Type.WHITE_SPACE;
import static java.util.Arrays.asList;
import static java.util.Collections.singletonList;
import static java.util.stream.Collectors.joining;

final class CucumberExpressionParser {

    private final CucumberExpressionTokenizer tokenizer = new CucumberExpressionTokenizer();

    private static final List<Parse> parsers = asList(
            parseBetween(Optional::new, BEGIN_OPTIONAL, END_OPTIONAL),
            parseAlternation(),
            parseBetween(Parameter::new, BEGIN_PARAMETER, END_PARAMETER),
            parseText()
    );

    private static Parse parseText() {
        return (ast, expression, current) -> {
            ast.add(new Text(singletonList(expression.get(current))));
            return 1;
        };
    }

    private static Parse parseAlternation() {
        return (ast, expression, current) -> {
            Token token = expression.get(current);
            if (token.type == WHITE_SPACE) {
                return 0;
            }

            int pivot = findFirst(expression, current, ALTERNATION);
            if (pivot < 0) {
                return 0;
            }

            int rightHandBoundary = findFirst(expression, current, WHITE_SPACE, END_OPTIONAL);
            if (rightHandBoundary >= 0 && rightHandBoundary < pivot) {
                return 0;
            }

            int leftHandBoundary = findFirst(expression, pivot, WHITE_SPACE, BEGIN_OPTIONAL);
            if (leftHandBoundary < 0) {
                leftHandBoundary = expression.size();
            }

            ast.add(new Alternation(expression.subList(current, leftHandBoundary)));
            return leftHandBoundary - current;
        };
    }

    private static Parse parseBetween(Function<List<Token>, Node> createNode, Token.Type startToken, Token.Type endToken) {
        return (ast, expression, current) -> {
            Token token = expression.get(current);
            if (token.type != startToken) {
                return 0;
            }

            int endIndex = findFirst(expression, current + 1, endToken);
            if (endIndex > 0) {
                ast.add(createNode.apply(expression.subList(current + 1, endIndex)));
                return endIndex - current + 1;
            }

            return 0;
        };
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


    private interface Parse {

        int parse(List<Node> ast, List<Token> expression, int current);

    }

    static abstract class Node {
        final List<Token> tokens;

        Node(List<Token> tokens) {
            this.tokens = tokens;
        }

    }


    static final class Text extends Node {

        Text(List<Token> tokens) {
            super(tokens);
        }

        @Override
        public String toString() {
            return getText();
        }

        String getText() {
            return tokens.stream().map(token -> {
                switch (token.type) {
                    case ESCAPED_ALTERNATION:
                        return "/";
                    case ESCAPED_BEGIN_OPTIONAL:
                        return "(";
                    case ESCAPED_BEGIN_PARAMETER:
                        return "{";
                    case ESCAPED_ESCAPE:
                        return "\\";
                    default:
                        return token.text;
                }
            }).collect(joining());
        }
    }

    static final class Optional extends Node {

        Optional(List<Token> tokens) {
            super(tokens);
        }

        @Override
        public String toString() {
            return getOptionalText();
        }

        String getOptionalText() {
            return tokens.stream()
                    .map(token -> {
                        switch (token.type) {
                            case ESCAPED_BEGIN_OPTIONAL:
                                return "(";
                            case ESCAPED_END_OPTIONAL:
                                return ")";
                            default:
                                return token.text;
                        }
                    })
                    .collect(joining());
        }
    }

    static final class Parameter extends Node {

        Parameter(List<Token> tokens) {
            super(tokens);
        }

        @Override
        public String toString() {
            return getParameterName();
        }

        String getParameterName() {
            return tokens.stream()
                    .map(token -> {
                        switch (token.type) {
                            case ESCAPED_BEGIN_PARAMETER:
                                return "{";
                            case ESCAPED_END_PARAMETER:
                                return "}";
                            default:
                                return token.text;
                        }

                    })
                    .collect(joining());
        }
    }

    static final class Alternation extends Node {

        final List<List<Token>> alternatives;

        Alternation(List<Token> tokens) {
            super(tokens);
            if (tokens.isEmpty()) {
                throw new IllegalArgumentException("" + tokens.size());
            }
            this.alternatives = new ArrayList<>();
            List<Token> alternative = new ArrayList<>();
            alternatives.add(alternative);

            for (Token token : tokens) {
                if (token.type == ALTERNATION) {
                    alternative = new ArrayList<>();
                    alternatives.add(alternative);
                } else {
                    alternative.add(token);
                }
            }
        }

        List<String> getAlternatives() {
            return alternatives.stream()
                    .map(alternatives -> alternatives
                            .stream()
                            .map(token -> {
                                switch (token.type) {
                                    case ESCAPED_WHITE_SPACE:
                                        return " ";
                                    case ESCAPED_ALTERNATION:
                                        return "/";
                                    case ESCAPED_ESCAPE:
                                        return "\\";
                                    case ESCAPED_BEGIN_OPTIONAL:
                                        return "(";
                                    case ESCAPED_END_OPTIONAL:
                                        return ")";
                                    case ESCAPED_BEGIN_PARAMETER:
                                        return "{";
                                    case ESCAPED_END_PARAMETER:
                                        return "}";
                                    default:
                                        return token.text;
                                }
                            }).collect(joining()))
                    .collect(Collectors.toList());
        }

        @Override
        public String toString() {
            return String.join(" - ", getAlternatives());
        }

    }

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
                // Should not happen
                throw new IllegalStateException("Could not parse " + tokens);
            }
        }
        return ast;
    }
}
