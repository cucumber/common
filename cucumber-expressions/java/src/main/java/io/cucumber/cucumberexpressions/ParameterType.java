package io.cucumber.cucumberexpressions;

import java.lang.reflect.Type;
import java.util.List;

import static java.util.Collections.singletonList;

public final class ParameterType<T> implements Comparable<ParameterType<?>> {
    private final String name;
    private final Type type;
    private final List<String> regexps;
    private final boolean preferForRegexpMatch;
    private final boolean useForSnippets;
    private final CaptureGroupTransformer<T> transformer;

    public ParameterType(String name, List<String> regexps, Type type, CaptureGroupTransformer<T> transformer, boolean useForSnippets, boolean preferForRegexpMatch) {
        if (name == null) throw new CucumberExpressionException("name cannot be null");
        if (regexps == null) throw new CucumberExpressionException("regexps cannot be null");
        if (type == null) throw new CucumberExpressionException("type cannot be null");
        if (transformer == null) throw new CucumberExpressionException("transformer cannot be null");
        this.name = name;
        this.regexps = regexps;
        this.type = type;
        this.transformer = transformer;
        this.useForSnippets = useForSnippets;
        this.preferForRegexpMatch = preferForRegexpMatch;
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

    T transform(List<String> groupValues) {
        if (transformer instanceof TransformerAdaptor) {
            if (groupValues.size() > 1)
                throw new CucumberExpressionException(String.format("" +
                        "ParameterType {%s} was registered with a Transformer but has multiple capture groups %s. " +
                        "Did you mean to use a CaptureGroupTransformer?", name, regexps));
        }

        try {
            String[] groupValueArray = groupValues.toArray(new String[groupValues.size()]);
            return transformer.transform(groupValueArray);
        } catch (Throwable throwable) {
            throw new CucumberExpressionException(String.format("ParameterType {%s} failed to transform %s to %s", name, groupValues, type), throwable);
        }
    }

    @Override
    public int compareTo(ParameterType<?> o) {
        if (preferForRegexpMatch() && !o.preferForRegexpMatch()) return -1;
        if (o.preferForRegexpMatch() && !preferForRegexpMatch()) return 1;
        return getName().compareTo(o.getName());
    }

    private static final class TransformerAdaptor<T> implements CaptureGroupTransformer<T> {

        private final Transformer<T> transformer;

        private TransformerAdaptor(Transformer<T> transformer) {
            if (transformer == null) throw new CucumberExpressionException("transformer cannot be null");
            this.transformer = transformer;
        }

        @Override
        public T transform(String[] args) throws Throwable {
            return transformer.transform(args.length == 0 ? null : args[0]);
        }
    }
}
