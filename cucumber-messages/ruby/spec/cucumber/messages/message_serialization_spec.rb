require 'cucumber/messages'

module Cucumber
  module Messages
    describe Messages do

      it "can be serialised over a stream" do
        outgoing_messages = create_outgoing_messages

        io = StringIO.new
        write_outgoing_messages(outgoing_messages, io)

        io.rewind
        incoming_messages = ProtobufIoEnumerator.call(io)

        expect(incoming_messages.to_a).to(eq(outgoing_messages))
      end

      def create_outgoing_messages
        return [
          Wrapper.new(source: Source.new(data: 'Feature: Hello')),
          Wrapper.new(attachment: Attachment.new(data: 'some stack trace'))
        ]
      end

      def write_outgoing_messages(messages, out)
        messages.each do |message|
          message.write_delimited_to(out)
        end
      end
    end
  end
end