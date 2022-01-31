package io.cucumber.messages.types;

// Generated code
@SuppressWarnings("unused")
public enum TestStepResultStatus {

    UNKNOWN("UNKNOWN"),

    PASSED("PASSED"),

    SKIPPED("SKIPPED"),

    PENDING("PENDING"),

    UNDEFINED("UNDEFINED"),

    AMBIGUOUS("AMBIGUOUS"),

    FAILED("FAILED");

    private final String value;

    TestStepResultStatus(String value) {
        this.value = value;
    }

    @Override
    public String toString() {
        return this.value;
    }

    public String value() {
        return this.value;
    }

    public static TestStepResultStatus fromValue(String value) {
        for (TestStepResultStatus v : values()) {
            if (v.value.equals(value)) {
                return v;
            }
        }
        throw new IllegalArgumentException(value);
    }
}
