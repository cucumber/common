require 'cucumber/messages/varint'

module Cucumber
  module Messages
    class NdjsonToMessageEnumerator < Enumerator
      def initialize(io)
        super() do |yielder|
          io.each_line do |json|
            m = Cucumber::Messages::Envelope.from_json(json)
            yielder.yield(m)
          end
        end
      end
    end
  end
end
