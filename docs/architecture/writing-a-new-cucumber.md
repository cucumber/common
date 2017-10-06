# Writing a new cucumber

If you plan to write a new Cucumber implementation for a new language - start here. Please give us a heads up on the [Cucumber mailing list](https://groups.google.com/forum/#!forum/cukes) before you start. We might want to join you,
and we'd love to include your implementation in the growing family
of official implementations!

This guide takes you through a series of baby steps to write a new Cucumber
implementation from scratch.

We'll build a functional prototype in less than an hour - a
[skateboard](http://www.cantabilesoftware.com/blog/posts/12/Minimally-Viable-Cantabile-3). Then we'll gradually improve it to be more functional and
follow the architecture specification more closely.

You'll be able to follow the incremental development by looking at
a JavaScript implementation we're writing from scratch.

Let's get started!

## Gherkin

Before you start you should make sure you have a working [Gherkin](#https://docs.cucumber.io/docs/gherkin.html)
parser that can parse and compile `.feature` files.

It isn't the first thing you'll use when you write a new Cucumber
implementation, but you'll need it pretty soon. An experienced
programmer should be able to port Gherkin3 to a new language in
about a week, so get started!

## Design your Step Definition API

Users of your Cucumber will use your Step Definition API to define their own
Step Definitions and Hooks.

Every Step Definition has 3 elements:

* A keyword (`Given `, `When `, `Then `, `And `, `But `)
* A pattern
* A block of code

Here is an example in Ruby:

```ruby
Given /I have (\d+) cukes/ do |n|
  raise "Didn't quite expect #{n} cukes"
end
```

And one in Java 7:

```ruby
@Given("I have (\\d+) cukes")
public void i_have_n_cukes(int n) {
  throw new RuntimeException(String.format("Didn't quite expect %d cukes", n));
}
```

*TRANSLATE IT TO YOUR LANGUAGE*

Here is how it's done:

* [JavaScript](https://github.com/cucumber/cucumber-js) - commit 1d75ca2123ae44154e9e80f40b4746c87bfc0486

## Load and run your step definition

Now it's time to write the part of Cucumber that will load it and run it.
To do this you need to implement the step definition API, and write a simple
command-line program that will load the step definition.

In order to get some instant gratification, we'll invoke the step definition
immediately (with the value 100) and manually verify that an error is thrown.

*WRITE THE STEPDEF API AND SIMPLE RUNNER*

Here is how it's done:

* [JavaScript](https://github.com/cucumber/cucumber-js)- commit 8b296ef98d0a6b90beb7e2b23cab7802fd4f6df4: `node lib/cucumber/cli/main.js`

## Print arguments from a Gherkin scenario

Now that you have the early beginning of a Step Definition API,
let's store the Step Definition in memory instead of running it
immediately. What we want to do next is to write a simple
Gherkin feature with a single scenario and a singgle step, parse it,
match it against our step definition and print the argument.

Here is how it's done:

* [JavaScript](https://github.com/cucumber/cucumber-js) - commit a183114b026fd30db22aaf7f73421f32e169a0cd
