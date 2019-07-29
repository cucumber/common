# Cucumber Messages

Cucumber consists of several components written in different programming languages:
- Go
- Ruby
- Java
- JavaScript
- C#
- And more...

These components need to exchange data between them. This is done using *Cucumber Messages*

Cucumber Messages is a message protocol based on [Protocol Buffers](https://developers.google.com/protocol-buffers/). It allows one process to construct message objects and send them to another process. 
Protobuf takes care of serialising those messages to a binary format, and deserialise them on the other
end.

The messages are defined in [messages.proto](./messages.proto).

Each subdirectory defines language-specific implementations of these messages,
generated with `protoc` - the Protobuf compiler.

## Documentation

See the generated [messages.md](messages.md) file.
