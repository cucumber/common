require 'cucumber/messages'
require 'cucumber/formatter/get_status'
require 'cucumber/formatter/messages/shared_formatter'

module Cucumber
  module Formatter

    class Dots
      def initialize(config)
        formatter = nil
        config.on_event :test_run_started do |event|
          formatter = Messages::SharedFormatter.new('dots')
        end
        config.on_event :test_step_finished do |event|
          message = Cucumber::Messages::TestStepFinished.new(
            status: GetStatus.for_result(event.result)
          ) 
          begin
          formatter.emit(message)
          rescue => e
            puts e
          end
        end
        config.on_event :test_run_finished do |event|
          puts "done"
        end
      end
    end
  end
end
