package io.cucumber.cucumberexpressions;

/**
 * Transformer for a @{@link ParameterType} with a multiple capture groups.
 *
 * @param <T> the type to transform to.
 */
public interface MultiTransformer<T> {
    /**
     * Transforms multiple strings to an object.
     *
     * @param args the value of the all the capture groups
     * @return the transformed object
     * @throws Throwable if transformation failed
     */
    T transform(String[] args) throws Throwable;
}
