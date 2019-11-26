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
      if message.testStepFinished
        output.write(emoji[message.testStepFinished.testResult.status])
      end
      if message.testRunFinished
        output.write("\n")
      end
    end
  end
end