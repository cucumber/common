require 'cucumber/messages'

module Cucumber
  module Messages
    describe 'messages' do
      it "can be serialised over an ndjson stream" do
        outgoing_messages = [
          {'source' => {'data' => 'Feature: Hello'}},
          {'attachment' => {'binary' => [1,2,3,4].pack('C*')}}
        ]

        io = StringIO.new
        write_outgoing_messages(outgoing_messages, io)

        io.rewind
        incoming_messages = NdjsonToMessageEnumerator.new(io)

        expect(incoming_messages.to_a).to(eq(outgoing_messages))
      end

      it "ignores empty lines" do
        outgoing_messages = [
          {'source' => {'data' => 'Feature: Hello'}},
          {'attachment' => {'binary' => [1,2,3,4].pack('C*')}}
        ]

        io = StringIO.new
        write_outgoing_messages(outgoing_messages, io)
        io.write("\n\n")

        io.rewind
        incoming_messages = NdjsonToMessageEnumerator.new(io)

        expect(incoming_messages.to_a).to(eq(outgoing_messages))
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
