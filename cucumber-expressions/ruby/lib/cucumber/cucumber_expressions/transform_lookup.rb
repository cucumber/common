require 'cucumber/cucumber_expressions/transform'

module Cucumber
  module CucumberExpressions
    class TransformLookup
      FIXNUM_REGEXPS = ['-?\d+', '\d+']
      FLOATING_POINT_REGEXPS = ['-?\d*\.?\d+']

      def initialize
        @transforms_by_type_name = {}
        @transforms_by_capture_group_regexp = {}
        @transforms_by_class = {}

        add_transform(Transform.new('int', Fixnum, FIXNUM_REGEXPS, lambda {|s| s.to_i}))
        add_transform(Transform.new('float', Float, FLOATING_POINT_REGEXPS, lambda {|s| s.to_f}))
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
        transform = @transforms_by_class[clazz]
        if transform.nil?
          create_anonymous_lookup(lambda {|s| clazz.new(s)})
        else
          transform
        end
      end

      def lookup_by_type_name(type_name, ignore_unknown_type_name)
        transform = @transforms_by_type_name[type_name]
        if transform.nil?
          return nil if ignore_unknown_type_name
          raise Exception.new("No transformer for type name \"#{type_name}\"")
        else
          transform
        end
      end

      def lookup_by_capture_group_regexp(capture_group_regexp)
        @transforms_by_capture_group_regexp[capture_group_regexp]
      end

      def create_anonymous_lookup(proc)
        Transform.new(nil, nil, ['.+'], proc)
      end

      def add_transform(transform)
        @transforms_by_type_name[transform.type_name] = transform
        @transforms_by_class[transform.type] = transform

        transform.capture_group_regexps.each do |capture_group_regexp|
          @transforms_by_capture_group_regexp[capture_group_regexp] = transform
        end
      end

    end
  end
end
