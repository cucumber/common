require 'cucumber/cucumber_expressions/transform'

module Cucumber
  module CucumberExpressions
    class TransformLookup
      FIXNUM_REGEXPS = ['-?\d+', '\d+']
      FLOATING_POINT_REGEXPS = ['-?\d*\.?\d+']
      STRING_REGEXPS = ['.+']

      def initialize
        @transforms_by_type_name = {}
        @transforms_by_capture_group_regexp = {}

        add_transform(Transform.new('int', FIXNUM_REGEXPS, lambda {|s| s.to_i}))
        add_transform(Transform.new('float', FLOATING_POINT_REGEXPS, lambda {|s| s.to_f}))
        add_transform(Transform.new('string', STRING_REGEXPS, lambda {|s| s}))
      end

      def lookup(type_name)
        transform = @transforms_by_type_name[type_name]
        raise Exception.new("No transformer for type \"#{type_name}\"") unless transform
        transform
      end

      def lookup_by_capture_group_regexp(capture_group_regexp)
        @transforms_by_capture_group_regexp[capture_group_regexp]
      end

    private

      def add_transform(transform)
        @transforms_by_type_name[transform.type_name] = transform
        transform.capture_group_regexps.each do |capture_group_regexp|
          @transforms_by_capture_group_regexp[capture_group_regexp] = transform
        end
      end

    end
  end
end
