package io.cucumber.config;

import java.io.IOException;
import java.util.List;

public interface Value {
    Value get(String key);

    void set(String key, Value value);

    String asString();

    Boolean asBoolean();

    Integer asInt();

    List<Value> asList();

    boolean isEmpty();

    void print(int depth, String rootKey, Appendable out) throws IOException;

    Value getValue(String property);

    Value getChild(String property);

    void setValue(String property, Value value);

    void update(Value value);

    boolean isProperty();
}
