package io.cucumber.gherkin.utils.pretty;

import io.cucumber.gherkin.utils.Accumulator;

class Result implements Accumulator {
    private Long deepestLine = 0L;
    private final StringBuilder builder = new StringBuilder();

    Result append(String s) {
        builder.append(s);
        return this;
    }

    @Override
    public void setDeepestLine(Long line) {
        deepestLine = line;
    }

    @Override
    public Long getDeepestLine() {
        return deepestLine;
    }

    @Override
    public String toString() {
        return builder.toString();
    }
}
