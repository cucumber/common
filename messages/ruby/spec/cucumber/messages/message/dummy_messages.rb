require 'cucumber/messages/message'

module Cucumber::Messages
  class SimpleMessage < Message
    attr_reader :is_nil, :is_string, :is_array, :is_number

    def initialize(is_nil: nil, is_string: '', is_array: [], is_number: 0)
      @is_nil = is_nil
      @is_string = is_string
      @is_array = is_array
      @is_number = is_number
    end
  end

  class EnumMessage
    ENUM = 'an enum'
  end

  class ComprehensiveMessage < Message
    attr_reader :simple_message, :message_array, :is_enum

    def initialize(
      simple_message: SimpleMessage.new,
      message_array: [SimpleMessage.new, SimpleMessage.new],
      is_enum: EnumMessage::ENUM
    )
      @simple_message = simple_message
      @message_array = message_array
      @is_enum = is_enum
    end

    private

    def self.message_array_from_h(hash)
      SimpleMessage.from_h(hash)
    end
  end
end