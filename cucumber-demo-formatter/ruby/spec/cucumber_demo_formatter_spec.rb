require 'stringio'
require 'cucumber/messages'
require 'cucumber_demo_formatter'

describe CucumberDemoFormatter do
  it "prints a smiley for a passed step" do
    input = StringIO.new
    
    %w{UNKNOWN PASSED SKIPPED PENDING UNDEFINED AMBIGUOUS FAILED}.each do |status|
      Cucumber::Messages::Envelope.new(
        testStepFinished: Cucumber::Messages::TestStepFinished.new(
          testResult: Cucumber::Messages::TestResult.new(
            status: status
          )
        )
      ).write_delimited_to(input)
    end
    
    input.rewind

    output = StringIO.new

    f = CucumberDemoFormatter.new
    message_enumerator = Cucumber::Messages::BinaryToMessageEnumerator.new(input)
    f.process_messages(message_enumerator, output)
    
    output.rewind
    s = output.read
    expect(s).to eq('👽😃🥶⏰🤷🦄💣')
  end
end