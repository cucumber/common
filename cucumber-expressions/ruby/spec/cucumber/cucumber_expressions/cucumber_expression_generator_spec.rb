require 'cucumber/cucumber_expressions/cucumber_expression_generator'
require 'cucumber/cucumber_expressions/transform'
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

      it "documents expression generation" do
        transform_lookup = TransformLookup.new
        ### [generate-expression]
        generator = CucumberExpressionGenerator.new(transform_lookup)
        undefined_step_text = "I have 2 cucumbers and 1.5 tomato"
        generated_expression = generator.generate_expression(undefined_step_text, true)
        expect(generated_expression.source).to eq("I have {arg1:int} cucumbers and {arg2:float} tomato")
        expect(generated_expression.argumentNames[0]).to eq("arg1")
        expect(generated_expression.transforms[1].type).to eq(Float)
        ### [generate-expression]
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

      it "exposes transforms in generated expression" do
        expression = @generator.generate_expression("I have 2 cukes and 1.5 euro", true)
        types = expression.transforms.map(&:type)
        expect(types).to eq([Fixnum, Float])
      end

      def assert_typed_expression(expected, text)
        expect(@generator.generate_expression(text, true).source).to eq(expected)
      end

      def assert_untyped_expression(expected, text)
        expect(@generator.generate_expression(text, false).source).to eq(expected)
      end
    end
  end
end
