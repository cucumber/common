require 'json'

module Cucumber
  module Messages
    class Message

      def self.from_json(json_string)
        message_hash = JSON.parse(json_string)
        messages = from_h(message_hash)

        return messages.first if messages.length === 1

        messages
      end

      def self.from_h(hash)
        unless self.to_s === 'Cucumber::Messages::Message'
          return self.new(prepare_DTO_arguments(self, hash))
        end

        hash.map do |key, value|
          class_name = key.dup
          class_name[0] = key[0].upcase

          klass = find_DTO_class(class_name)

          arguments = prepare_DTO_arguments(klass, value)
          klass.new(arguments)
        end
      end

      # Thank you very munch rails!
      # https://github.com/rails/rails/blob/v6.1.3.2/activesupport/lib/active_support/inflector/methods.rb#L92
      def self.underscore(camel_cased_word)
        return camel_cased_word unless /[A-Z-]/.match?(camel_cased_word)
        word = camel_cased_word.gsub(/([A-Z\d]+)([A-Z][a-z])/, '\1_\2')
        word.gsub!(/([a-z\d])([A-Z])/, '\1_\2')
        word.tr!("-", "_")
        word.downcase!
        word
      end

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

      def self.find_DTO_class(dto_name)
        class_name = dto_name.dup
        class_name[0] = dto_name[0].upcase

        Object.const_get("::Cucumber::Messages::#{class_name}")
      end

      def self.prepare_DTO_arguments(klass, raw_arguments)
        raw_arguments.each do |key, value|
          if value.is_a?(Hash)
            raw_arguments[key] = from_h(raw_arguments.select { |k, v| k == key }).first
          end

          if value.is_a?(Array) && klass.respond_to?("#{underscore(key)}_from_h".to_sym, true)
            raw_arguments[key] = value.map{ |v| klass.send("#{underscore(key)}_from_h".to_sym, v) }
          end
        end

        raw_arguments.transform_keys { |key| underscore(key).to_sym }
      end

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