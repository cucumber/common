package io.cucumber.cucumberexpressions;

import java.lang.reflect.Type;
import java.util.List;

import static java.util.Collections.singletonList;

public final class ParameterType<A, T> implements Comparable<ParameterType<?, ?>> {
    private final String name;
    private final Class<A> argsType;
    private final Type type;
    private final List<String> regexps;
    private final boolean preferForRegexpMatch;
    private final boolean useForSnippets;
    private final Transformer<A, T> transformer;

    public ParameterType(String name, List<String> regexps, Class<A> argsType, Type type, Transformer<A, T> transformer, boolean useForSnippets, boolean preferForRegexpMatch) {
        if (name == null) throw new CucumberExpressionException("name cannot be null");
        if (regexps == null) throw new CucumberExpressionException("regexps cannot be null");
        if (type == null) throw new CucumberExpressionException("type cannot be null");
        if (transformer == null) throw new CucumberExpressionException("transformer cannot be null");
        this.name = name;
        this.regexps = regexps;
        this.argsType = argsType;
        this.type = type;
        this.transformer = transformer;
        this.useForSnippets = useForSnippets;
        this.preferForRegexpMatch = preferForRegexpMatch;
    }

    public static <T> ParameterType<String, T> single(String name, List<String> regexps, Class<T> type, Transformer<String, T> transformer, boolean useForSnippets, boolean preferForRegexpMatch) {
        return new ParameterType<>(name, regexps, String.class, type, transformer, useForSnippets, preferForRegexpMatch);
    }

    public static <T> ParameterType<String, T> single(String name, String regexp, Class<T> type, Transformer<String, T> transformer, boolean useForSnippets, boolean preferForRegexpMatch) {
        return single(name, singletonList(regexp), type, transformer, useForSnippets, preferForRegexpMatch);
    }

    public static <T> ParameterType<String, T> single(String name, List<String> regexps, Class<T> type, Transformer<String, T> transformer) {
        return single(name, regexps, type, transformer, true, false);
    }

    public static <T> ParameterType<String, T> single(String name, String regexp, Class<T> type, Transformer<String, T> transformer) {
        return single(name, singletonList(regexp), type, transformer, true, false);
    }

    public static <T> ParameterType<String[], T> multi(String name, List<String> regexps, Class<T> type, Transformer<String[], T> transformer, boolean useForSnippets, boolean preferForRegexpMatch) {
        return new ParameterType<>(name, regexps, String[].class, type, transformer, useForSnippets, preferForRegexpMatch);
    }

    public static <T> ParameterType<String[], T> multi(String name, String regexp, Class<T> type, Transformer<String[], T> transformer, boolean useForSnippets, boolean preferForRegexpMatch) {
        return multi(name, singletonList(regexp), type, transformer, useForSnippets, preferForRegexpMatch);
    }

    public static <T> ParameterType<String[], T> multi(String name, List<String> regexps, Class<T> type, Transformer<String[], T> transformer) {
        return multi(name, regexps, type, transformer, true, false);
    }

    public static <T> ParameterType<String[], T> multi(String name, String regexp, Class<T> type, Transformer<String[], T> transformer) {
        return multi(name, singletonList(regexp), type, transformer, true, false);
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

    public T transform(List<String> groupValues) {
        String[] groupValueArray = groupValues.toArray(new String[groupValues.size()]);
        try {
            if (argsType == String.class) {
                String arg = groupValueArray.length == 0 ? null : groupValueArray[0];
                return transformer.transform(argsType.cast(arg));
            } else {
                return transformer.transform(argsType.cast(groupValueArray));
            }
        } catch (Throwable throwable) {
            throw new CucumberExpressionException(String.format("ParameterType {%s} failed to transform %s to %s", name, groupValues, type), throwable);
        }
    }

    @Override
    public int compareTo(ParameterType<?, ?> o) {
        if (preferForRegexpMatch() && !o.preferForRegexpMatch()) return -1;
        if (o.preferForRegexpMatch() && !preferForRegexpMatch()) return 1;
        return getName().compareTo(o.getName());
    }
}
