package io.cucumber.json;

import io.cucumber.junit.CucumberOptions;
import io.cucumber.junit.Cucumber;
import org.junit.runner.RunWith;

@RunWith(Cucumber.class)
@CucumberOptions(
  features = "src/test/java",
  plugin = {"pretty", "json:target/cucumber.json"
})
public class RunCucumberTest {
}