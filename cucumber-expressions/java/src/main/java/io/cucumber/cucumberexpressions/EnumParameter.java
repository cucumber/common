package io.cucumber.cucumberexpressions;

import java.util.Collections;
import java.util.List;

public class EnumParameter<T extends Enum<T>> extends AbstractParameter<T> {
    private static final List<String> ANYTHING_GOES = Collections.singletonList(".+");

    public EnumParameter(Class<T> enumClass) {
        super(null, enumClass, ANYTHING_GOES);
    }

    @Override
    public T transform(String value) {
        return Enum.valueOf((Class<T>) getType(), value);
    }
}
