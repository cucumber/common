package io.cucumber.cucumberexpressions;

import java.lang.reflect.Type;
import java.util.List;
import java.util.regex.Pattern;

public class UndefinedParameterTypeExpression implements Expression {
    private final String source;

    public UndefinedParameterTypeExpression(String source) {
        this.source = source;
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
}
