require 'cucumber/cucumber_expressions/cucumber_expression_generator'
require 'cucumber/cucumber_expressions/transform_lookup'

module Cucumber
  module CucumberExpressions
    describe CucumberExpressionGenerator do
      class Currency
      end

      before do
        @transform_lookup = TransformLookup.new
        @generator = CucumberExpressionGenerator.new(@transform_lookup)
      end

      it "generates expression for no args" do
        assert_typed_expression("hello", "hello")
      end

      it "generates expression for int double arg" do
        assert_typed_expression(
          "I have {arg1:int} cukes and {arg2:float} euro",
          "I have 2 cukes and 1.5 euro")
      end

      it "generates expression for just int" do
        assert_typed_expression(
          "{arg1:int}",
          "99999")
      end

      it "generates expression without expression type" do
        assert_untyped_expression(
          "I have {arg1} cukes and {arg2} euro",
          "I have 2 cukes and 1.5 euro")
      end

      it "generates expression for custom type" do
        @transform_lookup.add_transform(Transform.new(
          'currency',
          Currency,
          '[A-Z]{3}',
          nil
        ))

        assert_typed_expression(
          "I have a {arg1:currency} account",
          "I have a EUR account")
      end

      def assert_typed_expression(expected, text)
        expect(@generator.generate_expression(text, true)).to eq(expected)
      end

      def assert_untyped_expression(expected, text)
        expect(@generator.generate_expression(text, false)).to eq(expected)
      end
    end
  end
end
