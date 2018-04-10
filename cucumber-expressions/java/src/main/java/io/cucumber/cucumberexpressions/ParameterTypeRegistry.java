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
    private final Map<String, ParameterType<?, ?>> parameterTypeByName = new HashMap<>();
    private final Map<String, SortedSet<ParameterType<?, ?>>> parameterTypesByRegexp = new HashMap<>();

    public ParameterTypeRegistry(Locale locale) {
        NumberFormat numberFormat = NumberFormat.getNumberInstance(locale);
        final NumberParser numberParser = new NumberParser(numberFormat);

        defineParameterType(ParameterType.single("biginteger", INTEGER_REGEXPS, BigInteger.class, new Transformer<String, BigInteger>() {
            @Override
            public BigInteger transform(String arg) {
                return new BigInteger(arg);
            }
        }, false, false));
        defineParameterType(ParameterType.single("bigdecimal", FLOAT_REGEXPS, BigDecimal.class, new Transformer<String, BigDecimal>() {
            @Override
            public BigDecimal transform(String arg) {
                return new BigDecimal(arg);
            }
        }, false, false));
        defineParameterType(ParameterType.single("byte", HEX_REGEXPS, Byte.class, new Transformer<String, Byte>() {
            @Override
            public Byte transform(String arg) {
                return Byte.decode(arg);
            }
        }, true, false));
        defineParameterType(ParameterType.single("short", INTEGER_REGEXPS, Short.class, new Transformer<String, Short>() {
            @Override
            public Short transform(String arg) {
                return Short.decode(arg);
            }
        }, false, false));
        defineParameterType(ParameterType.single("int", INTEGER_REGEXPS, Integer.class, new Transformer<String, Integer>() {
            @Override
            public Integer transform(String arg) {
                return Integer.decode(arg);
            }
        }, true, true));
        defineParameterType(ParameterType.single("long", INTEGER_REGEXPS, Long.class, new Transformer<String, Long>() {
            @Override
            public Long transform(String arg) {
                return Long.decode(arg);
            }
        }, false, false));
        defineParameterType(ParameterType.single("float", FLOAT_REGEXPS, Float.class, new Transformer<String, Float>() {
            @Override
            public Float transform(String arg) {
                return numberParser.parseFloat(arg);
            }
        }, false, false));
        defineParameterType(ParameterType.single("double", FLOAT_REGEXPS, Double.class, new Transformer<String, Double>() {
            @Override
            public Double transform(String arg) {
                return numberParser.parseDouble(arg);
            }
        }, true, true));
        defineParameterType(ParameterType.single("word", WORD_REGEXPS, String.class, new Transformer<String, String>() {
            @Override
            public String transform(String arg) {
                return arg;
            }
        }, false, false));
        defineParameterType(ParameterType.single("string", STRING_REGEXPS, String.class, new Transformer<String, String>() {
            @Override
            public String transform(String arg) {
                return arg.replaceAll("\\\\\"", "\"").replaceAll("\\\\'", "'");
            }
        }, true, false));
    }

    public void defineParameterType(ParameterType<?, ?> parameterType) {
        if (parameterTypeByName.containsKey(parameterType.getName()))
            throw new DuplicateTypeNameException(String.format("There is already a parameter type with name %s", parameterType.getName()));
        parameterTypeByName.put(parameterType.getName(), parameterType);

        for (String parameterTypeRegexp : parameterType.getRegexps()) {
            if (parameterTypesByRegexp.get(parameterTypeRegexp) == null) {
                parameterTypesByRegexp.put(parameterTypeRegexp, new TreeSet<ParameterType<?, ?>>());
            }
            SortedSet<ParameterType<?, ?>> parameterTypes = parameterTypesByRegexp.get(parameterTypeRegexp);
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

    public <A, T> ParameterType<A, T> lookupByTypeName(String typeName) {
        return (ParameterType<A, T>) parameterTypeByName.get(typeName);
    }

    public <A, T> ParameterType<A, T> lookupByRegexp(String parameterTypeRegexp, Pattern expressionRegexp, String text) {
        SortedSet<ParameterType<?, ?>> parameterTypes = parameterTypesByRegexp.get(parameterTypeRegexp);
        if (parameterTypes == null) return null;
        if (parameterTypes.size() > 1 && !parameterTypes.first().preferForRegexpMatch()) {
            // We don't do this check on insertion because we only want to restrict
            // ambiguity when we look up by Regexp. Users of CucumberExpression should
            // not be restricted.
            List<GeneratedExpression> generatedExpressions = new CucumberExpressionGenerator(this).generateExpressions(text);
            throw new AmbiguousParameterTypeException(parameterTypeRegexp, expressionRegexp, parameterTypes, generatedExpressions);
        }
        return (ParameterType<A, T>) parameterTypes.first();
    }

    public Collection<ParameterType<?, ?>> getParameterTypes() {
        return parameterTypeByName.values();
    }
}
