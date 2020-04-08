package io.cucumber.json;

import io.cucumber.java.en.Given;

public class StatusesStepDefinitions {
  @Given("a passed step")
  public void a_passed_step() {
    // no-op
  }

  @Given("a pending step")
  public void a_pending_step() throws io.cucumber.java.PendingException {
      throw new io.cucumber.java.PendingException();
  }

  @Given("a failed step")
  public void a_failed_step() throws Exception {
      throw new Exception("BOOM !");
  }

  @Given("a skipped step")
  public void a_skipped_step() {
    //no-op
  }
}