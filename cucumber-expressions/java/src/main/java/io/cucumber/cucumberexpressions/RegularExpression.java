package io.cucumber.cucumberexpressions;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

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
        List<ParameterType<?>> parameterTypes = new ArrayList<>();
        for (GroupBuilder groupBuilder : treeRegexp.getGroupBuilder().getChildren()) {
            String parameterTypeRegexp = groupBuilder.getSource();

            ParameterType<?> parameterType = parameterTypeRegistry.lookupByRegexp(parameterTypeRegexp, expressionRegexp, text);
            if (parameterType == null) parameterType = new ParameterType<>(
                    null,
                    parameterTypeRegexp,
                    String.class,
                    new Transformer<String>() {
                        @Override
                        public String transform(String arg) {
                            return arg;
                        }
                    }
            );
            parameterTypes.add(parameterType);
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
