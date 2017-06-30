Given(/^this step fails$/) do
  raise "Failing step"
end

Then(/^this step will be skipped$/) do
  # noop
end
