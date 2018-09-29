require 'open3'
require 'cucumber/messages'
require 'c21e/exe_file'

module Cucumber
  module Formatter

    class Dots
      include ::Cucumber::Messages::Varint

      def initialize(config)
        @out_stream = config.out_stream

        config.on_event :test_run_started, &method(:on_test_run_started)
        config.on_event :test_step_finished, &method(:on_test_step_finished)
        config.on_event :test_run_finished, &method(:on_test_run_finished)

        root = File.expand_path(File.dirname(__FILE__) + '/../../..')
        @exe = C21e::ExeFile.new("#{root}/dots-formatter-go/dots-formatter-go-{{.OS}}-{{.Arch}}{{.Ext}}").target_file
      end
      
      def on_test_run_started(event)
        @stdin, stdout, stderr, @wait_thread = Open3.popen3(@exe)
        @out_thread = Thread.new do
          stdout.each_byte {|b| @out_stream << b.chr}
        end
      end

      def on_test_step_finished(event)
        wrapper = if event.test_step.hook?
          Cucumber::Messages::Wrapper.new(
          testHookFinished: Cucumber::Messages::TestHookFinished.new(
            testResult: Cucumber::Messages::TestResult.new(
              status: event.result.to_sym.upcase
            )
          )
        )
        else
          Cucumber::Messages::Wrapper.new(
          testStepFinished: Cucumber::Messages::TestStepFinished.new(
            testResult: Cucumber::Messages::TestResult.new(
              status: event.result.to_sym.upcase
            )
          )
        )
        end
        bytes = Cucumber::Messages::Wrapper.encode(wrapper)
        encode_varint(@stdin, bytes.unpack('C*').length)
        @stdin.write(bytes)
      end

      def on_test_run_finished(event)
        @stdin.close
        @wait_thread.join
        @out_thread.join
      end
    end
  end
end
