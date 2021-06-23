require 'cucumber/messages/message/utils'
require 'json'

module Cucumber
  module Messages
    class Message
      include Cucumber::Messages::Message::Utils

      module Deserialization
        def self.included(other)
          other.extend(ClassMethods)
        end

        module ClassMethods

          ##
          # Returns a new Message - or messages into an array - deserialized from the given json document.
          # CamelCased keys are properly converted to snake_cased attributes in the process
          #
          #   Cucumber::Messages::Duration.from_json('{"seconds":1,"nanos":42}')               # => #<Cucumber::Messages::Duration:0x00007efda134c290 @seconds=1, @nanos=42>
          #   Cucumber::Messages::PickleTag.from_json('{"name":"foo","astNodeId":"abc-def"}')  # => #<Cucumber::Messages::PickleTag:0x00007efda138cdb8 @name="foo", @ast_node_id="abc-def">
          #
          # It is available on the base Cucumber::Messages::Message class as long as the
          # keys in the json document match one of the DTO class available with the messages
          #
          #   Cucumber::Messages::Message.from_json('{"pickleTag":{"name":"foo","astNodeId":"abc-def"}}')  # => #<Cucumber::Messages::PickleTag:0x00007efda1451a00 @name="foo", @ast_node_id="abc-def">
          #
          # If more than one message is part of the JSON document, it will return an array of messages
          #
          #   Cucumber::Messages::Message.from_json('{
          #     "pickleTag":{"name":"foo","astNodeId":"abc-def"},
          #     "duration":{"seconds":1,"nanos":42}
          #   }')
          #   => [
          #     #<Cucumber::Messages::PickleTag:0x00007efda6a2faa8 @name="foo", @ast_node_id="abc-def">,
          #     #<Cucumber::Messages::Duration:0x00007efda6a24360 @seconds=1, @nanos=42>
          #   ]
          #
          # It is recursive so embedded messages are also processed.
          #
          #   json_string = { comment: { location: { line: 2 }, text: "comment" } }.to_json
          #   Cucumber::Messages::Message.from_json(json_string)  # => #<Cucumber::Messages::Comment:0x00007efda6abf888 @location=#<Cucumber::Messages::Location:0x00007efda6abf978 @line=2, @column=nil>, @text="comment">
          #
          #   json_string = { uri: 'file:///...', comments: [{text: 'text comment'}, {text: 'another comment'}]}.to_json
          #   Cucumber::Messages::GherkinDocument.from_json(json_string)  # => #<Cucumber::Messages::GherkinDocument:0x00007efda11e6a90 ... @comments=[#<Cucumber::Messages::Comment:0x00007efda11e6e50 ..., #<Cucumber::Messages::Comment:0x00007efda11e6b58 ...>]>
          #

          def from_json(json_string)
            from_h(JSON.parse(json_string, { symbolize_names: true }))
          end
        end
      end
    end
  end
end