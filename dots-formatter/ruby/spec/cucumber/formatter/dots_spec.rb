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
    
    TestStepFinished = Struct.new(:result)
    
    describe Dots do
      it 'prints coloured dots' do
        config = StubConfig.new
        f = Dots.new(config)
        
        config.test_run_started({})
        config.test_step_finished(TestStepFinished.new('failed'))
        config.test_step_finished(TestStepFinished.new('skipped'))
        config.test_step_finished(TestStepFinished.new('undefined'))
        config.test_step_finished(TestStepFinished.new('ambiguous'))
        config.test_step_finished(TestStepFinished.new('passed'))
        config.test_step_finished(TestStepFinished.new('pending'))
        config.test_run_finished({})
        
        config.out_stream.rewind
        out = config.out_stream.read
        
        # F-UA.P in colours
        expect(out).to eq("\e[31mF\e[0m\e[36m-\e[0m\e[33mU\e[0m\e[35mA\e[0m\e[32m.\e[0m\e[33mP\e[0m\n")
      end
    end
  end
end
