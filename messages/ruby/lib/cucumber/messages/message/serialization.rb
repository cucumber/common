require 'cucumber/messages/message/utils'

module Cucumber
  module Messages
    class Message
      include Cucumber::Messages::Message::Utils

      module Serialization

        def to_h(camelize: false)
          self.instance_variables.to_h do |variable_name|
            key = variable_name[1..-1]
            key = Cucumber::Messages::Message.camelize(key) if camelize

            [key.to_sym, get_h_value(variable_name, camelize: camelize)]
          end
        end

        def to_json
          to_h(camelize: true).to_json
        end

      end
    end
  end
end