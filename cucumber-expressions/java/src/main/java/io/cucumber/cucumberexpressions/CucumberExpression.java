package io.cucumber.cucumberexpressions;

import org.apiguardian.api.API;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.function.Function;
import java.util.regex.MatchResult;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Stream;

import static java.util.stream.Collectors.joining;

@API(status = API.Status.STABLE)
public final class CucumberExpression implements Expression {
    private static final Pattern ESCAPE_PATTERN = Pattern.compile("([\\\\^\\[({$.|?*+})\\]])");
    @SuppressWarnings("RegExpRedundantEscape") // Android can't parse unescaped braces
    static final Pattern PARAMETER_PATTERN = Pattern.compile("(\\\\)?\\{([^}]*)\\}");
    private static final Pattern OPTIONAL_PATTERN = Pattern.compile("(\\\\)?\\(([^)]+)\\)");
    private static final Pattern ALTERNATIVE_NON_WHITESPACE_TEXT_REGEXP = Pattern.compile("([^\\s/]*)((/[^\\s/]*)+)");
    private static final String ESCAPE = "\\";
    private static final String PARAMETER_TYPES_CANNOT_BE_ALTERNATIVE = "Parameter types cannot be alternative: ";
    private static final String PARAMETER_TYPES_CANNOT_BE_OPTIONAL = "Parameter types cannot be optional: ";
    private static final String ALTERNATIVE_MAY_NOT_BE_EMPTY = "Alternative may not be empty: ";

    private final List<ParameterType<?>> parameterTypes = new ArrayList<>();
    private final String source;
    private final TreeRegexp treeRegexp;
    private final ParameterTypeRegistry parameterTypeRegistry;

    private static class Token {
        final String text;
        final Type type;

        private Token(String text, Type type) {
            this.text = text;
            this.type = type;
        }

        private enum Type {
            TEXT, OPTIONAL, ALTERNATION, PARAMETER
        }
    }

    CucumberExpression(String expression, ParameterTypeRegistry parameterTypeRegistry) {
        this.source = expression;
        this.parameterTypeRegistry = parameterTypeRegistry;

        String pattern = Stream.of(new Token(expression, Token.Type.TEXT))
                .flatMap(processOptional())
                .flatMap(processAlternation())
                .flatMap(processParameters())
                .map(escapeRegex())
                .collect(joining("", "^", "$"));

        treeRegexp = new TreeRegexp(pattern);
    }

    private static Function<Token, String> escapeRegex() {
        return token -> token.type != Token.Type.TEXT ? token.text : escapeRegex(token.text);
    }

    private static String escapeRegex(String text) {
        return ESCAPE_PATTERN.matcher(text).replaceAll("\\\\$1");
    }

    private Function<Token, Stream<Token>> processAlternation() {
        return splitTextTokens(ALTERNATIVE_NON_WHITESPACE_TEXT_REGEXP, (matchResult) -> {
            // replace \/ with /
            // replace / with |
            String replacement = matchResult.group(0).replace('/', '|').replaceAll("\\\\\\|", "/");
            if (!replacement.contains("|")) {
                // All / were escaped
                return new Token(replacement, Token.Type.TEXT);
            }

            // Make sure the alternative parts aren't empty and don't contain parameter types
            String[] alternatives = replacement.split("\\|");
            if (alternatives.length == 0) {
                throw new CucumberExpressionException(ALTERNATIVE_MAY_NOT_BE_EMPTY + source);
            }
            for (String alternative : alternatives) {
                if (alternative.isEmpty()) {
                    throw new CucumberExpressionException(ALTERNATIVE_MAY_NOT_BE_EMPTY + source);
                }
                checkNotParameterType(alternative, PARAMETER_TYPES_CANNOT_BE_ALTERNATIVE);
            }
            String pattern = Arrays.stream(alternatives)
                    .map(CucumberExpression::escapeRegex)
                    .collect(joining("|", "(?:", ")"));

            return new Token(pattern, Token.Type.ALTERNATION);
        });
    }

