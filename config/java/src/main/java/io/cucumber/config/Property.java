package io.cucumber.config;

import java.io.IOException;
import java.util.List;

import static java.lang.Integer.parseInt;

public class Property implements Value {
    private String value;

    public Property(String value) {
        if (value == null) throw new NullPointerException("value cannot be null");
        this.value = value;
    }

    public static Value fromInteger(int value) {
        return new Property(Integer.toString(value));
    }

    public static Value fromBoolean(boolean value) {
        return new Property(Boolean.toString(value));
    }

    @Override
    public void print(int depth, String rootKey, Appendable out) throws IOException {
        throw new UnsupportedOperationException("TODO");
    }

    @Override
    public String asString() {
        return value;
    }

    @Override
    public Boolean asBoolean() {
        return !value.matches("false|no|off");
    }

    @Override
    public Integer asInt() {
        return parseInt(value);
    }

    @Override
    public boolean isNull() {
        return false;
    }

    @Override
    public Value getValue(String property) {
        throw new UnsupportedOperationException("TODO");
    }

    @Override
    public Value getChild(String property) {
        throw new UnsupportedOperationException("TODO");
    }

    @Override
    public void setValue(String property, Value value) {
        throw new UnsupportedOperationException("TODO");
    }

    @Override
    public void setNull(String property) {
        throw new UnsupportedOperationException("TODO");
    }

    @Override
    public boolean isProperty() {
        return true;
    }

    @Override
    public List<Value> asList() {
        throw new UnsupportedOperationException("TODO");
    }

    @Override
    public void update(Value value) {
        this.value = value.asString();
    }
}
