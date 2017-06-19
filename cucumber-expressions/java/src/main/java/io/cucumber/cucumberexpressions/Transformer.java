package io.cucumber.cucumberexpressions;

import java.util.List;

public interface Transformer<T> {
    T transform(List<Group> groups);
}
