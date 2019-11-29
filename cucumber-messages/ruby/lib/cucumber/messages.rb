require 'cucumber/messages.pb'
require 'cucumber/messages/protobuf_io_enumerator'
require 'cucumber/messages/ndjson_io_enumerator'
require 'cucumber/messages/protobuf_delimited'
require 'cucumber/messages/protobuf_ndjson'

Cucumber::Messages::Envelope.include(Cucumber::Messages::WriteNdjson)
Cucumber::Messages::Envelope.include(Cucumber::Messages::WriteDelimited)
Cucumber::Messages::Envelope.extend(Cucumber::Messages::ParseDelimited)
