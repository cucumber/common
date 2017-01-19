require 'cucumber/cucumber_expressions/cucumber_expression'
require 'cucumber/cucumber_expressions/regular_expression'
require 'cucumber/cucumber_expressions/transform_lookup'

module Cucumber
  module CucumberExpressions
    class Color
      attr_reader :name

      ### [color-constructor]
      def initialize(name)
        @name = name
      end
      ### [color-constructor]

      def == (other)
        other.is_a?(Color) && other.name == name
      end
    end

    describe "Custom transform" do
      before do
        @transform_lookup = TransformLookup.new
        ### [add-color-transform]
        @transform_lookup.add_transform(Transform.new(
          'color',
          Color,
          ['red|blue|yellow', '(?:dark|light) (?:red|blue|yellow)'],
          lambda { |s| Color.new(s) }
        ))
        ### [add-color-transform]
      end

      describe CucumberExpression do
        it "transforms arguments with expression type I" do
          expression = CucumberExpression.new("I have a {color:color} ball", [], @transform_lookup)
          transformed_argument_value = expression.match("I have a red ball")[0].transformed_value
          expect( transformed_argument_value ).to eq(Color.new('red'))
        end

        it "transforms arguments with expression type II" do
          expression = CucumberExpression.new("I have a {color:color} ball", [], @transform_lookup)
          transformed_argument_value = expression.match("I have a dark red ball")[0].transformed_value
          expect( transformed_argument_value ).to eq(Color.new('dark red'))
        end

        it "transforms arguments with explicit type" do
          expression = CucumberExpression.new("I have a {color} ball", [Color], @transform_lookup)
          transformed_argument_value = expression.match("I have a red ball")[0].transformed_value
          expect( transformed_argument_value ).to eq(Color.new('red'))
        end

        it "transforms arguments using argument name as type" do
          expression = CucumberExpression.new("I have a {color} ball", [], @transform_lookup)
          transformed_argument_value = expression.match("I have a red ball")[0].transformed_value
          expect( transformed_argument_value ).to eq(Color.new('red'))
        end

        it "transforms arguments with explicit type using constructor directly" do
          expression = CucumberExpression.new("I have a {color} ball", [Color], TransformLookup.new)
          transformed_argument_value = expression.match("I have a red ball")[0].transformed_value
          expect( transformed_argument_value ).to eq(Color.new('red'))
        end
      end

      describe RegularExpression do
        it "transforms arguments with expression type" do
          expression = RegularExpression.new(/I have a (red|blue|yellow) ball/, [], @transform_lookup)
          transformed_argument_value = expression.match("I have a red ball")[0].transformed_value
          expect( transformed_argument_value ).to eq(Color.new('red'))
        end

        it "transforms arguments with explicit type" do
          expression = RegularExpression.new(/I have a (red|blue|yellow) ball/, ['color'], @transform_lookup)
          transformed_argument_value = expression.match("I have a red ball")[0].transformed_value
          expect( transformed_argument_value ).to eq(Color.new('red'))
        end

        it "transforms arguments with explicit type using constructor directly" do
          expression = RegularExpression.new(/I have a (red|blue|yellow) ball/, [Color], TransformLookup.new)
          transformed_argument_value = expression.match("I have a red ball")[0].transformed_value
          expect( transformed_argument_value ).to eq(Color.new('red'))
        end
      end
    end
  end
end
