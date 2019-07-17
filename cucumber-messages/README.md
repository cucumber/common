# Cucumber Messages

Cucumber Messages are [Protocol Buffers](https://developers.google.com/protocol-buffers/) messages
used by the Cucumber Protocol.

Cucumber consists of several components written in different programming languages:
- Go
- Ruby
- Java
- JavaScript
- C#
- And more...

These components need to exchange data between them. This is done using *Cucumber Messages*

Cucumber Messages is a message protocol based on [Protocol Buffers](https://developers.google.com/protocol-buffers/). It allows one process to construct message objects and send them to another process. 
Protocol Buffers takes care of serialising those messages to a binary format, 
and deserialise them on the other end.

The messages are defined in [messages.proto](./messages.proto).

Each subdirectory defines language-specific implementations of these messages,
generated with `protoc` - the Protobuf compiler.

## Documentation

See the generated [messages.md](messages.md) file.

## Testing

The messages themselves do not implement any behaviour (apart from serialisation/deserialisation).
There is no need to test the messages themselves - we assume that the Protocol Buffers toolchain works.

Rather than testing the messages themselves, we want to test the components that 
*produce* and *consume* Cucumber Messages. These components are tested with *approval tests*.
These tests send predefined messages to the component under test, and records any messages
coming back. These messages are then compared to *expected* messages. If they are different,
the test fails.

