require 'cucumber/messages/varint'

module Cucumber
  module Messages
    module NdjsonIoEnumerator
      def self.call(io)
        Enumerator.new do |yielder|
          io.each_line do |json|
            args = JSON.parse(json)
            yielder.yield(Cucumber::Messages::Envelope.new(args))
          end
        end
      end
    end
  end
end
