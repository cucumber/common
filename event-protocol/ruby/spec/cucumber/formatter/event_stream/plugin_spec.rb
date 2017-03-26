require 'cucumber/formatter/event_stream/plugin'
require 'cucumber/configuration'
require 'cucumber/core/test/case'
require 'cucumber/hooks'

describe Cucumber::Formatter::EventStream::Plugin do
  describe "when the test run starts" do

    it "emits one `test-case-prepared` event per test case" do
      source = [
        source('features/test.feature:3'),
        source('features/test.feature:1')
      ]
      test_steps = [
        Cucumber::Core::Test::Step.new(
          [ source('features/test.feature:4') ]
        ).with_action(
          location('features/step_definitions/steps.rb:1')
        ) { 
          # passing step
        }
      ]
      output = run_test_cases([ Cucumber::Core::Test::Case.new(test_steps, source) ])
      expect(output.count { |message| message['type'] == 'test-case-prepared' }).to be 1
    end
  end

  describe "test-case-prepared event" do
    it "emits only the actionLocation for a hook" do
      source = [
        source('features/test.feature:3'),
        source('features/test.feature:1')
      ]
      test_steps = [
        Cucumber::Hooks.before_hook(
          source,
          location('features/support/hooks.rb:1')
        ) {
          # passing hook
        },
      ]

      output = run_test_cases([ Cucumber::Core::Test::Case.new(test_steps, source) ])
      message = output.find { |message| message['type'] == 'test-case-prepared' }
      expect(message['steps'][0].keys).to_not include('sourceLocation')
      expect(message['steps'][0]['actionLocation']).to eq({ 'uri' => 'features/support/hooks.rb', 'line' => 1 })
    end

    it "emits only the sourceLocation for an undefined Gherkin step" do
      source = [
        source('features/test.feature:3'),
        source('features/test.feature:1')
      ]
      test_steps = [
        Cucumber::Core::Test::Step.new(
          [ source('features/test.feature:4') ]
        )
      ]
      output = run_test_cases([ Cucumber::Core::Test::Case.new(test_steps, source) ])
      message = output.find { |message| message['type'] == 'test-case-prepared' }
      expect(message['steps'][0].keys).to_not include('actionLocation')
      expect(message['steps'][0]['sourceLocation']).to eq({ 'uri' => 'features/test.feature', 'line' => 4 })
    end

    it "emits both actionLocation and sourceLocation for a Gherkin step with an action" do
      source = [
        source('features/test.feature:3'),
        source('features/test.feature:1')
      ]
      test_steps = [
        Cucumber::Core::Test::Step.new(
          [ source('features/test.feature:4') ]
        ).with_action(
          location('features/step_definitions/steps.rb:1')
        ) { 
          # passing step
        }
      ]
      output = run_test_cases([ Cucumber::Core::Test::Case.new(test_steps, source) ])
      message = output.find { |message| message['type'] == 'test-case-prepared' }
      expect(message['steps'][0]['actionLocation']).to eq({ 'uri' => 'features/step_definitions/steps.rb', 'line' => 1 })
      expect(message['steps'][0]['sourceLocation']).to eq({ 'uri' => 'features/test.feature', 'line' => 4 })
    end
  end

  def location(file_colon_line)
    Cucumber::Core::Ast::Location.from_file_colon_line(file_colon_line)
  end

  def source(file_colon_line)
    double(location: location(file_colon_line))
  end

  def run_test_cases(test_cases)
    io = StringIO.new
    config = Cucumber::Configuration.new(out_stream: io)
    options = {}
    plugin = Cucumber::Formatter::EventStream::Plugin.new(config, options)
    config.notify :test_run_starting, test_cases
    io.string.lines.map { |line| JSON.parse(line) }
  end

end
