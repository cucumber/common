require 'cucumber/cucumber_expressions/cucumber_expression'
require 'cucumber/cucumber_expressions/parameter_registry'

module Cucumber
  module CucumberExpressions
    describe CucumberExpression do
      context "Regexp translation" do
        def assert_regexp(expression, regexp)
          cucumber_expression = CucumberExpression.new(expression, [], ParameterRegistry.new)
          expect(regexp).to eq(cucumber_expression.instance_variable_get('@regexp'))
        end

        it "translates no arguments" do
          assert_regexp(
            "I have 10 cukes in my belly now",
            /^I have 10 cukes in my belly now$/
          )
        end

        it "translates two untyped arguments" do
          assert_regexp(
            "I have {n} cukes in my {bodypart} now",
            /^I have (.+) cukes in my (.+) now$/
          )
        end

        it "translates three typed arguments" do
          assert_regexp(
            "I have {float} cukes in my {bodypart} at {int} o'clock",
            /^I have (-?\d*\.?\d+) cukes in my (.+) at ((?:-?\d+)|(?:\d+)) o'clock$/
          )
        end

        it "translates parenthesis to non-capturing optional capture group" do
          assert_regexp(
            "I have many big(ish) cukes",
            /^I have many big(?:ish)? cukes$/
          )
        end
      end
    end
  end
end
