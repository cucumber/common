package io.cucumber.datatable;

import java.util.List;

interface RawTableTransformer<T> {
    T transform(List<List<String>> raw) throws Throwable;
}
