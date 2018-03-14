package io.cucumber.config;

import java.io.IOException;

public interface Value {
    void print(int depth, String rootKey, Appendable out) throws IOException;

    String asString();

    Boolean asBoolean();

    Integer asInt();

    boolean isNull();

    Value getValue(String property);

    Value getChild(String property);

    void setValue(String property, Value value);

    void setNull(String property);

    boolean isProperty();
}
