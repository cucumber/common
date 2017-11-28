require 'cucumber/cucumber_expressions/errors'

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
      # @param use_for_snippets true if this should be used for snippet generation
      # @param prefer_for_regexp_match true if this should be preferred over similar types
      #
      def initialize(name, regexp, type, transformer, use_for_snippets, prefer_for_regexp_match)
        raise "name can't be nil" if name.nil?
        raise "regexp can't be nil" if regexp.nil?
        raise "type can't be nil" if type.nil?
        raise "transformer can't be nil" if transformer.nil?
        raise "use_for_snippets can't be nil" if use_for_snippets.nil?
        raise "prefer_for_regexp_match can't be nil" if prefer_for_regexp_match.nil?

        @name, @type, @transformer, @use_for_snippets, @prefer_for_regexp_match = name, type, transformer, use_for_snippets, prefer_for_regexp_match
        @regexps = string_array(regexp)
      end

      def transform(self_obj, group_values)
        if @transformer.arity == 1
          non_nil_group_values = group_values.compact
          raise CucumberExpressionError.new(
              "Single transformer unexpectedly matched 2 values - \"#{non_nil_group_values[0]}\" and \"${non_nil_group_values[1]}\""
          ) if non_nil_group_values.length >= 2
          args = [non_nil_group_values[0]]
        else
          args = group_values
        end
        self_obj.instance_exec(*args, &@transformer)
      end

      def <=>(other)
        return -1 if prefer_for_regexp_match? && !other.prefer_for_regexp_match?
        return 1 if other.prefer_for_regexp_match? && !prefer_for_regexp_match?
        name <=> other.name
      end

      private

      def string_array(regexps)
        array = regexps.is_a?(Array) ? regexps : [regexps]
        array.map {|regexp| regexp.is_a?(String) ? regexp : regexp_source(regexp)}
      end

      def regexp_source(regexp)
        [
          'EXTENDED',
          'FIXEDENCODING',
          'IGNORECASE',
          'MULTILINE',
          'NOENCODING'
        ].each do |option_name|
          option = Regexp.const_get(option_name)
          if regexp.options & option != 0
            raise CucumberExpressionError.new("ParameterType Regexps can't use option Regexp::#{option_name}")
          end
        end
        regexp.source
      end
    end
  end
end
