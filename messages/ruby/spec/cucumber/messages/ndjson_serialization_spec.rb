require 'cucumber/messages'

module Cucumber
  module Messages
    describe 'messages' do
      let(:outgoing_messages) do
        [
          Envelope.new(
            source: Source.new(data: 'Feature: Hello')
          ),
          Envelope.new(
            attachment: Attachment.new(body: 'Hello', content_encoding: AttachmentContentEncoding::IDENTITY)
          )
        ]
      end

      it "can be serialised over an ndjson stream" do
        io = StringIO.new
        write_outgoing_messages(outgoing_messages, io)

        io.rewind
        incoming_messages = NdjsonToMessageEnumerator.new(io)

        expect(incoming_messages.to_a.map(&:to_h)).to(eq(outgoing_messages.map(&:to_h)))
      end

      it "ignores empty lines" do
        io = StringIO.new
        write_outgoing_messages(outgoing_messages, io)
        io.write("\n\n")

        io.rewind
        incoming_messages = NdjsonToMessageEnumerator.new(io)

        expect(incoming_messages.to_a.map(&:to_h)).to(eq(outgoing_messages.map(&:to_h)))
      end

      it "includes offending line in error message" do
        io = StringIO.new
        io.puts('BLA BLA')

        io.rewind
        incoming_messages = NdjsonToMessageEnumerator.new(io)

        expect { incoming_messages.to_a }.to(raise_error('Not JSON: BLA BLA'))
      end

      def write_outgoing_messages(messages, out)
        messages.each do |message|
          out.write(message.to_json)
          out.write("\n")
        end
      end
    end
  end
end
