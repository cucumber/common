# frozen_string_literal: true

require 'cucumber/cucumber_expressions/group'
require 'cucumber/cucumber_expressions/errors'

module Cucumber
  module CucumberExpressions
    # An argument extracted from a match
    class Argument
      attr_reader :group, :parameter_type

      # rubocop:disable Metrics/AbcSize
      def self.build(tree_regexp, text, parameter_types)
        group = tree_regexp.match(text)
        return nil if group.nil?

        if group.children.length != parameter_types.length
          # rubocop:disable Layout/LineLength
          raise CucumberExpressionError, "Expression #{tree_regexp.regexp.inspect} has #{group.children.length} capture groups (#{group.children.map(&:value)}), but there were #{parameter_types.length} parameter types (#{parameter_types.map(&:name)})"
          # rubocop:enable Layout/LineLength
        end

        parameter_types.zip(group.children).map do |parameter_type, arg_group|
          Argument.new(arg_group, parameter_type)
        end
      end
      # rubocop:enable Metrics/AbcSize

      def initialize(group, parameter_type)
        @group = group
        @parameter_type = parameter_type
      end

      def value(self_obj = :nil)
        raise 'No self_obj' if self_obj == :nil

        group_values = @group ? @group.values : nil
        @parameter_type.transform(self_obj, group_values)
      end
    end
  end
end
