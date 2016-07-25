# Hooks

Cucumber provides a number of hooks which allow us to run blocks at various points in the Cucumber test cycle. You can define them anywhere in your support or step definition layers, using the methods `Before` and `After`. Hooks are global by default, meaning they run for every scenario in your `features`. If you want them to run for just certain scenarios, you need to tag those scenarios and then use a [tagged hook](#tagged-hooks).

## Scenario hooks

### Before hooks

`Before` hooks will be run before the first step of each scenario. They will run in the same order of which they are registered.

{% codetabs name="Ruby", type="rb" -%}
Before do
  puts "About to start the scenario"
end
{%- language name="Java", type="java" -%}
  {% raw %}
  @Before
  public void beforeCallingScenario() {
    System.out.println("*********** About to start the scenario.");
  }
  {% endraw %}
{%- endcodetabs %}

The main difference between [Background](gherkin.md#background) and `Before` hook is:

* a **Background** section allows you to specify a set of steps that are common to **every scenario** in the file
* a **Before** hook will be run **before** the first step of **each scenario**

### After hooks

`After` hooks will be run after the last step of each scenario, even when there are failing, undefined, pending or skipped steps. They will run in the opposite order of which they are registered.
{% codetabs name="Ruby", type="rb" -%}
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
{%- language name="Java", type="java" -%}
  {% raw %}
  @After
  public void afterRunningScenario(Scenario scenario) {
    if (scenario.isFailed()) {
      String subject = scenario.getName();
      sendFailureEmail("Failed scenario" + subject);
    }
  }
  {% endraw %}
{%- endcodetabs %}

or like this:

{% codetabs name="Ruby", type="rb" -%}
After('@javascript') do |scenario| if(scenario.failed?)
  # taking a screenshot only when there is a browser
  page.driver.browser.save_screenshot("html-report/#{scenario.__id__}.png")
  embed("#{scenario.__id__}.png", "image/png", "SCREENSHOT") end
end
{%- endcodetabs %}


The most common use of `Before` and `After hooks is to clear up any residual state left in external systems like databases or starting browsers or servers so that each scenario starts with the system in a known state.

It means that the next scenario that comes along starts with a blank slate, and we don’t need to worry about leftovers from the previous scenario.

## Tagged hooks {#tagged-hooks}

Both `Before` and `After` accept a tag expression, which you can use to selectively add the hook to only certain scenarios.

{% codetabs name="Ruby", type="rb" -%}
@admin
Feature: Delete Widgets
...
  Before('@admin') do
    user = create_user(:admin => true)
    login_as user
  end
{%- language name="Java", type="java" -%}

  @admin
  Feature: Delete Widgets
  ...
  {% raw %}
  @Before("@admin")
  public void logInAsAdmin() {
  // Log in as admin user
  }
  {% endraw %}
{%- endcodetabs %}

Now, to run a scenario when you need to be logged in as an administrator, you just have to tag the scenario with `@admin`, and this code will automatically run before the steps of the scenario.
