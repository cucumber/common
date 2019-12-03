require 'cucumber/messages'

class CucumberDemoFormatter
  def process_messages(message_enumerator, output)
    emoji = {
      UNKNOWN:   '👽',
      PASSED:    '😃',
      SKIPPED:   '🥶',
      PENDING:   '⏰',
      UNDEFINED: '🤷',
      AMBIGUOUS: '🦄',
      FAILED:    '💣',
    }
    message_enumerator.each do |message|
      if message.test_step_finished
        output.write(emoji[message.test_step_finished.test_result.status])
      end
      if message.test_run_finished
        output.write("\n")
      end
    end
  end
end