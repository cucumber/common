Feature: Hooks
  Some hooks can be triggered

  @beforeHook
  Scenario:
    This scenario has two before hooks
    Given a passed step

  Scenario: no hook
    Except the feature one
    Given a passed step

  @afterHook
  Scenario:
    This scenario has a before and after hook
    Given a passed step

