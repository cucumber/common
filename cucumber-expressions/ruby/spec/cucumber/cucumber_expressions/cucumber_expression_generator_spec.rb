require 'cucumber/cucumber_expressions/cucumber_expression_generator'
require 'cucumber/cucumber_expressions/cucumber_expression'
require 'cucumber/cucumber_expressions/parameter_type'
require 'cucumber/cucumber_expressions/parameter_type_registry'

module Cucumber
  module CucumberExpressions
    describe CucumberExpressionGenerator do
      class Currency
      end

      before do
        @parameter_type_registry = ParameterTypeRegistry.new
        @generator = CucumberExpressionGenerator.new(@parameter_type_registry)
      end

      it "documents expression generation" do
        parameter_registry = ParameterTypeRegistry.new
        ### [generate-expression]
        generator = CucumberExpressionGenerator.new(parameter_registry)
        undefined_step_text = "I have 2 cucumbers and 1.5 tomato"
        generated_expression = generator.generate_expression(undefined_step_text)
        expect(generated_expression.source).to eq("I have {int} cucumbers and {float} tomato")
        expect(generated_expression.parameter_types[1].type).to eq(Float)
        ### [generate-expression]
      end

      it "generates expression for no args" do
        assert_expression("hello", [], "hello")
      end

      it "generates expression with escaped left parenthesis" do
        assert_expression(
          "\\(iii)", [],
          "(iii)")
      end

      it "generates expression with escaped left curly brace" do
        assert_expression(
          "\\{iii}", [],
          "{iii}")
      end

      it "generates expression with escaped slashes" do
        assert_expression(
          "The {int}\\/{int}\\/{int} hey", ["int", "int2", "int3"],
          "The 1814/05/17 hey")
      end

      it "generates expression for int float arg" do
        assert_expression(
          "I have {int} cukes and {float} euro", ["int", "float"],
          "I have 2 cukes and 1.5 euro")
      end

      it "generates expression for strings" do
        assert_expression(
            "I like {string} and {string}", ["string", "string2"],
            'I like "bangers" and \'mash\'')
      end

      it "generates expression with % sign" do
        assert_expression(
            "I am {int}% foobar", ["int"],
            'I am 20% foobar')
      end

      it "generates expression for just int" do
        assert_expression(
          "{int}", ["int"],
          "99999")
      end

      it "numbers only second argument when builtin type is not reserved keyword" do
        assert_expression(
          "I have {int} cukes and {int} euro", ["int", "int2"],
          "I have 2 cukes and 5 euro")
      end

      it "numbers only second argument when type is not reserved keyword" do
        @parameter_type_registry.define_parameter_type(ParameterType.new(
          'currency',
          '[A-Z]{3}',
          Currency,
          lambda {|s| Currency.new(s)},
          true,
          true
        ))

        assert_expression(
          "I have a {currency} account and a {currency} account", ["currency", "currency2"],
          "I have a EUR account and a GBP account")
      end

      it "exposes parameters in generated expression" do
        expression = @generator.generate_expression("I have 2 cukes and 1.5 euro")
        types = expression.parameter_types.map(&:type)
        expect(types).to eq([Integer, Float])
      end

      it "ignores parameter types with optional capture groups" do
        @parameter_type_registry.define_parameter_type(ParameterType.new(
            'optional-flight',
            /(1st flight)?/,
            String,
            lambda {|s| s},
            true,
            false
        ))
        @parameter_type_registry.define_parameter_type(ParameterType.new(
            'optional-hotel',
            /(1st hotel)?/,
            String,
            lambda {|s| s},
            true,
            false
        ))

        expression = @generator.generate_expressions("I reach Stage4: 1st flight-1st hotl")[0]
        expect(expression.source).to eq("I reach Stage{int}: {int}st flight{int}st hotl")
      end

      it "generates at most 256 expressions" do
        for i in 0..3
          @parameter_type_registry.define_parameter_type(ParameterType.new(
              "my-type-#{i}",
              /[a-z]/,
              String,
              lambda {|s| s},
              true,
              false
          ))
        end
        # This would otherwise generate 4^11=419430 expressions and consume just shy of 1.5GB.
        expressions = @generator.generate_expressions("a simple step")
        expect(expressions.length).to eq(256)
      end


      def assert_expression(expected_expression, expected_argument_names, text)
        generated_expression = @generator.generate_expression(text)
        expect(generated_expression.parameter_names).to eq(expected_argument_names)
        expect(generated_expression.source).to eq(expected_expression)

        cucumber_expression = CucumberExpression.new(generated_expression.source, @parameter_type_registry)
        match = cucumber_expression.match(text)
        if match.nil?
          raise "Expected text '#{text}' to match generated expression '#{generated_expression.source}'"
        end
        expect(match.length).to eq(expected_argument_names.length)
      end
    end
  end
end
