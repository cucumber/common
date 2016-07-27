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
          ['currency'],
          Currency,
          ['[A-Z]{3}'],
          lambda { |s| Currency.new(s)}
        ))
      end

      it "converts CucumberExpression arguments with expression type" do
        expression = CucumberExpression.new("I have a {currency:currency} account", [], @transform_lookup)
        transformed_argument_value = expression.match("I have a EUR account")[0].transformed_value
        expect( transformed_argument_value ).to eq(Currency.new('EUR'))
      end

      it "converts CucumberExpression arguments with explicit type" do
        expression = CucumberExpression.new("I have a {currency} account", [Currency], @transform_lookup)
        transformed_argument_value = expression.match("I have a EUR account")[0].transformed_value
        expect( transformed_argument_value ).to eq(Currency.new('EUR'))
      end

      it "converts CucumberExpression arguments with explicit type using constructor directly" do
        expression = CucumberExpression.new("I have a {currency} account", [Currency], TransformLookup.new)
        transformed_argument_value = expression.match("I have a EUR account")[0].transformed_value
        expect( transformed_argument_value ).to eq(Currency.new('EUR'))
      end

      it "converts RegularExpression arguments" do
        expression = RegularExpression.new(/I have a ([A-Z]{3}) account/, @transform_lookup)
        transformed_argument_value = expression.match("I have a EUR account")[0].transformed_value
        expect( transformed_argument_value ).to eq(Currency.new('EUR'))
      end
    end
  end
end
