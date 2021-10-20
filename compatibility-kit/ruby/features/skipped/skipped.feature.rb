Before('@skip') do
  'skipped'
end

Given('an implemented step') do
  # no-op
end

Given('a step that we expect to be skipped') do
  # no-op
end

Given('a step that skips') do
  'skipped'
end