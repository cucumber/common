require 'cucumber/messages'

class CucumberDemoFormatter
  def process_messages(input, output)
    message_enumerator = Cucumber::Messages::ProtobufIoEnumerator.call(input)
    message_enumerator.each do |message|
      if message.testStepFinished
        output.write({
          UNKNOWN:   '👽',
          PASSED:    '😃',
          SKIPPED:   '🥶',
          PENDING:   '⏰',
          UNDEFINED: '🤷',
          AMBIGUOUS: '🦄',
          FAILED:    '💣',
        }[message.testStepFinished.testResult.status])
      end
      if message.testRunFinished
        output.write("\n")
      end
    end
  end
end