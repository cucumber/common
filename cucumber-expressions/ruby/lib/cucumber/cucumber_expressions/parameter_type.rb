module Cucumber
  module CucumberExpressions
    class ParameterType
      attr_reader :name, :type, :regexps

      # Create a new Parameter
      #
      # @param name the name of the parameter type
      # @param regexps [Array] list of regexps for capture groups. A single regexp can also be used.
      # @param transformer lambda that transforms a String to (possibly) another type
      #
      def initialize(name, type, regexp, transformer)
        @name, @type, @transformer = name, type, transformer
        @regexps = string_array(regexp)
      end

      def transform(value)
        @transformer ? @transformer.call(value) : value
      end

      private

      def string_array(regexp)
        array = regexp.is_a?(Array) ? regexp : [regexp]
        array.map { |r| r.is_a?(String) ? r : r.source }
      end
    end
  end
end
