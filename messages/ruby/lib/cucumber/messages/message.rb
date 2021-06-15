require 'json'
require 'cucumber/messages/message/serialization'

module Cucumber
  module Messages
    class Message
      include Cucumber::Messages::Message::Serialization

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
    end
  end
end