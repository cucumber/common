package io.cucumber.cucumberexpressions;

import org.apiguardian.api.API;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.text.DecimalFormatSymbols;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.SortedSet;
import java.util.TreeSet;
import java.util.regex.Pattern;

import static io.cucumber.cucumberexpressions.ParameterType.createAnonymousParameterType;
import static java.util.Arrays.asList;
import static java.util.Collections.singletonList;

@API(status = API.Status.STABLE)
public final class ParameterTypeRegistry {
    // Pattern.compile(...).pattern() is not necessary, but it helps us take advantage of the IntelliJ's regexp validation,
    // which detects unneeded escapes.
    private static final List<String> INTEGER_REGEXPS = asList(
            Pattern.compile("-?\\d+").pattern(),
            Pattern.compile("\\d+").pattern()
    );
    private static final String SIGN = "[-+]?";
    private static final String MUST_CONTAIN_NUMBER = "(?=.*[0-9].*)";
    private static final String SCIENTIFIC_NUMBER = "(?:[0-9]+[{expnt}][-+]?[0-9]+)?";
    private static final String DECIMAL_FRACTION = "(?:[{decimal}](?=[0-9].*))?[0-9]*";
    private static final String INTEGER = "(?:[0-9]+(?:[{group}]?[0-9]+)*)*";
    private static final String FLOAT_REGEXPS =
            Pattern.compile(MUST_CONTAIN_NUMBER + SIGN + INTEGER + DECIMAL_FRACTION + SCIENTIFIC_NUMBER).pattern();
    private static final List<String> WORD_REGEXPS = singletonList(
            Pattern.compile("[^\\s]+").pattern()
    );
    private static final List<String> STRING_REGEXPS = asList(
            Pattern.compile("\"([^\"\\\\]*(\\\\.[^\"\\\\]*)*)\"").pattern(),
            Pattern.compile("'([^'\\\\]*(\\\\.[^'\\\\]*)*)'").pattern()
    );
    private static final String ANONYMOUS_REGEX = Pattern.compile(".*").pattern();
    private final Map<String, ParameterType<?>> parameterTypeByName = new HashMap<>();
    private final Map<String, SortedSet<ParameterType<?>>> parameterTypesByRegexp = new HashMap<>();
    /**
     * To maintain consistency with `datatable` we don't use the mutable default
     * transformer to handle build in in conversions yet.
     */
    private final ParameterByTypeTransformer internalParameterTransformer;
    private ParameterByTypeTransformer defaultParameterTransformer;

    public ParameterTypeRegistry(Locale locale) {
        this(new BuiltInParameterTransformer(locale), locale);
    }

