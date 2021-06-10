require 'rspec'
require 'cucumber/messages/message'

class ComprehensiveMessage < Cucumber::Messages::Message
  attr_reader :is_message, :is_enum

  def initialize(is_message: SimpleMessage.new, is_enum: EnumMessage::ENUM)
    @is_message = is_message
    @is_enum = is_enum
  end
end

class SimpleMessage < Cucumber::Messages::Message
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

describe Cucumber::Messages::Message do
  subject { ComprehensiveMessage.new }

  let(:expected_hash) do
    {
      is_message: {
        is_nil: nil,
        is_string: '',
        is_array: [],
        is_number: 0
      },
      is_enum: 'an enum'
    }
  end

  describe '#to_h' do
    it 'returns hashes for embedded messages' do
      expect(subject.to_h).to eq(expected_hash)
    end
  end

  describe '#to_json' do
    it 'returns hashes for embedded messages' do
      expect(subject.to_json).to eq(expected_hash.to_json)
    end
  end
end
