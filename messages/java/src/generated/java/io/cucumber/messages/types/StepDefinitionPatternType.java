package io.cucumber.messages.types;

// Generated code
@SuppressWarnings("unused")
public enum StepDefinitionPatternType {

    CUCUMBER_EXPRESSION("CUCUMBER_EXPRESSION"),

    REGULAR_EXPRESSION("REGULAR_EXPRESSION");

    private final String value;

    StepDefinitionPatternType(String value) {
        this.value = value;
    }

    @Override
    public String toString() {
        return this.value;
    }

    public String value() {
        return this.value;
    }

    public static StepDefinitionPatternType fromValue(String value) {
        for (StepDefinitionPatternType v : values()) {
            if (v.value.equals(value)) {
                return v;
            }
        }
        throw new IllegalArgumentException(value);
    }
}
