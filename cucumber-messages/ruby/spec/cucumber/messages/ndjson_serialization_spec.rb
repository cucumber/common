require 'cucumber/messages'

module Cucumber
  module Messages
    describe Messages do

      it "can be serialised over an ndjson stream" do
        outgoing_messages = [
          Envelope.new(source: Source.new(data: 'Feature: Hello')),
          Envelope.new(attachment: Attachment.new(data: 'some stack trace'))
        ]

        io = StringIO.new
        write_outgoing_messages(outgoing_messages, io)

        io.rewind
        incoming_messages = NdjsonIoEnumerator.call(io)

        expect(incoming_messages.to_a).to(eq(outgoing_messages))
      end

      def write_outgoing_messages(messages, out)
        messages.each do |message|
          out.write(message.class.encode_json(message) + "\n")
        end
      end
    end
  end
end