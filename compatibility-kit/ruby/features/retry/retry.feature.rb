Given('a step that always passes') do
  # no-op
end

second_time_pass = 0
Given('a step that passes the second time') do
  second_time_pass += 1
  if second_time_pass < 2
    raise StandardError, 'Exception in step'
  end
end

third_time_pass = 0
Given('a step that passes the third time') do
  third_time_pass += 1
  if third_time_pass < 3
    raise StandardError, 'Exception in step'
  end
end

Given('a step that always fails') do
  raise StandardError, 'Exception in step'
end
