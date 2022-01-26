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

### Envelopes

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

### Handling Streams

Cucumber Messages are streamed as Newline Delimited JSON (NDJSON). 

You can use the `NdJsonStreamReader` to obtain a Generator. It's important to remember that any decoding errors will 
be thrown as the Envelope is created during the loop.

```php
use Cucumber\Messages\Streams\NdJsonStreamReader;

$fh = fopen('messages.ndjson', 'r');
$reader = new NdJsonStreamReader($fh);

$envelopes = $reader->envelopes();

try {
    foreach ($envelopes as $envelope) {
        // $envelope is an Envelope
    }
}
catch (DecodingException $e) {
    // handle the error here
}
```
