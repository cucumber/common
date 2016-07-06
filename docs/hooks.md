# Hooks

Cucumber provides a number of hooks which allow us to run blocks at various points in the Cucumber test cycle. You can define them anywhere in your support or step definition layers, using the methods `Before` and `After`. Hooks are global by default, meaning they run for every scenario in your
features. If you want them to run for just certain scenarios, you need to tag
those scenarios and then use a [tagged hook](hooks.md#tagged-hooks).

## Scenario hooks

`Before` hooks will be run before the first step of each scenario. They will run in the same order of which they are registered.

```
Before do
  # Do something before each scenario.
end
```

or like this:

```
Before do |scenario|
  # The +scenario+ argument is optional, but if you use it, you can get the title,
  # description, or name (title + description) of the scenario that is about to be
  # executed.
  Rails.logger.debug "Starting scenario: #{scenario.title}"
end
```

`After` hooks will be run after the last step of each scenario, even when there are failing, undefined, pending or skipped steps. They will run in the opposite order of which they are registered.

```
After do |scenario|
  # Do something after each scenario.
  # The +scenario+ argument is optional, but
  # if you use it, you can inspect status with
  # the #failed?, #passed? and #exception methods.

  if scenario.failed?
    subject = "[Project X] #{scenario.exception.message}"
    send_failure_email(subject)
  end
end
```

`Around` hooks give you more power than Before and After hooks, allowing you to
actually control how many times the scenario is run. An Around hook is passed
two parameters: an object that represents the scenario and a block of code
that, when called, will run the scenario:

```
Around do |scenario, block|
  puts "About to run #{scenario.name}"
  block.call
  puts "Finished running #{scenario.name}"
end
```

`Around` hooks also accept tags, so you can restrict them to run for only some
scenarios, just like `Before` and `After` hooks. One great trick we’ve seen them used for is to run the same scenario twice under different conditions, like this:

```
Around('@run_with_and_without_javascript') do |scenario, block|
Capybara.current_driver = Capybara.javascript_driver
  block.call
  Capybara.use_default_driver
  block.call
end
```

## Tagged hooks {#tagged-hooks}

Both `Before` and `After` accept a tag expression, which you can use to selectively add the hook to only certain scenarios.

```
@admin
Feature: Delete Widgets
...
  Before('@admin') do
    user = create_user(:admin => true)
    login_as user
  end
```

Now, to run a scenario when you need to be logged in as an administrator, you just have to tag the scenario with `@admin`, and this code will automatically run before the steps of the scenario.
