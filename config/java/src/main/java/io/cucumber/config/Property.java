package io.cucumber.config;

import java.io.IOException;
import java.util.List;

import static io.cucumber.config.Config.indent;
import static java.lang.Integer.parseInt;

public class Property implements Value {
    private String value;
    private final String comment;

    public Property(String value, String comment) {
        this.value = value;
        this.comment = comment;
    }

    public static Value fromInteger(int value, String comment) {
        return new Property(Integer.toString(value), comment);
    }

    public static Value fromBoolean(boolean value, String comment) {
        return new Property(Boolean.toString(value), comment);
    }

    @Override
    public Value get(String key) {
        throw new UnsupportedOperationException();
    }

    @Override
    public void set(String key, Value value) {
        throw new UnsupportedOperationException();
    }

    @Override
    public void print(int depth, String key, boolean list, Appendable out) throws IOException {
        if (comment != null) {
            indent(depth, out);
            out.append("# ").append(comment).append("\n");
        }
        indent(depth, out);
        if (key != null) {
            out.append(key).append(":");
        }
        if (list) {
            out.append("-");
        }
        if (!isEmpty()) {
            out.append(" ").append(asString());
        }
        out.append("\n");
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
    public boolean isEmpty() {
        return value == null;
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
        return true;
    }

    @Override
    public List<Value> asList() {
        throw new UnsupportedOperationException();
    }

    @Override
    public void update(Value value) {
        this.value = value.asString();
    }
}
