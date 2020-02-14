require 'stringio'

# Cucumber-JVM needs to use a Before hook in order to create attachments
Before do
  # no-op
end

When('the string {string} is attached as {string}') do |text, media_type|
  embed(text, media_type)
end

When('an array with {int} bytes are attached as {string}') do |size, media_type|
  # Awful monkey patch here.
  module Cucumber
    module Formatter
      class Json
        def embed(src, mime_type, _label)
          is_file = File.file?(src) rescue false

          if is_file
            content = File.open(src, 'rb', &:read)
            data = encode64(content)
          elsif mime_type =~ /;base64$/
            mime_type = mime_type[0..-8]
            data = src
          else
            data = encode64(src)
          end
          test_step_embeddings << { mime_type: mime_type, data: data }
        end
      end
    end
  end

  data = (0..size-1).map {|i| [i].pack('C') }.join
  embed(data, media_type)
end

When('a stream with {int} bytes are attached as {string}') do |size, media_type|
  stream = StringIO.new
  stream.puts (0..size).map(&:to_s).join('')
  stream.seek(0)

  embed(stream, media_type)
end

When('a JPEG image is attached') do
  embed(File.open("#{__dir__}/cucumber-growing-on-vine.jpg"), 'image/jpg')
end