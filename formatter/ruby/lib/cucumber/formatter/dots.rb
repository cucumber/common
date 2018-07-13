require 'open3'
require 'cucumber/messages'
require 'cucumber/exe/exe_file'

module Cucumber
  module Formatter

    class Dots
      def initialize(config)
        @out_stream = config.out_stream

        config.on_event :test_run_started, &method(:on_test_run_started)
        config.on_event :test_step_finished, &method(:on_test_step_finished)
        config.on_event :test_run_finished, &method(:on_test_run_finished)

        root = File.expand_path(File.dirname(__FILE__) + '/../../..')
        @exe = Exe::ExeFile.new("#{root}/executables/dots/dots-{{.OS}}-{{.Arch}}{{.Ext}}").target_file
      end
      
      def on_test_run_started(event)
        @stdin, stdout, stderr, @wait_thr = Open3.popen3(@exe)
        @out_thread = Thread.new do
          stdout.each_byte {|b| @out_stream << b.chr}
        end
      end

      def on_test_step_finished(event)
        wrapper = Cucumber::Messages::Wrapper.new(
          testStepFinished: Cucumber::Messages::TestStepFinished.new(
            status: event.result.upcase.to_sym
          )
        )
        bytes = Cucumber::Messages::Wrapper.encode(wrapper)
        len_bytes = encode_varint(bytes.unpack('C*').length)
        @stdin.write(len_bytes)
        @stdin.write(bytes)
      end

      def on_test_run_finished(event)
        @stdin.close
        @wait_thr.join
        @out_thread.join
      end

      # https://github.com/ruby-protobuf/protobuf/blob/ac12151db8c6ef5a0931642558d195e5fac16b4d/lib/protobuf/field/varint_field.rb#L34-L43
      def encode_varint(value)
        bytes = []
        until value < 128
          bytes << (0x80 | (value & 0x7f))
          value >>= 7
        end
        (bytes << value).pack('C*')
      end
    end
  end
end
