def attach_or_embed(world, data, media_type)
  # Backward compatibility as the steps are also used by cucumber-ruby 3 which does not support `attach`
  world.respond_to?(:attach) ? attach(data, media_type) : embed(data, media_type)
end

Before do
  # no-op
end

When('a step passes') do
  # no-op
end

When('a step throws an exception') do
  raise StandardError, 'Exception in step'
end

After do
  raise StandardError, 'Exception in hook'
end

After('@some-tag or @some-other-tag') do
  raise StandardError, 'Exception in conditional hook'
end

After('@with-attachment') do
  attach_or_embed(self, File.open("#{__dir__}/cucumber.svg"), 'image/svg+xml')
end
