require 'cucumber/messages/message/utils'
require 'json'

module Cucumber
  module Messages
    class Message
      include Cucumber::Messages::Message::Utils

      module Deserialization
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
            from_h(JSON.parse(json_string))
          end

          ##
          # Returns a new Message - or messages into an array - deserialized from the given hash.
          # CamelCased keys are properly converted to snake_cased attributes in the process
          #
          #   Cucumber::Messages::Duration.from_h({ seconds: 1, nanos: 42 })                 # => #<Cucumber::Messages::Duration:0x00007efda134c290 @seconds=1, @nanos=42>
          #   Cucumber::Messages::PickleTag.from_h({ name: "foo", ast_node_id: "abc-def" })  # => #<Cucumber::Messages::PickleTag:0x00007efda138cdb8 @name="foo", @ast_node_id="abc-def">
          #
          # It is available on the base Cucumber::Messages::Message class as long as the
          # keys match one of the DTO class available with the messages
          #
          #   Cucumber::Messages::Message.from_h({ pickle_tag: { name: "foo", astNodeId: "abc-def" } })  # => #<Cucumber::Messages::PickleTag:0x00007efda1451a00 @name="foo", @ast_node_id="abc-def">
          #
          # If more than one message is part of the hash, it will return an array of messages
          #
          #   Cucumber::Messages::Message.from_h({
          #     pickleTag: {name: "foo", ast_node_id: "abc-def"},
          #     duration: {seconds: 1, nanos: 42 }
          #   })
          #   => [
          #     #<Cucumber::Messages::PickleTag:0x00007efda6a2faa8 @name="foo", @ast_node_id="abc-def">,
          #     #<Cucumber::Messages::Duration:0x00007efda6a24360 @seconds=1, @nanos=42>
          #   ]
          #
          # It is recursive so embedded messages are also processed.
          #
          #   messages = { comment: { location: { line: 2 }, text: "comment" } }
          #   Cucumber::Messages::Message.from_h(messages)  # => #<Cucumber::Messages::Comment:0x00007efda6abf888 @location=#<Cucumber::Messages::Location:0x00007efda6abf978 @line=2, @column=nil>, @text="comment">
          #
          #   gherkin_document = { uri: 'file:///...', comments: [{text: 'text comment'}, {text: 'another comment'}]}
          #   Cucumber::Messages::GherkinDocument.from_h(gherkin_document)  # => #<Cucumber::Messages::GherkinDocument:0x00007efda11e6a90 ... @comments=[#<Cucumber::Messages::Comment:0x00007efda11e6e50 ..., #<Cucumber::Messages::Comment:0x00007efda11e6b58 ...>]>
          #

          def from_h(hash)
            unless self.to_s === Cucumber::Messages::Message.to_s
              return self.new(prepare_arguments(hash))
            end

            messages = hash.map do |key, value|
              dto_name = camelize(key.to_s.dup)
              dto_name[0] = key[0].upcase

              dto = find_dto(dto_name)
              arguments = prepare_arguments(value, dto: dto)

              dto.new(arguments)
            end

            return messages.first if messages.length === 1

            messages
          end

          private

          def prepare_arguments(raw_arguments, dto: self)
            raw_arguments.each do |key, value|
              raw_arguments[key] = prepare_argument(key, value, dto: dto)
            end

            raw_arguments.transform_keys { |key| underscore(key.to_s).to_sym }
          end

          def find_dto(name)
            Object.const_get("::Cucumber::Messages::#{name}")
          end

          def prepare_argument(name, value, dto: self)
            return prepare_hash(name, value) if value.is_a?(Hash)
            return prepare_array(name, value, dto: dto) if value.is_a?(Array)

            value
          end

          def prepare_hash(name, value)
            from_h({ "#{name}" => value })
          end

          def prepare_array(name, array, dto: self)
            method_name = "#{underscore(name)}_from_h".to_sym

            return array unless dto.respond_to?(method_name, true)

            array.map do |value|
              dto.send(method_name, value)
            end
          end
        end

        def self.included(other)
          other.extend(ClassMethods)
        end
      end
    end
  end
end