require 'cucumber/cucumber_expressions/errors'
require 'cucumber/cucumber_expressions/cucumber_expression'
require 'cucumber/cucumber_expressions/regular_expression'
require 'cucumber/cucumber_expressions/undefined_parameter_type_expression'

module Cucumber
  module CucumberExpressions
    class ExpressionFactory
      def initialize(parameter_type_registry)
        @parameter_type_registry = parameter_type_registry
      end

      def create_expression(string_or_regexp)
        case string_or_regexp
        when String then create_cucumber_expression(string_or_regexp)
        when Regexp then RegularExpression.new(string_or_regexp, @parameter_type_registry)
        else
          raise CucumberExpressionError.new("Can't create an expression from #{string_or_regexp.inspect}")
        end
      end
      
      private
      
      def create_cucumber_expression(string)
        CucumberExpression.new(string, @parameter_type_registry)
      rescue UndefinedParameterTypeError => e
        UndefinedParameterTypeExpression.new(string)
      end
    end
  end
end