require 'cucumber/cucumber_expressions/argument'
require 'cucumber/cucumber_expressions/tree_regexp'
require 'cucumber/cucumber_expressions/errors'

module Cucumber
  module CucumberExpressions
    class UndefinedParameterTypeExpression
      attr_reader :source

      def initialize(source)
        @source = source
      end

      def match(text)
        nil
      end

      def regexp
        /.^/
      end
    end
  end
end
