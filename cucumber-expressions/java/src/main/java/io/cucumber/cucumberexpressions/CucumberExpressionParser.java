package io.cucumber.cucumberexpressions;

import io.cucumber.cucumberexpressions.Ast.Node;
import io.cucumber.cucumberexpressions.Ast.Token;
import io.cucumber.cucumberexpressions.Ast.Token.Type;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static io.cucumber.cucumberexpressions.Ast.Node.Type.ALTERNATION_NODE;
import static io.cucumber.cucumberexpressions.Ast.Node.Type.ALTERNATIVE_NODE;
import static io.cucumber.cucumberexpressions.Ast.Node.Type.EXPRESSION_NODE;
import static io.cucumber.cucumberexpressions.Ast.Node.Type.OPTIONAL_NODE;
import static io.cucumber.cucumberexpressions.Ast.Node.Type.PARAMETER_NODE;
import static io.cucumber.cucumberexpressions.Ast.Node.Type.TEXT_NODE;
import static io.cucumber.cucumberexpressions.Ast.Token.Type.ALTERNATION;
import static io.cucumber.cucumberexpressions.Ast.Token.Type.BEGIN_OPTIONAL;
import static io.cucumber.cucumberexpressions.Ast.Token.Type.BEGIN_PARAMETER;
import static io.cucumber.cucumberexpressions.Ast.Token.Type.END_OF_LINE;
import static io.cucumber.cucumberexpressions.Ast.Token.Type.END_OPTIONAL;
import static io.cucumber.cucumberexpressions.Ast.Token.Type.END_PARAMETER;
import static io.cucumber.cucumberexpressions.Ast.Token.Type.START_OF_LINE;
import static io.cucumber.cucumberexpressions.Ast.Token.Type.WHITE_SPACE;
import static io.cucumber.cucumberexpressions.CucumberExpressionException.createAlternationNotAllowedInOptional;
import static io.cucumber.cucumberexpressions.CucumberExpressionException.createInvalidParameterTypeName;
import static io.cucumber.cucumberexpressions.CucumberExpressionException.createMissingEndToken;
import static java.util.Arrays.asList;
import static java.util.Collections.singletonList;

final class CucumberExpressionParser {

    /*
     * text := whitespace | ')' | '}' | .
     */
    private static final Parser textParser = (expression, tokens, current) -> {
        Token token = tokens.get(current);
        switch (token.type) {
            case WHITE_SPACE:
            case TEXT:
            case END_PARAMETER:
            case END_OPTIONAL:
                return new Result(1, new Node(TEXT_NODE, token.start(), token.end(), token.text));
            case ALTERNATION:
                throw createAlternationNotAllowedInOptional(expression, token);
            case BEGIN_PARAMETER:
            case START_OF_LINE:
            case END_OF_LINE:
            case BEGIN_OPTIONAL:
            default:
                // If configured correctly this will never happen
                return new Result(0);
        }
    };

    /*
     * name := whitespace | .
     */
    private static final Parser nameParser = (expression, tokens, current) -> {
        Token token = tokens.get(current);
        switch (token.type) {
            case WHITE_SPACE:
            case TEXT:
                return new Result(1, new Node(TEXT_NODE, token.start(), token.end(), token.text));
            case BEGIN_OPTIONAL:
            case END_OPTIONAL:
            case BEGIN_PARAMETER:
            case END_PARAMETER:
            case ALTERNATION:
                throw createInvalidParameterTypeName(token, expression);
            case START_OF_LINE:
            case END_OF_LINE:
            default:
                // If configured correctly this will never happen
                return new Result(0);
        }
    };

    /*
     * parameter := '{' + name* + '}'
     */
    private static final Parser parameterParser = parseBetween(
            PARAMETER_NODE,
            BEGIN_PARAMETER,
            END_PARAMETER,
            singletonList(nameParser)
    );

    /*
     * optional := '(' + option* + ')'
     * option := optional | parameter | text
     */
    private static final Parser optionalParser;
    static {
        List<Parser> parsers = new ArrayList<>();
        optionalParser = parseBetween(
                OPTIONAL_NODE,
                BEGIN_OPTIONAL,
                END_OPTIONAL,
                parsers
        );
        parsers.addAll(asList(optionalParser, parameterParser, textParser));
    }

    /*
     * alternation := alternative* + ( '/' + alternative* )+
     */
    private static final Parser alternativeSeparator = (expression, tokens, current) -> {
        if (!lookingAt(tokens, current, ALTERNATION)) {
            return new Result(0);
        }
        Token token = tokens.get(current);
        return new Result(1, new Node(ALTERNATIVE_NODE, token.start(), token.end(), token.text));
    };

    private static final List<Parser> alternativeParsers = asList(
            alternativeSeparator,
            optionalParser,
            parameterParser,
            textParser
    );

    /*
     * alternation := (?<=left-boundary) + alternative* + ( '/' + alternative* )+ + (?=right-boundary)
     * left-boundary := whitespace | } | ^
     * right-boundary := whitespace | { | $
     * alternative: = optional | parameter | text
     */
    private static final Parser alternationParser = (expression, tokens, current) -> {
        int previous = current - 1;
        if (!lookingAtAny(tokens, previous, START_OF_LINE, WHITE_SPACE, END_PARAMETER)) {
            return new Result(0);
        }

        Result result = parseTokensUntil(expression, alternativeParsers, tokens, current, WHITE_SPACE, END_OF_LINE, BEGIN_PARAMETER);
        int subCurrent = current + result.consumed;
        if (result.ast.stream().noneMatch(astNode -> astNode.type() == ALTERNATIVE_NODE)) {
            return new Result(0);
        }

        int start = tokens.get(current).start();
        int end = tokens.get(subCurrent).start();
        // Does not consume right hand boundary token
        return new Result(result.consumed,
                new Node(ALTERNATION_NODE, start, end, splitAlternatives(start, end, result.ast)));
    };