    private void checkNotParameterType(String s, String message) {
        Matcher matcher = PARAMETER_PATTERN.matcher(s);
        if (matcher.find()) {
            throw new CucumberExpressionException(message + source);
        }
    }

    private Function<Token, Stream<Token>> processOptional() {
        return splitTextTokens(OPTIONAL_PATTERN, (matchResult) -> {
            // look for double-escaped parentheses
            String parameterPart = matchResult.group(2);
            if (ESCAPE.equals(matchResult.group(1))) {
                return new Token("(" + parameterPart + ")", Token.Type.TEXT);
            }

            checkNotParameterType(parameterPart, PARAMETER_TYPES_CANNOT_BE_OPTIONAL);
            return new Token("(?:" + escapeRegex(parameterPart) + ")?", Token.Type.OPTIONAL);
        });
    }

    private Function<Token, Stream<Token>> processParameters() {
        return splitTextTokens(PARAMETER_PATTERN, (matchResult) -> {
            String typeName = matchResult.group(2);
            if (ESCAPE.equals(matchResult.group(1))) {
                return new Token("{" + typeName + "}", Token.Type.TEXT);
            }
            ParameterType.checkParameterTypeName(typeName);
            ParameterType<?> parameterType = parameterTypeRegistry.lookupByTypeName(typeName);
            if (parameterType == null) {
                throw new UndefinedParameterTypeException(typeName);
            }
            parameterTypes.add(parameterType);
            return new Token(buildCaptureRegexp(parameterType.getRegexps()), Token.Type.PARAMETER);
        });
    }

    private String buildCaptureRegexp(List<String> regexps) {
        if (regexps.size() == 1) {
            return "(" + regexps.get(0)  + ")";
        }
        return regexps.stream()
                .collect(joining(")|(?:", "((?:","))"));
    }

    private static Function<Token, Stream<Token>> splitTextTokens(Pattern pattern, Function<MatchResult, Token> processor) {
        return token -> {
            if (token.type != Token.Type.TEXT) {
                return Stream.of(token);
            }
            String expression = token.text;
            List<Token> tokens = new ArrayList<>();
            Matcher matcher = pattern.matcher(token.text);
            int previousEnd = 0;
            while (matcher.find()) {
                int start = matcher.start();
                int end = matcher.end();
                String prefix = expression.substring(previousEnd, start);
                if (!prefix.isEmpty()) {
                    tokens.add(new Token(prefix, Token.Type.TEXT));
                }
                tokens.add(processor.apply(matcher.toMatchResult()));
                previousEnd = end;
            }

            String suffix = expression.substring(previousEnd);
            if (!suffix.isEmpty()) {
                tokens.add(new Token(suffix, Token.Type.TEXT));
            }
            return tokens.stream();
        };
    }

    @Override
    public List<Argument<?>> match(String text, Type... typeHints) {
        final Group group = treeRegexp.match(text);
        if (group == null) {
            return null;
        }

        List<ParameterType<?>> parameterTypes = new ArrayList<>(this.parameterTypes);
        for (int i = 0; i < parameterTypes.size(); i++) {
            ParameterType<?> parameterType = parameterTypes.get(i);
            Type type = i < typeHints.length ? typeHints[i] : String.class;
            if (parameterType.isAnonymous()) {
                ParameterByTypeTransformer defaultTransformer = parameterTypeRegistry.getDefaultParameterTransformer();
                parameterTypes.set(i, parameterType.deAnonymize(type, arg -> defaultTransformer.transform(arg, type)));
            }
        }

        return Argument.build(group, treeRegexp, parameterTypes);
    }

    @Override
    public String getSource() {
        return source;
    }

    @Override
    public Pattern getRegexp() {
        return treeRegexp.pattern();
    }
}
