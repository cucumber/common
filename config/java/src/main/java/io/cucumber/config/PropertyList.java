package io.cucumber.config;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import static io.cucumber.config.Config.indent;

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
    public void print(int depth, String rootKey, Appendable out) throws IOException {
        List<Value> values = asList();
        for (Value value : values) {
            indent(depth, out);
            out.append("-");
            value.print(0, null, out);
        }
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
    public boolean isEmpty() {
        return values.isEmpty();
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
        return false;
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
