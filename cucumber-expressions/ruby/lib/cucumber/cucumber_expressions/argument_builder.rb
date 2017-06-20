require 'cucumber/cucumber_expressions/argument'
require 'cucumber/cucumber_expressions/group'

module Cucumber
  module CucumberExpressions
    class ArgumentBuilder
      def self.build_arguments(regexp, text, parameter_types)
        m = regexp.match(text)
        return nil if m.nil?

        match_group = Group.new(m, text)
        arg_groups = match_group.children

        parameter_types.zip(arg_groups).map do |parameter_type, arg_group|
          groups = nil
          if arg_group
            if arg_group.children.empty?
              groups = [arg_group.value]
            else
              groups = arg_group.children.map {|g| g.value}
            end
          end
          Argument.new(groups, parameter_type)
        end
      end
    end
  end
end
