# frozen_string_literal: true

require 'cucumber/cucumber_expressions/errors'

module Cucumber
  module CucumberExpressions
    # A parameter type is a named type that recognises certain patterns and
    # can transform [Group]s to a custom object
    class ParameterType
      ILLEGAL_PARAMETER_NAME_PATTERN = /([\[\]()$.|?*+])/.freeze
      UNESCAPE_PATTERN = /(\\([\[$.|?*+\]]))/.freeze

      attr_reader :name, :type, :regexps

      def self.check_parameter_type_name(type_name)
        unescaped_type_name = type_name.gsub(UNESCAPE_PATTERN) do
          Regexp.last_match(2)
        end
        # rubocop:disable Style/GuardClause, Metrics/LineLength
        if ILLEGAL_PARAMETER_NAME_PATTERN =~ unescaped_type_name
          raise CucumberExpressionError, "Illegal character '#{Regexp.last_match(1)}' in parameter name {#{unescaped_type_name}}"
        end
        # rubocop:enable Style/GuardClause, Metrics/LineLength
      end

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
        # rubocop:disable Metrics/AbcSize, Metrics/CyclomaticComplexity
        raise "regexp can't be nil" if regexp.nil?
        raise "type can't be nil" if type.nil?
        raise "transformer can't be nil" if transformer.nil?
        raise "use_for_snippets can't be nil" if use_for_snippets.nil?
        if prefer_for_regexp_match.nil?
          raise "prefer_for_regexp_match can't be nil"
        end

        self.class.check_parameter_type_name(name) unless name.nil?
        @name = name
        @type = type
        @transformer = transformer
        @use_for_snippets = use_for_snippets
        @prefer_for_regexp_match = prefer_for_regexp_match
        @regexps = string_array(regexp)
        # rubocop:enable Metrics/AbcSize, Metrics/CyclomaticComplexity
      end

      def transform(self_obj, group_values)
        self_obj.instance_exec(*group_values, &@transformer)
      end

      def <=>(other)
        return -1 if prefer_for_regexp_match? && !other.prefer_for_regexp_match?
        return 1 if other.prefer_for_regexp_match? && !prefer_for_regexp_match?

        name <=> other.name
      end

      private

      def string_array(regexps)
        array = regexps.is_a?(Array) ? regexps : [regexps]
        array.map { |regexp| regexp.is_a?(String) ? regexp : regexp_source(regexp) }
      end

      def regexp_source(regexp)
        %w[
          EXTENDED
          IGNORECASE
          MULTILINE
        ].each do |option_name|
          option = Regexp.const_get(option_name)
          if regexp.options & option != 0
            raise CucumberExpressionError, "ParameterType Regexps can't use option Regexp::#{option_name}"
          end
        end
        regexp.source
      end
    end
  end
end
