require 'cucumber/messages/varint'

module Cucumber
  module Messages
    module NdjsonIoEnumerator
      def self.call(io)
        Enumerator.new do |yielder|
          io.each_line do |json|
            yielder.yield(Cucumber::Messages::Envelope.decode_json(json))
          end
        end
      end
    end
  end
end