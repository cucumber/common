require 'cucumber/cucumber_expressions/regular_expression'
require 'cucumber/cucumber_expressions/transform_lookup'

module Cucumber
  module CucumberExpressions
    describe RegularExpression do
      def match(expression, text)
        cucumber_expression = RegularExpression.new(expression, @transform_lookup)
        arguments = cucumber_expression.match(text)
        return nil if arguments.nil?
        arguments.map { |arg| arg.transformed_value }
      end

      before do
        @transform_lookup = TransformLookup.new
      end

      it "transforms nothing by default" do
        expect( match(/(.+)/, "22") ).to eq(["22"])
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

      it "allows registration of custom transform" do
        currency_transform = Transform.new('currency', ['[A-Z]{3}'], lambda { |s| Currency.new(s)})
        @transform_lookup.add_transform(currency_transform)

        expect( match(/I have a ([A-Z]{3}) account/, "I have a GBP account") ).to eq([Currency.new('GBP')])
      end
    end

    class Currency
      attr_reader :sym
      def initialize(sym)
        @sym = sym
      end

      def == (other)
        other.is_a?(Currency) && other.sym == sym
      end
    end
  end
end
