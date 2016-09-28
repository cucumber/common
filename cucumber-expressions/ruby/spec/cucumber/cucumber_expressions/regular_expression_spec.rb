require 'cucumber/cucumber_expressions/regular_expression'
require 'cucumber/cucumber_expressions/transform_lookup'

module Cucumber
  module CucumberExpressions
    describe RegularExpression do
      it "documents match arguments" do
        transform_lookup = TransformLookup.new

        ### [capture-match-arguments]
        expr = /I have (\d+) cukes? in my (\w*) now/
        types = ['int', nil]
        expression = RegularExpression.new(expr, types, transform_lookup)
        args = expression.match("I have 7 cukes in my belly now")
        expect( args[0].transformed_value ).to eq(7)
        expect( args[1].transformed_value ).to eq("belly")
        ### [capture-match-arguments]
      end

      it "transforms to string by default" do
        expect( match(/(\d\d)/, "22") ).to eq(["22"])
      end

      it "transforms integer to double using explicit type name" do
        expect( match(/(.*)/, "22", ['float']) ).to eq([22.0])
      end

      it "transforms integer to double using explicit type" do
        expect( match(/(.*)/, "22", [Float]) ).to eq([22.0])
      end

      it "transforms to int using capture group pattern" do
        expect( match(/(-?\d+)/, "22") ).to eq([22])
      end

      it "transforms to int by alternate capture group pattern" do
        expect( match(/(\d+)/, "22") ).to eq([22])
      end

      it "transforms double without integer value" do
        expect( match(/(.*)/, ".22", ['float']) ).to eq([0.22])
      end

      it "transforms double with sign" do
        expect( match(/(.*)/, "-1.22", ['float']) ).to eq([-1.22])
      end

      it "returns nil when there is no match" do
        expect( match(/hello/, "world") ).to be_nil
      end

      it "fails when type is not type name or class" do
        expect( lambda { match(/(.*)/, "-1.22", [99]) } ).to raise_error(
          'Type must be string or class, but was 99 of type Fixnum')
      end

      it "exposes source" do
        expr = /I have (\d+) cukes? in my (\+) now/
        expect(RegularExpression.new(expr, [], TransformLookup.new).source).to eq(expr)
      end

      def match(expression, text, types = [])
        regular_expression = RegularExpression.new(expression, types, TransformLookup.new)
        arguments = regular_expression.match(text)
        return nil if arguments.nil?
        arguments.map { |arg| arg.transformed_value }
      end
    end
  end
end
