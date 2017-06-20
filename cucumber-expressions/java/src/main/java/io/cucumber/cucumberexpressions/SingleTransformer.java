package io.cucumber.cucumberexpressions;

public class SingleTransformer<T> implements Transformer<T> {
    private final Function<String, T> function;

    public SingleTransformer(Function<String, T> function) {
        this.function = function;
    }

    @Override
    public T transform(String... groups) {
        String arg;
        if (groups == null) {
            arg = null;
        } else if (groups.length == 1) {
            arg = groups[0];
        } else {
            throw new CucumberExpressionException(String.format("Expected 1 group, but got %d", groups.length));
        }
        return arg == null ? null : function.apply(arg);
    }
}
