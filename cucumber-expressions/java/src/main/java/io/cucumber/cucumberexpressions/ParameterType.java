package io.cucumber.cucumberexpressions;

import java.lang.reflect.Type;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static java.util.Collections.singletonList;

public final class ParameterType<T> implements Comparable<ParameterType<?>> {
    @SuppressWarnings("RegExpRedundantEscape") // Android can't parse unescaped braces
    private static final Pattern ILLEGAL_PARAMETER_NAME_PATTERN = Pattern.compile("([\\[\\]()$.|?*+])");
    private static final Pattern UNESCAPE_PATTERN = Pattern.compile("(\\\\([\\[$.|?*+\\]]))");

    private final String name;
    private final Type type;
    private final List<String> regexps;
    private final boolean preferForRegexpMatch;
    private final boolean useForSnippets;
    private final CaptureGroupTransformer<T> transformer;
    private final boolean anonymous;

    static void checkParameterTypeName(String name) {
        String unescapedTypeName = UNESCAPE_PATTERN.matcher(name).replaceAll("$2");
        Matcher matcher = ILLEGAL_PARAMETER_NAME_PATTERN.matcher(unescapedTypeName);
        if (matcher.find()) {
            throw new CucumberExpressionException(String.format("Illegal character '%s' in parameter name {%s}.", matcher.group(1), unescapedTypeName));
        }
    }

    static ParameterType<Object> createAnonymousParameterType(String regexp) {
        return new ParameterType<>("", singletonList(regexp), Object.class, new CaptureGroupTransformer<Object>() {

            public Object transform(String[] arg) {
                throw new UnsupportedOperationException("Anonymous transform must be deanonymized before use");
            }
        }, false, true, true);
    }

    public static <E extends Enum> ParameterType<E> fromEnum(final Class<E> enumClass) {
        Enum[] enumConstants = enumClass.getEnumConstants();
        StringBuilder regexpBuilder = new StringBuilder();
        for (int i = 0; i < enumConstants.length; i++) {
            if (i > 0) regexpBuilder.append("|");
            regexpBuilder.append(enumConstants[i].name());
        }
        return new ParameterType<>(
                enumClass.getSimpleName(),
                regexpBuilder.toString(),
                enumClass,
                new Transformer<E>() {
                    @Override
                    public E transform(String arg) {
                        return (E) Enum.valueOf(enumClass, arg);
                    }
                }
        );
    }

    private ParameterType(String name, List<String> regexps, Type type, CaptureGroupTransformer<T> transformer, boolean useForSnippets, boolean preferForRegexpMatch, boolean anonymous) {
        if (regexps == null) throw new NullPointerException("regexps cannot be null");
        if (type == null) throw new NullPointerException("type cannot be null");
        if (transformer == null) throw new NullPointerException("transformer cannot be null");
        if (name != null) checkParameterTypeName(name);
        this.name = name;
        this.regexps = regexps;
        this.type = type;
        this.transformer = transformer;
        this.useForSnippets = useForSnippets;
        this.preferForRegexpMatch = preferForRegexpMatch;
        this.anonymous = anonymous;
    }

    public ParameterType(String name, List<String> regexps, Type type, CaptureGroupTransformer<T> transformer, boolean useForSnippets, boolean preferForRegexpMatch) {
        this(name, regexps, type, transformer, useForSnippets, preferForRegexpMatch, false);
    }

    public ParameterType(String name, List<String> regexps, Class<T> type, CaptureGroupTransformer<T> transformer, boolean useForSnippets, boolean preferForRegexpMatch) {
        this(name, regexps, (Type) type, transformer, useForSnippets, preferForRegexpMatch);
    }

    public ParameterType(String name, String regexp, Class<T> type, CaptureGroupTransformer<T> transformer, boolean useForSnippets, boolean preferForRegexpMatch) {
        this(name, singletonList(regexp), type, transformer, useForSnippets, preferForRegexpMatch);
    }

    public ParameterType(String name, List<String> regexps, Class<T> type, CaptureGroupTransformer<T> transformer) {
        this(name, regexps, type, transformer, true, false);
    }

    public ParameterType(String name, String regexp, Class<T> type, CaptureGroupTransformer<T> transformer) {
        this(name, singletonList(regexp), type, transformer, true, false);
    }

