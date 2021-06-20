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
      if message['testStepFinished']
        status = message['testStepFinished']['testStepResult']['status']
        em = emoji[status]
        raise "No emoji found for status #{status}" if em.nil?
        output.write(em)
      end
      if message['testRunFinished']
        output.write("\n")
      end
    end
  end
end
