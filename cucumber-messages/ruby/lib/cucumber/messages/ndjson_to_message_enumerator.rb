require 'cucumber/messages/varint'

module Cucumber
  module Messages
    class NdjsonToMessageEnumerator < Enumerator
      def initialize(io)
        super() do |yielder|
          io.each_line do |json|
            yielder.yield(Cucumber::Messages::Envelope.decode_json(json))
          end
        end
      end
    end
  end
end
