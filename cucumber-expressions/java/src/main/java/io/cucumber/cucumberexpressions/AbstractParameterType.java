package io.cucumber.cucumberexpressions;

import java.lang.reflect.Type;
import java.util.List;

import static java.util.Collections.singletonList;

public abstract class AbstractParameterType<T> implements ParameterType<T> {
    private final String name;
    private final Type type;
    private final List<String> regexps;

    public AbstractParameterType(String name, Type type, List<String> regexps) {
        if(name == null) throw new RuntimeException("name can't be null");
        this.name = name;
        this.type = type;
        this.regexps = regexps;
    }

    public AbstractParameterType(String name, Type type, String regexp) {
        this(name, type, singletonList(regexp));
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
}
