# Fake Cucumber

Future implementations of Cucumber will have a `protobuf` formatter that produces
output in [cucumber-messages](../cucumber-messages) format.

The `fake-cucumber` command line tool produces the same kind of output as those
`protobuf` formatters will. It parses your `.feature` files and produces fake
results, so no step definitions are needed - only `.feature` files.

The purpose of `fake-cucumber` is to generate test data for formatters that 
will consume messages provided by `protobuf` formatters.

## Usage

Using npm:

```
npm install -g fake-cucumber
fake-cucumber [--format=json|ndjson|protobuf] [--results=none|random|pattern] [FILES]
```

Alternatively, using docker:

```  
docker run -v $(pwd)/features:/tmp/features cucumber/fake-cucumber:latest \
  [--format=json|ndjson|protobuf] [--results=none|random|pattern] [FILES]
```

## How fake results are generated

### `--results=random`

Results are random and will be different for each execution.

### `--results=pattern`

Results arew derived from the step text. 

Steps matching `.*failed.*`, will get status `FAILED`. Steps matching 
`.*undefined.*` will get status `UNDEFINED` and so on.

If a step doesn't match the lower-case name of a known status it will get status `PASSED`.

See [messages.proto](../messages/messages.md#io.cucumber.messages.TestResult.Status) to see all the
possible statuses.
