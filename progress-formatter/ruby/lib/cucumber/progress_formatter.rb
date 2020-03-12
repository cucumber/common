require 'cucumber/messages'

module Cucumber
  module ProgressFormatter
    class Formatter
      def initialize(out)
        @out = out
      end

      def process_message(envelope)
        return unless envelope.test_step_finished
        @out.print(CHARS[envelope.test_step_finished.test_step_result.status])
      end

      CHARS = {
        Cucumber::Messages::TestStepResult::Status::PASSED => '.',
        Cucumber::Messages::TestStepResult::Status::FAILED => 'F',
        Cucumber::Messages::TestStepResult::Status::UNDEFINED => 'U',
        Cucumber::Messages::TestStepResult::Status::PENDING => 'P',
        Cucumber::Messages::TestStepResult::Status::AMBIGUOUS => '-'
      }
    end
  end
end
