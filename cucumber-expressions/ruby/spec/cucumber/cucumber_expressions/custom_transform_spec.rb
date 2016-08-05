require 'cucumber/cucumber_expressions/cucumber_expression'
require 'cucumber/cucumber_expressions/regular_expression'
require 'cucumber/cucumber_expressions/transform_lookup'

module Cucumber
  module CucumberExpressions
    class Currency
      attr_reader :sym
      def initialize(sym)
        @sym = sym
      end

      def == (other)
        other.is_a?(Currency) && other.sym == sym
      end
    end

    describe "Custom transform" do
      before do
        @transform_lookup = TransformLookup.new
        @transform_lookup.add_transform(Transform.new(
          'currency',
          Currency,
          '[A-Z]{3}',
          lambda { |s| Currency.new(s) }
        ))
      end

      describe CucumberExpression do
        it "converts arguments with expression type" do
          expression = CucumberExpression.new("I have a {currency:currency} account", [], @transform_lookup)
          transformed_argument_value = expression.match("I have a EUR account")[0].transformed_value
          expect( transformed_argument_value ).to eq(Currency.new('EUR'))
        end

        it "converts arguments with explicit type" do
          expression = CucumberExpression.new("I have a {currency} account", [Currency], @transform_lookup)
          transformed_argument_value = expression.match("I have a EUR account")[0].transformed_value
          expect( transformed_argument_value ).to eq(Currency.new('EUR'))
        end

        it "converts arguments using argument name as type" do
          expression = CucumberExpression.new("I have a {currency} account", [], @transform_lookup)
          transformed_argument_value = expression.match("I have a EUR account")[0].transformed_value
          expect( transformed_argument_value ).to eq(Currency.new('EUR'))
        end

        it "converts arguments with explicit type using constructor directly" do
          expression = CucumberExpression.new("I have a {currency} account", [Currency], TransformLookup.new)
          transformed_argument_value = expression.match("I have a EUR account")[0].transformed_value
          expect( transformed_argument_value ).to eq(Currency.new('EUR'))
        end
      end

      describe RegularExpression do
        it "converts arguments with expression type" do
          expression = RegularExpression.new(/I have a ([A-Z]{3}) account/, [], @transform_lookup)
          transformed_argument_value = expression.match("I have a EUR account")[0].transformed_value
          expect( transformed_argument_value ).to eq(Currency.new('EUR'))
        end

        it "converts arguments with explicit type" do
          expression = RegularExpression.new(/I have a ([A-Z]{3}) account/, ['currency'], @transform_lookup)
          transformed_argument_value = expression.match("I have a EUR account")[0].transformed_value
          expect( transformed_argument_value ).to eq(Currency.new('EUR'))
        end

        it "converts arguments with explicit type using constructor directly" do
          expression = RegularExpression.new(/I have a ([A-Z]{3}) account/, [Currency], TransformLookup.new)
          transformed_argument_value = expression.match("I have a EUR account")[0].transformed_value
          expect( transformed_argument_value ).to eq(Currency.new('EUR'))
        end
      end
    end
  end
end
