require 'cucumber/messages/varint'

module Cucumber
  module Messages
    module ProtobufIoEnumerator
      def self.call(io)
        Enumerator.new do |yielder|
          while !io.eof?
            yielder.yield(Cucumber::Messages::Wrapper.parse_delimited_from(io))
          end
        end
      end
    end
  end
end