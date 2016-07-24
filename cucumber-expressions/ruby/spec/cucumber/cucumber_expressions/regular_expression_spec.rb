require 'cucumber/cucumber_expressions/regular_expression'

module Cucumber
  module CucumberExpressions
    describe RegularExpression do
      def match(expression, text)
        cucumber_expression = RegularExpression.new(expression, [])
        arguments = cucumber_expression.match(text)
        return nil if arguments.nil?
        arguments.map { |arg| arg.transformed_value }
      end

      it "transforms nothing by default" do
        expect( match(/(.*)/, "22") ).to eq(["22"])
      end
    end
  end
end
