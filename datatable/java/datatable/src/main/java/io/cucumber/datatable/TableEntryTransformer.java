package io.cucumber.datatable;

import java.util.Map;

/**
 * Transforms a table entry to in instance of {@code T}
 * <p>
 * A table entry consists of the cells of a row paired
 * with the header cells.
 *
 * @param <T> the target type
 */
public interface TableEntryTransformer<T> {

    /**
     * Transforms a table entry to in instance of {@code T}.
     *
     * @param entry a single entry
     * @return an instance of {@code T}
     * @throws Throwable when the transform fails for any reason
     */
    T transform(Map<String, String> entry) throws Throwable;
}
