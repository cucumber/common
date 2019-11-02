package io.cucumber.cucumberexpressions;

import io.cucumber.cucumberexpressions.CucumberExpressionTokenizer.Token;

import java.util.ArrayList;
import java.util.EnumMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.function.Function;

import static io.cucumber.cucumberexpressions.CucumberExpressionTokenizer.Token.Type.ALTERNATION;
import static io.cucumber.cucumberexpressions.CucumberExpressionTokenizer.Token.Type.ALTERNATION_ESCAPED;
import static io.cucumber.cucumberexpressions.CucumberExpressionTokenizer.Token.Type.BEGIN_OPTIONAL;
import static io.cucumber.cucumberexpressions.CucumberExpressionTokenizer.Token.Type.BEGIN_OPTIONAL_ESCAPED;
import static io.cucumber.cucumberexpressions.CucumberExpressionTokenizer.Token.Type.BEGIN_PARAMETER;
import static io.cucumber.cucumberexpressions.CucumberExpressionTokenizer.Token.Type.BEGIN_PARAMETER_ESCAPED;
import static io.cucumber.cucumberexpressions.CucumberExpressionTokenizer.Token.Type.END_OF_LINE;
import static io.cucumber.cucumberexpressions.CucumberExpressionTokenizer.Token.Type.END_OPTIONAL;
import static io.cucumber.cucumberexpressions.CucumberExpressionTokenizer.Token.Type.END_OPTIONAL_ESCAPED;
import static io.cucumber.cucumberexpressions.CucumberExpressionTokenizer.Token.Type.END_PARAMETER;
import static io.cucumber.cucumberexpressions.CucumberExpressionTokenizer.Token.Type.END_PARAMETER_ESCAPED;
import static io.cucumber.cucumberexpressions.CucumberExpressionTokenizer.Token.Type.ESCAPE;
import static io.cucumber.cucumberexpressions.CucumberExpressionTokenizer.Token.Type.ESCAPE_ESCAPED;
import static io.cucumber.cucumberexpressions.CucumberExpressionTokenizer.Token.Type.START_OF_LINE;
import static io.cucumber.cucumberexpressions.CucumberExpressionTokenizer.Token.Type.WHITE_SPACE;
import static io.cucumber.cucumberexpressions.CucumberExpressionTokenizer.Token.Type.WHITE_SPACE_ESCAPED;
import static java.util.Arrays.asList;
import static java.util.Collections.singletonList;
import static java.util.function.Function.identity;
import static java.util.stream.Collectors.joining;

final class CucumberExpressionParser {

    private static final Token TOKEN_BEGIN_PARAMETER = new Token("{", BEGIN_PARAMETER);
    private static final Token TOKEN_END_PARAMETER = new Token("}", END_PARAMETER);
    private static final Token TOKEN_BEGIN_OPTIONAL = new Token("(", BEGIN_OPTIONAL);
    private static final Token TOKEN_END_OPTIONAL = new Token(")", END_OPTIONAL);
    private static final Token TOKEN_ESCAPE = new Token("\\", ESCAPE);
    private static final Token TOKEN_ALTERNATION = new Token("/", ALTERNATION);

    private static final Function<Token, Token> escapeText;

    static {
        Map<Token.Type, Function<Token, Token>> escapesInText = new EnumMap<>(Token.Type.class);
        escapesInText.put(ESCAPE_ESCAPED, token -> TOKEN_ESCAPE);
        escapesInText.put(WHITE_SPACE_ESCAPED, token -> new Token(token.text.substring(1), WHITE_SPACE));
        escapesInText.put(BEGIN_OPTIONAL_ESCAPED, token -> TOKEN_BEGIN_OPTIONAL);
        escapesInText.put(END_OPTIONAL_ESCAPED, token -> TOKEN_END_OPTIONAL);
        escapesInText.put(ALTERNATION_ESCAPED, token -> TOKEN_ALTERNATION);
        escapesInText.put(BEGIN_PARAMETER_ESCAPED, token -> TOKEN_BEGIN_PARAMETER);
        escapesInText.put(END_PARAMETER_ESCAPED, token -> TOKEN_END_PARAMETER);
        escapeText = rewrite(escapesInText);
    }

    private interface Parse {
        int parse(List<Node> ast, List<Token> expression, int current);
    }

    /*
     * text := .
     */
    private static final Parse textParser = (ast, expression, current) -> {
        Token currentToken = expression.get(current);
        Token unescaped = escapeText.apply(currentToken);
        ast.add(new Text(unescaped));
        return 1;
    };

    /*
     * parameter := '{' + text* + '}'
     */
    private static final Parse parameterParser = parseBetween(
            BEGIN_PARAMETER,
            END_PARAMETER,
            singletonList(textParser),
            Parameter::new
    );

    /*
     * optional := '(' + option* + ')'
     * option := parameter | text
     */
    private static final Parse optionalParser = parseBetween(
            BEGIN_OPTIONAL,
            END_OPTIONAL,
            asList(parameterParser, textParser),
            Optional::new
    );

    private static Parse parseBetween(
            Token.Type beginToken,
            Token.Type endToken,
            List<Parse> parsers,
            Function<List<Node>, Node> create) {
        return (ast, expression, current) -> {
            if (!lookingAt(expression, current, beginToken)) {
                return 0;
            }
            List<Node> subAst = new ArrayList<>();
            int subCurrent = current + 1;
            int consumed = parseTokensUntil(parsers, subAst, expression, subCurrent, endToken);
            subCurrent += consumed;

            // endToken not found
            if (lookingAt(expression, subCurrent, END_OF_LINE)) {
                return 0;
            }
            if (!lookingAt(expression, subCurrent, endToken)) {
                return 0;
            }
            ast.add(create.apply(subAst));
            // consumes endToken
            return subCurrent + 1 - current;
        };
    }

