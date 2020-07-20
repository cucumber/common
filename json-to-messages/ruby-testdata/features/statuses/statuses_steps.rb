Then('a passed step') do
  # no-op
end

When('a failed step') do
  raise "Woops"
end

Then('a skipped step') do
  # no-op
end
