package io.cucumber.cucumberexpressions;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

public class RegularExpression implements Expression {
    private final Pattern expressionRegexp;
    private final ParameterTypeRegistry parameterTypeRegistry;
    private TreeRegexp treeRegexp;

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
        treeRegexp = new TreeRegexp(expressionRegexp);
    }

    @Override
    public List<Argument<?>> match(String text) {
        List<ParameterType<?>> parameterTypes = treeRegexp.getGroupBuilder().getChildren().stream().map(groupBuilder -> {
            String parameterTypeRegexp = groupBuilder.getSource();

            ParameterType<?> parameterType = parameterTypeRegistry.lookupByRegexp(parameterTypeRegexp, expressionRegexp, text);
            if (parameterType == null) parameterType = new ParameterType<>(
                    parameterTypeRegexp,
                    parameterTypeRegexp,
                    String.class,
                    new SingleTransformer<>(String::new)
            );
            return parameterType;
        }).collect(Collectors.toList());

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
