require 'cucumber/messages'

module Gherkin
  class ProtobufCucumberMessages
    def initialize(io)
      @io = io
    end
    
    def messages
      Enumerator.new do |y|
        while !@io.eof?
          len = varint(@io)
          buf = @io.read(len)
          wrapper = Cucumber::Messages::Wrapper.decode(buf)
          y.yield wrapper
        end
      end
    end
    
    # TODO: Maybe use https://github.com/liquidm/varint if available
    def varint(io)
      # https://github.com/ruby-protobuf/protobuf/blob/master/lib/protobuf/varint_pure.rb
      value = index = 0
      begin
        byte = io.readbyte
        value |= (byte & 0x7f) << (7 * index)
        index += 1
      end while (byte & 0x80).nonzero?
      value
    end
  end
end
