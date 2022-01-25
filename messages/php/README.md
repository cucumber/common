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

All cucumber messages are contained in an Envelope object. 

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

Cucumber Messages are serialised as Newline Delimited JSON (NDJSON). 

You can use the NdJsonStreamReader to obtain a Generator:

```php
use Cucumber\Messages\DecodingException;
use Cucumber\Messages\Envelope;
use Cucumber\Messages\Streams\NdJsonStreamReader;

$fh = fopen('messages.ndjson', 'r');
$reader = new NdJsonStreamReader($fh);

/** @var Generator<Envelope> $envelopes */
$envelopes = $reader->envelopes();

try {
    foreach ($envelopes as $envelope) {
        // process $envelope
    }
}
catch (DecodingException $e) {
    // handle the error
}
finally {
    fclose($fh);
}
```
