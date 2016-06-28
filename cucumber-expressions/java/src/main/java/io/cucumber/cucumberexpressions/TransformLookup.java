package io.cucumber.cucumberexpressions;

import java.text.NumberFormat;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

public class TransformLookup {
    private static final String FIXNUM_REGEXP = "-?\\d+";
    private static final String FLOATING_POINT_REGEXP = "-?\\d*[\\.,]?\\d+";
    private static final String STRING_REGEXP = ".+";

    private Map<Class<?>, Transform<?>> transformsByType = new HashMap<>();
    private Map<String, Transform<?>> transformsByName = new HashMap<>();

    public TransformLookup(Locale locale) {
        NumberFormat numberFormat = NumberFormat.getNumberInstance(locale);
        final NumberParser numberParser = new NumberParser(numberFormat);

        addTransform(new Transform<Byte>(Byte.class, FIXNUM_REGEXP) {
            @Override
            public Byte transform(String value) {
                return numberParser.parseByte(value);
            }
        });
        addTransform(new FunctionTransform<>(Byte.class, FIXNUM_REGEXP, numberParser::parseByte));
        addTransform(new FunctionTransform<>(short.class, FIXNUM_REGEXP, numberParser::parseShort));
        addTransform(new FunctionTransform<>(Short.class, FIXNUM_REGEXP, numberParser::parseShort));
        addTransform(new FunctionTransform<>(int.class, FIXNUM_REGEXP, numberParser::parseInt));
        addTransform(new FunctionTransform<>(Integer.class, FIXNUM_REGEXP, numberParser::parseInt));
        addTransform(new FunctionTransform<>(long.class, FIXNUM_REGEXP, numberParser::parseLong));
        addTransform(new FunctionTransform<>(Long.class, FIXNUM_REGEXP, numberParser::parseLong));
        addTransform(new FunctionTransform<>(double.class, FLOATING_POINT_REGEXP, numberParser::parseDouble));
        addTransform(new FunctionTransform<>(Double.class, FLOATING_POINT_REGEXP, numberParser::parseDouble));
        addTransform(new FunctionTransform<>(float.class, FLOATING_POINT_REGEXP, numberParser::parseFloat));
        addTransform(new FunctionTransform<>(Float.class, FLOATING_POINT_REGEXP, numberParser::parseFloat));
        addTransform(new FunctionTransform<>(String.class, STRING_REGEXP, (String s) -> s));
    }

    public void addTransform(Transform<?> transform) {
        String name = transform.getType().getSimpleName().toLowerCase();
        transformsByName.put(name, transform);
        transformsByType.put(transform.getType(), transform);
    }

    public <T> Transform<T> lookup(Class<T> type) {
        return (Transform<T>) transformsByType.get(type);
    }

    public Transform<?> lookup(String name) {
        return transformsByName.get(name);
    }
}
