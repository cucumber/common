package io.cucumber.cucumberexpressions;

/**
 * Transformer for a @{@link ParameterType} with a single capture group.
 *
 * @param <T> the type to transform to.
 */
public interface Transformer<T> {
    /**
     * Transforms a string to an object.
     *
     * @param arg the value of the single capture group
     * @return the transformed object
     * @throws Throwable if transformation failed
     */
    T transform(String arg) throws Throwable;
}
