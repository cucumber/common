package io.cucumber.datatable;

public interface TableCellTransformer<T> {
    T transform(String cell) throws Throwable;
}
