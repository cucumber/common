package io.cucumber.gherkin;

import io.cucumber.messages.IdGenerator;

class IncrementingIdGenerator implements IdGenerator {
    private int next = 0;

    @Override
    public String newId() {
        return Integer.toString(next++);
    }

}
