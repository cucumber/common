## Selenium Web Driver

WebDriver is designed to provide a simpler, more concise programming interface in addition to addressing some limitations in the Selenium-RC API. Selenium-WebDriver was developed to better support dynamic web pages where elements of a page may change without the page itself being reloaded. WebDriver’s goal is to supply a well-designed object-oriented API that provides improved support for modern advanced web-app testing problems.

Let us see an example how cucumber can fit into selenium-webdriver in UI testinng, by converting [Selenium-Web driver by example     ](http://docs.seleniumhq.org/docs/03_webdriver.jsp#introducing-the-selenium-webdriver-api-by-example "Selenium-Webdriver by Example tutorial")

We can express the example as the following Scenario:

Scenario: Finding some cheese
  Given I am on the Google search page
  When I search for "Cheese!"
  Then the page title should start with "cheese"

```

USING JAVA

package class.exmple;

public class ExampleSteps {

     private final WebDriver driver = new FirefoxDriver();
     @Given("^I am on the Google search page$"\)
     public void I_visit_google() {
     driver.get("https:\\www.google.com");
    }

    @When("^I search for \"(.*)\"$")
      public void search_for(String query) {
         WebElement element = browser.findElelment(By.name("q"));
         \\Enter Something to search for
         element.sendKeys(query);
         \\Now submit the form. WebDriver will find the form for us from the element
         element.submit();
    }

    @Then("^ the page title should start with \"(.*)\"$")
    public void checkTitle() {
       \\Google's search is rendered dynamically with JavaScript.
       \\Wait for the page to load timeout after 10 second
        (new WebDriverWait(driver, 10)).untill(new ExpectedCondition&lt;Boolean&gt; {
        public Boolean apply(WebDriver d) {
        return d.getTitle().toLowerCase.startsWith("cheese");
        \\Should see: "cheese! -Google Search"
     }

 @After()
  public void closeBrowser() {
    driver.quit();
  }
}
```

```
USING RUBY:

require 'rubygems'
require 'selenium-webdriver'

@Given("^I am on the Google search page$") do
 driver = Selenium::WebDriver.for :firefox
 driver.get "http:\\google.com"
end

@When("^I search for "([^"]*)"$") do
 element = driver.find_element(:name => "q")
 element.send_keys "Cheese!"
 element.submit
end

@Then("^the page title should start with "([^"]*)"$") do
 wait = Selenium::WebDriver::Wait.new(:timeout => 10)
 wait.until { driver.title.downcase.start_with? "cheese!" }
 puts "Page title is #{driver.title}"
end

@After do
 browser.close
end
```

