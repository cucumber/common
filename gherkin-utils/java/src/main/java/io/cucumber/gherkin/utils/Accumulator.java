package io.cucumber.gherkin.utils;

public interface Accumulator {
    void setDeepestLine(Long line);
    Long getDeepestLine();
}
