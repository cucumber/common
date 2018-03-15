package io.cucumber.config;

import java.util.ArrayList;
import java.util.List;

public class PropertyList implements Value {
    private final List<Value> values = new ArrayList<>();

    @Override
    public Value get(String key) {
        throw new UnsupportedOperationException();
    }

    @Override
    public void set(String key, Value value) {
        throw new UnsupportedOperationException();
    }

    @Override
    public void print(int depth, String rootKey, Appendable out) {
        throw new UnsupportedOperationException();
    }

    @Override
    public String asString() {
        throw new UnsupportedOperationException();
    }

    @Override
    public Boolean asBoolean() {
        throw new UnsupportedOperationException();
    }

    @Override
    public Integer asInt() {
        throw new UnsupportedOperationException();
    }

    @Override
    public boolean isNull() {
        throw new UnsupportedOperationException();
    }

    @Override
    public Value getValue(String property) {
        throw new UnsupportedOperationException();
    }

    @Override
    public Value getChild(String property) {
        throw new UnsupportedOperationException();
    }

    @Override
    public void setValue(String property, Value value) {
        throw new UnsupportedOperationException();
    }

    @Override
    public boolean isProperty() {
        throw new UnsupportedOperationException();
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
