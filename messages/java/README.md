[![Maven Central](https://img.shields.io/maven-central/v/io.cucumber/messages.svg?label=Maven%20Central)](https://search.maven.org/search?q=g:%22io.cucumber%22%20AND%20a:%22messages%22)

# Cucumber Messages for Java (JSON schema)

```java
Iterable<Envelope> envelopes = new io.cucumber.messages.NdjsonToMessageIterable(inputStream)
for (Envelope envelope : envelopes) {
  // Do something with the message
}
```

See Unit tests for more examples.
