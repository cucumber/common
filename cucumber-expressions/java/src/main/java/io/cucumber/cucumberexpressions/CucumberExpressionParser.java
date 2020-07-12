package io.cucumber.cucumberexpressions;

import io.cucumber.cucumberexpressions.Ast.AstNode;
import io.cucumber.cucumberexpressions.Ast.Token;
import io.cucumber.cucumberexpressions.Ast.Token.Type;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static io.cucumber.cucumberexpressions.Ast.AstNode.Type.ALTERNATION_NODE;
import static io.cucumber.cucumberexpressions.Ast.AstNode.Type.ALTERNATIVE_NODE;
import static io.cucumber.cucumberexpressions.Ast.AstNode.Type.EXPRESSION_NODE;
import static io.cucumber.cucumberexpressions.Ast.AstNode.Type.OPTIONAL_NODE;
import static io.cucumber.cucumberexpressions.Ast.AstNode.Type.PARAMETER_NODE;
import static io.cucumber.cucumberexpressions.Ast.AstNode.Type.TEXT_NODE;
import static io.cucumber.cucumberexpressions.Ast.Token.Type.ALTERNATION;
import static io.cucumber.cucumberexpressions.Ast.Token.Type.BEGIN_OPTIONAL;
import static io.cucumber.cucumberexpressions.Ast.Token.Type.BEGIN_PARAMETER;
import static io.cucumber.cucumberexpressions.Ast.Token.Type.END_OF_LINE;
import static io.cucumber.cucumberexpressions.Ast.Token.Type.END_OPTIONAL;
import static io.cucumber.cucumberexpressions.Ast.Token.Type.END_PARAMETER;
import static io.cucumber.cucumberexpressions.Ast.Token.Type.START_OF_LINE;
import static io.cucumber.cucumberexpressions.Ast.Token.Type.WHITE_SPACE;
import static io.cucumber.cucumberexpressions.CucumberExpressionException.createMissingEndTokenException;
import static java.util.Arrays.asList;
import static java.util.Collections.singletonList;

final class CucumberExpressionParser {

    /*
     * text := token
     */
    private static final Parser textParser = (expression, current) -> {
        Token token = expression.get(current);
        return new Result(1, new AstNode(TEXT_NODE, token.start(), token.end(), token.text));
    };

    /*
     * parameter := '{' + text* + '}'
     */
    private static final Parser parameterParser = parseBetween(
            PARAMETER_NODE,
            BEGIN_PARAMETER,
            END_PARAMETER,
            singletonList(textParser)
    );

    /*
     * optional := '(' + option* + ')'
     * option := parameter | text
     */
    private static final Parser optionalParser = parseBetween(
            OPTIONAL_NODE,
            BEGIN_OPTIONAL,
            END_OPTIONAL,
            asList(parameterParser, textParser)
    );

    // alternation := alternative* + ( '/' + alternative* )+
    private static final Parser alternativeSeparator = (expression, current) -> {
        if (!lookingAt(expression, current, ALTERNATION)) {
            return new Result(0);
        }
        Token token = expression.get(current);
        return new Result(1, new AstNode(ALTERNATIVE_NODE, token.start(), token.end(), "/"));
    };

    private static final List<Parser> alternativeParsers = asList(
            alternativeSeparator,
            optionalParser,
            parameterParser,
            textParser
    );

