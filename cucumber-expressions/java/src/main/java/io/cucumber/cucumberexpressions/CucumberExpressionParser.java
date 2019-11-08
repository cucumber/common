package io.cucumber.cucumberexpressions;

import io.cucumber.cucumberexpressions.Ast.AstNode;
import io.cucumber.cucumberexpressions.Ast.Token;
import io.cucumber.cucumberexpressions.Ast.Token.Type;

import java.util.ArrayList;
import java.util.List;

import static io.cucumber.cucumberexpressions.Ast.ALTERNATIVE_SEPARATOR;
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
import static java.util.Arrays.asList;
import static java.util.Collections.singletonList;

final class CucumberExpressionParser {

    private interface Parser {
        int parse(List<AstNode> ast, List<Token> expression, int current);
    }

    /*
     * text := token
     */
    private static final Parser textParser = (ast, expression, current) -> {
        Token currentToken = expression.get(current);
        Token unescaped = unEscape(currentToken);
        ast.add(new AstNode(TEXT_NODE, unescaped));
        return 1;
    };

    private static Token unEscape(Token currentToken) {
        switch (currentToken.type) {
            case WHITE_SPACE_ESCAPED:
                return new Token(currentToken.text.substring(1), Type.WHITE_SPACE);
            case BEGIN_OPTIONAL_ESCAPED:
                return Token.BEGIN_OPTIONAL;
            case END_OPTIONAL_ESCAPED:
                return Token.END_OPTIONAL;
            case BEGIN_PARAMETER_ESCAPED:
                return Token.BEGIN_PARAMETER;
            case END_PARAMETER_ESCAPED:
                return Token.END_PARAMETER;
            case ALTERNATION_ESCAPED:
                return Token.ALTERNATION;
            case ESCAPE_ESCAPED:
                return Token.ESCAPE;
            default:
                return currentToken;
        }
    }

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

    private static Parser parseBetween(
            AstNode.Type type,
            Type beginToken,
            Type endToken,
            List<Parser> parsers) {
        return (ast, expression, current) -> {
            if (!lookingAt(expression, current, beginToken)) {
                return 0;
            }
            List<AstNode> subAst = new ArrayList<>();
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
            ast.add(new AstNode(type, subAst));
            // consumes endToken
            return subCurrent + 1 - current;
        };
    }

    private static Parser alternativeSeparator = (ast, expression, current) -> {
        if (!lookingAt(expression, current, ALTERNATION)) {
            return 0;
        }
        ast.add(ALTERNATIVE_SEPARATOR);
        return 1;
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
    private static final Parser alternationParser = (ast, expression, current) -> {
        int previous = current - 1;
        if (!lookingAt(expression, previous, START_OF_LINE, WHITE_SPACE)) {
            return 0;
        }

        List<AstNode> subAst = new ArrayList<>();
        int consumed = parseTokensUntil(alternativeParsers, subAst, expression, current, WHITE_SPACE, END_OF_LINE);
        if (!subAst.contains(ALTERNATIVE_SEPARATOR)) {
            return 0;
        }

        ast.add(new AstNode(ALTERNATION_NODE, splitAlternatives(subAst)));
        // Does not consume right hand boundary token
        return consumed;
    };

    private static final List<Parser> cucumberExpressionParsers = asList(
            alternationParser,
            optionalParser,
            parameterParser,
            textParser
    );

    /*
     * cucumber-expression :=  ( alternation | optional | parameter | text )*
     */
    AstNode parse(String expression) {
        CucumberExpressionTokenizer tokenizer = new CucumberExpressionTokenizer();
        List<Token> tokens = tokenizer.tokenize(expression);
        List<AstNode> ast = new ArrayList<>();
        int consumed = parseTokensUntil(cucumberExpressionParsers, ast, tokens, 0, END_OF_LINE);
        if (consumed != tokens.size()) {
            // If configured correctly this will never happen
            throw new IllegalStateException("Could not parse " + expression);
        }
        return new AstNode(EXPRESSION_NODE, ast);
    }

    private static int parseTokensUntil(List<Parser> parsers,
                                        List<AstNode> ast,
                                        List<Token> expression,
                                        int startAt,
                                        Type... endTokens) {
        int current = startAt;
        int size = expression.size();
        while (current < size) {
            if (lookingAt(expression, current, endTokens)) {
                break;
            }

            int consumed = parseToken(parsers, ast, expression, current);
            if (consumed == 0) {
                break;
            }
            current += consumed;
        }
        return current - startAt;
    }

    private static int parseToken(List<Parser> parsers,
                                  List<AstNode> ast,
                                  List<Token> expression,
                                  int startAt) {
        for (Parser parser : parsers) {
            int consumed = parser.parse(ast, expression, startAt);
            if (consumed != 0) {
                return consumed;
            }
        }
        return 0;
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
        if (at < 0 || at >= expression.size()) {
            if (token == START_OF_LINE) {
                return at < 0;
            }
            if (token == END_OF_LINE) {
                return at >= expression.size();
            }
            return false;
        }
        return expression.get(at).type == token;
    }

    private static List<AstNode> splitAlternatives(List<AstNode> astNode) {
        List<AstNode> alternatives = new ArrayList<>();
        List<AstNode> alternative = new ArrayList<>();
        for (AstNode token : astNode) {
            if (Ast.ALTERNATIVE_SEPARATOR.equals(token)) {
                alternatives.add(new AstNode(ALTERNATIVE_NODE, alternative));
                alternative = new ArrayList<>();
            } else {
                alternative.add(token);
            }
        }
        alternatives.add(new AstNode(ALTERNATIVE_NODE, alternative));
        return alternatives;
    }

}
