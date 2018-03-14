package io.cucumber.config;

import java.util.ArrayList;
import java.util.List;

public class PropertyList implements Value {
    private final List<Value> values = new ArrayList<>();

    @Override
    public void print(int depth, String rootKey, Appendable out) {
        throw new UnsupportedOperationException("TODO");
    }

    @Override
    public String asString() {
        throw new UnsupportedOperationException("TODO");
    }

    @Override
    public Boolean asBoolean() {
        throw new UnsupportedOperationException("TODO");
    }

    @Override
    public Integer asInt() {
        throw new UnsupportedOperationException("TODO");
    }

    @Override
    public boolean isNull() {
        throw new UnsupportedOperationException("TODO");
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
        throw new UnsupportedOperationException("TODO");
    }

    @Override
    public List<Value> asList() {
        return values;
    }

    @Override
    public void update(Value value) {
        values.add(value);
    }
}
