package io.cucumber.cucumberexpressions;

import org.apiguardian.api.API;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

import static io.cucumber.cucumberexpressions.CucumberExpressionTokenizer.Token.Type.BEGIN_PARAMETER;
import static io.cucumber.cucumberexpressions.CucumberExpressionTokenizer.Token.Type.END_PARAMETER;
import static java.util.stream.Collectors.joining;

@API(status = API.Status.STABLE)
public final class CucumberExpression implements Expression {
    private static final Pattern ESCAPE_PATTERN = Pattern.compile("([\\\\^\\[({$.|?*+})\\]])");
    private static final String PARAMETER_TYPES_CANNOT_BE_OPTIONAL = "Parameter types cannot be optional: ";
    private static final String PARAMETER_TYPES_CANNOT_BE_ALTERNATIVE = "Parameter types cannot be alternative: ";
    private static final String ALTERNATIVE_MAY_NOT_BE_EMPTY = "Alternative may not be empty: ";

    private final List<ParameterType<?>> parameterTypes = new ArrayList<>();
    private final String source;
    private final TreeRegexp treeRegexp;
    private final ParameterTypeRegistry parameterTypeRegistry;

    CucumberExpression(String expression, ParameterTypeRegistry parameterTypeRegistry) {
        this.source = expression;
        this.parameterTypeRegistry = parameterTypeRegistry;

        CucumberExpressionParser parser = new CucumberExpressionParser();
        List<CucumberExpressionParser.Node> parse = parser.parse(expression);

        String pattern = parse.stream()
                .map(this::process)
                .collect(joining("", "^", "$"));


        treeRegexp = new TreeRegexp(pattern);
    }

    private String process(CucumberExpressionParser.Node node) {
        if (node instanceof CucumberExpressionParser.Optional) {
            CucumberExpressionParser.Optional optional = (CucumberExpressionParser.Optional) node;
            checkNotParameterType(optional.tokens, PARAMETER_TYPES_CANNOT_BE_OPTIONAL);
            return "(?:" + escapeRegex(optional.getOptionalText()) + ")?";
        }

        if (node instanceof CucumberExpressionParser.Alternation) {
            CucumberExpressionParser.Alternation alternation = (CucumberExpressionParser.Alternation) node;
            validateAlternation(alternation);
            return alternation.getAlternatives()
                    .stream()
                    .map(CucumberExpression::escapeRegex)
                    .collect(joining("|","(?:",")"));
        }
        if (node instanceof CucumberExpressionParser.Parameter) {
            CucumberExpressionParser.Parameter parameter = (CucumberExpressionParser.Parameter) node;
            ParameterType.checkParameterTypeName(parameter.getParameterName());
            String typeName = parameter.getParameterName();
            ParameterType<?> parameterType = parameterTypeRegistry.lookupByTypeName(typeName);
            if (parameterType == null) {
                throw new UndefinedParameterTypeException(typeName);
            }
            parameterTypes.add(parameterType);
            return buildCaptureRegexp(parameterType.getRegexps());
        }

        if (node instanceof CucumberExpressionParser.Text) {
            CucumberExpressionParser.Text text = (CucumberExpressionParser.Text) node;
            return escapeRegex(text.getText());
        }

        throw new IllegalArgumentException(node.getClass().getName());
    }

    private void validateAlternation(CucumberExpressionParser.Alternation alternation) {
        // Make sure the alternative parts aren't empty and don't contain parameter types
        if (alternation.alternatives.isEmpty()) {
            throw new CucumberExpressionException(ALTERNATIVE_MAY_NOT_BE_EMPTY + source);
        }

        for (List<CucumberExpressionTokenizer.Token> alternative : alternation.alternatives) {
            if (alternative.isEmpty()) {
                throw new CucumberExpressionException(ALTERNATIVE_MAY_NOT_BE_EMPTY + source);
            }
            checkNotParameterType(alternative, PARAMETER_TYPES_CANNOT_BE_ALTERNATIVE);
        }
    }

    private static String escapeRegex(String text) {
        return ESCAPE_PATTERN.matcher(text).replaceAll("\\\\$1");
    }

    private void checkNotParameterType(List<CucumberExpressionTokenizer.Token> tokens, String message) {
        int beginParameterIndex = -1;
        int endParameterIndex = -1;
        for (int i = 0; i < tokens.size(); i++) {
            CucumberExpressionTokenizer.Token token = tokens.get(i);
            if (beginParameterIndex == -1 && token.type == BEGIN_PARAMETER) {
                beginParameterIndex = i;
            }
            if (endParameterIndex == -1 && token.type == END_PARAMETER) {
                endParameterIndex = i;
            }
        }
        if(beginParameterIndex == -1 || endParameterIndex == -1){
            return;
        }
        if (beginParameterIndex < endParameterIndex) {
            throw new CucumberExpressionException(message + source);
        }
    }

    private String buildCaptureRegexp(List<String> regexps) {
        if (regexps.size() == 1) {
            return "(" + regexps.get(0) + ")";
        }
        return regexps.stream()
                .collect(joining(")|(?:", "((?:", "))"));
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
