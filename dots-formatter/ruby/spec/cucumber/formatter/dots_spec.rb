require 'stringio'
require 'cucumber/formatter/dots'

module Cucumber
  module Formatter
    
    class StubConfig
      attr_reader :out_stream
      
      def initialize
        @out_stream = StringIO.new
        @handlers = {}
      end
      
      def on_event(event, &handler)
        @handlers[event] = handler
      end
      
      def method_missing(sym, *args)
        @handlers[sym].call(*args)
      end
    end
    
    TestStep = Struct.new(:hook?)
    TestStepFinished = Struct.new(:result, :test_step)

    describe Dots do
      def hook_finished_event(status)
        TestStepFinished.new(status, TestStep.new(true))
      end

      def gherkin_step_finished_event(status)
        TestStepFinished.new(status, TestStep.new(false))
      end

      it 'prints coloured dots' do
        config = StubConfig.new
        Dots.new(config)

        config.test_run_started({})
        config.test_step_finished(hook_finished_event('failed'))
        config.test_step_finished(gherkin_step_finished_event('failed'))
        config.test_step_finished(gherkin_step_finished_event('skipped'))
        config.test_step_finished(gherkin_step_finished_event('undefined'))
        config.test_step_finished(gherkin_step_finished_event('ambiguous'))
        config.test_step_finished(gherkin_step_finished_event('passed'))
        config.test_step_finished(gherkin_step_finished_event('pending'))
        config.test_run_finished({})

        config.out_stream.rewind
        out = config.out_stream.read

        expect(out).to eq(File.read(File.dirname(__FILE__) + '/expected_output.ansi'))
      end
    end
  end
end
