package io.cucumber.cucumberexpressions;

public class SingleTransformer<T> implements Transformer<T> {
    private final Function<String, T> function;

    public SingleTransformer(Function<String, T> function) {
        this.function = function;
    }

    @Override
    public T transform(String... groupValues) {
        if (groupValues == null) return null;
        String arg = null;
        for (String groupValue : groupValues) {
            if (groupValue != null) {
                if (arg != null)
                    throw new CucumberExpressionException(String.format("Single transformer unexpectedly matched 2 values - \"%s\" and \"%s\"", arg, groupValue));
                arg = groupValue;
            }
        }
        if (arg == null) return null;
        return function.apply(arg);
    }
}
