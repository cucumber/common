require 'cucumber/cucumber_expressions/parameter_type'
require 'cucumber/cucumber_expressions/combinatorial_generated_expression_factory'

module Cucumber
  module CucumberExpressions

    class Color; end
    class CssColor; end
    class Date; end
    class DateTime; end
    class Timestamp; end

    describe CombinatorialGeneratedExpressionFactory do
      it 'generates multiple expressions' do
        parameter_type_combinations = [
          [
            ParameterType.new('color', Color, /red|blue|yellow/, false, lambda {|s| Color.new}),
            ParameterType.new('csscolor', CssColor, /red|blue|yellow/, false, lambda {|s| CssColor.new})
          ],
          [
            ParameterType.new('date', Date, /\d{4}-\d{2}-\d{2}/, false, lambda {|s| Date.new}),
            ParameterType.new('datetime', DateTime, /\d{4}-\d{2}-\d{2}/, false, lambda {|s| DateTime.new}),
            ParameterType.new('timestamp', Timestamp, /\d{4}-\d{2}-\d{2}/, false, lambda {|s| Timestamp.new})
          ]
        ]

        factory = CombinatorialGeneratedExpressionFactory.new(
          'I bought a {%s} ball on {%s}',
          parameter_type_combinations
        )
        expressions = factory.generate_expressions.map {|ge| ge.source}
        expect(expressions).to eq([
            'I bought a {color} ball on {date}',
            'I bought a {color} ball on {datetime}',
            'I bought a {color} ball on {timestamp}',
            'I bought a {csscolor} ball on {date}',
            'I bought a {csscolor} ball on {datetime}',
            'I bought a {csscolor} ball on {timestamp}',
        ])
      end
    end
  end
end
