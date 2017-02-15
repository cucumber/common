require 'cucumber/cucumber_expressions/cucumber_expression'
require 'cucumber/cucumber_expressions/parameter_registry'

module Cucumber
  module CucumberExpressions
    describe CucumberExpression do
      it "documents match arguments" do
        parameter_registry = ParameterRegistry.new

        ### [capture-match-arguments]
        expr = "I have {n} cuke(s) in my {bodypart} now"
        types = ['int', nil]
        expression = CucumberExpression.new(expr, types, parameter_registry)
        args = expression.match("I have 7 cukes in my belly now")
        expect( args[0].transformed_value ).to eq(7)
        expect( args[1].transformed_value ).to eq("belly")
        ### [capture-match-arguments]
      end

      it "does no transform by default" do
        expect( match("{what}", "22") ).to eq(["22"])
      end

      it "transforms to int by parameter type" do
        expect( match("{what:int}", "22") ).to eq([22])
      end

      it "transforms to int by explicit type" do
        expect( match("{what}", "22", ['int']) ).to eq([22])
      end

      # Ruby-specific
      it "parameters to Integer by explicit type" do
        expect( match("{what}", "22", [Integer]) ).to eq([22])
      end

      it "doesn't match a float with an int parameter" do
        expect( match("{what:int}", "1.22") ).to be_nil
      end

      it "transforms to float by parameter type" do
        expect( match("{what:float}", "0.22") ).to eq([0.22])
        expect( match("{what:float}",  ".22") ).to eq([0.22])
      end

      it "transforms to float by explicit type" do
        expect( match("{what}", "0.22", ['float']) ).to eq([0.22])
        expect( match("{what}",  ".22", ['float']) ).to eq([0.22])
      end

      it "doesn't match unknown parameter type" do
        expect { match("{what:unknown}", "something") }.to raise_error(
          'No parameter for type name "unknown"')
      end

      it "exposes source" do
        expr = "I have {n:int} cuke(s) in my {bodypart} now"
        expect(CucumberExpression.new(expr, [], ParameterRegistry.new).source).to eq(expr)
      end

      it "exposes offset and value" do
        expr = "I have {n:int} cuke(s) in my {bodypart} now"
        expression = CucumberExpression.new(expr, [], ParameterRegistry.new)
        arg1 = expression.match("I have 800 cukes in my brain now")[0]
        expect(arg1.offset).to eq(7)
        expect(arg1.value).to eq("800")
      end

      def match(expression, text, types = [])
        cucumber_expression = CucumberExpression.new(expression, types, ParameterRegistry.new)
        args = cucumber_expression.match(text)
        return nil if args.nil?
        args.map { |arg| arg.transformed_value }
      end
    end
  end
end
