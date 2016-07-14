## Steps

Each Gherkin scenario is made up of a series of steps, written in plain language.
On its own, a step is just documentation; it needs a step definition to bring it to life.

A step definition is a piece of code that says to Cucumber, "If you see a step that looks like this..., then here’s what I want you to do....".
When Cucumber tries to execute each step, it looks for a matching step definition to execute.

## Step definitions {#steps}

For each step Cucumber will look for a matching **step definition**. A step definition is written in Ruby. Each step definition consists of a keyword, a string or regular expression, and a block. Example:

{% codetabs name="Ruby", type="rb" -%}
# features/step_definitions/coffee_steps.rb

Then "I should be served coffee" do
  @machine.dispensed_drink.should == "coffee"
end
{%- language name="Java", type="java" -%}
{% raw %}
@Given("I have \\$100 in my Account")
public void iHave$100InMyAccount() throws Throwable {
// TODO: code that puts $100 into User's Account goes here
}
{% endraw %}
{%- endcodetabs %}

Step definitions can also take parameters if you use regular expressions:

{% codetabs name="Ruby", type="rb" -%}
# features/step_definitions/coffee_steps.rb

Given /there are (\d+) coffees left in the machine/ do |n|
  @machine = Machine.new(n.to_i)
end
{%- language name="Java", type="java" -%}
{% raw%}
@Given("I have deposited \\$(100) in my Account")
public void iHaveDeposited$100InMyAccount(int amount) {
// TODO: code goes here
}
{% endraw %}
{%- endcodetabs %}

This step definition uses a regular expression with one match group – `(\d+)`. (It matches any sequence of digits). Therefore, it matches the first line of the scenario. The value of each matched group gets yielded to the block as a string. You must take care to have the same number of regular expression groups and block arguments. Since block arguments are always strings, you have to do any type conversions inside the block, or use Step Argument Transforms.

When Cucumber prints the results of the running features it will underline all step arguments so that it’s easier to see what part of a step was actually recognised as an argument. It will also print the path and line of the matching step definition. This makes it easy to go from a feature file to any step definition.
