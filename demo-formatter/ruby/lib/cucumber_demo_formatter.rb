require 'cucumber/messages'

class CucumberDemoFormatter
  def process_messages(message_enumerator, output)
    emoji = {
      'UNKNOWN'   => '👽',
      'PASSED'    => '😃',
      'SKIPPED'   => '🥶',
      'PENDING'   => '⏰',
      'UNDEFINED' => '🤷',
      'AMBIGUOUS' => '🦄',
      'FAILED'    => '💣',
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
