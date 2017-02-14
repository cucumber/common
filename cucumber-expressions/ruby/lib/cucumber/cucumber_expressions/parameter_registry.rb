require 'cucumber/cucumber_expressions/parameter'

module Cucumber
  module CucumberExpressions
    class ParameterRegistry
      INTEGER_REGEXPS = ['-?\d+', '\d+']
      FLOATING_POINT_REGEXPS = ['-?\d*\.?\d+']

      def initialize
        @parameters_by_type_name = {}
        @parameters_by_capture_group_regexp = {}
        @parameters_by_class = {}

        add_parameter(Parameter.new('int', Integer, INTEGER_REGEXPS, lambda {|s| s.to_i}))
        add_parameter(Parameter.new('float', Float, FLOATING_POINT_REGEXPS, lambda {|s| s.to_f}))
      end

      def lookup_by_type(type)
        if type.is_a?(Class)
          lookup_by_class(type)
        elsif type.is_a?(String)
          lookup_by_type_name(type, false)
        else
          raise Exception.new("Type must be string or class, but was #{type} of type #{type.class}")
        end
      end

      def lookup_by_class(clazz)
        parameter = @parameters_by_class[clazz]
        if parameter.nil?
          create_anonymous_lookup(lambda {|s| clazz.new(s)})
        else
          parameter
        end
      end

      def lookup_by_type_name(type_name, ignore_unknown_type_name)
        parameter = @parameters_by_type_name[type_name]
        if parameter.nil?
          return nil if ignore_unknown_type_name
          raise Exception.new("No parameter for type name \"#{type_name}\"")
        else
          parameter
        end
      end

      def lookup_by_capture_group_regexp(capture_group_regexp)
        @parameters_by_capture_group_regexp[capture_group_regexp]
      end

      def create_anonymous_lookup(proc)
        Parameter.new(nil, nil, ['.+'], proc)
      end

      def add_parameter(parameter)
        @parameters_by_type_name[parameter.type_name] = parameter
        @parameters_by_class[parameter.type] = parameter

        parameter.capture_group_regexps.each do |capture_group_regexp|
          @parameters_by_capture_group_regexp[capture_group_regexp] = parameter
        end
      end

      def parameters
        @parameters_by_type_name.values
      end

    end
  end
end
