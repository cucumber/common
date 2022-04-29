package io.cucumber.messages.types;

// Generated code
@SuppressWarnings("unused")
public enum PickleStepType {

    UNKNOWN("Unknown"),

    CONTEXT("Context"),

    ACTION("Action"),

    OUTCOME("Outcome");

    private final String value;

    PickleStepType(String value) {
        this.value = value;
    }

    @Override
    public String toString() {
        return this.value;
    }

    public String value() {
        return this.value;
    }

    public static PickleStepType fromValue(String value) {
        for (PickleStepType v : values()) {
            if (v.value.equals(value)) {
                return v;
            }
        }
        throw new IllegalArgumentException(value);
    }
}
