package io.cucumber.cucumberexpressions;

public class Argument {
    private final int offset;
    private final Object transformedValue;

    public Argument(Integer offset, Object transformedValue) {
        this.offset = offset;
        this.transformedValue = transformedValue;
    }

    public Object getTransformedValue() {
        return transformedValue;
    }

    public int getOffset() {
        return offset;
    }
}
