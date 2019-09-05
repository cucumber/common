Given("a passed step") do
end

When("a failed step") do
  raise "Some error"
end

Then("a skipped step") do
end
