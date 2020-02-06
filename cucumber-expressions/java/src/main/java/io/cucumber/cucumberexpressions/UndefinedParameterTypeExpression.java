package io.cucumber.cucumberexpressions;

import java.lang.reflect.Type;
import java.util.List;
import java.util.Set;
import java.util.regex.Pattern;

import static java.util.Collections.unmodifiableSet;

final class UndefinedParameterTypeExpression implements Expression {
    private final String source;
    private final Set<String> undefinedParameterTypeNames;

    UndefinedParameterTypeExpression(String source, Set<String> undefinedParameterTypeNames) {
        this.source = source;
        this.undefinedParameterTypeNames = undefinedParameterTypeNames;
    }

    @Override
    public List<Argument<?>> match(String text, Type... typeHints) {
        return null;
    }

    @Override
    public Pattern getRegexp() {
        return Pattern.compile(".^"); // matches nothing
    }

    @Override
    public String getSource() {
        return source;
    }

    @Override
    public Set<String> getUndefinedParameterTypeNames() {
        return unmodifiableSet(undefinedParameterTypeNames);
    }
}
