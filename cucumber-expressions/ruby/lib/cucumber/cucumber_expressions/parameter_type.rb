module Cucumber
  module CucumberExpressions
    class ParameterType
      attr_reader :name, :type, :regexps

      def prefer_for_regexp_match?
        @prefer_for_regexp_match
      end

      def use_for_snippets?
        @use_for_snippets
      end

      # Create a new Parameter
      #
      # @param name the name of the parameter type
      # @param regexp [Array] list of regexps for capture groups. A single regexp can also be used
      # @param type the return type of the transformed
      # @param transformer lambda that transforms a String to (possibly) another type
      # @param prefer_for_regexp_match true if this should be preferred over similar types
      #
      def initialize(name, regexp, type, transformer, prefer_for_regexp_match, use_for_snippets)
        raise "name can't be nil" if name.nil?
        raise "regexp can't be nil" if regexp.nil?
        raise "type can't be nil" if type.nil?
        raise "transformer can't be nil" if transformer.nil?
        raise "prefer_for_regexp_match can't be nil" if prefer_for_regexp_match.nil?
        raise "use_for_snippets can't be nil" if use_for_snippets.nil?

        @name, @type, @transformer, @prefer_for_regexp_match, @use_for_snippets = name, type, transformer, prefer_for_regexp_match, use_for_snippets
        @regexps = string_array(regexp)
      end

      def transform(group_values)
        @transformer.call(*group_values)
      end

      def <=>(other)
        return -1 if prefer_for_regexp_match? && !other.prefer_for_regexp_match?
        return 1  if other.prefer_for_regexp_match? && !prefer_for_regexp_match?
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
