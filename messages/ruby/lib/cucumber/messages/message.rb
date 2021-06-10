require 'json'

module Cucumber
  module Messages
    class Message
      def to_h
        self.instance_variables.to_h do |variable_name|
          [
            variable_name[1..-1].to_sym,
            get_h_value(variable_name)
          ]
        end
      end

      def to_json
        to_h.to_json
      end

      private

      def get_h_value(variable_name)
        value = self.instance_variable_get(variable_name)

        if value.is_a?(Cucumber::Messages::Message)
          return value.to_h
        end

        value
      end
    end
  end
end