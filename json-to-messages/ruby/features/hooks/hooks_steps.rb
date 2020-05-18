Before() do
  # no-op
end

Before('@beforeHook') do
  # no-op
end

Before('@failBeforeHook') do
  raise 'Woops !'
end

After('@afterHook') do
  # no-op
end

Given('a passed step') do
  # no-op
end