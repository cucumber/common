# The Cucumber Compatibility Kit for Ruby

The Cucumber Compatibility Kit - or CCK - for ruby is a gem that aims to help validating
an implementation of Cucumber.

It provides a set of features and the expected messages related to those features.

It also provides some tools to help in the validation of messages issued from the
execution of the CCK's features.

## Installation and Usage

Add `cucumber-compatibility-kit` to your `Gemfile` as a development dependency, and
install it:

    bundle install

Then add a spec that could look like this:

```ruby
# spec/cck_spec.rb
require 'cucumber-compatibility-kit'

describe 'Cucumber Compatibility Kit' do
  let(:cucumber_bin) { './bin/cucumber' }
  let(:cucumber_common_args) { '--publish-quiet --profile none --format message' }
  let(:cucumber_command) { "#{cucumber_bin} #{cucumber_common_args}" }

  examples = Cucumber::CompatibilityKit.gherkin_examples.reject { |example|
    example == 'retry'
  }

  examples.each do |example_name|
    describe "'#{example_name}' example" do
      include_examples 'cucumber compatibility kit' do
        let(:example) { example_name }
        let(:messages) { `#{cucumber_command} --require #{example_path} #{example_path}` }
      end
    end
  end
end

```

`Cucumber::CompatibilityKit.gherkin_examples` returns an array that list all the
gherkin examples available within the CCK. Here, we want to execute all of them with
the exception of the `retry` one.

`let(:messages)` executes the cucumber command. `example_path` is provided by the
CCK. It is the path to the folder which contains the feature, and the support code
required to execute the given example. As we use the `--format message` formatter,
`messages` will then contain the messages as a `ndjson` document.

You can use `gem open cucumber-compatibility-kit` in order to take a look on the
features, their support code, and the expected messages.They are available in the
`features` folder within the gem.
