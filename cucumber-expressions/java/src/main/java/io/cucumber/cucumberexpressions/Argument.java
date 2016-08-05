package io.cucumber.cucumberexpressions;

public class Argument {
    private final int offset;
    private final String value;
    private final Object transformedValue;

    public Argument(Integer offset, String value, Object transformedValue) {
        this.offset = offset;
        this.value = value;
        this.transformedValue = transformedValue;
    }

    public int getOffset() {
        return offset;
    }

    public String getValue() {
        return value;
    }

    public Object getTransformedValue() {
        return transformedValue;
    }
}
