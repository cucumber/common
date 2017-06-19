package io.cucumber.cucumberexpressions;

import java.util.List;

public class SingleTransformer<T> implements Transformer<T> {
    private final Function<String, T> function;

    public SingleTransformer(Function<String, T> function) {
        this.function = function;
    }

    @Override
    public T transform(List<Group> groups) {
        String arg;
        if (groups == null) {
            arg = null;
        } else {
            arg = groups.get(0).getValue();
        }
        return arg == null ? null : function.apply(arg);
    }
}
