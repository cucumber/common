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

      it "transforms nothing by default" do
        expect( match(/(.+)/, "22") ).to eq(["22"])
      end

      it "transforms to int by expression type" do
        expect( match(/(-?\d+)/, "22") ).to eq([22])
      end
    end
  end
end
