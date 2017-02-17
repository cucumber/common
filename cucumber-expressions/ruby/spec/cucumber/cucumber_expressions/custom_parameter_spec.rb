require 'cucumber/cucumber_expressions/cucumber_expression'
require 'cucumber/cucumber_expressions/regular_expression'
require 'cucumber/cucumber_expressions/parameter_registry'

module Cucumber
  module CucumberExpressions
    class Color
      attr_reader :name

      ### [color-constructor]
      def initialize(name)
        @name = name
      end
      ### [color-constructor]

      def ==(other)
        other.is_a?(Color) && other.name == name
      end
    end

    describe "Custom parameter" do
      before do
        @parameter_registry = ParameterRegistry.new
        ### [add-color-parameter]
        @parameter_registry.add_parameter(Parameter.new(
          'color',
          Color,
          [/red|blue|yellow/, /(?:dark|light) (?:red|blue|yellow)/],
          lambda { |s| Color.new(s) }
        ))
        ### [add-color-parameter]
      end

      describe CucumberExpression do
        it "matches typed parameters" do
          expression = CucumberExpression.new("I have a {color} ball", [], @parameter_registry)
          parametered_argument_value = expression.match("I have a red ball")[0].transformed_value
          expect( parametered_argument_value ).to eq(Color.new('red'))
        end

        it "matches typed parameters with optional group" do
          expression = CucumberExpression.new("I have a {color} ball", [], @parameter_registry)
          parametered_argument_value = expression.match("I have a dark red ball")[0].transformed_value
          expect( parametered_argument_value ).to eq(Color.new('dark red'))
        end

        it "matches untyped parameters with explicit type" do
          expression = CucumberExpression.new("I have a {color} ball", [Color], @parameter_registry)
          parametered_argument_value = expression.match("I have a red ball")[0].transformed_value
          expect( parametered_argument_value ).to eq(Color.new('red'))
        end

        it "matches untyped parameters with same name as type" do
          expression = CucumberExpression.new("I have a {color} ball", [], @parameter_registry)
          parametered_argument_value = expression.match("I have a red ball")[0].transformed_value
          expect( parametered_argument_value ).to eq(Color.new('red'))
        end

        it "matches parameters with explicit type that isn't registered" do
          expression = CucumberExpression.new("I have a {color} ball", [Color], ParameterRegistry.new)
          parametered_argument_value = expression.match("I have a red ball")[0].transformed_value
          expect( parametered_argument_value ).to eq(Color.new('red'))
        end

        it("defers transformation until queried from argument") do
          @parameter_registry.add_parameter(Parameter.new(
              'throwing',
              String,
              /bad/,
              lambda { |s| raise "Can't transform [#{s}]" }
          ))
          expression = CucumberExpression.new("I have a {throwing} parameter", [], @parameter_registry)
          args = expression.match("I have a bad parameter")
          expect { args[0].transformed_value }.to raise_error("Can't transform [bad]")
        end
      end

      describe RegularExpression do
        it "matches parameters with explicit constructor" do
          expression = RegularExpression.new(/I have a (red|blue|yellow) ball/, [Color], @parameter_registry)
          parametered_argument_value = expression.match("I have a red ball")[0].transformed_value
          expect( parametered_argument_value ).to eq(Color.new('red'))
        end

        it "matches parameters without explicit constructor" do
          expression = RegularExpression.new(/I have a (red|blue|yellow) ball/, [], @parameter_registry)
          parametered_argument_value = expression.match("I have a red ball")[0].transformed_value
          expect( parametered_argument_value ).to eq(Color.new('red'))
        end

        it "matches parameters with explicit type that isn't registered" do
          expression = RegularExpression.new(/I have a (red|blue|yellow) ball/, [Color], ParameterRegistry.new)
          parametered_argument_value = expression.match("I have a red ball")[0].transformed_value
          expect( parametered_argument_value ).to eq(Color.new('red'))
        end
      end
    end
  end
end
