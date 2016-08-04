module Cucumber
  module CucumberExpressions
    class Transform
      attr_reader :type_name, :type, :capture_group_regexps

      # Create a new Transform
      #
      # @param type_name [Array] array of class or type name to use in {arg:type_name}
      # @param capture_group_regexps [Array] list of regexps for capture groups.
      #   The first one is the primary one, used to convert CucumberExpression instances
      #   to their internal Regexp representation. They are all used for type conversion
      #   in RegularExpression instances.
      # @transformer lambda that transforms a String to another type
      #
      def initialize(type_name, type, capture_group_regexps, transformer)
        @type_name, @type, @transformer = type_name, type, transformer
        @capture_group_regexps = capture_group_regexps.is_a?(String) ? [capture_group_regexps] : capture_group_regexps
      end

      def transform(value)
        @transformer.call(value)
      end
    end
  end
end
