package io.cucumber.cucumberexpressions;

import java.text.NumberFormat;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import static java.util.Arrays.asList;
import static java.util.Collections.singletonList;

public class TransformLookup {
    private static final List<String> FIXNUM_REGEXPS = asList("-?\\d+", "\\d+");
    private static final List<String> FLOATING_POINT_REGEXPS = singletonList("-?\\d*[\\.,]\\d+");

    private Map<Class<?>, Transform<?>> transformsByType = new HashMap<>();
    private Map<String, Transform<?>> transformsByTypeName = new HashMap<>();
    private Map<String, Transform<?>> transformsByCaptureGroupRegexp = new HashMap<>();

    public TransformLookup(Locale locale) {
        NumberFormat numberFormat = NumberFormat.getNumberInstance(locale);
        final NumberParser numberParser = new NumberParser(numberFormat);

        // TODO: Convert to Java7 - shouldn't have to use Java8
        addTransform(new FunctionTransform<>("byte", byte.class, FIXNUM_REGEXPS, numberParser::parseByte));
        addTransform(new FunctionTransform<>("byte", Byte.class, FIXNUM_REGEXPS, numberParser::parseByte));
        addTransform(new FunctionTransform<>("short", short.class, FIXNUM_REGEXPS, numberParser::parseShort));
        addTransform(new FunctionTransform<>("short", Short.class, FIXNUM_REGEXPS, numberParser::parseShort));
        addTransform(new FunctionTransform<>("int", int.class, FIXNUM_REGEXPS, numberParser::parseInt));
        addTransform(new FunctionTransform<>("int", Integer.class, FIXNUM_REGEXPS, numberParser::parseInt));
        addTransform(new FunctionTransform<>("long", long.class, FIXNUM_REGEXPS, numberParser::parseLong));
        addTransform(new FunctionTransform<>("long", Long.class, FIXNUM_REGEXPS, numberParser::parseLong));
        addTransform(new FunctionTransform<>("float", float.class, FLOATING_POINT_REGEXPS, numberParser::parseFloat));
        addTransform(new FunctionTransform<>("float", Float.class, FLOATING_POINT_REGEXPS, numberParser::parseFloat));
        addTransform(new FunctionTransform<>("double", double.class, FLOATING_POINT_REGEXPS, numberParser::parseDouble));
        addTransform(new FunctionTransform<>("double", Double.class, FLOATING_POINT_REGEXPS, numberParser::parseDouble));
    }

    public void addTransform(Transform<?> transform) {
        transformsByType.put(transform.getType(), transform);
        transformsByTypeName.put(transform.getTypeName(), transform);

        for (String captureGroupRegexp : transform.getCaptureGroupRegexps()) {
            transformsByCaptureGroupRegexp.put(captureGroupRegexp, transform);
        }
    }

    public <T> Transform<T> lookupByType(Class<T> type) {
        return (Transform<T>) transformsByType.get(type);
    }

    public Transform<?> lookupByType(String typeName, boolean ignoreUnknownTypeName) {
        Transform<?> transform = transformsByTypeName.get(typeName);
        if(transform == null) {
            if(ignoreUnknownTypeName) {
                return null;
            } else {
                throw new CucumberExpressionException(String.format("No transformer for type name \"%s\"", typeName));
            }
        }
        return transform;
    }

    public Transform lookupByCaptureGroupRegexp(String captureGroupPattern) {
        return transformsByCaptureGroupRegexp.get(captureGroupPattern);
    }

    public Collection<Transform<?>> getTransforms() {
        return transformsByType.values();
    }
}
