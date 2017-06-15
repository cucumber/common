package io.cucumber.cucumberexpressions;

import java.lang.reflect.Type;
import java.util.List;

public abstract class AbstractParameterType<T> implements ParameterType<T> {
    private final String name;
    private final Type type;
    private final List<String> regexps;
    private final boolean preferForRegexpMatch;
    private final boolean useForSnippets;

    public AbstractParameterType(String name, List<String> regexps, Type type, boolean useForSnippets, boolean preferForRegexpMatch) {
        if (name == null) throw new CucumberExpressionException("name cannot be null");
        if (type == null) throw new CucumberExpressionException("type cannot be null");
        if (regexps == null) throw new CucumberExpressionException("regexps cannot be null");
        this.name = name;
        this.type = type;
        this.preferForRegexpMatch = preferForRegexpMatch;
        this.useForSnippets = useForSnippets;
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
    public boolean preferForRegexpMatch() {
        return preferForRegexpMatch;
    }

    @Override
    public boolean useForSnippets() {
        return useForSnippets;
    }
}
