package io.cucumber.cucumberexpressions;

import java.util.List;

public class EnumParameterType<T extends Enum<T>> extends AbstractParameterType<T> {
    private final Class<T> enumClass;

    public EnumParameterType(Class<T> enumClass, List<String> regexps) {
        super(enumClass.getSimpleName().toLowerCase(), regexps, enumClass, true, false);
        this.enumClass = enumClass;
    }

    @Override
    public T transform(String value) {
        return Enum.valueOf(enumClass, value);
    }
}
