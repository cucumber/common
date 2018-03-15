package io.cucumber.config;

import java.io.IOException;
import java.util.List;

public interface Value {
    Value getIn(String key);

    void setIn(String key, Value value);

    void print(int depth, String rootKey, Appendable out) throws IOException;

    String asString();

    Boolean asBoolean();

    Integer asInt();

    boolean isNull();

    Value getValue(String property);

    Value getChild(String property);

    void setValue(String property, Value value);

    boolean isProperty();

    List<Value> asList();

    void update(Value value);
}
