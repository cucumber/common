package io.cucumber.cucumberexpressions;

import io.cucumber.cucumberexpressions.AstNode.Alternation;
import io.cucumber.cucumberexpressions.AstNode.Expression;
import io.cucumber.cucumberexpressions.AstNode.Optional;
import io.cucumber.cucumberexpressions.AstNode.Parameter;
import io.cucumber.cucumberexpressions.AstNode.Text;
import io.cucumber.cucumberexpressions.AstNode.Token;
import io.cucumber.cucumberexpressions.AstNode.Token.Type;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Function;

import static io.cucumber.cucumberexpressions.AstNode.Token.Type.ALTERNATION;
import static io.cucumber.cucumberexpressions.AstNode.Token.Type.BEGIN_OPTIONAL;
import static io.cucumber.cucumberexpressions.AstNode.Token.Type.BEGIN_PARAMETER;
import static io.cucumber.cucumberexpressions.AstNode.Token.Type.END_OF_LINE;
import static io.cucumber.cucumberexpressions.AstNode.Token.Type.END_OPTIONAL;
import static io.cucumber.cucumberexpressions.AstNode.Token.Type.END_PARAMETER;
import static io.cucumber.cucumberexpressions.AstNode.Token.Type.START_OF_LINE;
import static io.cucumber.cucumberexpressions.AstNode.Token.Type.WHITE_SPACE;
import static java.util.Arrays.asList;
import static java.util.Collections.singletonList;

final class CucumberExpressionParser {

    private interface Parse {
        int parse(List<AstNode> ast, List<Token> expression, int current);
    }

    /*
     * text := token
     */
    private static final Parse textParser = (ast, expression, current) -> {
        Token currentToken = expression.get(current);
        Token unescaped = unEscape(currentToken);
        ast.add(new Text(unescaped));
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
            Type beginToken,
            Type endToken,
            List<Parse> parsers,
            Function<List<AstNode>, AstNode> create) {
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
            ast.add(create.apply(subAst));
            // consumes endToken
            return subCurrent + 1 - current;
        };
    }

    private static final AstNode ALTERNATIVE_SEPARATOR = new AstNode() {
        // Marker. This way we don't need to model the
        // the tail end of alternation in the AST:
        //
        // alternation := alternative* + ( '/' + alternative* )+
    };

    private static Parse alternativeSeparator = (ast, expression, current) -> {
        if (!lookingAt(expression, current, ALTERNATION)) {
            return 0;
        }
        ast.add(ALTERNATIVE_SEPARATOR);
        return 1;
    };

    private static final List<Parse> alternativeParsers = asList(
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
    private static final Parse alternationParser = (ast, expression, current) -> {
        int previous = current - 1;
        if (!lookingAt(expression, previous, START_OF_LINE)
                && !lookingAt(expression, previous, WHITE_SPACE)) {
            return 0;
        }

        List<AstNode> subAst = new ArrayList<>();
        int consumed = parseTokensUntil(alternativeParsers, subAst, expression, current, WHITE_SPACE, END_OF_LINE);
        if (!subAst.contains(ALTERNATIVE_SEPARATOR)) {
            return 0;
        }

        List<List<AstNode>> alternatives = splitOnAlternation(subAst);
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
    Expression parse(String expression) {
        CucumberExpressionTokenizer tokenizer = new CucumberExpressionTokenizer();
        List<Token> tokens = tokenizer.tokenize(expression);
        List<AstNode> ast = new ArrayList<>();
        parseTokensUntil(cucumberExpressionParsers, ast, tokens, 0, END_OF_LINE);
        return new Expression(ast);
    }

    private static int parseTokensUntil(List<Parse> parsers,
                                        List<AstNode> ast,
                                        List<Token> expression,
                                        int startAt,
                                        Type... endTokens) {
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
                                  List<AstNode> ast,
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

    private static boolean lookingAt(List<Token> expression, int current, Type... endTokens) {
        for (Type endToken : endTokens) {
            if (lookingAt(expression, current, endToken)) {
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
        Token currentToken = expression.get(at);
        return currentToken.type == token;
    }

    private static <T> List<List<T>> splitOnAlternation(List<T> tokens) {
        List<List<T>> alternatives = new ArrayList<>();
        List<T> alternative = new ArrayList<>();
        alternatives.add(alternative);
        for (T token : tokens) {
            if (ALTERNATIVE_SEPARATOR.equals(token)) {
                alternative = new ArrayList<>();
                alternatives.add(alternative);
            } else {
                alternative.add(token);
            }
        }
        return alternatives;
    }

}
