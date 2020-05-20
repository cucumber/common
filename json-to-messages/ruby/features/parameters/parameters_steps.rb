Given('I have {int} cucumbers') do |count|
  @cucumbers = count
end

When('I eat {int} cucumbers') do |eaten|
  @cucumbers -= eaten
end

Then('I have {int} cucumbers left') do |left|
  expect(@cucumbers).to eq(left)
end

Given('a step with a doctring:') do |string|
end

When('a step with a datatable') do |table|
end