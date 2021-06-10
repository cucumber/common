require 'json'

module Cucumber
  module Messages
    class Message
      def to_h(camelize: false)
        self.instance_variables.to_h do |variable_name|
          key = variable_name[1..-1]
          key = camelize(key) if camelize

          [key.to_sym, get_h_value(variable_name, camelize: camelize)]
        end
      end

      def to_json
        to_h(camelize: true).to_json
      end

      private

      def get_h_value(variable_name, camelize: false)
        value = self.instance_variable_get(variable_name)

        if value.is_a?(Cucumber::Messages::Message)
          return value.to_h(camelize: camelize)
        end

        value
      end

      def camelize(term)
        camelized = term.to_s
        camelized.gsub!(/(?:_|(\/))([a-z\d]*)/i) { "#{$1}#{$2.capitalize}" }
      end
    end
  end
end