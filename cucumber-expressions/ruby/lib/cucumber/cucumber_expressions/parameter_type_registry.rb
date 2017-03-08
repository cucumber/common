require 'cucumber/cucumber_expressions/parameter_type'

module Cucumber
  module CucumberExpressions
    class ParameterTypeRegistry
      INTEGER_REGEXPS = [/-?\d+/, /\d+/]
      FLOAT_REGEXP = /-?\d*\.?\d+/

      def initialize
        @parameter_types_by_name = {}
        @parameter_types_by_regexp = {}
        @parameter_types_by_class = {}

        define_predefined_parameter_type(ParameterType.new('int', Integer, INTEGER_REGEXPS, lambda { |s| s.to_i }))
        define_predefined_parameter_type(ParameterType.new('float', Float, FLOAT_REGEXP, lambda { |s| s.to_f }))
      end

      def lookup_by_type(type)
        if type.is_a?(Class)
          lookup_by_class(type)
        elsif type.is_a?(String)
          lookup_by_name(type)
        else
          raise Exception.new("Type must be string or class, but was #{type} of type #{type.class}")
        end
      end

      def lookup_by_class(clazz)
        parameter = @parameter_types_by_class[clazz]
        if parameter.nil?
          create_anonymous_lookup(lambda { |s| clazz.new(s) })
        else
          parameter
        end
      end

      def lookup_by_name(name)
        @parameter_types_by_name[name]
      end

      def lookup_by_regexp(regexp)
        @parameter_types_by_regexp[regexp]
      end

      def create_anonymous_lookup(proc)
        ParameterType.new(nil, nil, ['.+'], proc)
      end

      def parameter_types
        @parameter_types_by_name.values
      end

      def define_parameter_type(parameter_type)
        define_parameter_type0(parameter_type, true)
      end

      private

      def define_predefined_parameter_type(parameter_type)
        define_parameter_type0(parameter_type, false)
      end

      def define_parameter_type0(parameter_type, check_conflicts)
        if parameter_type.type
          put(@parameter_types_by_class, parameter_type.type, parameter_type, "type", check_conflicts)
        end
        put(@parameter_types_by_name, parameter_type.name, parameter_type, "type name", check_conflicts)

        parameter_type.regexps.each do |regexp|
          put(@parameter_types_by_regexp, regexp, parameter_type, "regexp", check_conflicts)
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
