package io.cucumber.cucumberexpressions;

import java.lang.reflect.Type;
import java.util.List;

public abstract class AbstractParameterType<T> implements ParameterType<T> {
    private final String name;
    private final Type type;
    private final List<String> regexps;
    private final boolean isPreferential;

    public AbstractParameterType(String name, Type type, boolean isPreferential, List<String> regexps) {
        this.isPreferential = isPreferential;
        if (name == null) throw new RuntimeException("name can't be null");
        this.name = name;
        this.type = type;
        this.regexps = regexps;
    }

    @Override
    public String getName() {
        return name;
    }

    @Override
    public Type getType() {
        return type;
    }

    @Override
    public List<String> getRegexps() {
        return regexps;
    }

    @Override
    public boolean isPreferential() {
        return isPreferential;
    }
}
