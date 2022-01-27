# Cucumber Messages

This is a PHP implementation of the [Cucumber Messages protocol](https://github.com/cucumber/common/blob/main/messages/README.md)

## Requirements

* PHP 8.1
* Ext-JSON

## Installation

Install using [composer](https://getcomposer.org).

```shell
composer require cucumber/messages
```

## Usage

### Consuming messages

Cucumber Messages are contained in a top-level Envelope object when serialised. Members are exposed via
public readonly properties. Because many properties are nullable, it may be convenient to use the [nullsafe
operator](https://www.php.net/releases/8.0/en.php#nullsafe-operator) to access them:

```php
/** @var string|null $line */
$line = $envelope->gherkinDocument?->feature?->keyword;
```

#### Decoding JSON strings

You can construct an Envelope from a JSON string:

```php
use Cucumber\Messages\DecodingException;
use Cucumber\Messages\Envelope;

try {
    $envelope = Envelope::fromJson($json);
}
catch (DecodingException $e) {
    // handle the error
}
```

#### Handling NDJSON Streams

Cucumber Messages are streamed as Newline Delimited JSON (NDJSON). 

You can use the `NdJsonStreamReader` to obtain a Generator that produces Envelopes. It's important to remember that any 
decoding errors will be thrown as the generator is consumed, not when it's returned.

```php
use Cucumber\Messages\DecodingException;
use Cucumber\Messages\Streams\NdJson\NdJsonStreamReader;
use Cucumber\Messages\Envelope;

$fh = fopen('messages.ndjson', 'r');
$reader = new NdJsonStreamReader($fh);

/** @var Generator<Envelope> $envelopes */
$envelopes = $reader->envelopes();

try {
    foreach ($envelopes as $envelope) {
        /** @var Envelope $envelope */
        // process the message
    }
}
catch (DecodingException $e) {
    // handle any errors here
}
```

### Producing messages

All arguments of a Cucumber Message are optional, but any non-nullable fields will have default values.

Because Messages tend to have a large number of arguments, it's recommended to use named fields to construct them:

```php
use Cucumber\Messages\Envelope;
use Cucumber\Messages\TestCaseFinished;
use Cucumber\Messages\Timestamp;

$envelope = new Envelope(
    testCaseFinished: new TestCaseFinished(
        timestamp: new Timestamp(
            seconds: 100
        )
    )
);
```

#### Encoding a JSON string

An Envelope can be encoded as a JSON string:

```php
$json = $envelope->asJson();
```

Do _not_ `json_encode()` the object externally, as the correct encoding options may not be set.

#### Producing JSON streams

Cucumber Messages are streamed as Newline Delimited JSON (NDJSON).

You can use the NdJsonStreamReader to write the contents of list of Envelopes to a stream.

```php
use Cucumber\Messages\Streams\NdJson\NdJsonStreamReader;

$fh = fopen('php://stdout', 'w');

$writer = new NdJsonStreamWriter($fh)

// write a fixed array of envelopes
$envArray = [
    new Envelope('gherkinDocument': new GherkinDocument()),
    new Envelope('gherkinDocument': new GherkinDocument()),
];
$writer->write($envArray);

// write lazily-evaluated envelopes
$envGenerator = (function() {
    while ($envelope = Database::fetchNextEnvelope()) {
        yield $envelope;
    }
})();
$writer->write($envGenerator);
```
