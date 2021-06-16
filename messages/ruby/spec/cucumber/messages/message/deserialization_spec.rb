require 'rspec'
require 'cucumber/messages/message/dummy_messages'

describe Cucumber::Messages::Message::Deserialization do
  describe '#from_h from a message implementation' do
    subject { Cucumber::Messages::SimpleMessage.from_h(hash) }

    let(:hash) { { is_nil: nil, is_string: 'a string', is_array: [1, 2] } }

    it { is_expected.to be_a Cucumber::Messages::SimpleMessage }

    it 'initializes the message attributes' do
      expect(subject.is_nil).to be_nil
      expect(subject.is_string).to eq 'a string'
      expect(subject.is_array).to eq [1, 2]
    end

    it 'initializes attributes with default values when missing in the hash' do
      expect(subject.is_number).to eq 0
    end

    context 'with camelCased keys' do
      let(:hash) { { isString: 'a string', isNumber: 42 } }

      it 'initializes the message attributes properly' do
        expect(subject.is_string).to eq 'a string'
        expect(subject.is_number).to eq 42
      end
    end

    context 'with embedded messages' do
      subject { Cucumber::Messages::ComprehensiveMessage.from_h(hash) }

      let(:hash) do
        {
          simple_message: {
            is_number: 42
          }
        }
      end

      it { is_expected.to be_a Cucumber::Messages::ComprehensiveMessage }

      it 'initialize attributes with instances of embedded messages' do
        expect(subject.simple_message).to be_a Cucumber::Messages::SimpleMessage
        expect(subject.simple_message.is_number).to eq 42
      end
    end

    context 'with embedded array of messages' do
      subject { Cucumber::Messages::ComprehensiveMessage.from_h(hash) }

      let(:hash) do
        {
          message_array: [
            { is_number: 42 },
            { is_string: 'The answer' }
          ]
        }
      end

      it 'initialize array with instances of embedded messages if self.#{attribute}_from_h is implemented' do
        expect(subject.message_array.length).to eq 2

        subject.message_array.each do |message|
          expect(message).to be_a Cucumber::Messages::SimpleMessage
        end

        expect(subject.message_array.first.is_number).to eq 42
        expect(subject.message_array.last.is_string).to eq 'The answer'
      end
    end
  end

  describe '#from_h from Cucumber::Messages::Message base class' do
    subject { Cucumber::Messages::Message.from_h(hash) }

    context 'when the hash do not identify the type of the message' do
      let(:hash) { { is_nil: nil, is_string: 'a string', is_array: [1, 2] } }

      it 'raises a NameError' do
        expect {
          subject
        }.to raise_error(NameError)
      end
    end

    context 'when the hash identify the type of the message' do
      let(:hash) do
        {
          simple_message: { }
        }
      end

      it { is_expected.to be_a Cucumber::Messages::SimpleMessage }
    end

    context 'when the hash has several types of messages' do
      let(:hash) do
        {
          simple_message: { },
          comprehensive_message: { }
        }
      end

      it { is_expected.to be_a Array }

      it 'instanciate all messages' do
        expect(subject.length).to eq 2
        expect(subject.first).to be_a Cucumber::Messages::SimpleMessage
        expect(subject.last).to be_a Cucumber::Messages::ComprehensiveMessage
      end
    end
  end

  describe '#from_json' do
    subject { Cucumber::Messages::Message.from_json(json_document) }

    let(:json_document) { '' }

    context 'with a valid JSON document' do
      let(:json_document) { '{"simpleMessage":{"isString":"answer"}}' }

      it 'deserialize the message using #from_h' do
        allow(Cucumber::Messages::Message).to receive(:from_h)

        subject

        expect(Cucumber::Messages::Message)
          .to have_received(:from_h)
          .with({ "simpleMessage" => { "isString" => "answer" } })
      end

      it 'returns an instance of the corresponding message' do
        expect(subject).to be_a Cucumber::Messages::SimpleMessage
        expect(subject.is_string).to eq 'answer'
      end
    end

    context 'with an invalid JSON document' do
      let(:json_document) { '{foo: bar}' }

      it { expect { subject }.to raise_error(JSON::ParserError) }
    end
  end
end
