require 'stringio'

# Cucumber-JVM needs to use a Before hook in order to create attachments
Before do
  # no-op
end

def attach_or_embed(world, data, media_type)
  # Backward compatibility as the steps are also used by cucumber-ruby 3 which does not support `attach`
  world.respond_to?(:attach) ? attach(data, media_type) : embed(data, media_type)
end

When('the string {string} is attached as {string}') do |text, media_type|
  attach_or_embed(self, text, media_type)
end

When('the string {string} is logged') do |text|
  # Backward compatibility
  self.respond_to?(:log) ? log(text) : puts(text)
end

When('an array with {int} bytes are attached as {string}') do |size, media_type|
  data = (0..size-1).map {|i| [i].pack('C') }.join
  attach_or_embed(self, data, media_type)
end

When('a stream with {int} bytes are attached as {string}') do |size, media_type|
  stream = StringIO.new
  stream.puts (0..size).map(&:to_s).join('')
  stream.seek(0)

  attach_or_embed(self, stream, media_type)
end

When('a JPEG image is attached') do
  attach_or_embed(self, File.open("#{__dir__}/cucumber-growing-on-vine.jpg"), 'image/jpg')
end