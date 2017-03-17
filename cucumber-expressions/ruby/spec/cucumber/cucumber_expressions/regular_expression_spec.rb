require 'cucumber/cucumber_expressions/regular_expression'
require 'cucumber/cucumber_expressions/parameter_type_registry'

module Cucumber
  module CucumberExpressions
    describe RegularExpression do
      it "documents match arguments" do
        parameter_type_registry = ParameterTypeRegistry.new

        ### [capture-match-arguments]
        expr = /I have (\d+) cukes? in my (\w*) now/
        types = ['int', nil]
        expression = RegularExpression.new(expr, types, parameter_type_registry)
        args = expression.match("I have 7 cukes in my belly now")
        expect( args[0].transformed_value ).to eq(7)
        expect( args[1].transformed_value ).to eq("belly")
        ### [capture-match-arguments]
      end

      it "does no transform by default" do
        expect( match(/(\d\d)/, "22") ).to eq(["22"])
      end

      it "transforms int to float by explicit type name" do
        expect( match(/(.*)/, "22", ['float']) ).to eq([22.0])
      end

      it "transforms int to float by explicit function" do
        expect( match(/(.*)/, "22", [Float]) ).to eq([22.0])
      end

      it "transforms int by parameter pattern" do
        expect( match(/(-?\d+)/, "22") ).to eq([22])
      end

      it "transforms int by alternate parameter pattern" do
        expect( match(/(\d+)/, "22") ).to eq([22])
      end

      it "transforms float without integer part" do
        expect( match(/(.*)/, ".22", ['float']) ).to eq([0.22])
      end

      it "transforms float with sign" do
        expect( match(/(.*)/, "-1.22", ['float']) ).to eq([-1.22])
      end

      it "returns nil when there is no match" do
        expect( match(/hello/, "world") ).to be_nil
      end

      it "fails when type is not type name or class" do
        expect( lambda { match(/(.*)/, "-1.22", [99]) } ).to raise_error(
          # Ruby 2.3 and older report Fixnum, 2.4 and newer report Integer
          /Type must be string or class, but was 99 of type (?:Fixnum)|(?:Integer)/)
      end

      it "exposes source" do
        expr = /I have (\d+) cukes? in my (\+) now/
        expect(RegularExpression.new(expr, [], ParameterTypeRegistry.new).source).to eq(expr)
      end

      def match(expression, text, types = [])
        regular_expression = RegularExpression.new(expression, types, ParameterTypeRegistry.new)
        arguments = regular_expression.match(text)
        return nil if arguments.nil?
        arguments.map { |arg| arg.transformed_value }
      end
    end
  end
end
