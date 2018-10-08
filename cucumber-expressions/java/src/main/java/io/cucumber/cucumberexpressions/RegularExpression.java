package io.cucumber.cucumberexpressions;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

public class RegularExpression implements Expression {
    private final Pattern expressionRegexp;
    private final ParameterTypeRegistry parameterTypeRegistry;
    private final TreeRegexp treeRegexp;

    /**
     * Creates a new instance. Use this when the transform types are not known in advance,
     * and should be determined by the regular expression's capture groups. Use this with
     * dynamically typed languages.
     *
     * @param expressionRegexp      the regular expression to use
     * @param parameterTypeRegistry used to look up parameter types
     */
    public RegularExpression(Pattern expressionRegexp, ParameterTypeRegistry parameterTypeRegistry) {
        this.expressionRegexp = expressionRegexp;
        this.parameterTypeRegistry = parameterTypeRegistry;
        this.treeRegexp = new TreeRegexp(expressionRegexp);
    }

    @Override
    public List<Argument<?>> match(String text, Type... types) {
        List<ParameterType<?>> parameterTypes = new ArrayList<>();
        int typeIndex = 0;
        for (GroupBuilder groupBuilder : treeRegexp.getGroupBuilder().getChildren()) {
            if (typeIndex < types.length) {
                Type type = types[typeIndex++];
                ParameterType<?> parameterType = parameterTypeRegistry.lookupByType(type, text);
                if (parameterType == null) {
                    throw new CucumberExpressionException(String.format("No parameter type for type %s", type.getTypeName()));
                }
                parameterTypes.add(parameterType);
            } else {
                String parameterTypeRegexp = groupBuilder.getSource();

                ParameterType<?> parameterType = parameterTypeRegistry.lookupByRegexp(parameterTypeRegexp, expressionRegexp, text);
                if (parameterType == null) parameterType = new ParameterType<>(
                        null,
                        parameterTypeRegexp,
                        String.class,
                        (Transformer<String>) arg -> arg
                );
                parameterTypes.add(parameterType);
            }
        }

        return Argument.build(treeRegexp, parameterTypes, text);
    }

    @Override
    public Pattern getRegexp() {
        return expressionRegexp;
    }

    @Override
    public String getSource() {
        return expressionRegexp.pattern();
    }
}