    private ParameterTypeRegistry(ParameterByTypeTransformer defaultParameterTransformer, Locale locale) {
        this.internalParameterTransformer = defaultParameterTransformer;
        this.defaultParameterTransformer = defaultParameterTransformer;

        DecimalFormatSymbols numberFormat = DecimalFormatSymbols.getInstance(locale);

        List<String> localizedFloatRegexp = singletonList(FLOAT_REGEXPS
                .replace("{decimal}", "" + numberFormat.getDecimalSeparator())
                .replace("{group}", "" + numberFormat.getGroupingSeparator())
                .replace("{expnt}", "" + numberFormat.getExponentSeparator())
        );

        defineParameterType(new ParameterType<>("biginteger", INTEGER_REGEXPS, BigInteger.class, new Transformer<BigInteger>() {
            @Override
            public BigInteger transform(String arg) throws Throwable {
                return (BigInteger) internalParameterTransformer.transform(arg, BigInteger.class);
            }
        }, false, false));
        defineParameterType(new ParameterType<>("bigdecimal", localizedFloatRegexp, BigDecimal.class, new Transformer<BigDecimal>() {
            @Override
            public BigDecimal transform(String arg) throws Throwable {
                return (BigDecimal) internalParameterTransformer.transform(arg, BigDecimal.class);
            }
        }, false, false));
        defineParameterType(new ParameterType<>("byte", INTEGER_REGEXPS, Byte.class, new Transformer<Byte>() {
            @Override
            public Byte transform(String arg) throws Throwable {
                return (Byte) internalParameterTransformer.transform(arg, Byte.class);
            }
        }, false, false));
        defineParameterType(new ParameterType<>("short", INTEGER_REGEXPS, Short.class, new Transformer<Short>() {
            @Override
            public Short transform(String arg) throws Throwable {
                return (Short) internalParameterTransformer.transform(arg, Short.class);
            }
        }, false, false));
        defineParameterType(new ParameterType<>("int", INTEGER_REGEXPS, Integer.class, new Transformer<Integer>() {
            @Override
            public Integer transform(String arg) throws Throwable {
                return (Integer) internalParameterTransformer.transform(arg, Integer.class);
            }
        }, true, true));
        defineParameterType(new ParameterType<>("long", INTEGER_REGEXPS, Long.class, new Transformer<Long>() {
            @Override
            public Long transform(String arg) throws Throwable {
                return (Long) internalParameterTransformer.transform(arg, Long.class);
            }
        }, false, false));
        defineParameterType(new ParameterType<>("float", localizedFloatRegexp, Float.class, new Transformer<Float>() {
            @Override
            public Float transform(String arg) throws Throwable {
                return (Float) internalParameterTransformer.transform(arg, Float.class);
            }
        }, false, false));
        defineParameterType(new ParameterType<>("double", localizedFloatRegexp, Double.class, new Transformer<Double>() {
            @Override
            public Double transform(String arg) throws Throwable {
                return (Double) internalParameterTransformer.transform(arg, Double.class);
            }
        }, true, true));
        defineParameterType(new ParameterType<>("word", WORD_REGEXPS, String.class, new Transformer<String>() {
            @Override
            public String transform(String arg) throws Throwable {
                return (String) internalParameterTransformer.transform(arg, String.class);
            }
        }, false, false));
        defineParameterType(new ParameterType<>("string", STRING_REGEXPS, String.class, new Transformer<String>() {
            @Override
            public String transform(String arg) throws Throwable {
                return arg == null ? null : (String) internalParameterTransformer.transform(arg
                                .replaceAll("\\\\\"", "\"")
                                .replaceAll("\\\\'", "'"),
                        String.class);
            }
        }, true, false));

        defineParameterType(createAnonymousParameterType(ANONYMOUS_REGEX));
    }

    public void defineParameterType(ParameterType<?> parameterType) {
        if (parameterType.getName() != null) {
            if (parameterTypeByName.containsKey(parameterType.getName())) {
                if (parameterType.getName().isEmpty()) {
                    throw new DuplicateTypeNameException("The anonymous parameter type has already been defined");
                }
                throw new DuplicateTypeNameException(String.format("There is already a parameter type with name %s", parameterType.getName()));
            }
            parameterTypeByName.put(parameterType.getName(), parameterType);
        }

        for (String parameterTypeRegexp : parameterType.getRegexps()) {
            if (!parameterTypesByRegexp.containsKey(parameterTypeRegexp)) {
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

    ParameterByTypeTransformer getDefaultParameterTransformer() {
        return defaultParameterTransformer;
    }

    public void setDefaultParameterTransformer(ParameterByTypeTransformer defaultParameterTransformer) {
        this.defaultParameterTransformer = defaultParameterTransformer;
    }

    <T> ParameterType<T> lookupByTypeName(String typeName) {
        return (ParameterType<T>) parameterTypeByName.get(typeName);
    }

    <T> ParameterType<T> lookupByRegexp(String parameterTypeRegexp, Pattern expressionRegexp, String text) {
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

    Collection<ParameterType<?>> getParameterTypes() {
        return parameterTypeByName.values();
    }

}
