package io.cucumber.json;

import static org.junit.Assert.*;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;


public class ParametersStepDefinitions {
  private Integer cucumbers;

  @Given("I have {int} cucumbers")
  public void i_have_cucumbers(Integer count) {
    this.cucumbers = count;
  }

  @When("I eat {int} cucumbers")
  public void i_eat_cucumbers(Integer eaten) {
    this.cucumbers -= eaten;
  }

  @Then("I have {int} cucumbers left")
  public void i_have_cucumbers_left(Integer left) {
    assertEquals(this.cucumbers, left);
  }
}