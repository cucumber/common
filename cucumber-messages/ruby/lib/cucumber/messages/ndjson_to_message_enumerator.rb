require 'cucumber/messages/varint'

module Cucumber
  module Messages
    class NdjsonToMessageEnumerator < Enumerator
      def initialize(io)
        super() do |yielder|
          io.each_line do |json|
            args = JSON.parse(json)
            yielder.yield(Cucumber::Messages::Envelope.new(args))
          end
        end
      end
    end
  end
end
