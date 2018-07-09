require 'cucumber/messages'
require 'cucumber/formatter/get_status'

module Cucumber
  module Formatter

    class Dots
      def initialize(config)
        config.on_event :test_run_started do |event|
          puts "starting"
        end
        config.on_event :test_step_finished do |event|
          message = Messages::TestStepFinished.new(
            status: GetStatus.for_result(event.result)
          ) 
          puts message.to_json
        end
        config.on_event :test_run_finished do |event|
          puts "done"
        end
      end
    end
  end
end
