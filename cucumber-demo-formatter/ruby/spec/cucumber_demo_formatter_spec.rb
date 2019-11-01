require 'stringio'
require 'cucumber/messages'
require 'cucumber_demo_formatter'

describe CucumberDemoFormatter do
  it "prints a smiley for a passed step" do
    input = StringIO.new
    
    passed = Cucumber::Messages::Envelope.new(
      testStepFinished: Cucumber::Messages::TestStepFinished.new(
        testResult: Cucumber::Messages::TestResult.new(
          status: 'PASSED'
        )
      )
    )
    passed.write_delimited_to(input)
    
    input.rewind

    output = StringIO.new

    f = CucumberDemoFormatter.new
    f.process_messages(input, output)
    
    output.rewind
    s = output.read
    expect(s).to eq('😃')
  end
end