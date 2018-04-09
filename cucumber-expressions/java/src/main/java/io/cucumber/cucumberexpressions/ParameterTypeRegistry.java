package io.cucumber.cucumberexpressions;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.text.NumberFormat;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.SortedSet;
import java.util.TreeSet;
import java.util.regex.Pattern;

import static java.util.Arrays.asList;
import static java.util.Collections.singletonList;

public class ParameterTypeRegistry {
    // Pattern.compile(...).pattern() is not necessary, but it helps us take advantage of the IntelliJ's regexp validation,
    // which detects unneeded escapes.
    private static final List<String> INTEGER_REGEXPS = asList(Pattern.compile("-?\\d+").pattern(), Pattern.compile("\\d+").pattern());
    private static final List<String> FLOAT_REGEXPS = singletonList(Pattern.compile("-?\\d*[.,]\\d+").pattern());
    private static final List<String> HEX_REGEXPS = singletonList(Pattern.compile("0[xX][0-9a-fA-F]{2}").pattern());
    private static final List<String> WORD_REGEXPS = singletonList(Pattern.compile("\\w+").pattern());
    private static final List<String> STRING_REGEXPS = singletonList(Pattern.compile("\"([^\"\\\\]*(\\\\.[^\"\\\\]*)*)\"|'([^'\\\\]*(\\\\.[^'\\\\]*)*)'").pattern());
    private final Map<String, ParameterType<?>> parameterTypeByName = new HashMap<>();
    private final Map<String, SortedSet<ParameterType<?>>> parameterTypesByRegexp = new HashMap<>();

    public ParameterTypeRegistry(Locale locale) {
        NumberFormat numberFormat = NumberFormat.getNumberInstance(locale);
        final NumberParser numberParser = new NumberParser(numberFormat);

        defineParameterType(new ParameterType<>("biginteger", INTEGER_REGEXPS, BigInteger.class, new Transformer<BigInteger>() {
            @Override
            public BigInteger apply(String... args) {
                return new BigInteger(args[0]);
            }
        }, false, false));
        defineParameterType(new ParameterType<>("bigdecimal", FLOAT_REGEXPS, BigDecimal.class, new Transformer<BigDecimal>() {
            @Override
            public BigDecimal apply(String... args) {
                return new BigDecimal(args[0]);
            }
        }, false, false));
        defineParameterType(new ParameterType<>("byte", HEX_REGEXPS, Byte.class, new Transformer<Byte>() {
            @Override
            public Byte apply(String... args) {
                return Byte.decode(args[0]);
            }
        }, true, false));
        defineParameterType(new ParameterType<>("short", INTEGER_REGEXPS, Short.class, new Transformer<Short>() {
            @Override
            public Short apply(String... args) {
                return Short.decode(args[0]);
            }
        }, false, false));
        defineParameterType(new ParameterType<>("int", INTEGER_REGEXPS, Integer.class, new Transformer<Integer>() {
            @Override
            public Integer apply(String... args) {
                return Integer.decode(args[0]);
            }
        }, true, true));
        defineParameterType(new ParameterType<>("long", INTEGER_REGEXPS, Long.class, new Transformer<Long>() {
            @Override
            public Long apply(String... args) {
                return Long.decode(args[0]);
            }
        }, false, false));
        defineParameterType(new ParameterType<>("float", FLOAT_REGEXPS, Float.class, new Transformer<Float>() {
            @Override
            public Float apply(String... args) {
                return numberParser.parseFloat(args[0]);
            }
        }, false, false));
        defineParameterType(new ParameterType<>("double", FLOAT_REGEXPS, Double.class, new Transformer<Double>() {
            @Override
            public Double apply(String... args) {
                return numberParser.parseDouble(args[0]);
            }
        }, true, true));
        defineParameterType(new ParameterType<>("word", WORD_REGEXPS, String.class, new Transformer<String>() {
            @Override
            public String apply(String... args) {
                return args[0];
            }
        }, false, false));
        defineParameterType(new ParameterType<>("string", STRING_REGEXPS, String.class, new Transformer<String>() {
            @Override
            public String apply(String... args) {
                return args[0].replaceAll("\\\\\"", "\"").replaceAll("\\\\'", "'");
            }
        }, true, false));
    }

    public void defineParameterType(ParameterType<?> parameterType) {
        if (parameterTypeByName.containsKey(parameterType.getName()))
            throw new DuplicateTypeNameException(String.format("There is already a parameter type with name %s", parameterType.getName()));
        parameterTypeByName.put(parameterType.getName(), parameterType);

        for (String parameterTypeRegexp : parameterType.getRegexps()) {
            if (parameterTypesByRegexp.get(parameterTypeRegexp) == null) {
                parameterTypesByRegexp.put(parameterTypeRegexp, new TreeSet<ParameterType<?>>());
            }
            SortedSet<ParameterType<?>> parameterTypes = parameterTypesByRegexp.get(parameterTypeRegexp);
            if (!parameterTypes.isEmpty() && parameterTypes.first().preferForRegexpMatch() && parameterType.preferForRegexpMatch()) {
                throw new CucumberExpressionException(String.format(
                        "There can only be one preferential parameter type per regexp. " +
                                "The regexp /%s/ is used for two preferential parameter types, {%s} and {%s}",
                        parameterTypeRegexp, parameterTypes.first().getName(), parameterType.getName()
                ));
            }
            parameterTypes.add(parameterType);
        }
    }

    public <T> ParameterType<T> lookupByTypeName(String typeName) {
        return (ParameterType<T>) parameterTypeByName.get(typeName);
    }

    public <T> ParameterType<T> lookupByRegexp(String parameterTypeRegexp, Pattern expressionRegexp, String text) {
        SortedSet<ParameterType<?>> parameterTypes = parameterTypesByRegexp.get(parameterTypeRegexp);
        if (parameterTypes == null) return null;
        if (parameterTypes.size() > 1 && !parameterTypes.first().preferForRegexpMatch()) {
            // We don't do this check on insertion because we only want to restrict
            // ambiguity when we look up by Regexp. Users of CucumberExpression should
            // not be restricted.
            List<GeneratedExpression> generatedExpressions = new CucumberExpressionGenerator(this).generateExpressions(text);
            throw new AmbiguousParameterTypeException(parameterTypeRegexp, expressionRegexp, parameterTypes, generatedExpressions);
        }
        return (ParameterType<T>) parameterTypes.first();
    }

    public Collection<ParameterType<?>> getParameterTypes() {
        return parameterTypeByName.values();
    }
}
