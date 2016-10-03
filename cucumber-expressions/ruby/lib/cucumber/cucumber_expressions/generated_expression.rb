module Cucumber
  module CucumberExpressions
    class GeneratedExpression
      attr_reader :source, :argumentNames, :transforms

      def initialize(source, argumentNames, transforms)
        @source, @argumentNames, @transforms = source, argumentNames, transforms
      end
    end
  end
end
