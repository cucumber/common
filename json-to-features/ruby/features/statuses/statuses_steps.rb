Then('a passed step') do
end

When('a failed step') do
  raise "Woops"
end

Then('a skipped step') do
end
