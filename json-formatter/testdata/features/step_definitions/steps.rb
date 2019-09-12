Given("a passed step") do
end

When("a failed step") do
  raise "Some error"
end

Then("a skipped step") do
end

Then("a (a)mbiguous step") do
end

Then("a ambiguou(s) step") do
end
