require 'cucumber/messages'

module Gherkin
  module Stream
    class ProtobufMessageStream
      def initialize(io)
        @io = io
      end

      def messages
        Enumerator.new do |y|
          until @io.eof?
            STDERR.puts "HELLO"
            envelope = Cucumber::Messages::Envelope.parse_delimited_from(@io)
            y.yield envelope
          end
        end
      end
    end
  end
end