    public ParameterType(String name, List<String> regexps, Type type, Transformer<T> transformer, boolean useForSnippets, boolean preferForRegexpMatch) {
        this(name, regexps, type, new TransformerAdaptor<>(transformer), useForSnippets, preferForRegexpMatch);
    }

    public ParameterType(String name, List<String> regexps, Class<T> type, Transformer<T> transformer, boolean useForSnippets, boolean preferForRegexpMatch) {
        this(name, regexps, (Type) type, transformer, useForSnippets, preferForRegexpMatch);
    }

    public ParameterType(String name, String regexp, Class<T> type, Transformer<T> transformer, boolean useForSnippets, boolean preferForRegexpMatch) {
        this(name, singletonList(regexp), type, transformer, useForSnippets, preferForRegexpMatch);
    }

    public ParameterType(String name, List<String> regexps, Class<T> type, Transformer<T> transformer) {
        this(name, regexps, type, transformer, true, false);
    }

    public ParameterType(String name, String regexp, Class<T> type, Transformer<T> transformer) {
        this(name, singletonList(regexp), type, transformer, true, false);
    }

    /**
     * This is used in the type name in typed expressions
     *
     * @return human readable type name
     */
    public String getName() {
        return name;
    }

    /**
     * Returns the type of the parameter type - typically the type
     * the transform transforms to. This can be used in conjunction with
     * GeneratedExpression (snippets) to generate snippets for statically typed
     * languages. Not used for anything else.
     *
     * @return the type of the parameter type
     */
    public Type getType() {
        return type;
    }

    public List<String> getRegexps() {
        return regexps;
    }

    /**
     * Indicates whether or not this is a preferential parameter type when matching text
     * against a {@link RegularExpression}. In case there are multiple parameter types
     * with a regexp identical to the capture group's regexp, a preferential parameter type will
     * win. If there are more than 1 preferential ones, an error will be thrown.
     *
     * @return true if this is a preferential type
     */
    public boolean preferForRegexpMatch() {
        return preferForRegexpMatch;
    }

    /**
     * Indicates whether or not this is a parameter type that should be used for generating
     * {@link GeneratedExpression}s from text. Typically, parameter types with greedy regexps
     * should return false.
     *
     * @return true is this parameter type is used for expression generation
     */
    public boolean useForSnippets() {
        return useForSnippets;
    }

    boolean isAnonymous() {
        return anonymous;
    }

    ParameterType<Object> deAnonymize(Type type, Transformer<Object> transformer) {
        return new ParameterType<>("anonymous", regexps, type, new TransformerAdaptor<>(transformer), useForSnippets, preferForRegexpMatch, anonymous);
    }

    T transform(List<String> groupValues) {
        if (transformer instanceof TransformerAdaptor) {
            if (groupValues.size() > 1) {
                if (isAnonymous()) {
                    throw new CucumberExpressionException(String.format("" +
                            "Anonymous ParameterType has multiple capture groups %s. " +
                            "You can only use a single capture group in an anonymous ParameterType.", regexps));
                }
                throw new CucumberExpressionException(String.format("" +
                        "ParameterType {%s} was registered with a Transformer but has multiple capture groups %s. " +
                        "Did you mean to use a CaptureGroupTransformer?", name, regexps));
            }
        }

        try {
            String[] groupValueArray = groupValues.toArray(new String[0]);
            return transformer.transform(groupValueArray);
        } catch (CucumberExpressionException e) {
            throw e;
        } catch (Throwable throwable) {
            throw new CucumberExpressionException(String.format("ParameterType {%s} failed to transform %s to %s", name, groupValues, type), throwable);
        }
    }

    @Override
    public int compareTo(ParameterType<?> o) {
        if (preferForRegexpMatch() && !o.preferForRegexpMatch()) return -1;
        if (o.preferForRegexpMatch() && !preferForRegexpMatch()) return 1;
        String name = getName() != null ? getName() : "";
        String otherName = o.getName() != null ? o.getName() : "";
        return name.compareTo(otherName);
    }

    private static final class TransformerAdaptor<T> implements CaptureGroupTransformer<T> {

        private final Transformer<T> transformer;

        private TransformerAdaptor(Transformer<T> transformer) {
            if (transformer == null) throw new NullPointerException("transformer cannot be null");
            this.transformer = transformer;
        }

        @Override
        public T transform(String[] args) throws Throwable {
            String arg = args.length == 0 ? null : args[0];
            return transformer.transform(arg);
        }
    }
}
