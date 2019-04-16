require 'cucumber/messages_pb'
require 'cucumber/messages/protobuf_io_enumerator'
require 'cucumber/messages/protobuf_delimited'

Cucumber::Messages::Wrapper.include(Cucumber::Messages::WriteDelimited)
Cucumber::Messages::Wrapper.extend(Cucumber::Messages::ParseDelimited)
