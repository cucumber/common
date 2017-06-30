Each of these examples isolates a simple case of using Cucumber with the events plugin, showing
the expected events output in the `expected-events.ndjson`.

These are used in the acceptance tests in `spec/cucumber/formatter/event_stream/event_stream_spec.rb` and the real output from running cucumber is comapred with this expected output.
To run a test manually, `cd` into the directory of the example, then run:

```
bundle exec cucumber -r . --format Cucumber::Formatter::EventStream::Plugin
```

Note that a certain amount of normalisation (for timestamps and directory paths) is neccesary before comparing the output for testing.
