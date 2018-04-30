package io.cucumber.cucumberexpressions;

/**
 * Transformer for a @{@link ParameterType} with zero or one capture groups.
 *
 * @param <T> the type to transform to.
 */
public interface Transformer<T> {
    /**
     * Transforms a string into to an object. The string is either taken
     * from the sole capture group or matches the whole expression. Nested
     * capture groups are ignored.
     * <p>
     * If the capture group is optional <code>arg</code> may be null.
     *
     * @param arg the value of the single capture group
     * @return the transformed object
     * @throws Throwable if transformation failed
     */
    T transform(String arg) throws Throwable;
}
