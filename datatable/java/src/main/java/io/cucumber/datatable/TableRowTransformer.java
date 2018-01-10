package io.cucumber.datatable;

import java.util.List;

public interface TableRowTransformer<T> {
    T transform(List<String> tableRow) throws Throwable;
}
