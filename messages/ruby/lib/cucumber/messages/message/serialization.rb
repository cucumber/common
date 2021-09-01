require 'cucumber/messages/message/utils'
require 'json'

module Cucumber
  module Messages
    class Message
      include Cucumber::Messages::Message::Utils

      module Serialization

        ##
        # Returns a new Hash formed from the message attributes
        # If +camelize:+ keyword parameter is set to true, then keys will be camelized
        # If +reject_nil_values:+ keyword parameter is set to true, resulting hash won't include nil values
        #
        #   Cucumber::Messages::Duration.new(seconds: 1, nanos: 42).to_h                                 # => { seconds: 1, nanos: 42 }
        #   Cucumber::Messages::PickleTag.new(name: 'foo', ast_node_id: 'abc-def').to_h(camelize: true)  # => { name: 'foo', astNodeId: 'abc-def' }
        #   Cucumber::Messages::PickleTag.new(name: 'foo', ast_node_id: nil).to_h(reject_nil_values: true)  # => { name: 'foo' }
        #
        # It is recursive so embedded messages are also processed
        #
        #   location = Cucumber::Messages::Location.new(line: 2)
        #   Cucumber::Messages::Comment.new(location: location, text: 'comment').to_h  # => { location: { line: 2, :column: nil }, text: "comment" }
        #

        def to_h(camelize: false, reject_nil_values: false)
          resulting_hash = self.instance_variables.map do |variable_name|
            h_key = variable_name[1..-1]
            h_key = Cucumber::Messages::Message.camelize(h_key) if camelize

            h_value = prepare_value(
              self.instance_variable_get(variable_name),
              camelize: camelize,
              reject_nil_values: reject_nil_values
            )

            [ h_key.to_sym, h_value ]
          end.to_h

          resulting_hash.reject! { |_, value| value.nil? } if reject_nil_values
          resulting_hash
        end

        ##
        # Generates a JSON document from the message.
        # Keys are camelized during the process. Null values are not part of the json document.
        #
        #   Cucumber::Messages::Duration.new(seconds: 1, nanos: 42).to_json                 # => '{"seconds":1,"nanos":42}'
        #   Cucumber::Messages::PickleTag.new(name: 'foo', ast_node_id: 'abc-def').to_json  # => '{"name":"foo","astNodeId":"abc-def"}'
        #   Cucumber::Messages::PickleTag.new(name: 'foo', ast_node_id: nil).to_json        # => '{"name":"foo"}'
        #
        # As #to_h, the method is recursive
        #
        #   location = Cucumber::Messages::Location.new(line: 2)
        #   Cucumber::Messages::Comment.new(location: location, text: 'comment').to_json     # => '{"location":{"line":2,"column":null},"text":"comment"}'
        #

        def to_json
          to_h(camelize: true, reject_nil_values: true).to_json
        end

        private

        def prepare_value(value, camelize:, reject_nil_values:)
          return value.to_h(camelize: camelize, reject_nil_values: reject_nil_values) if value.is_a?(Cucumber::Messages::Message)
          return value.map { |v| prepare_value(v, camelize: camelize, reject_nil_values: reject_nil_values) } if value.is_a?(Array)

          value
        end
      end
    end
  end
end
