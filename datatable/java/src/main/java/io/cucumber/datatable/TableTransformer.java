package io.cucumber.datatable;


public interface TableTransformer<T> {
    T transform(DataTable table) throws Throwable;
}
