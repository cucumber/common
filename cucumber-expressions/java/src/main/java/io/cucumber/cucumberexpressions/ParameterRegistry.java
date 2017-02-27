package io.cucumber.cucumberexpressions;

import java.lang.reflect.Type;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.text.NumberFormat;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import static java.util.Arrays.asList;

public class ParameterRegistry {
    private static final List<String> INTEGER_REGEXPS = asList("-?\\d+", "\\d+");
    private static final String FLOAT_REGEXP = "-?\\d*[\\.,]\\d+";
    private static final String HEX_REGEXP = "0[xX][0-9a-fA-F]{2}";

    private Map<Type, Parameter<?>> parametersByType = new HashMap<>();
    private Map<String, Parameter<?>> parametersByTypeName = new HashMap<>();
    private Map<String, Parameter<?>> parametersByCaptureGroupRegexp = new HashMap<>();

    public ParameterRegistry(Locale locale) {
        NumberFormat numberFormat = NumberFormat.getNumberInstance(locale);
        final NumberParser numberParser = new NumberParser(numberFormat);

        addPredefinedParameter(new SimpleParameter<>("bigint", BigInteger.class, INTEGER_REGEXPS, new Function<String, BigInteger>() {
            @Override
            public BigInteger apply(String s) {
                return new BigInteger(s);
            }
        }));
        addPredefinedParameter(new SimpleParameter<>("bigdecimal", BigDecimal.class, INTEGER_REGEXPS, new Function<String, BigDecimal>() {
            @Override
            public BigDecimal apply(String s) {
                return new BigDecimal(s);
            }
        }));
        addPredefinedParameter(new SimpleParameter<>("byte", byte.class, HEX_REGEXP, new Function<String, Byte>() {
            @Override
            public Byte apply(String s) {
                return Byte.decode(s);
            }
        }));
        addPredefinedParameter(new SimpleParameter<>("byte", Byte.class, HEX_REGEXP, new Function<String, Byte>() {
            @Override
            public Byte apply(String s) {
                return Byte.decode(s);
            }
        }));
        addPredefinedParameter(new SimpleParameter<>("short", short.class, INTEGER_REGEXPS, new Function<String, Short>() {
            @Override
            public Short apply(String s) {
                return Short.decode(s);
            }
        }));
        addPredefinedParameter(new SimpleParameter<>("short", Short.class, INTEGER_REGEXPS, new Function<String, Short>() {
            @Override
            public Short apply(String s) {
                return Short.decode(s);
            }
        }));
        addPredefinedParameter(new SimpleParameter<>("int", int.class, INTEGER_REGEXPS, new Function<String, Integer>() {
            @Override
            public Integer apply(String s) {
                return Integer.decode(s);
            }
        }));
        addPredefinedParameter(new SimpleParameter<>("int", Integer.class, INTEGER_REGEXPS, new Function<String, Integer>() {
            @Override
            public Integer apply(String s) {
                return Integer.decode(s);
            }
        }));
        addPredefinedParameter(new SimpleParameter<>("long", long.class, INTEGER_REGEXPS, new Function<String, Long>() {
            @Override
            public Long apply(String s) {
                return Long.decode(s);
            }
        }));
        addPredefinedParameter(new SimpleParameter<>("long", Long.class, INTEGER_REGEXPS, new Function<String, Long>() {
            @Override
            public Long apply(String s) {
                return Long.decode(s);
            }
        }));
        addPredefinedParameter(new SimpleParameter<>("float", float.class, FLOAT_REGEXP, new Function<String, Float>() {
            @Override
            public Float apply(String s) {
                return numberParser.parseFloat(s);
            }
        }));
        addPredefinedParameter(new SimpleParameter<>("float", Float.class, FLOAT_REGEXP, new Function<String, Float>() {
            @Override
            public Float apply(String s) {
                return numberParser.parseFloat(s);
            }
        }));
        addPredefinedParameter(new SimpleParameter<>("double", double.class, FLOAT_REGEXP, new Function<String, Double>() {
            @Override
            public Double apply(String s) {
                return numberParser.parseDouble(s);
            }
        }));
        addPredefinedParameter(new SimpleParameter<>("double", Double.class, FLOAT_REGEXP, new Function<String, Double>() {
            @Override
            public Double apply(String s) {
                return numberParser.parseDouble(s);
            }
        }));
    }

    public void addParameter(Parameter<?> parameter) {
        addParameter0(parameter, true);
    }

    private void addPredefinedParameter(Parameter<?> parameter) {
        addParameter0(parameter, false);
    }

    private void addParameter0(Parameter<?> parameter, boolean checkConflicts) {
        put(parametersByType, parameter.getType(), parameter, "type", parameter.getType().getTypeName(), checkConflicts);
        put(parametersByTypeName, parameter.getTypeName(), parameter, "type name", parameter.getTypeName(), checkConflicts);

        for (String captureGroupRegexp : parameter.getCaptureGroupRegexps()) {
            put(parametersByCaptureGroupRegexp, captureGroupRegexp, parameter, "regexp", captureGroupRegexp, checkConflicts);
        }
    }

    private <K> void put(Map<K, Parameter<?>> map, K key, Parameter<?> parameter, String prop, String keyName, boolean checkConflicts) {
        if (checkConflicts && map.containsKey(key))
            throw new RuntimeException(String.format("There is already a parameter with %s %s", prop, keyName));
        map.put(key, parameter);
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
