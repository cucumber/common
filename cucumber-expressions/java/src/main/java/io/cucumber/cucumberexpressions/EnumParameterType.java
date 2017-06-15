package io.cucumber.cucumberexpressions;

import java.util.Collections;
import java.util.List;

public class EnumParameterType<T extends Enum<T>> extends AbstractParameterType<T> {
    private static final List<String> ANYTHING_GOES = Collections.singletonList(".+");
    private final Class<T> enumClass;

    public EnumParameterType(Class<T> enumClass) {
        super(enumClass.getSimpleName().toLowerCase(), enumClass, false, ANYTHING_GOES);
        this.enumClass = enumClass;
    }

    @Override
    public T transform(String value) {
        return Enum.valueOf(enumClass, value);
    }
}
