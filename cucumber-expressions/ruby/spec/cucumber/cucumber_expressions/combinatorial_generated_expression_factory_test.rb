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
            ParameterType.new('color', /red|blue|yellow/, Color, lambda {|s| Color.new}, false, true),
            ParameterType.new('csscolor', /red|blue|yellow/, CssColor, lambda {|s| CssColor.new}, false, true)
          ],
          [
            ParameterType.new('date', /\d{4}-\d{2}-\d{2}/, Date, lambda {|s| Date.new}, false, true),
            ParameterType.new('datetime', /\d{4}-\d{2}-\d{2}/, DateTime, lambda {|s| DateTime.new}, false, true),
            ParameterType.new('timestamp', /\d{4}-\d{2}-\d{2}/, Timestamp, lambda {|s| Timestamp.new}, false, true)
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
