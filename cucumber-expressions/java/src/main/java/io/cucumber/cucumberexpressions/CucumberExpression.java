package io.cucumber.cucumberexpressions;

import io.cucumber.cucumberexpressions.Ast.Node;
import org.apiguardian.api.API;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
import java.util.function.Function;
import java.util.regex.Pattern;

import static io.cucumber.cucumberexpressions.Ast.Node.Type.OPTIONAL_NODE;
import static io.cucumber.cucumberexpressions.Ast.Node.Type.PARAMETER_NODE;
import static io.cucumber.cucumberexpressions.Ast.Node.Type.TEXT_NODE;
import static io.cucumber.cucumberexpressions.CucumberExpressionException.createAlternativeMayNotBeEmpty;
import static io.cucumber.cucumberexpressions.CucumberExpressionException.createAlternativeMayNotExclusivelyContainOptionals;
import static io.cucumber.cucumberexpressions.CucumberExpressionException.createInvalidParameterTypeName;
import static io.cucumber.cucumberexpressions.CucumberExpressionException.createOptionalIsNotAllowedInOptional;
import static io.cucumber.cucumberexpressions.CucumberExpressionException.createOptionalMayNotBeEmpty;
import static io.cucumber.cucumberexpressions.CucumberExpressionException.createParameterIsNotAllowedInOptional;
import static io.cucumber.cucumberexpressions.ParameterType.isValidParameterTypeName;
import static io.cucumber.cucumberexpressions.UndefinedParameterTypeException.createUndefinedParameterType;
import static java.util.stream.Collectors.joining;

@API(status = API.Status.STABLE)
public final class CucumberExpression implements Expression {
    private static final Pattern ESCAPE_PATTERN = Pattern.compile("([\\\\^\\[({$.|?*+})\\]])");

    private final List<ParameterType<?>> parameterTypes = new ArrayList<>();
    private final String source;
    private final TreeRegexp treeRegexp;
    private final ParameterTypeRegistry parameterTypeRegistry;

    CucumberExpression(String expression, ParameterTypeRegistry parameterTypeRegistry) {
        this.source = expression;
        this.parameterTypeRegistry = parameterTypeRegistry;

        CucumberExpressionParser parser = new CucumberExpressionParser();
        Node ast = parser.parse(expression);
        String pattern = rewriteToRegex(ast);
        treeRegexp = new TreeRegexp(pattern);
    }

    private String rewriteToRegex(Node node) {
        switch (node.type()) {
            case TEXT_NODE:
                return escapeRegex(node.text());
            case OPTIONAL_NODE:
                return rewriteOptional(node);
            case ALTERNATION_NODE:
                return rewriteAlternation(node);
            case ALTERNATIVE_NODE:
                return rewriteAlternative(node);
            case PARAMETER_NODE:
                return rewriteParameter(node);
            case EXPRESSION_NODE:
                return rewriteExpression(node);
            default:
                // Can't happen as long as the switch case is exhaustive
                throw new IllegalArgumentException(node.type().name());
        }
    }

    private static String escapeRegex(String text) {
        return ESCAPE_PATTERN.matcher(text).replaceAll("\\\\$1");
    }

    private String rewriteOptional(Node node) {
        assertNoParameters(node, astNode -> createParameterIsNotAllowedInOptional(astNode, source));
        assertNoOptionals(node, astNode -> createOptionalIsNotAllowedInOptional(astNode, source));
        assertNotEmpty(node, astNode -> createOptionalMayNotBeEmpty(astNode, source));
        return node.nodes().stream()
                .map(this::rewriteToRegex)
                .collect(joining("", "(?:", ")?"));
    }

    private String rewriteAlternation(Node node) {
        // Make sure the alternative parts aren't empty and don't contain parameter types
        for (Node alternative : node.nodes()) {
            if (alternative.nodes().isEmpty()) {
                throw createAlternativeMayNotBeEmpty(alternative, source);
            }
            assertNotEmpty(alternative, astNode -> createAlternativeMayNotExclusivelyContainOptionals(astNode, source));
        }
        return node.nodes()
                .stream()
                .map(this::rewriteToRegex)
                .collect(joining("|", "(?:", ")"));
    }

    private String rewriteAlternative(Node node) {
        return node.nodes().stream()
                .map(this::rewriteToRegex)
                .collect(joining());
    }

    private String rewriteParameter(Node node) {
        String name = node.text();
        ParameterType<?> parameterType = parameterTypeRegistry.lookupByTypeName(name);
        if (parameterType == null) {
            throw createUndefinedParameterType(node, source, name);
        }
        parameterTypes.add(parameterType);
        List<String> regexps = parameterType.getRegexps();
        if (regexps.size() == 1) {
            return "(" + regexps.get(0) + ")";
        }
        return regexps.stream()
                .collect(joining(")|(?:", "((?:", "))"));
    }


    private String rewriteExpression(Node node) {
        return node.nodes().stream()
                .map(this::rewriteToRegex)
                .collect(joining("", "^", "$"));
    }

    private void assertNotEmpty(Node node,
            Function<Node, CucumberExpressionException> createNodeWasNotEmptyException) {
        node.nodes()
                .stream()
                .filter(astNode -> TEXT_NODE.equals(astNode.type()))
                .findFirst()
                .orElseThrow(() -> createNodeWasNotEmptyException.apply(node));
    }

    private void assertNoParameters(Node node,
            Function<Node, CucumberExpressionException> createNodeContainedAParameterException) {
        assertNoNodeOfType(PARAMETER_NODE, node, createNodeContainedAParameterException);
    }

    private void assertNoOptionals(Node node,
            Function<Node, CucumberExpressionException> createNodeContainedAnOptionalException) {
        assertNoNodeOfType(OPTIONAL_NODE, node, createNodeContainedAnOptionalException);
    }

    private void assertNoNodeOfType(Node.Type nodeType, Node node,
            Function<Node, CucumberExpressionException> createException) {
        node.nodes()
                .stream()
                .filter(astNode -> nodeType.equals(astNode.type()))
                .map(createException)
                .findFirst()
                .ifPresent(exception -> {
                    throw exception;
                });
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

        return Argument.build(group, parameterTypes);
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
