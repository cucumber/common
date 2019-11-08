package io.cucumber.cucumberexpressions;

import io.cucumber.cucumberexpressions.Ast.AstNode;
import org.apiguardian.api.API;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

import static io.cucumber.cucumberexpressions.Ast.AstNode.Type.PARAMETER_NODE;
import static io.cucumber.cucumberexpressions.Ast.AstNode.Type.TEXT_NODE;
import static java.util.stream.Collectors.joining;

@API(status = API.Status.STABLE)
public final class CucumberExpression implements Expression {
    private static final Pattern ESCAPE_PATTERN = Pattern.compile("([\\\\^\\[({$.|?*+})\\]])");
    private static final String PARAMETER_TYPES_CANNOT_BE_OPTIONAL = "Parameter types cannot be optional: ";
    private static final String PARAMETER_TYPES_CANNOT_BE_ALTERNATIVE = "Parameter types cannot be alternative: ";
    private static final String ALTERNATIVE_MAY_NOT_BE_EMPTY = "Alternative may not be empty: ";
    private static final String OPTIONAL_MAY_NOT_BE_EMPTY = "Optional may not be empty: ";
    private static final String ALTERNATIVE_MAY_NOT_EXCLUSIVELY_CONTAIN_OPTIONALS = "Alternative may not exclusively contain optionals: ";

    private final List<ParameterType<?>> parameterTypes = new ArrayList<>();
    private final String source;
    private final TreeRegexp treeRegexp;
    private final ParameterTypeRegistry parameterTypeRegistry;

    CucumberExpression(String expression, ParameterTypeRegistry parameterTypeRegistry) {
        this.source = expression;
        this.parameterTypeRegistry = parameterTypeRegistry;

        CucumberExpressionParser parser = new CucumberExpressionParser();
        AstNode ast = parser.parse(expression);
        String pattern = rewriteToRegex(ast);
        treeRegexp = new TreeRegexp(pattern);
    }

    private String rewriteToRegex(AstNode node) {
        switch (node.getType()) {
            case OPTIONAL_NODE:
                assertNoParameters(node, PARAMETER_TYPES_CANNOT_BE_OPTIONAL);
                assertNotEmpty(node, OPTIONAL_MAY_NOT_BE_EMPTY);
                return node.getNodes().stream()
                        .map(this::rewriteToRegex)
                        .collect(joining("", "(?:", ")?"));
            case ALTERNATION_NODE:
                validateAlternation(node);
                return node.getNodes()
                        .stream()
                        .map(this::rewriteToRegex)
                        .collect(joining("|", "(?:", ")"));
            case ALTERNATIVE_NODE:
                return node.getNodes().stream()
                        .map(this::rewriteToRegex)
                        .collect(joining());
            case PARAMETER_NODE:
                String name = node.getNodes().stream()
                        .map(AstNode::getText)
                        .collect(joining());
                ParameterType.checkParameterTypeName(name);
                ParameterType<?> parameterType = parameterTypeRegistry.lookupByTypeName(name);
                if (parameterType == null) {
                    throw new UndefinedParameterTypeException(name);
                }
                parameterTypes.add(parameterType);
                List<String> regexps = parameterType.getRegexps();
                if (regexps.size() == 1) {
                    return "(" + regexps.get(0) + ")";
                }
                return regexps.stream()
                        .collect(joining(")|(?:", "((?:", "))"));
            case TEXT_NODE:
                return escapeRegex(node.getText());
            case EXPRESSION_NODE:
                return node.getNodes().stream()
                        .map(this::rewriteToRegex)
                        .collect(joining("", "^", "$"));
            default:
                throw new IllegalArgumentException(node.getType().name());
        }
    }

    private void assertNotEmpty(AstNode node, String message) {
        boolean hasTextNode = node.getNodes()
                .stream()
                .map(AstNode::getType)
                .anyMatch(type -> type == TEXT_NODE);
        if (!hasTextNode) {
            throw new CucumberExpressionException(message + source);
        }
    }

    private void validateAlternation(AstNode alternation) {
        // Make sure the alternative parts aren't empty and don't contain parameter types
        for (AstNode alternative : alternation.getNodes()) {
            if (alternative.getNodes().isEmpty()) {
                throw new CucumberExpressionException(ALTERNATIVE_MAY_NOT_BE_EMPTY + source);
            }
            assertNoParameters(alternative, PARAMETER_TYPES_CANNOT_BE_ALTERNATIVE);
            assertNotEmpty(alternative, ALTERNATIVE_MAY_NOT_EXCLUSIVELY_CONTAIN_OPTIONALS);
        }
    }

    private void assertNoParameters(AstNode node, String parameterTypesCannotBeAlternative) {
        boolean hasParameter = node.getNodes().stream()
                .map(AstNode::getType)
                .anyMatch(type -> type == PARAMETER_NODE);
        if (hasParameter) {
            throw new CucumberExpressionException(parameterTypesCannotBeAlternative + source);
        }
    }

    private static String escapeRegex(String text) {
        return ESCAPE_PATTERN.matcher(text).replaceAll("\\\\$1");
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
