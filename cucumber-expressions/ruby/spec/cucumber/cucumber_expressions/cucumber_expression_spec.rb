require 'cucumber/cucumber_expressions/cucumber_expression'
require 'cucumber/cucumber_expressions/transform_lookup'

module Cucumber
  module CucumberExpressions
    describe CucumberExpression do
      def match(expression, text, explicit_types = [])
        cucumber_expression = CucumberExpression.new(expression, explicit_types, TransformLookup.new)
        arguments = cucumber_expression.match(text)
        return nil if arguments.nil?
        arguments.map { |arg| arg.transformed_value }
      end

      it "transforms nothing by default" do
        expect( match("{what}", "22") ).to eq(["22"])
      end

      it "transforms to int by expression type" do
        expect( match("{what:int}", "22") ).to eq([22])
      end

      it "transforms to int by explicit type" do
        expect( match("{what}", "22", ['int']) ).to eq([22])
      end

      it "transforms to float by expression type" do
        expect( match("{what:float}", "0.22") ).to eq([0.22])
      end

      it "transforms to float by explicit type" do
        expect( match("{what}", "0.22", ['float']) ).to eq([0.22])
      end

      it "doesn't transform unknown type" do
        expect { match("{what:unknown}", "something") }.to raise_error('No transformer for type "unknown"')
      end

      context "Regexp translation" do
        def assert_regexp(expression, regexp, types = [])
          cucumber_expression = CucumberExpression.new(expression, types, TransformLookup.new)
          expect(regexp).to eq(cucumber_expression.regexp)
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
            "I have {n:float} cukes in my {bodypart} at {time:int} o'clock",
            /^I have (-?\d*\.?\d+) cukes in my (.+) at (-?\d+) o'clock$/
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
