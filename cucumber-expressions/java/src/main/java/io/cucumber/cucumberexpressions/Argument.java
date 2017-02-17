package io.cucumber.cucumberexpressions;

public class Argument {
    private final int offset;
    private final String value;
    private final Parameter parameter;

    public Argument(Integer offset, String value, Parameter parameter) {
        this.offset = offset;
        this.value = value;
        this.parameter = parameter;
    }

    public int getOffset() {
        return offset;
    }

    public String getValue() {
        return value;
    }

    public Object getTransformedValue() {
        return parameter.transform(value);
    }
}
