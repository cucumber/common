require 'cucumber/cucumber_expressions/transform'

module Cucumber
  module CucumberExpressions
    class TransformLookup
      FIXNUM_REGEXPS = ['-?\d+', '\d+']
      FLOATING_POINT_REGEXPS = ['-?\d*\.?\d+']

      def initialize
        @transforms_by_type = {}
        @transforms_by_type_name = {}
        @transforms_by_capture_group_regexp = {}

        add_transform(Transform.new('int', Fixnum, FIXNUM_REGEXPS, lambda {|s| s.to_i}))
        add_transform(Transform.new('float', Float, FLOATING_POINT_REGEXPS, lambda {|s| s.to_f}))
      end

      def lookup_by_type(type)
        @transforms_by_type[type]
      end

      def lookup_by_type_name(type_name)
        @transforms_by_type_name[type_name]
      end

      def lookup_by_capture_group_regexp(capture_group_regexp)
        @transforms_by_capture_group_regexp[capture_group_regexp]
      end

      def add_transform(transform)
        @transforms_by_type[transform.type] = transform
        @transforms_by_type_name[transform.type_name] = transform

        transform.capture_group_regexps.each do |capture_group_regexp|
          @transforms_by_capture_group_regexp[capture_group_regexp] = transform
        end
      end

    end
  end
end
