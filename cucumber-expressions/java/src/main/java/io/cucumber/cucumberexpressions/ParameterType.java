package io.cucumber.cucumberexpressions;

import java.lang.reflect.Type;
import java.util.List;

public interface ParameterType<T> {

    /**
     * This is used in the type name in typed expressions
     *
     * @return human readable type name
     */
    String getName();

    Type getType();

    List<String> getRegexps();

    T transform(String value);

    /**
     * Indicates whether or not this is a preferential parameter type when matching text
     * against a {@link RegularExpression}. In case there are multiple parameter types
     * with a regexp identical to the capture group's regexp, a preferential parameter type will
     * win. If there are more than 1 preferential ones, an error will be thrown.
     *
     * @return true if this is a preferential type
     */
    boolean preferForRegexpMatch();

    /**
     * Indicates whether or not this is a parameter type that should be used for generating
     * {@link GeneratedExpression}s from text. Typically, parameter types with greedy regexps
     * should return false.
     *
     * @return true is this parameter type is used for expression generation
     */
    boolean useForSnippets();
}
