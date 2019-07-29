require 'cucumber/messages_pb'
require 'cucumber/messages/protobuf_io_enumerator'
require 'cucumber/messages/protobuf_delimited'

Cucumber::Messages::Envelope.include(Cucumber::Messages::WriteDelimited)
Cucumber::Messages::Envelope.extend(Cucumber::Messages::ParseDelimited)
