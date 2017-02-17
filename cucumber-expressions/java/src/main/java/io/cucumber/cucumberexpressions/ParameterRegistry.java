package io.cucumber.cucumberexpressions;

import java.lang.reflect.Type;
import java.text.NumberFormat;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import static java.util.Arrays.asList;
import static java.util.Collections.singletonList;

public class ParameterRegistry {
    private static final List<String> INTEGER_REGEXPS = asList("-?\\d+", "\\d+");
    private static final List<String> FLOAT_REGEXPS = singletonList("-?\\d*[\\.,]\\d+");

    private Map<Type, Parameter<?>> parametersByType = new HashMap<>();
    private Map<String, Parameter<?>> parametersByTypeName = new HashMap<>();
    private Map<String, Parameter<?>> parametersByCaptureGroupRegexp = new HashMap<>();

    public ParameterRegistry(Locale locale) {
        NumberFormat numberFormat = NumberFormat.getNumberInstance(locale);
        final NumberParser numberParser = new NumberParser(numberFormat);

        addParameter(new SimpleParameter<>("byte", byte.class, INTEGER_REGEXPS, new Function<String, Byte>() {
            @Override
            public Byte apply(String s) {
                return numberParser.parseByte(s);
            }
        }));
        addParameter(new SimpleParameter<>("byte", Byte.class, INTEGER_REGEXPS, new Function<String, Byte>() {
            @Override
            public Byte apply(String s) {
                return numberParser.parseByte(s);
            }
        }));
        addParameter(new SimpleParameter<>("short", short.class, INTEGER_REGEXPS, new Function<String, Short>() {
            @Override
            public Short apply(String s) {
                return numberParser.parseShort(s);
            }
        }));
        addParameter(new SimpleParameter<>("short", Short.class, INTEGER_REGEXPS, new Function<String, Short>() {
            @Override
            public Short apply(String s) {
                return numberParser.parseShort(s);
            }
        }));
        addParameter(new SimpleParameter<>("int", int.class, INTEGER_REGEXPS, new Function<String, Integer>() {
            @Override
            public Integer apply(String s) {
                return numberParser.parseInt(s);
            }
        }));
        addParameter(new SimpleParameter<>("int", Integer.class, INTEGER_REGEXPS, new Function<String, Integer>() {
            @Override
            public Integer apply(String s) {
                return numberParser.parseInt(s);
            }
        }));
        addParameter(new SimpleParameter<>("long", long.class, INTEGER_REGEXPS, new Function<String, Long>() {
            @Override
            public Long apply(String s) {
                return numberParser.parseLong(s);
            }
        }));
        addParameter(new SimpleParameter<>("long", Long.class, INTEGER_REGEXPS, new Function<String, Long>() {
            @Override
            public Long apply(String s) {
                return numberParser.parseLong(s);
            }
        }));
        addParameter(new SimpleParameter<>("float", float.class, FLOAT_REGEXPS, new Function<String, Float>() {
            @Override
            public Float apply(String s) {
                return numberParser.parseFloat(s);
            }
        }));
        addParameter(new SimpleParameter<>("float", Float.class, FLOAT_REGEXPS, new Function<String, Float>() {
            @Override
            public Float apply(String s) {
                return numberParser.parseFloat(s);
            }
        }));
        addParameter(new SimpleParameter<>("double", double.class, FLOAT_REGEXPS, new Function<String, Double>() {
            @Override
            public Double apply(String s) {
                return numberParser.parseDouble(s);
            }
        }));
        addParameter(new SimpleParameter<>("double", Double.class, FLOAT_REGEXPS, new Function<String, Double>() {
            @Override
            public Double apply(String s) {
                return numberParser.parseDouble(s);
            }
        }));
    }

    public void addParameter(Parameter<?> parameter) {
        parametersByType.put(parameter.getType(), parameter);
        parametersByTypeName.put(parameter.getTypeName(), parameter);

        for (String captureGroupRegexp : parameter.getCaptureGroupRegexps()) {
            parametersByCaptureGroupRegexp.put(captureGroupRegexp, parameter);
        }
    }

    public <T> Parameter<T> lookupByType(Type type) {
        return (Parameter<T>) parametersByType.get(type);
    }

    public <T> Parameter<T> lookupByTypeName(String typeName) {
        return (Parameter<T>) parametersByTypeName.get(typeName);
    }

    public <T> Parameter<T> lookupByCaptureGroupRegexp(String captureGroupPattern) {
        return (Parameter<T>) parametersByCaptureGroupRegexp.get(captureGroupPattern);
    }

    public Collection<Parameter<?>> getParameters() {
        return parametersByType.values();
    }
}
