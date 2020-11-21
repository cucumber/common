require 'yaml'
require 'json'
require 'cucumber/cucumber_expressions/cucumber_expression'
require 'cucumber/cucumber_expressions/parameter_type_registry'

module Cucumber
  module CucumberExpressions
    describe CucumberExpression do

      Dir['testdata/expression/*.yaml'].each do |testcase|
        expectation = YAML.load_file(testcase) # encoding?
        it "#{testcase}" do
          parameter_registry = ParameterTypeRegistry.new
          if expectation['exception'].nil?
            cucumber_expression = CucumberExpression.new(expectation['expression'], parameter_registry)
            matches = cucumber_expression.match(expectation['text'])
            values = matches.nil? ? nil : matches.map { |arg| arg.value(nil) }
            expect(values).to eq(JSON.parse(expectation['expected']))
          else
            expect {
              cucumber_expression = CucumberExpression.new(expectation['expression'], parameter_registry)
              cucumber_expression.match(expectation['text'])
            }.to raise_error(expectation['exception'])
          end
        end
      end
    end
  end
end
