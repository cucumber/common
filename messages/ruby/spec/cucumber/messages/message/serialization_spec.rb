require 'rspec'
require 'cucumber/messages/message/dummy_messages'

describe Cucumber::Messages::Message::Serialization do
  context 'with a simple message' do
    describe '#to_h' do
      subject { Cucumber::Messages::SimpleMessage.new.to_h }

      it 'returns a Hash with all the attributes of the Message' do
        expect(subject).to eq({ is_nil: nil, is_string: '', is_array: [], is_number: 0 })
      end

      context 'whith camelize: true' do
        subject { Cucumber::Messages::SimpleMessage.new.to_h(camelize: true) }

        it 'camelize the keys of the resulting hash' do
          expect(subject).to eq({ isNil: nil, isString: '', isArray: [], isNumber: 0 })
        end
      end

      context 'with reject_nil_values: true' do
        subject { Cucumber::Messages::SimpleMessage.new.to_h(reject_nil_values: true) }

        it 'rejects nil values from the resulting hash' do
          expect(subject).to eq({ is_string: '', is_array: [], is_number: 0 })
        end
      end
    end

    describe '#to_json' do
      subject { Cucumber::Messages::SimpleMessage.new.to_json }

      it 'returns a JSON document with all the attributes of the Message except nil values' do
        expect(subject).to eq({ isString: '', isArray: [], isNumber: 0 }.to_json)
      end
    end
  end

  context 'with a message which embeds other messages' do
    describe '#to_h' do
      subject { Cucumber::Messages::ComprehensiveMessage.new.to_h }

      it 'includes hash representation of embedded messages' do
        expect(subject[:simple_message]).to eq({ is_nil: nil, is_string: '', is_array: [], is_number: 0 })
        expect(subject[:is_enum]).to eq 'an enum'
      end

      it 'includes hash representation of messages arrays' do
        expect(subject[:message_array]).to eq([
          { is_nil: nil, is_string: '', is_array: [], is_number: 0 },
          { is_nil: nil, is_string: '', is_array: [], is_number: 0 }
        ])
      end

      context 'whith camelize: true' do
        subject { Cucumber::Messages::ComprehensiveMessage.new.to_h(camelize: true) }

        it 'camelize the keys of the embedded messages resulting hashes' do
          expect(subject[:simpleMessage]).to eq({ isNil: nil, isString: '', isArray: [], isNumber: 0 })
        end

        it 'camelize the keys of hashes for messages arrays' do
          expect(subject[:messageArray]).to eq([
            { isNil: nil, isString: '', isArray: [], isNumber: 0 },
            { isNil: nil, isString: '', isArray: [], isNumber: 0 }
          ])
        end
      end
    end

    describe '#to_json' do
      subject { Cucumber::Messages::ComprehensiveMessage.new.to_json }

      it 'returns a JSON document with embedded messages' do
        expect(subject).to include({ isString: '', isArray: [], isNumber: 0}.to_json)
        expect(subject).to include('"isEnum":"an enum"')
      end

      it 'returns a JSON document with messages arrays' do
        expect(subject).to include(
          [
            { isString: '', isArray: [], isNumber: 0},
            { isString: '', isArray: [], isNumber: 0}
          ].to_json
        )
      end
    end
  end
end
