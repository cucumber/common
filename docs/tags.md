# Tags

Tags are a way to group Scenarios. They are `@`-prefixed strings and you can place as many tags as you like above `Feature`, `Scenario`, `Scenario Outline` or `Examples` keywords. Space character are invalid in tags and may separate them.

Tags are inherited from parent elements. For example, if you place a tag above a `Feature`, all scenarios in that feature will get that tag.

If you want to tag all the scenarios in a feature at once, just tag the `Feature` element at the top, and all the scenarios will inherit the tag. You can still tag individual scenarios as well.

Similarly, if you place a tag above a `Scenario Outline` or `Examples` keyword, all scenarios derived from examples rows will inherit the tags.

A `Scenario` or `Feature` can have as many tags as you like. Just separate them with spaces:

```
@billing @bicker @annoy
Feature: Verify billing
```

Cucumber can perform different operations before and after each scenario based on what tags are present on a scenario.

There are three main reasons for tagging scenarios:

  * _Filtering_: Cucumber allows you to use tags as a filter to pick out  specific scenarios to run or report on. You can even have Cucumber fail your  test run if a certain tag appears too many times.
  * _Hooks_: Run a block of Ruby code whenever a scenario with a particular tag is about to start or has just finished.
  * _Documentation_: You simply want to use a tag to attach a label to certain scenarios, for example to label them with an ID from a project management tool.

See [tagged hooks](hooks.md#tagged-hooks) for more details.
