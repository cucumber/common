require 'stringio'
require 'cucumber/messages'
require 'cucumber_demo_formatter'

describe CucumberDemoFormatter do
  it "prints a smiley for a passed step" do
    input = StringIO.new

    %w{UNKNOWN PASSED SKIPPED PENDING UNDEFINED AMBIGUOUS FAILED}.each do |status|
      input.write({
        testStepFinished: {
          testStepResult: {
            status: status
          }
        }
      }.to_json)
      input.write("\n")
    end

    input.rewind

    output = StringIO.new

    f = CucumberDemoFormatter.new
    message_enumerator = Cucumber::Messages::NdjsonToMessageEnumerator.new(input)
    f.process_messages(message_enumerator, output)

    output.rewind
    s = output.read
    expect(s).to eq('👽😃🥶⏰🤷🦄💣')
  end
end
