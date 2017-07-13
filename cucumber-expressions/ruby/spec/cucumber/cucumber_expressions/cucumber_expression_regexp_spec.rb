require 'cucumber/cucumber_expressions/cucumber_expression'
require 'cucumber/cucumber_expressions/parameter_type_registry'

module Cucumber
  module CucumberExpressions
    describe CucumberExpression do
      context "Regexp translation" do
        def assert_regexp(expression, regexp)
          cucumber_expression = CucumberExpression.new(expression, ParameterTypeRegistry.new)
          expect(regexp).to eq(cucumber_expression.regexp)
        end

        it "translates no arguments" do
          assert_regexp(
            "I have 10 cukes in my belly now",
            /^I have 10 cukes in my belly now$/
          )
        end

        it "translates alternation" do
          assert_regexp(
            "I had/have a great/nice/charming friend",
            /^I (?:had|have) a (?:great|nice|charming) friend$/
          )
        end

        it "translates parameters" do
          assert_regexp(
            "I have {float} cukes at {int} o'clock",
            /^I have (-?\d*\.?\d+) cukes at ((?:-?\d+)|(?:\d+)) o'clock$/
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
