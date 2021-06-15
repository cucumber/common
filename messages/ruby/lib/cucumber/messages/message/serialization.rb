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
        #
        #   Cucumber::Messages::Duration.new(seconds: 1, nanos: 42).to_h                                 # => { seconds: 1, nanos: 42 }
        #   Cucumber::Messages::PickleTag.new(name: 'foo', ast_node_id: 'abc-def').to_h(camelize: true)  # => { name: 'foo', astNodeId: 'abc-def' }
        #
        # It is recursive so embedded messages are also processed
        #
        #   location = Cucumber::Messages::Location.new(line: 2)
        #   Cucumber::Messages::Comment.new(location: location, text: 'comment').to_h  # => { location: { line: 2, :column: nil }, text: "comment" }
        #

        def to_h(camelize: false)
          self.instance_variables.to_h do |variable_name|
            h_key = variable_name[1..-1]
            h_key = Cucumber::Messages::Message.camelize(h_key) if camelize

            h_value = self.instance_variable_get(variable_name)
            h_value = h_value.to_h(camelize: camelize) if h_value.is_a?(Cucumber::Messages::Message)

            [ h_key.to_sym, h_value ]
          end
        end

        ##
        # Generates a JSON document from the message.
        # Keys are camelized during the process
        #
        #   Cucumber::Messages::Duration.new(seconds: 1, nanos: 42).to_json                 # => '{"seconds":1,"nanos":42}'
        #   Cucumber::Messages::PickleTag.new(name: 'foo', ast_node_id: 'abc-def').to_json  # => '{"name":"foo","astNodeId":"abc-def"}'
        #
        # As #to_h, the method is recursive
        #
        #   location = Cucumber::Messages::Location.new(line: 2)
        #   Cucumber::Messages::Comment.new(location: location, text: 'comment').to_json     # => '{"location":{"line":2,"column":null},"text":"comment"}'
        #

        def to_json
          to_h(camelize: true).to_json
        end
      end
    end
  end
end
