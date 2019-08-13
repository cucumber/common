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

        it "translates alternation with non-alpha" do
          assert_regexp(
            "I said Alpha1/Beta1",
            /^I said (?:Alpha1|Beta1)$/
          )
        end

        it "translates parameters" do
          assert_regexp(
            "I have {float} cukes at {int} o'clock",
            /^I have ((?=.*\d.*)[-+]?\d*(?:\.(?=\d.*))?\d*(?:\d+[E][-+]?\d+)?) cukes at ((?:-?\d+)|(?:\d+)) o'clock$/
          )
        end

        it "translates parenthesis to non-capturing optional capture group" do
          assert_regexp(
            "I have many big(ish) cukes",
            /^I have many big(?:ish)? cukes$/
          )
        end

        it "translates parenthesis with alpha unicode" do
          assert_regexp(
            "Привет, Мир(ы)!",
            /^Привет, Мир(?:ы)?!$/
          )
        end
      end
    end
  end
end
