require 'cucumber/messages'

class CucumberDemoFormatter
  def process_messages(message_enumerator, output)
    emoji = {
      ::Cucumber::Messages::TestResult::Status::UNKNOWN   => '👽',
      ::Cucumber::Messages::TestResult::Status::PASSED    => '😃',
      ::Cucumber::Messages::TestResult::Status::SKIPPED   => '🥶',
      ::Cucumber::Messages::TestResult::Status::PENDING   => '⏰',
      ::Cucumber::Messages::TestResult::Status::UNDEFINED => '🤷',
      ::Cucumber::Messages::TestResult::Status::AMBIGUOUS => '🦄',
      ::Cucumber::Messages::TestResult::Status::FAILED    => '💣',
    }
    message_enumerator.each do |message|
      if message.test_step_finished
        status = message.test_step_finished.test_result.status
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
