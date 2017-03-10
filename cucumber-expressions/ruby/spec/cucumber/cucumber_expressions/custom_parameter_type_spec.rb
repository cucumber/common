require 'cucumber/cucumber_expressions/cucumber_expression'
require 'cucumber/cucumber_expressions/regular_expression'
require 'cucumber/cucumber_expressions/parameter_type_registry'

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
        parameter_registry = ParameterTypeRegistry.new
        ### [add-color-parameter-type]
        parameter_registry.define_parameter_type(ParameterType.new(
          'color',
          Color,
          /red|blue|yellow/,
          lambda { |s| Color.new(s) }
        ))
        ### [add-color-parameter-type]
        @parameter_type_registry = parameter_registry
      end

      describe CucumberExpression do
        it "matches parameters with custom parameter type" do
          expression = CucumberExpression.new("I have a {color} ball", [], @parameter_type_registry)
          transformed_argument_value = expression.match("I have a red ball")[0].transformed_value
          expect( transformed_argument_value ).to eq(Color.new('red'))
        end

        it "matches parameters with custom parameter type using optional capture group" do
          parameter_registry = ParameterTypeRegistry.new
          parameter_registry.define_parameter_type(ParameterType.new(
              'color',
              Color,
              [/red|blue|yellow/, /(?:dark|light) (?:red|blue|yellow)/],
              lambda { |s| Color.new(s) }
          ))
          expression = CucumberExpression.new("I have a {color} ball", [], parameter_registry)
          transformed_argument_value = expression.match("I have a dark red ball")[0].transformed_value
          expect( transformed_argument_value ).to eq(Color.new('dark red'))
        end

        it "matches parameters with custom parameter type without constructor function and transform" do
          parameter_registry = ParameterTypeRegistry.new
          parameter_registry.define_parameter_type(ParameterType.new(
              'color',
              nil,
              /red|blue|yellow/,
              nil
          ))
          expression = CucumberExpression.new("I have a {color} ball", [], parameter_registry)
          transformed_argument_value = expression.match("I have a red ball")[0].transformed_value
          expect( transformed_argument_value ).to eq('red')
        end

        it "matches parameters with explicit type" do
          expression = CucumberExpression.new("I have a {color} ball", [Color], @parameter_type_registry)
          transformed_argument_value = expression.match("I have a red ball")[0].transformed_value
          expect( transformed_argument_value ).to eq(Color.new('red'))
        end

        it "matches parameters with explicit type that isn't registered" do
          expression = CucumberExpression.new("I have a {color} ball", [Color], ParameterTypeRegistry.new)
          transformed_argument_value = expression.match("I have a red ball")[0].transformed_value
          expect( transformed_argument_value ).to eq(Color.new('red'))
        end

        it "defers transformation until queried from argument" do
          @parameter_type_registry.define_parameter_type(ParameterType.new(
              'throwing',
              String,
              /bad/,
              lambda { |s| raise "Can't transform [#{s}]" }
          ))
          expression = CucumberExpression.new("I have a {throwing} parameter", [], @parameter_type_registry)
          args = expression.match("I have a bad parameter")
          expect { args[0].transformed_value }.to raise_error("Can't transform [bad]")
        end

        describe "conflicting parameter type" do
          it "is detected for type name" do
            expect {
              @parameter_type_registry.define_parameter_type(ParameterType.new(
                  'color',
                  String,
                  /.*/,
                  lambda { |s| s }
              ))
            }.to raise_error("There is already a parameter with type name color")
          end

          it "is detected for type" do
            expect {
              @parameter_type_registry.define_parameter_type(ParameterType.new(
                  'color2',
                  Color,
                  /.*/,
                  lambda { |s| Color.new(s) }
              ))
            }.to raise_error("There is already a parameter with type Cucumber::CucumberExpressions::Color")
          end

          it "is detected for regexp" do
            expect {
              @parameter_type_registry.define_parameter_type(ParameterType.new(
                  'color2',
                  String,
                  /red|blue|yellow/,
                  lambda { |s| s }
              ))
            }.to raise_error("There is already a parameter with regexp red|blue|yellow")
          end

          it "is not detected when type is nil" do
            @parameter_type_registry.define_parameter_type(ParameterType.new(
                'foo',
                nil,
                /foo/,
                lambda { |s| s }
            ))
            @parameter_type_registry.define_parameter_type(ParameterType.new(
                'bar',
                nil,
                /bar/,
                lambda { |s| s }
            ))
          end
        end
      end

      describe RegularExpression do
        it "matches parameters with explicit constructor" do
          expression = RegularExpression.new(/I have a (red|blue|yellow) ball/, [Color], @parameter_type_registry)
          transformed_argument_value = expression.match("I have a red ball")[0].transformed_value
          expect( transformed_argument_value ).to eq(Color.new('red'))
        end

        it "matches parameters without explicit constructor" do
          expression = RegularExpression.new(/I have a (red|blue|yellow) ball/, [], @parameter_type_registry)
          transformed_argument_value = expression.match("I have a red ball")[0].transformed_value
          expect( transformed_argument_value ).to eq(Color.new('red'))
        end

        it "matches parameters with explicit type that isn't registered" do
          expression = RegularExpression.new(/I have a (red|blue|yellow) ball/, [Color], ParameterTypeRegistry.new)
          transformed_argument_value = expression.match("I have a red ball")[0].transformed_value
          expect( transformed_argument_value ).to eq(Color.new('red'))
        end
      end
    end
  end
end