    private static final Node NODE_ALTERNATION = new Node() {
        // Marker. This way we don't need to model the
        // the tail end of alternation in the AST:
        //
        // alternation := alternative* + ( '/' + alternative* )+
    };

    private static Parse alternationSeparatorParser = (ast, expression, current) -> {
        if (!lookingAt(expression, current, ALTERNATION)) {
            return 0;
        }
        ast.add(NODE_ALTERNATION);
        return 1;
    };

    private static final List<Parse> alternationParsers = asList(
            alternationSeparatorParser,
            optionalParser,
            parameterParser,
            textParser
    );

    /*
     * alternation := (?<=boundary) + alternative* + ( '/' + alternative* )+ + (?=boundary)
     * boundary := whitespace | ^ | $
     * alternative: = optional | parameter | text
     */
    private static final Parse alternationParser = (ast, expression, current) -> {
        int previous = current - 1;
        if (!lookingAt(expression, previous, START_OF_LINE)
                && !lookingAt(expression, previous, WHITE_SPACE)) {
            return 0;
        }

        List<Node> subAst = new ArrayList<>();
        int consumed = parseTokensUntil(alternationParsers, subAst, expression, current, WHITE_SPACE, END_OF_LINE);
        if (!subAst.contains(NODE_ALTERNATION)) {
            return 0;
        }

        List<List<Node>> alternatives = splitOnAlternation(subAst);
        ast.add(new Alternation(alternatives));
        // Does not consume right hand boundary token
        return consumed;
    };

    private static final List<Parse> cucumberExpressionParsers = asList(
            alternationParser,
            optionalParser,
            parameterParser,
            textParser
    );

    /*
     * cucumber-expression :=  ( alternation | optional | parameter | text )*
     */
    List<Node> parse(List<Token> tokens) {
        List<Node> ast = new ArrayList<>();
        parseTokensUntil(cucumberExpressionParsers, ast, tokens, 0, END_OF_LINE);
        return ast;
    }

    private static int parseTokensUntil(List<Parse> parsers,
                                        List<Node> ast,
                                        List<Token> expression,
                                        int startAt,
                                        Token.Type... endTokens) {
        int current = startAt;
        while (current < expression.size()) {
            if (lookingAt(expression, current, endTokens)) {
                break;
            }

            int consumed = parseToken(parsers, ast, expression, current);
            if (consumed == 0) {
                // If configured correctly this will never happen
                // Keep to avoid infinite loop just in case
                throw new IllegalStateException("Could not parse " + expression);
            }
            current += consumed;
        }
        return current - startAt;
    }

    private static int parseToken(List<Parse> parsers,
                                  List<Node> ast,
                                  List<Token> expression,
                                  int startAt) {
        int current = startAt;
        for (Parse parser : parsers) {
            int consumed = parser.parse(ast, expression, current);
            if (consumed != 0) {
                current += consumed;
                break;
            }
        }
        return current - startAt;
    }

    private static boolean lookingAt(List<Token> expression, int current, Token.Type... endTokens) {
        for (Token.Type endToken : endTokens) {
            if (lookingAt(expression, current, endToken)) {
                return true;
            }
        }
        return false;
    }

    private static boolean lookingAt(List<Token> expression, int at, Token.Type token) {
        if (at < 0 || at >= expression.size()) {
            if (token == START_OF_LINE) {
                return at < 0;
            }
            if (token == END_OF_LINE) {
                return at >= expression.size();
            }
            return false;
        }
        Token currentToken = expression.get(at);
        return currentToken.type == token;
    }

    private static Function<Token, Token> rewrite(Map<Token.Type, Function<Token, Token>> rewriteRules) {
        return token -> rewriteRules.computeIfAbsent(token.type, type -> identity()).apply(token);
    }

    private static <T> List<List<T>> splitOnAlternation(List<T> tokens) {
        List<List<T>> alternatives = new ArrayList<>();
        List<T> alternative = new ArrayList<>();
        alternatives.add(alternative);
        for (T token : tokens) {
            if (NODE_ALTERNATION.equals(token)) {
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

        private final List<Node> optional;

        Optional(List<Node> optional) {
            this.optional = optional;
        }

        public List<Node> getOptional() {
            return optional;
        }

        @Override
        public String toString() {
            return optional.stream()
                    .map(Object::toString)
                    .collect(joining());
        }
    }

    static final class Parameter extends Node {

        private final List<Node> nodes;

        Parameter(List<Node> nodes) {
            this.nodes = nodes;
        }

        @Override
        public String toString() {
            return getParameterName();
        }

        String getParameterName() {
            return nodes.stream()
                    .map(Text.class::cast)
                    .map(Text::getText)
                    .collect(joining());
        }
    }

    static final class Alternation extends Node {

        private final List<List<Node>> alternatives;

        Alternation(List<List<Node>> alternatives) {
            this.alternatives = alternatives;
        }

        List<List<Node>> getAlternatives() {
            return alternatives;
        }

        @Override
        public String toString() {
            return getAlternatives().stream()
                    .map(nodes -> nodes.stream()
                            .map(Objects::toString)
                            .collect(joining()))
                    .collect(joining(" - "));
        }
    }

}
