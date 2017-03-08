package io.cucumber.cucumberexpressions;

import java.lang.reflect.Type;
import java.util.List;

import static java.util.Collections.singletonList;

public abstract class AbstractParameterType<T> implements ParameterType<T> {
    private final String typeName;
    private final Type type;
    private final List<String> regexps;

    public AbstractParameterType(String name, Type type, List<String> regexps) {
        this.regexps = regexps;
        this.typeName = name;
        this.type = type;
    }

    public AbstractParameterType(String typeName, Type type, String regexp) {
        this(typeName, type, singletonList(regexp));
    }

    @Override
    public String getName() {
        return typeName;
    }

    @Override
    public Type getType() {
        return type;
    }

    @Override
    public List<String> getRegexps() {
        return regexps;
    }
}
