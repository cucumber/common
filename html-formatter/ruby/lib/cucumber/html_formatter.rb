module Cucumber
  module HTMLFormatter
    class Formatter
      attr_reader :out

      def initialize(out)
        @out = out
      end

      def write_pre_message
        return if @pre_message_written

        out.puts pre_message
        @pre_message_written = true
      end

      private

      def pre_message
        template.split('{{messages}}')[0]
      end

      def template
        File.read(File.join(assets_path, 'index.mustache.html'))
      end

      def assets_path
        "#{html_formatter_path}/assets"
      end

      def html_formatter_path
        Gem.loaded_specs['cucumber-html-formatter'].full_gem_path
      rescue
        '.'
      end
    end
  end
end