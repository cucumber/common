package io.cucumber.cucumberexpressions;

import org.apiguardian.api.API;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import static java.util.Collections.singletonList;

@API(status = API.Status.STABLE)
public final class CucumberExpression implements Expression {
    // Does not include (){} characters because they have special meaning
    private static final Pattern ESCAPE_PATTERN = Pattern.compile("([\\\\^\\[$.|?*+\\]])");
    @SuppressWarnings("RegExpRedundantEscape") // Android can't parse unescaped braces
    static final Pattern PARAMETER_PATTERN = Pattern.compile("(\\\\\\\\)?\\{([^}]*)\\}");
    private static final Pattern OPTIONAL_PATTERN = Pattern.compile("(\\\\\\\\)?\\(([^)]+)\\)");
    private static final Pattern ALTERNATIVE_NON_WHITESPACE_TEXT_REGEXP = Pattern.compile("([^\\s^/]+)((/[^\\s^/]+)+)");
    private static final String DOUBLE_ESCAPE = "\\\\";
    private static final String PARAMETER_TYPES_CANNOT_BE_ALTERNATIVE = "Parameter types cannot be alternative: ";
    private static final String PARAMETER_TYPES_CANNOT_BE_OPTIONAL = "Parameter types cannot be optional: ";

    private final List<ParameterType<?>> parameterTypes = new ArrayList<>();
    private final String source;
    private final TreeRegexp treeRegexp;
    private final ParameterTypeRegistry parameterTypeRegistry;

    private static class Token {
        private Token(String text, Type type) {
            this.text = text;
            this.type = type;
        }

        private enum Type {
            TEXT, OPTIONAL, ALTERNATION, PARAMETER
        }

        String text;
        Type type;
    }


    CucumberExpression(String expression, ParameterTypeRegistry parameterTypeRegistry) {
        this.source = expression;
        this.parameterTypeRegistry = parameterTypeRegistry;

        expression = processEscapes(expression);
        List<Token> tokens = singletonList(new Token(expression, Token.Type.TEXT));

        tokens = splitTextSections(tokens, OPTIONAL_PATTERN, Token.Type.OPTIONAL);
        tokens = processOptional(tokens);

        tokens = splitTextSections(tokens, ALTERNATIVE_NON_WHITESPACE_TEXT_REGEXP, Token.Type.ALTERNATION);
        tokens = processAlternation(tokens);

        tokens = splitTextSections(tokens, PARAMETER_PATTERN, Token.Type.PARAMETER);
        tokens = processParameters(tokens, parameterTypeRegistry);

        expression = "^" + join(tokens) + "$";
        treeRegexp = new TreeRegexp(expression);
    }

    private String join(List<Token> tokens) {
        return tokens.stream()
                .map(token -> token.text)
                .collect(Collectors.joining());
    }

    private List<Token> splitTextSections(List<Token> unprocessed, Pattern pattern, Token.Type type) {
        List<Token> tokens = new ArrayList<>();
        for (Token token : unprocessed) {
            if (token.type != Token.Type.TEXT) {
                tokens.add(token);
                continue;
            }
            String expression = token.text;
            Matcher matcher = pattern.matcher(expression);
            int previousEnd = 0;
            while (matcher.find()) {
                int start = matcher.start();
                int end = matcher.end();
                String prefix = expression.substring(previousEnd, start);
                tokens.add(new Token(prefix, Token.Type.TEXT));
                String match = expression.substring(start, end);
                tokens.add(new Token(match, type));
                previousEnd = end;
            }
            String suffix = expression.substring(previousEnd);
            tokens.add(new Token(suffix, Token.Type.TEXT));
        }
        return tokens;
    }

    private String processEscapes(String expression) {
        // This will cause explicitly-escaped parentheses to be double-escaped
        return ESCAPE_PATTERN.matcher(expression).replaceAll("\\\\$1");
    }

