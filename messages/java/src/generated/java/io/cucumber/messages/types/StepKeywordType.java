package io.cucumber.messages.types;

// Generated code
@SuppressWarnings("unused")
public enum StepKeywordType {

    UNKNOWN("Unknown"),

    CONTEXT("Context"),

    ACTION("Action"),

    OUTCOME("Outcome"),

    CONJUNCTION("Conjunction");

    private final String value;

    StepKeywordType(String value) {
        this.value = value;
    }

    @Override
    public String toString() {
        return this.value;
    }

    public String value() {
        return this.value;
    }

    public static StepKeywordType fromValue(String value) {
        for (StepKeywordType v : values()) {
            if (v.value.equals(value)) {
                return v;
            }
        }
        throw new IllegalArgumentException(value);
    }
}
