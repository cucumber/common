require 'cucumber/messages'

class CucumberDemoFormatter
  def process_messages(message_enumerator, output)
    emoji = {
      ::Cucumber::Messages::TestStepResult::Status::UNKNOWN   => '👽',
      ::Cucumber::Messages::TestStepResult::Status::PASSED    => '😃',
      ::Cucumber::Messages::TestStepResult::Status::SKIPPED   => '🥶',
      ::Cucumber::Messages::TestStepResult::Status::PENDING   => '⏰',
      ::Cucumber::Messages::TestStepResult::Status::UNDEFINED => '🤷',
      ::Cucumber::Messages::TestStepResult::Status::AMBIGUOUS => '🦄',
      ::Cucumber::Messages::TestStepResult::Status::FAILED    => '💣',
    }
    message_enumerator.each do |message|
      if message.test_step_finished
        status = message.test_step_finished.test_step_result.status
        em = emoji[status]
        raise "No emoji found for status #{status}" if em.nil?
        output.write(em)
      end
      if message.test_run_finished
        output.write("\n")
      end
    end
  end
end
