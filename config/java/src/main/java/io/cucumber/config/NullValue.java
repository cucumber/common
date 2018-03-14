package io.cucumber.config;

public class NullValue implements Value {
    @Override
    public String getString() {
        return null;
    }

    @Override
    public Boolean getBoolean() {
        return false;
    }

    @Override
    public Integer getInt() {
        return 0;
    }

    @Override
    public boolean isNull() {
        return true;
    }
}
