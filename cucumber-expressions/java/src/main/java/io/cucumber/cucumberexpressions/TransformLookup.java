package io.cucumber.cucumberexpressions;

import java.text.NumberFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import static java.util.Arrays.asList;
import static java.util.Collections.singletonList;

public class TransformLookup {
    private static final List<String> FIXNUM_REGEXPS = asList("-?\\d+", "\\d+");
    private static final List<String> FLOATING_POINT_REGEXPS = singletonList("-?\\d*[\\.,]?\\d+");
    private static final List<String> STRING_REGEXPS = singletonList(".+");

    private Map<Class<?>, Transform<?>> transformsByType = new HashMap<>();
    private Map<String, Transform<?>> transformsByName = new HashMap<>();
    private Map<String, Transform<?>> transformsByCaptureGroupRegexp = new HashMap<>();

    public TransformLookup(Locale locale) {
        NumberFormat numberFormat = NumberFormat.getNumberInstance(locale);
        final NumberParser numberParser = new NumberParser(numberFormat);

        // TODO: Convert to Java7 - shouldn't have to use Java8
        addTransform(new FunctionTransform<>(byte.class, FIXNUM_REGEXPS, numberParser::parseByte));
        addTransform(new FunctionTransform<>(Byte.class, FIXNUM_REGEXPS, numberParser::parseByte));
        addTransform(new FunctionTransform<>(short.class, FIXNUM_REGEXPS, numberParser::parseShort));
        addTransform(new FunctionTransform<>(Short.class, FIXNUM_REGEXPS, numberParser::parseShort));
        addTransform(new FunctionTransform<>(int.class, FIXNUM_REGEXPS, numberParser::parseInt));
        addTransform(new FunctionTransform<>(Integer.class, FIXNUM_REGEXPS, numberParser::parseInt));
        addTransform(new FunctionTransform<>(long.class, FIXNUM_REGEXPS, numberParser::parseLong));
        addTransform(new FunctionTransform<>(Long.class, FIXNUM_REGEXPS, numberParser::parseLong));
        addTransform(new FunctionTransform<>(float.class, FLOATING_POINT_REGEXPS, numberParser::parseFloat));
        addTransform(new FunctionTransform<>(Float.class, FLOATING_POINT_REGEXPS, numberParser::parseFloat));
        addTransform(new FunctionTransform<>(double.class, FLOATING_POINT_REGEXPS, numberParser::parseDouble));
        addTransform(new FunctionTransform<>(Double.class, FLOATING_POINT_REGEXPS, numberParser::parseDouble));
        addTransform(new FunctionTransform<>(String.class, STRING_REGEXPS, (String s) -> s));
    }

    public void addTransform(Transform<?> transform) {
        String name = transform.getType().getSimpleName().toLowerCase();
        transformsByName.put(name, transform);
        transformsByType.put(transform.getType(), transform);
        for (String captureGroupRegexp : transform.getCaptureGroupRegexps()) {
            // Any previously registered transforms will be clobbered. That's ok - the last one
            // wins. We're registering Long and Double converters last - as they have the most precision
            // and can be cast to "smaller" types if necessary
            transformsByCaptureGroupRegexp.put(captureGroupRegexp, transform);
        }
    }

    public <T> Transform<T> lookup(Class<T> type) {
        return (Transform<T>) transformsByType.get(type);
    }

    public Transform<?> lookup(String name) {
        return transformsByName.get(name);
    }

    public Transform lookupByCaptureGroupRegexp(String captureGroupPattern) {
        return transformsByCaptureGroupRegexp.get(captureGroupPattern);
    }
}
