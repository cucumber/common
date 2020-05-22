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
fake-cucumber [--format=json|ndjson|protobuf] [FILES]
```

Alternatively, using docker:

```  
docker run -v $(pwd)/features:/tmp/features cucumber/fake-cucumber:latest \
  [--format=json|ndjson|protobuf] [FILES]
```

