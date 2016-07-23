## Steps

Each Gherkin scenario is made up of a series of steps, written in plain language.
On its own, a step is just documentation; it needs a step definition to bring it to life.

A step definition is a piece of code that says to Cucumber, "If you see a step that looks like this..., then here’s what I want you to do....".
In other words,
 * `Given` [context] describes **you** and **your condition**
 * `When` [event occurs] describes **what you do**
 * `Then` [outcome] describes **what you see**

You state all the actions in natural language.

### Given

This is where you state the context: **Who** & **Where** & **What** has already happened & etc.:

```Gherkin
Given I am ...
```

### When

This is where you state the performed action:

```Gherkin
When I <perform some action>
```

### Then

This is how you observe the system's response:

```Gherkin
Then I see ...
```

Each of the lines in a scenario is known as a step. We can add more steps to each `Given`, `When`, or `Then` section of the scenario using the keywords `And` and `But`:

```Gherkin
Scenario: Attempt withdrawal using stolen card
  Given I have $100 in my account
  But my card is invalid
  When I request $50
  Then my card should not be returned
  And I should be told to contact the bank
```

Cucumber doesn’t actually care which of these keywords you use; the choice is simply there to help you create the most readable scenario. If you don’t want to use `And` or `But`, you could write the previous scenario like this, and it would still work exactly the same way:
```Gherkin
Scenario: Attempt withdrawal using stolen card
  Given I have $100 in my account
  Given my card is invalid
  When I request $50
  Then my card should not be returned
  Then I should be told to contact the bank
```

If you find `Given`, `When`, `Then`, `And` and `But` too verbose, you can even use an additional keyword to start a step: `*`(**an asterisk**). We could written the previous scenario like this:
```Gherkin
Scenario: Attempt withdrawal using stolen card
  * I have $100 in my account
  * my card is invalid
  * I request $50
  * my card should not be returned
  * I should be told to contact the bank
```

If you really find this version easier to read, it is OK. It's up to you and your team how you want to word things. The only thing that matters is that everybody understands what’s communicated.

Cucumber executes each step in a scenario, one at a time, in the sequence you’ve written them in.
When Cucumber tries to execute a step, it just looks for a matching step definition to execute.

### Step definitions {#steps}

For each step Cucumber will look for a matching **step definition**. A step definition is written in a programming language depending on the [chosen implementation](https://cucumber.io/docs#cucumber-implementations). Each step definition consists of a keyword, a string or regular expression, and a block. Example:

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
