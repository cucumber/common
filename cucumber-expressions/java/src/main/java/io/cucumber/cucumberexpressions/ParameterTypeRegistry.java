package io.cucumber.cucumberexpressions;

import java.lang.reflect.Type;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import static java.util.Arrays.asList;

public class ParameterTypeRegistry {
    private static final List<String> INTEGER_REGEXPS = asList("-?\\d+", "\\d+");
    private static final String FLOAT_REGEXP = "-?\\d*[\\.,]\\d+";
    private static final String HEX_REGEXP = "0[xX][0-9a-fA-F]{2}";

    private final Map<Type, ParameterType<?>> parameterTypesByType = new HashMap<>();
    private final Map<String, ParameterType<?>> parameterTypesByTypeName = new HashMap<>();
    private final Map<String, List<ParameterType<?>>> parameterTypesByRegexp = new HashMap<>();

    public ParameterTypeRegistry(Locale locale) {
        NumberFormat numberFormat = NumberFormat.getNumberInstance(locale);
        final NumberParser numberParser = new NumberParser(numberFormat);

        definePredefinedParameterType(new SimpleParameterType<>("bigint", BigInteger.class, INTEGER_REGEXPS, new Function<String, BigInteger>() {
            @Override
            public BigInteger apply(String s) {
                return new BigInteger(s);
            }
        }));
        definePredefinedParameterType(new SimpleParameterType<>("bigdecimal", BigDecimal.class, INTEGER_REGEXPS, new Function<String, BigDecimal>() {
            @Override
            public BigDecimal apply(String s) {
                return new BigDecimal(s);
            }
        }));
        definePredefinedParameterType(new SimpleParameterType<>("byte", byte.class, HEX_REGEXP, new Function<String, Byte>() {
            @Override
            public Byte apply(String s) {
                return Byte.decode(s);
            }
        }));
        definePredefinedParameterType(new SimpleParameterType<>("byte", Byte.class, HEX_REGEXP, new Function<String, Byte>() {
            @Override
            public Byte apply(String s) {
                return Byte.decode(s);
            }
        }));
        definePredefinedParameterType(new SimpleParameterType<>("short", short.class, INTEGER_REGEXPS, new Function<String, Short>() {
            @Override
            public Short apply(String s) {
                return Short.decode(s);
            }
        }));
        definePredefinedParameterType(new SimpleParameterType<>("short", Short.class, INTEGER_REGEXPS, new Function<String, Short>() {
            @Override
            public Short apply(String s) {
                return Short.decode(s);
            }
        }));
        definePredefinedParameterType(new SimpleParameterType<>("int", int.class, INTEGER_REGEXPS, new Function<String, Integer>() {
            @Override
            public Integer apply(String s) {
                return Integer.decode(s);
            }
        }));
        definePredefinedParameterType(new SimpleParameterType<>("int", Integer.class, INTEGER_REGEXPS, new Function<String, Integer>() {
            @Override
            public Integer apply(String s) {
                return Integer.decode(s);
            }
        }));
        definePredefinedParameterType(new SimpleParameterType<>("long", long.class, INTEGER_REGEXPS, new Function<String, Long>() {
            @Override
            public Long apply(String s) {
                return Long.decode(s);
            }
        }));
        definePredefinedParameterType(new SimpleParameterType<>("long", Long.class, INTEGER_REGEXPS, new Function<String, Long>() {
            @Override
            public Long apply(String s) {
                return Long.decode(s);
            }
        }));
        definePredefinedParameterType(new SimpleParameterType<>("float", float.class, FLOAT_REGEXP, new Function<String, Float>() {
            @Override
            public Float apply(String s) {
                return numberParser.parseFloat(s);
            }
        }));
        definePredefinedParameterType(new SimpleParameterType<>("float", Float.class, FLOAT_REGEXP, new Function<String, Float>() {
            @Override
            public Float apply(String s) {
                return numberParser.parseFloat(s);
            }
        }));
        definePredefinedParameterType(new SimpleParameterType<>("double", double.class, FLOAT_REGEXP, new Function<String, Double>() {
            @Override
            public Double apply(String s) {
                return numberParser.parseDouble(s);
            }
        }));
        definePredefinedParameterType(new SimpleParameterType<>("double", Double.class, FLOAT_REGEXP, new Function<String, Double>() {
            @Override
            public Double apply(String s) {
                return numberParser.parseDouble(s);
            }
        }));
    }

    public void defineParameterType(ParameterType<?> parameterType) {
        defineParameterType0(parameterType, true);
    }

    private void definePredefinedParameterType(ParameterType<?> parameterType) {
        defineParameterType0(parameterType, false);
    }

    private void defineParameterType0(ParameterType<?> parameterType, boolean checkConflicts) {
        if (parameterType.getType() != null) {
            put(parameterTypesByType, parameterType.getType(), parameterType, "type", parameterType.getType().getTypeName(), checkConflicts);
        }
        put(parameterTypesByTypeName, parameterType.getName(), parameterType, "type name", parameterType.getName(), checkConflicts);

        for (String captureGroupRegexp : parameterType.getRegexps()) {
            if (!parameterTypesByRegexp.containsKey(captureGroupRegexp)) {
                parameterTypesByRegexp.put(captureGroupRegexp, new ArrayList<>());
            }
            List<ParameterType<?>> parameterTypes = parameterTypesByRegexp.get(captureGroupRegexp);
            parameterTypes.add(parameterType);
        }
    }

    private <K> void put(Map<K, ParameterType<?>> map, K key, ParameterType<?> parameterType, String prop, String keyName, boolean checkConflicts) {
        if (checkConflicts && map.containsKey(key))
            throw new RuntimeException(String.format("There is already a parameter type with %s %s", prop, keyName));
        map.put(key, parameterType);
    }

    public <T> ParameterType<T> lookupByType(Type type) {
        return (ParameterType<T>) parameterTypesByType.get(type);
    }

    public <T> ParameterType<T> lookupByTypeName(String typeName) {
        return (ParameterType<T>) parameterTypesByTypeName.get(typeName);
    }

    public <T> ParameterType<T> lookupByRegexp(String regexp) {
        List<ParameterType<?>> parameterTypes = parameterTypesByRegexp.get(regexp);
        if (parameterTypes == null) return null;
        return (ParameterType<T>) parameterTypes.get(parameterTypes.size() - 1);
    }

    public Collection<ParameterType<?>> getParameters() {
        return parameterTypesByType.values();
    }
}
