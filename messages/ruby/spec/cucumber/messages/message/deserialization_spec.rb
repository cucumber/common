require 'rspec'
require 'cucumber/messages/message/dummy_messages'

describe Cucumber::Messages::Message::Deserialization do
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
          .with({ simpleMessage: { isString: "answer" } })
      end
    end

    context 'with an invalid JSON document' do
      let(:json_document) { '{foo: bar}' }

      it { expect { subject }.to raise_error(JSON::ParserError) }
    end
  end
end