    private List<Token> processAlternation(List<Token> ex) {
        for (Token token : ex) {
            if (token.type != Token.Type.ALTERNATION) {
                continue;
            }
            String expression = token.text;
            Matcher matcher = ALTERNATIVE_NON_WHITESPACE_TEXT_REGEXP.matcher(expression);
            StringBuffer sb = new StringBuffer();
            while (matcher.find()) {
                // replace \/ with /
                // replace / with |
                String replacement = matcher.group(0).replace('/', '|').replaceAll("\\\\\\|", "/");

                if (replacement.contains("|")) {
                    // Make sure the alternative parts don't contain parameter types
                    for (String part : replacement.split("\\|")) {
                        checkNotParameterType(part, PARAMETER_TYPES_CANNOT_BE_ALTERNATIVE);
                    }
                    matcher.appendReplacement(sb, "(?:" + replacement + ")");
                } else {
                    // All / were escaped
                    token.type = Token.Type.TEXT;
                    matcher.appendReplacement(sb, replacement);
                }
            }
            matcher.appendTail(sb);
            token.text = sb.toString();
        }
        return ex;
    }

    private void checkNotParameterType(String s, String message) {
        Matcher matcher = PARAMETER_PATTERN.matcher(s);
        if (matcher.find()) {
            throw new CucumberExpressionException(message + source);
        }
    }

    private List<Token> processOptional(List<Token> tokens) {
        for (Token token : tokens) {
            if (token.type != Token.Type.OPTIONAL) {
                continue;
            }
            String expression = token.text;
            Matcher matcher = OPTIONAL_PATTERN.matcher(expression);
            StringBuffer sb = new StringBuffer();
            while (matcher.find()) {
                // look for double-escaped parentheses
                String parameterPart = matcher.group(2);
                if (DOUBLE_ESCAPE.equals(matcher.group(1))) {
                    matcher.appendReplacement(sb, "\\\\(" + parameterPart + "\\\\)");
                    token.type = Token.Type.TEXT;
                } else {
                    checkNotParameterType(parameterPart, PARAMETER_TYPES_CANNOT_BE_OPTIONAL);
                    matcher.appendReplacement(sb, "(?:" + parameterPart + ")?");
                }
            }
            matcher.appendTail(sb);
            token.text = sb.toString();
        }
        return tokens;
    }

    private List<Token> processParameters(List<Token> tokens, ParameterTypeRegistry parameterTypeRegistry) {
        for (Token token : tokens) {
            if (token.type != Token.Type.PARAMETER) {
                continue;
            }
            String expression = token.text;
            StringBuffer sb = new StringBuffer();
            Matcher matcher = PARAMETER_PATTERN.matcher(expression);
            while (matcher.find()) {
                if (DOUBLE_ESCAPE.equals(matcher.group(1))) {
                    matcher.appendReplacement(sb, "\\\\{" + matcher.group(2) + "\\\\}");
                    token.type = Token.Type.TEXT;
                } else {
                    String typeName = matcher.group(2);
                    ParameterType.checkParameterTypeName(typeName);
                    ParameterType<?> parameterType = parameterTypeRegistry.lookupByTypeName(typeName);
                    if (parameterType == null) {
                        throw new UndefinedParameterTypeException(typeName);
                    }
                    parameterTypes.add(parameterType);
                    matcher.appendReplacement(sb, Matcher.quoteReplacement(buildCaptureRegexp(parameterType.getRegexps())));
                }
            }
            matcher.appendTail(sb);
            token.text = sb.toString();
        }
        return tokens;
    }

    private String buildCaptureRegexp(List<String> regexps) {
        StringBuilder sb = new StringBuilder("(");

        if (regexps.size() == 1) {
            sb.append(regexps.get(0));
        } else {
            boolean bar = false;
            for (String captureGroupRegexp : regexps) {
                if (bar) sb.append("|");
                sb.append("(?:").append(captureGroupRegexp).append(")");
                bar = true;
            }
        }

        sb.append(")");
        return sb.toString();
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
