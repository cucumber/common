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

    class CssColor
      attr_reader :name

      def initialize(name)
        @name = name
      end

      def ==(other)
        other.is_a?(CssColor) && other.name == name
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
          false,
          lambda { |s| Color.new(s) }
        ))
        ### [add-color-parameter-type]
        @parameter_type_registry = parameter_registry
      end

      describe CucumberExpression do
        it "matches parameters with custom parameter type" do
          expression = CucumberExpression.new("I have a {color} ball", @parameter_type_registry)
          transformed_argument_value = expression.match("I have a red ball")[0].transformed_value
          expect( transformed_argument_value ).to eq(Color.new('red'))
        end

        it "matches parameters with custom parameter type using optional capture group" do
          parameter_type_registry = ParameterTypeRegistry.new
          parameter_type_registry.define_parameter_type(ParameterType.new(
              'color',
              Color,
              [/red|blue|yellow/, /(?:dark|light) (?:red|blue|yellow)/],
              false,
              lambda { |s| Color.new(s) }
          ))
          expression = CucumberExpression.new("I have a {color} ball", parameter_type_registry)
          transformed_argument_value = expression.match("I have a dark red ball")[0].transformed_value
          expect( transformed_argument_value ).to eq(Color.new('dark red'))
        end

        it "defers transformation until queried from argument" do
          @parameter_type_registry.define_parameter_type(ParameterType.new(
              'throwing',
              String,
              /bad/,
              false,
              lambda { |s| raise "Can't transform [#{s}]" }
          ))
          expression = CucumberExpression.new("I have a {throwing} parameter", @parameter_type_registry)
          args = expression.match("I have a bad parameter")
          expect { args[0].transformed_value }.to raise_error("Can't transform [bad]")
        end

        describe "conflicting parameter type" do
          it "is detected for type name" do
            expect {
              @parameter_type_registry.define_parameter_type(ParameterType.new(
                  'color',
                  CssColor,
                  /.*/,
                  false,
                  lambda { |s| CssColor.new(s) }
              ))
            }.to raise_error("There is already a parameter with name color")
          end

          it "is detected for type" do
            expect {
              @parameter_type_registry.define_parameter_type(ParameterType.new(
                  'whatever',
                  Color,
                  /.*/,
                  false,
                  lambda { |s| Color.new(s) }
              ))
            }.to raise_error("There is already a parameter with type Cucumber::CucumberExpressions::Color")
          end

          it "is not detected for regexp" do
            @parameter_type_registry.define_parameter_type(ParameterType.new(
                'css-color',
                CssColor,
                /red|blue|yellow/,
                false,
                lambda { |s| CssColor.new(s) }
            ))

            css_color = CucumberExpression.new("I have a {css-color} ball",@parameter_type_registry)
            css_color_value = css_color.match("I have a blue ball")[0].transformed_value
            expect(css_color_value).to eq(CssColor.new("blue"))

            color = CucumberExpression.new("I have a {color} ball",@parameter_type_registry)
            color_value = color.match("I have a blue ball")[0].transformed_value
            expect(color_value).to eq(Color.new("blue"))
          end
        end
      end

      describe RegularExpression do
        it "matches arguments with custom parameter type" do
          expression = RegularExpression.new(/I have a (red|blue|yellow) ball/, @parameter_type_registry)
          transformed_value = expression.match("I have a red ball")[0].transformed_value
          expect( transformed_value ).to eq(Color.new('red'))
        end
      end
    end
  end
end
