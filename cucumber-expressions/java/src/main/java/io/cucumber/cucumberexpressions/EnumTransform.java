package io.cucumber.cucumberexpressions;

import java.util.Collections;
import java.util.List;

public class EnumTransform<T extends Enum<T>> extends AbstractTransform<T> {
    private static final List<String> ANYTHING_GOES = Collections.singletonList(".+");

    public EnumTransform(Class<T> enumClass) {
        super(null, enumClass, ANYTHING_GOES);
    }

    @Override
    public T transform(String value) {
        return Enum.valueOf((Class<T>) getType(), value);
    }
}