    /*
     * alternation := (?<=boundary) + alternative* + ( '/' + alternative* )+ + (?=boundary)
     * boundary := whitespace | ^ | $
     * alternative: = optional | parameter | text
     */
    private static final Parser alternationParser = (expression, current) -> {
        int previous = current - 1;
        if (!lookingAt(expression, previous, START_OF_LINE, WHITE_SPACE)) {
            return new Result(0);
        }

        Result result = parseTokensUntil(alternativeParsers, expression, current, WHITE_SPACE, END_OF_LINE);
        int subCurrent = current + result.consumed;
        if (result.ast.stream().noneMatch(astNode -> astNode.type() == ALTERNATIVE_NODE)) {
            return new Result(0);
        }
        int start = expression.get(current).start();
        int end = expression.get(subCurrent).start();
        // Does not consume right hand boundary token
        return new Result(result.consumed, new AstNode(ALTERNATION_NODE,  start, end, splitAlternatives(start, end, result.ast)));
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

    AstNode parse(String expression) {
        CucumberExpressionTokenizer tokenizer = new CucumberExpressionTokenizer();
        List<Token> tokens = tokenizer.tokenize(expression);
        Result result = cucumberExpressionParser.parse(tokens, 0);
        return result.ast.get(0);
    }

    private interface Parser {
        Result parse(List<Token> expression, int current);
    }

    private static final class Result {
        final int consumed;
        final List<AstNode> ast;

        private Result(int consumed, AstNode... ast) {
            this(consumed, Arrays.asList(ast));
        }
        private Result(int consumed, List<AstNode> ast) {
            this.consumed = consumed;
            this.ast = ast;
        }
    }

    private static Parser parseBetween(
            AstNode.Type type,
            Type beginToken,
            Type endToken,
            List<Parser> parsers) {
        return (expression, current) -> {
            if (!lookingAt(expression, current, beginToken)) {
                return new Result(0);
            }
            int subCurrent = current + 1;
            Result result = parseTokensUntil(parsers, expression, subCurrent, endToken);
            subCurrent += result.consumed;

            // endToken not found
            if (!lookingAt(expression, subCurrent, endToken)) {
                throw createMissingEndTokenException(beginToken, endToken, expression, current);
            }
            // consumes endToken
            int start = expression.get(current).start();
            int end = expression.get(subCurrent).end();
            return new Result(subCurrent + 1 - current, new AstNode(type, start, end, result.ast));
        };
    }

    private static Result parseTokensUntil(List<Parser> parsers,
                                        List<Token> expression,
                                        int startAt,
                                        Type... endTokens) {
        int current = startAt;
        int size = expression.size();
        List<AstNode> ast = new ArrayList<>();
        while (current < size) {
            if (lookingAt(expression, current, endTokens)) {
                break;
            }

            Result result = parseToken(parsers, expression, current);
            if (result.consumed == 0) {
                // If configured correctly this will never happen
                // Keep to avoid infinite loops
                throw new IllegalStateException("No eligible parsers for " + expression);
            }
            current += result.consumed;
            ast.addAll(result.ast);
        }
        return new Result(current - startAt, ast);
    }

    private static Result parseToken(List<Parser> parsers,
                                  List<Token> expression,
                                  int startAt) {
        for (Parser parser : parsers) {
            Result result = parser.parse(expression, startAt);
            if (result.consumed != 0) {
                return result;
            }
        }
        // If configured correctly this will never happen
        throw new IllegalStateException("No eligible parsers for " + expression);
    }

    private static boolean lookingAt(List<Token> expression, int at, Type... tokens) {
        for (Type token : tokens) {
            if (lookingAt(expression, at, token)) {
                return true;
            }
        }
        return false;
    }

    private static boolean lookingAt(List<Token> expression, int at, Type token) {
        if (at < 0) {
            return token == START_OF_LINE;
        }
        if (at >= expression.size()) {
            return token == END_OF_LINE;
        }
        return expression.get(at).type == token;
    }

    private static List<AstNode> splitAlternatives(int start, int end, List<AstNode> astNode) {

        List<AstNode> seperators = new ArrayList<>();
        List<List<AstNode>> alternatives = new ArrayList<>();
        List<AstNode> alternative = new ArrayList<>();
        for (AstNode token : astNode) {
            if (ALTERNATIVE_NODE.equals(token.type())) {
                seperators.add(token);
                alternatives.add(alternative);
                alternative = new ArrayList<>();
            } else {
                alternative.add(token);
            }
        }
        alternatives.add(alternative);

        List<AstNode> alts = new ArrayList<>();
        for (int i = 0; i < alternatives.size(); i++) {
            List<AstNode> astNodes = alternatives.get(i);
            if (i == 0) {
                alts.add(new AstNode(ALTERNATIVE_NODE, start, seperators.get(i).start(), astNodes));
            } else if( i == alternatives.size() - 1){
                alts.add(new AstNode(ALTERNATIVE_NODE, seperators.get(i - 1).end(), end, astNodes));
            } else {
                alts.add(new AstNode(ALTERNATIVE_NODE, seperators.get(i-1).end(), seperators.get(i).start(), astNodes));
            }
        }

        return alts;
    }

}
