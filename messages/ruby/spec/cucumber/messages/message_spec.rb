require 'rspec'
require 'cucumber/messages/message'

module Cucumber
  module Messages
    class ComprehensiveMessage < ::Cucumber::Messages::Message
      attr_reader :simple_message, :is_enum

      def initialize(simple_message: SimpleMessage.new, is_enum: EnumMessage::ENUM)
        @simple_message = simple_message
        @is_enum = is_enum
      end
    end

    class SimpleMessage < ::Cucumber::Messages::Message
      attr_reader :is_nil, :is_string, :is_array, :is_number

      def initialize(is_nil: nil, is_string: '', is_array: [], is_number: 0)
        @is_nil = is_nil
        @is_string = is_string
        @is_array = is_array
        @is_number = is_number
      end
    end
  end
end

class Cucumber::Messages::EnumMessage
  ENUM = 'an enum'
end

describe Cucumber::Messages::Message do
  subject { Cucumber::Messages::ComprehensiveMessage.new }

  let(:expected_hash) do
    {
      simple_message: {
        is_nil: nil,
        is_string: '',
        is_array: [],
        is_number: 0
      },
      is_enum: 'an enum'
    }
  end

  let(:expected_camelized_hash) do
    {
      simpleMessage: {
        isNil: nil,
        isString: '',
        isArray: [],
        isNumber: 0
      },
      isEnum: 'an enum'
    }
  end

  describe '#to_h' do
    it 'returns hashes for embedded messages' do
      expect(subject.to_h).to eq(expected_hash)
    end

    context 'with camelize: true' do
      it 'transform keys of the h to camelCase' do
        expect(subject.to_h(camelize: true)).to eq(expected_camelized_hash)
      end
    end
  end

  describe '#to_json' do
    it 'returns hashes for embedded messages' do
      expect(subject.to_json).to eq(expected_camelized_hash.to_json)
    end
  end

  describe '#from_json' do
    subject { Cucumber::Messages::Message.from_json(json_string) }

    let(:json_string) {
      {
        comprehensiveMessage: {
          simpleMessage: {
            isNil: nil,
            isString: 'a string',
            isArray: [1, 2, 3],
            isNumber: 4
          },
          isEnum: 'an enum'
        }
      }.to_json
    }

    it 'returns an instance of the corresponding DTO' do
      expect(subject).to be_a(Cucumber::Messages::ComprehensiveMessage)
    end

    it 'properly deserialize DTO attributes' do
      expect(subject.is_enum).to eq 'an enum'
      expect(subject.simple_message).to be_a(Cucumber::Messages::SimpleMessage)
      expect(subject.simple_message.is_string).to eq 'a string'
      expect(subject.simple_message.is_number).to eq 4
      expect(subject.simple_message.is_array).to eq [1, 2, 3]
    end
  end
end
