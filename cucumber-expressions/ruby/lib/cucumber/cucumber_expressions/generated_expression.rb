module Cucumber
  module CucumberExpressions
    class GeneratedExpression
      attr_reader :source, :transforms

      def initialize(source, transforms)
        @source, @transforms = source, transforms
      end
    end
  end
end
