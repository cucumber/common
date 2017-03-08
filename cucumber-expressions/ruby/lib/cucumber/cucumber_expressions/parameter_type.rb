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
      def initialize(name, type, regexps, transformer)
        @name, @type, @transformer = name, type, transformer
        @regexps = string_array(regexps)
      end

      def transform(value)
        @transformer.call(value)
      end

      private

      def string_array(regexps)
        array = regexps.is_a?(Array) ? regexps : [regexps]
        array.map { |r| r.is_a?(String) ? r : r.source }
      end
    end
  end
end
