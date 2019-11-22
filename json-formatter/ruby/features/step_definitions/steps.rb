Given("a passed {word}") do |word|
end

Given("a passed {word} with") do |word, arg|
end

When("a failed {word}") do |word|
  raise "Some error"
end

When("a failed {word} with") do |word, arg|
  raise "Some error"
end

Then("a skipped {word}") do |word|
  raise "Should never be called"
end