    /*
     * cucumber-expression :=  ( alternation | optional | parameter | text )*
     */
    private static final Parser cucumberExpressionParser = parseBetween(
            EXPRESSION_NODE,
            START_OF_LINE,
            END_OF_LINE,
            asList(
                    alternationParser,
                    optionalParser,
                    parameterParser,
                    textParser
            )
    );

    Node parse(String expression) {
        CucumberExpressionTokenizer tokenizer = new CucumberExpressionTokenizer();
        List<Token> tokens = tokenizer.tokenize(expression);
        Result result = cucumberExpressionParser.parse(expression, tokens, 0);
        return result.ast.get(0);
    }

    private interface Parser {
        Result parse(String expression, List<Token> tokens, int current);

    }

    private static final class Result {
        final int consumed;
        final List<Node> ast;

        private Result(int consumed, Node... ast) {
            this(consumed, Arrays.asList(ast));
        }

        private Result(int consumed, List<Node> ast) {
            this.consumed = consumed;
            this.ast = ast;
        }

    }

    private static Parser parseBetween(
            Node.Type type,
            Type beginToken,
            Type endToken,
            List<Parser> parsers) {
        return (expression, tokens, current) -> {
            if (!lookingAt(tokens, current, beginToken)) {
                return new Result(0);
            }
            int subCurrent = current + 1;
            Result result = parseTokensUntil(expression, parsers, tokens, subCurrent, endToken, END_OF_LINE);
            subCurrent += result.consumed;

            // endToken not found
            if (!lookingAt(tokens, subCurrent, endToken)) {
                throw createMissingEndToken(expression, beginToken, endToken, tokens.get(current));
            }
            // consumes endToken
            int start = tokens.get(current).start();
            int end = tokens.get(subCurrent).end();
            return new Result(subCurrent + 1 - current, new Node(type, start, end, result.ast));
        };
    }

    private static Result parseTokensUntil(
            String expression,
            List<Parser> parsers,
            List<Token> tokens,
            int startAt,
            Type... endTokens) {
        int current = startAt;
        int size = tokens.size();
        List<Node> ast = new ArrayList<>();
        while (current < size) {
            if (lookingAtAny(tokens, current, endTokens)) {
                break;
            }

            Result result = parseToken(expression, parsers, tokens, current);
            if (result.consumed == 0) {
                // If configured correctly this will never happen
                // Keep to avoid infinite loops
                throw new IllegalStateException("No eligible parsers for " + tokens);
            }
            current += result.consumed;
            ast.addAll(result.ast);
        }
        return new Result(current - startAt, ast);
    }

    private static Result parseToken(String expression, List<Parser> parsers,
            List<Token> tokens,
            int startAt) {
        for (Parser parser : parsers) {
            Result result = parser.parse(expression, tokens, startAt);
            if (result.consumed != 0) {
                return result;
            }
        }
        // If configured correctly this will never happen
        throw new IllegalStateException("No eligible parsers for " + tokens);
    }

    private static boolean lookingAtAny(List<Token> tokens, int at, Type... tokenTypes) {
        for (Type tokeType : tokenTypes) {
            if (lookingAt(tokens, at, tokeType)) {
                return true;
            }
        }
        return false;
    }

    private static boolean lookingAt(List<Token> tokens, int at, Type token) {
        if (at < 0) {
            // If configured correctly this will never happen
            // Keep for completeness
            return token == START_OF_LINE;
        }
        if (at >= tokens.size()) {
            return token == END_OF_LINE;
        }
        return tokens.get(at).type == token;
    }

    private static List<Node> splitAlternatives(int start, int end, List<Node> alternation) {
        List<Node> separators = new ArrayList<>();
        List<List<Node>> alternatives = new ArrayList<>();
        List<Node> alternative = new ArrayList<>();
        for (Node n : alternation) {
            if (ALTERNATIVE_NODE.equals(n.type())) {
                separators.add(n);
                alternatives.add(alternative);
                alternative = new ArrayList<>();
            } else {
                alternative.add(n);
            }
        }
        alternatives.add(alternative);

        return createAlternativeNodes(start, end, separators, alternatives);
    }

    private static List<Node> createAlternativeNodes(int start, int end, List<Node> separators, List<List<Node>> alternatives) {
        List<Node> nodes = new ArrayList<>();
        for (int i = 0; i < alternatives.size(); i++) {
            List<Node> n = alternatives.get(i);
            if (i == 0) {
                Node rightSeparator = separators.get(i);
                nodes.add(new Node(ALTERNATIVE_NODE, start, rightSeparator.start(), n));
            } else if (i == alternatives.size() - 1) {
                Node leftSeparator = separators.get(i - 1);
                nodes.add(new Node(ALTERNATIVE_NODE, leftSeparator.end(), end, n));
            } else {
                Node leftSeparator = separators.get(i - 1);
                Node rightSeparator = separators.get(i);
                nodes.add(new Node(ALTERNATIVE_NODE, leftSeparator.end(), rightSeparator.start(), n));
            }
        }
        return nodes;
    }

}
