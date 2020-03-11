module Cucumber
  module HTMLFormatter
    class TemplateWriter
      attr_reader :template

      def initialize(template)
        @template = template
      end

      def write_between(from, to)
        after_from = from.nil? ? template : template.split(from)[1]
        before_to = to.nil? ? after_from : after_from.split(to)[0]

        return before_to
      end
    end
  end
end