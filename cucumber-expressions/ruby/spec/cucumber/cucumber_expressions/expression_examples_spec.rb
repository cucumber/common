# frozen_string_literal: true

require 'cucumber/cucumber_expressions/cucumber_expression'
require 'cucumber/cucumber_expressions/regular_expression'
require 'cucumber/cucumber_expressions/parameter_type_registry'
require 'json'

module Cucumber
  module CucumberExpressions
    describe 'examples.txt' do
      def match(expression_text, text)
        expression = expression_text =~ %r{/(.*)/} ?
          RegularExpression.new(Regexp.new(Regexp.last_match(1)), ParameterTypeRegistry.new) :
          CucumberExpression.new(expression_text, ParameterTypeRegistry.new)

        arguments = expression.match(text)
        return nil if arguments.nil?

        arguments.map { |arg| arg.value(nil) }
      end

      File.open(File.expand_path('../../../examples.txt', __dir__), 'r:utf-8') do |io|
        chunks = io.read.split(/^---/m)
        chunks.each do |chunk|
          expression_text, text, expected_args = *chunk.strip.split(/\n/m)
          it "Works with: #{expression_text}" do
            expect(match(expression_text, text).to_json).to eq(expected_args)
          end
        end
      end
    end
  end
end
