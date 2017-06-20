package io.cucumber.cucumberexpressions;

public class SingleTransformer<T> implements Transformer<T> {
    private final Function<String, T> function;

    public SingleTransformer(Function<String, T> function) {
        this.function = function;
    }

    @Override
    public T transform(String... groupValues) {
        String arg;
        if (groupValues == null) {
            arg = null;
        } else if (groupValues.length == 1) {
            arg = groupValues[0];
        } else {
            throw new CucumberExpressionException(String.format("Expected 1 group, but got %d", groupValues.length));
        }
        return arg == null ? null : function.apply(arg);
    }
}
