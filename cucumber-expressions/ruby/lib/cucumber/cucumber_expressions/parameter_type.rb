module Cucumber
  module CucumberExpressions
    class ParameterType
      attr_reader :name, :type, :regexps

      def preferential?
        @preferential
      end

      # Create a new Parameter
      #
      # @param name the name of the parameter type
      # @param regexp [Array] list of regexps for capture groups. A single regexp can also be used
      # @param preferential true if this should be preferred over similar types
      # @param transformer lambda that transforms a String to (possibly) another type
      #
      def initialize(name, type, regexp, preferential, transformer)
        raise "name can't be nil" if name.nil?
        raise "type can't be nil" if type.nil?
        raise "regexp can't be nil" if regexp.nil?
        raise "preferential can't be nil" if preferential.nil?
        raise "transformer can't be nil" if transformer.nil?

        @name, @type, @preferential, @transformer = name, type, preferential, transformer
        @regexps = string_array(regexp)
      end

      def transform(value)
        @transformer ? @transformer.call(value) : value
      end

      def <=>(other)
        return -1 if preferential? && !other.preferential?
        return 1  if other.preferential? && !preferential?
        name <=> other.name
      end

      private

      def string_array(regexp)
        array = regexp.is_a?(Array) ? regexp : [regexp]
        array.map { |r| r.is_a?(String) ? r : r.source }
      end
    end
  end
end
