require 'cucumber/messages'
require 'cucumber/html_formatter/template_writer'

module Cucumber
  module HTMLFormatter
    class MessageExpected < StandardError; end

    class Formatter
      attr_reader :out

      def initialize(out)
        @out = out
        @pre_message_written = false
        @first_message = true
      end

      def write_pre_message
        return if @pre_message_written

        out.puts(pre_message)
        @pre_message_written = true
      end

      def write_message(message)
        raise MessageExpected unless message.is_a?(Cucumber::Messages::Envelope)
        unless @first_message
          out.puts(',')
        end
       out.print(message.to_json(proto3: true))

        @first_message = false
      end

      def write_post_message
        out.print(post_message)
      end

      private

      def pre_message
        [
          template_writer.write_between(nil, '{{css}}'),
          read_asset('cucumber-react.css'),
          template_writer.write_between('{{css}}', '{{messages}}')
        ].join("\n")
      end

      def post_message
        [
          template_writer.write_between('{{messages}}', '{{script}}'),
          read_asset('cucumber-html.js'),
          template_writer.write_between('{{script}}', nil)
        ].join("\n")
      end

      def template_writer
        @template_writer ||= TemplateWriter.new(template)
      end

      def template
        read_asset('index.mustache.html')
      end

      def read_asset(name)
        File.read(File.join(assets_path, name))
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