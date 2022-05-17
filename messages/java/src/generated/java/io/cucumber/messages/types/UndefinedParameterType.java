package io.cucumber.messages.types;

import java.util.ArrayList;
import java.util.Objects;
import java.util.Optional;

import static java.util.Collections.unmodifiableList;
import static java.util.Objects.requireNonNull;

// Generated code
@SuppressWarnings("unused")
public final class UndefinedParameterType {
    private final String expression;
    private final String name;

    public UndefinedParameterType(
        String expression,
        String name
    ) {
        this.expression = requireNonNull(expression, "UndefinedParameterType.expression cannot be null");
        this.name = requireNonNull(name, "UndefinedParameterType.name cannot be null");
    }

    public String getExpression() {
        return expression;
    }

    public String getName() {
        return name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UndefinedParameterType that = (UndefinedParameterType) o;
        return 
            expression.equals(that.expression) &&         
            name.equals(that.name);        
    }

    @Override
    public int hashCode() {
        return Objects.hash(
            expression,
            name
        );
    }

    @Override
    public String toString() {
        return "UndefinedParameterType{" +
            "expression=" + expression +
            ", name=" + name +
            '}';
    }
}
