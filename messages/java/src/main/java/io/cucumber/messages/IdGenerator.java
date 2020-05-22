package io.cucumber.messages;

public interface IdGenerator {
    String newId();

    class Incrementing implements IdGenerator {
        private int next = 0;

        @Override
        public String newId() {
            return Integer.toString(next++);
        }
    }

    class UUID implements IdGenerator {
        @Override
        public String newId() {
            return java.util.UUID.randomUUID().toString();
        }
    }
}
