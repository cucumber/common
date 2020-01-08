# frozen_string_literal: true

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
            ParameterType.new('color', /red|blue|yellow/, Color, ->(_s) { Color.new }, true, false),
            ParameterType.new('csscolor', /red|blue|yellow/, CssColor, ->(_s) { CssColor.new }, true, false)
          ],
          [
            ParameterType.new('date', /\d{4}-\d{2}-\d{2}/, Date, ->(_s) { Date.new }, true, false),
            ParameterType.new('datetime', /\d{4}-\d{2}-\d{2}/, DateTime, ->(_s) { DateTime.new }, true, false),
            ParameterType.new('timestamp', /\d{4}-\d{2}-\d{2}/, Timestamp, ->(_s) { Timestamp.new }, true, false)
          ]
        ]

        factory = CombinatorialGeneratedExpressionFactory.new(
          'I bought a {%s} ball on {%s}',
          parameter_type_combinations
        )
        expressions = factory.generate_expressions.map(&:source)
        expect(expressions).to eq([
                                    'I bought a {color} ball on {date}',
                                    'I bought a {color} ball on {datetime}',
                                    'I bought a {color} ball on {timestamp}',
                                    'I bought a {csscolor} ball on {date}',
                                    'I bought a {csscolor} ball on {datetime}',
                                    'I bought a {csscolor} ball on {timestamp}'
                                  ])
      end
    end
  end
end
