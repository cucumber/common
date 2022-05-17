package io.cucumber.messages.types;

// Generated code
@SuppressWarnings("unused")
public enum AttachmentContentEncoding {

    IDENTITY("IDENTITY"),

    BASE64("BASE64");

    private final String value;

    AttachmentContentEncoding(String value) {
        this.value = value;
    }

    @Override
    public String toString() {
        return this.value;
    }

    public String value() {
        return this.value;
    }

    public static AttachmentContentEncoding fromValue(String value) {
        for (AttachmentContentEncoding v : values()) {
            if (v.value.equals(value)) {
                return v;
            }
        }
        throw new IllegalArgumentException(value);
    }
}
