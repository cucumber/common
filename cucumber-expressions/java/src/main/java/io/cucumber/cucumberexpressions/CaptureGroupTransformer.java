package io.cucumber.cucumberexpressions;

/**
 * Transformer for a @{@link ParameterType} with (multiple) capture groups.
 *
 * @param <T> the type to transform to.
 */
public interface CaptureGroupTransformer<T> {
    /**
     * Transforms multiple strings into to an object. The strings are taken from
     * the capture groups in the regular expressions in order. Nested capture
     * groups are ignored. If a capture group is optional the corresponding element
     * in the array may be null.
     *
     * @param args the values of the top level capture groups
     * @return the transformed object
     * @throws Throwable if transformation failed
     */
    T transform(String[] args) throws Throwable;
}
