require_relative 'keys_checker'

module CCK
  class MessagesComparator
    def initialize(validator, found, expected)
      @all_errors = []
      @compared = []
      @validator = validator

      compare(found, expected)
    end

    def errors
      @all_errors.flatten
    end

    def debug
      # puts 'Compared the following type of message:'
      # puts @compared.uniq.map { |m| " - #{m}" }.join("\n")
      # puts ''
      puts errors.uniq.join("\n")
    end

    private

    def compare(found, expected)
      found_by_type = messages_by_type(found)
      expected_by_type = messages_by_type(expected)

      found_by_type.keys.each do |type|
        compare_list(found_by_type[type], expected_by_type[type])
      rescue StandardError => e
        @all_errors << "Error whild comparing #{type}: #{e.message}"
      end
    end

    def messages_by_type(messages)
      by_type = Hash.new { |h, k| h[k] = [] }
      messages.each do |msg|
        by_type[message_type(msg)] << remove_envelope(msg)
      end
      by_type
    end

    def message_type(message)
      message.to_h.each do |key, value|
        return key unless value.nil?
      end
    end

    def remove_envelope(message)
      message.send(message_type(message))
    end

    def compare_list(found, expected)
      found.each_with_index do |message, index|
        compare_message(message, expected[index])
      end
    end

    def compare_message(found, expected)
      return unless found.is_a?(Cucumber::Messages::Message)
      return if found.is_a?(Cucumber::Messages::GherkinDocument)
      return if found.is_a?(Cucumber::Messages::Pickle)
      return if found.is_a?(Cucumber::Messages::Timestamp) && expected.is_a?(Cucumber::Messages::Timestamp)
      return if found.is_a?(Cucumber::Messages::Duration) && expected.is_a?(Cucumber::Messages::Duration)
      return if ENV['CI'] && found.is_a?(Cucumber::Messages::Ci) && expected.nil?

      @compared << found.class.name
      @all_errors << @validator.compare(found, expected)
      compare_sub_messages(found, expected)
    end

    def compare_sub_messages(found, expected)
      return unless expected.respond_to? :to_h
      expected.to_h.keys.each do |key|
        value = expected.send(key)
        if value.is_a?(Array)
          compare_list(found.send(key), value)
        else
          compare_message(found.send(key), value)
        end
      end
    end
  end
end
