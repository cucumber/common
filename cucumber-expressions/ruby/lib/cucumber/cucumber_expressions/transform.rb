module Cucumber
  module CucumberExpressions
    class Transform
      attr_reader :type_name, :capture_group_regexp

      def initialize(type_name, capture_group_regexp, transformer)
        @type_name, @capture_group_regexp, @transformer = type_name, capture_group_regexp, transformer
      end

      def transform(value)
        @transformer.call(value)
      end
    end
  end
end
