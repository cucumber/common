require 'cucumber/cucumber_expressions/transform'

module Cucumber
  module CucumberExpressions
    class TransformLookup
      FIXNUM_REGEXP = '-?\d+'
      FLOATING_POINT_REGEXP = '-?\d*\.?\d+'
      STRING_REGEXP = '.+'

      def initialize
        @transforms_by_type_name = {}
        @transforms_by_capture_group_regexp = {}

        add_transform(Transform.new('int', FIXNUM_REGEXP, lambda {|s| s.to_i}))
        add_transform(Transform.new('float', FLOATING_POINT_REGEXP, lambda {|s| s.to_f}))
        add_transform(Transform.new('string', STRING_REGEXP, lambda {|s| s}))
      end

      def lookup(type_name)
        transform = @transforms_by_type_name[type_name]
        raise Exception.new("No transformer for type \"#{type_name}\"") unless transform
        transform
      end

      def lookup_by_capture_group_regexp(capture_group_regexp)
        transform = @transforms_by_capture_group_regexp[capture_group_regexp]
        raise Exception.new("No transformer for capture group regexp \"#{capture_group_regexp}\"") unless transform
        transform
      end

    private

      def add_transform(transform)
        @transforms_by_type_name[transform.type_name] = transform
        @transforms_by_capture_group_regexp[transform.capture_group_regexp] = transform
      end

    end
  end
end
