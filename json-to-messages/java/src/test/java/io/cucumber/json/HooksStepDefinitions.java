package io.cucumber.json;

import io.cucumber.java.en.Given;
import io.cucumber.java.Before;
import io.cucumber.java.After;

public class HooksStepDefinitions {
  @Before
  public void before() {
    // no-op
  }

  @Before("@beforeHook")
  public void before2() {
    // no-op
  }

  @Before("@failBeforeHook")
  public void beforeFailed() throws Exception {
    throw new Exception("BOOM !");
  }

  @After
  public void after() {
    // no-op
  }

  // @Given("a passed step")
  // public void a_passed_step() {
  //   // no-op
  // }
}