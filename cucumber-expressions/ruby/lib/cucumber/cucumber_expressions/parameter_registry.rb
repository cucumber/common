require 'cucumber/cucumber_expressions/parameter'

module Cucumber
  module CucumberExpressions
    class ParameterRegistry
      INTEGER_REGEXPS = [/-?\d+/, /\d+/]
      FLOAT_REGEXP = /-?\d*\.?\d+/

      def initialize
        @parameters_by_type_name = {}
        @parameters_by_capture_group_regexp = {}
        @parameters_by_class = {}

        add_predefined_parameter(Parameter.new('int', Integer, INTEGER_REGEXPS, lambda { |s| s.to_i }))
        add_predefined_parameter(Parameter.new('float', Float, FLOAT_REGEXP, lambda { |s| s.to_f }))
      end

      def lookup_by_type(type)
        if type.is_a?(Class)
          lookup_by_class(type)
        elsif type.is_a?(String)
          lookup_by_type_name(type)
        else
          raise Exception.new("Type must be string or class, but was #{type} of type #{type.class}")
        end
      end

      def lookup_by_class(clazz)
        parameter = @parameters_by_class[clazz]
        if parameter.nil?
          create_anonymous_lookup(lambda { |s| clazz.new(s) })
        else
          parameter
        end
      end

      def lookup_by_type_name(type_name)
        @parameters_by_type_name[type_name]
      end

      def lookup_by_capture_group_regexp(capture_group_regexp)
        @parameters_by_capture_group_regexp[capture_group_regexp]
      end

      def create_anonymous_lookup(proc)
        Parameter.new(nil, nil, ['.+'], proc)
      end

      def parameters
        @parameters_by_type_name.values
      end

      def add_parameter(parameter)
        add_parameter0(parameter, true)
      end

      private

      def add_predefined_parameter(parameter)
        add_parameter0(parameter, false)
      end

      def add_parameter0(parameter, check_conflicts)
        put(@parameters_by_type_name, parameter.type_name, parameter, "type name", check_conflicts)
        put(@parameters_by_class, parameter.type, parameter, "type", check_conflicts)

        parameter.capture_group_regexps.each do |capture_group_regexp|
          put(@parameters_by_capture_group_regexp, capture_group_regexp, parameter, "regexp", check_conflicts)
        end
      end

      def put(map, key, parameter, prop, check_conflicts)
        if check_conflicts && map.has_key?(key)
          raise "There is already a parameter with #{prop} #{key}"
        end
        map[key] = parameter
      end
    end
  end
end
