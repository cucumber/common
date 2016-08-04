require 'cucumber/cucumber_expressions/regular_expression'
require 'cucumber/cucumber_expressions/transform_lookup'

module Cucumber
  module CucumberExpressions
    describe RegularExpression do
      def match(expression, text)
        cucumber_expression = RegularExpression.new(expression, TransformLookup.new)
        arguments = cucumber_expression.match(text)
        return nil if arguments.nil?
        arguments.map { |arg| arg.transformed_value }
      end

      it "transforms to string by default" do
        expect( match(/(.+)/, "22") ).to eq(["22"])
      end

      it "transforms integer to double using explicit type" do
        expect( match(/(.*)/, "22"), [Float] ).to eq([22.0])
      end

      it "transforms nothing by default, for anything" do
        expect( match(/(\d\d)/, "22") ).to eq(["22"])
      end

      it "transforms to int by capture group pattern" do
        expect( match(/(-?\d+)/, "22") ).to eq([22])
      end

      it "transforms to int by alternate capture group pattern" do
        expect( match(/(\d+)/, "22") ).to eq([22])
      end
    end
  end
end
