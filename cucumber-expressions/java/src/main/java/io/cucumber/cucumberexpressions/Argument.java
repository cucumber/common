package io.cucumber.cucumberexpressions;

public class Argument {
    private final int offset;
    private final String value;
    private final ParameterType parameterType;

    public Argument(Integer offset, String value, ParameterType parameterType) {
        this.offset = offset;
        this.value = value;
        this.parameterType = parameterType;
    }

    public int getOffset() {
        return offset;
    }

    public String getValue() {
        return value;
    }

    public Object getTransformedValue() {
        return parameterType.transform(value);
    }
}
