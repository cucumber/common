package io.cucumber.cucumberexpressions;

import io.cucumber.cucumberexpressions.CucumberExpressionTokenizer.Token;

import java.util.ArrayList;
import java.util.EnumMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.function.Function;

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
    private static final Function<Token, Token> escapeParameter;
    private static final Function<Token, Token> escapeText;

    static {
        Map<Token.Type, Function<Token, Token>> escapesInParameter = new EnumMap<>(Token.Type.class);
        escapesInParameter.put(ESCAPED_ESCAPE, token -> ESCAPE_TOKEN);
        escapesInParameter.put(ESCAPED_BEGIN_PARAMETER, token -> BEGIN_PARAMETER_TOKEN);
        escapesInParameter.put(ESCAPED_END_PARAMETER, token -> END_PARAMETER_TOKEN);
        escapeParameter = rewrite(escapesInParameter);

        Map<Token.Type, Function<Token, Token>> escapesInText = new EnumMap<>(Token.Type.class);
        escapesInText.put(ESCAPED_ESCAPE, token -> ESCAPE_TOKEN);
        escapesInText.put(ESCAPED_WHITE_SPACE, token -> new Token(token.text.substring(1), WHITE_SPACE));
        escapesInText.put(ESCAPED_BEGIN_OPTIONAL, token -> BEGIN_OPTIONAL_TOKEN);
        escapesInText.put(ESCAPED_END_OPTIONAL, token -> END_OPTIONAL_TOKEN);
        escapesInText.put(ESCAPED_ALTERNATION, token -> ALTERNATION_TOKEN);
        escapesInText.put(ESCAPED_BEGIN_PARAMETER, token -> BEGIN_PARAMETER_TOKEN);
        escapesInText.put(ESCAPED_END_PARAMETER, token -> END_PARAMETER_TOKEN);
        escapeText = rewrite(escapesInText);
    }

    private interface Parse {
        int parse(List<Node> ast, List<Token> expression, int current);
    }

    private static final Parse parameterParser =
            (ast, expression, current) -> {
                Token currentToken = expression.get(current);
                if (currentToken.type != BEGIN_PARAMETER) {
                    return 0;
                }

                int endIndex = findFirst(expression, current + 1, END_PARAMETER);
                if (endIndex <= 0) {
                    return 0;
                }
                List<Token> tokens = expression.subList(current + 1, endIndex);
                List<Token> unescaped = tokens.stream().map(escapeParameter).collect(toList());
                ast.add(new Parameter(unescaped));
                // Consumes end token
                return endIndex + 1 - current;
            };

    private static final Parse textParser = (ast, expression, current) -> {
        Token currentToken = expression.get(current);
        Token unescaped = escapeText.apply(currentToken);
        ast.add(new Text(unescaped));
        return 1;
    };

    private static final Node ALTERNATION_NODE = new Node() {
        // Marker. This way we don't need to model the
        // the tail end of alternation in the AST:
        //
        // alternation := alternative* + ( '/' + alternative* )+
    };

    private static Parse alternationSeparatorParser = (ast, expression, current) -> {
        Token currentToken = expression.get(current);
        if (currentToken.type != ALTERNATION) {
            return 0;
        }
        ast.add(ALTERNATION_NODE);
        return 1;
    };

    private static final List<Parse> optionalParsers = asList(
            parameterParser,
            textParser
    );

    private static final Parse optionalParser = (ast, expression, current) -> {
        Token currentToken = expression.get(current);
        if (currentToken.type != BEGIN_OPTIONAL) {
            return 0;
        }
        List<Node> subAst = new ArrayList<>();
        int subCurrent = current + 1;
        while (subCurrent < expression.size()) {
            Token subCurrentToken = expression.get(subCurrent);
            if (subCurrentToken.type == END_OPTIONAL) {
                break;
            }
            // textParser in optionalParsers always consumes
            // no need to check consumption
            int consumed = parseToken(optionalParsers, subAst, expression, subCurrent);
            subCurrent += consumed;
        }

        // End not found
        if(subCurrent == expression.size()){
            return 0;
        }

        ast.add(new Optional(subAst));
        // Consumes right hand boundary token
        return subCurrent + 1 - current;
    };

    private static final List<Parse> alternationParsers = asList(
            alternationSeparatorParser,
            optionalParser,
            parameterParser,
            textParser
    );

    private static final Parse alternationParser = (ast, expression, current) -> {
        if (current > 0) {
            Token previousToken = expression.get(current - 1);
            if (previousToken.type != WHITE_SPACE) {
                return 0;
            }
        }

        List<Node> subAst = new ArrayList<>();

        int subCurrent = current;
        while (subCurrent < expression.size()) {
            Token currentToken = expression.get(subCurrent);
            if (currentToken.type == WHITE_SPACE) {
                break;
            }
            // textParser in alternationParsers always consumes
            // no need to check consumption
            int consumed = parseToken(alternationParsers, subAst, expression, subCurrent);
            subCurrent += consumed;
        }

        if (!subAst.contains(ALTERNATION_NODE)) {
            return 0;
        }
        List<List<Node>> alternatives = splitOnAlternation(subAst);
        ast.add(new Alternation(alternatives));
        // Does not consume right hand boundary token
        return subCurrent - current;
    };

    private static final List<Parse> parsers = asList(
            alternationParser,
            optionalParser,
            parameterParser,
            textParser
    );

    private final CucumberExpressionTokenizer tokenizer = new CucumberExpressionTokenizer();

    List<Node> parse(String expression) {
        List<Token> tokens = tokenizer.tokenize(expression);
        List<Node> ast = new ArrayList<>();
        int length = tokens.size();
        int current = 0;
        while (current < length) {
            int consumed = parseToken(parsers, ast, tokens, current);
            current += consumed;
            // If configured correctly this will never happen
            // Keep avoid infinite loop just in case
            if (consumed == 0) {
                throw new IllegalStateException("Could not parse " + tokens);
            }
        }
        return ast;
    }

    private static int parseToken(List<Parse> parsers, List<Node> ast, List<Token> expression, int startAt) {
        int current = startAt;
        for (Parse parser : parsers) {
            int consumedChars = parser.parse(ast, expression, current);
            if (consumedChars != 0) {
                current += consumedChars;
                break;
            }
        }
        return current - startAt;
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

    private static <T> List<List<T>> splitOnAlternation(List<T> tokens) {
        List<List<T>> alternatives = new ArrayList<>();
        List<T> alternative = new ArrayList<>();
        alternatives.add(alternative);
        for (T token : tokens) {
            if (ALTERNATION_NODE.equals(token)) {
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
