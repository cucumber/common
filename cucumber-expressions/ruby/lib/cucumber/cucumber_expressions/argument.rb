require 'cucumber/cucumber_expressions/group'
require 'cucumber/cucumber_expressions/errors'

module Cucumber
  module CucumberExpressions
    class Argument
      def self.build(regexp, text, parameter_types)
        m = regexp.match(text)
        return nil if m.nil?

        match_group = Group.new(m)
        arg_groups = match_group.children

        if arg_groups.length != parameter_types.length
          raise CucumberExpressionException.new(
              "Expression has #{arg_groups.length} arguments, but there were #{parameter_types.length} parameter types"
          )
        end

        parameter_types.zip(arg_groups).map do |parameter_type, arg_group|
          Argument.new(arg_group, parameter_type)
        end
      end

      def initialize(group, parameter_type)
        raise "WTF" if Array === group
        @group, @parameter_type = group, parameter_type
      end

      def value
        @parameter_type.transform(@group ? @group.values : nil)
      end
    end
  end
end
