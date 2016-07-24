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
    end
  end
end
