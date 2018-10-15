require 'cucumber/messages'

module Gherkin
  class ProtobufCucumberMessages
    include Cucumber::Messages::Varint

    def initialize(io, err = nil)
      @io = io
      @err = err
    end

    def messages
      read_pipes = @err.nil? ? [@io] : [@io, @err]
      Enumerator.new do |y|
        while true
          r, = IO.select(read_pipes)
          if r.first == @err
            raise @err.read unless @err.eof?
          else
            break if @io.eof?
            len = decode_varint(@io)
            buf = @io.read(len)
            wrapper = Cucumber::Messages::EventWrapper.decode(buf)
            y.yield wrapper
          end
        end
      end
    end
  end
end
