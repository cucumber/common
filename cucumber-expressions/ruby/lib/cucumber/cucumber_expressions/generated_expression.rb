module Cucumber
  module CucumberExpressions
    class GeneratedExpression
      attr_reader :source, :argument_names, :transforms

      def initialize(source, argument_names, transforms)
        @source, @argument_names, @transforms = source, argument_names, transforms
      end
    end
  end
end
