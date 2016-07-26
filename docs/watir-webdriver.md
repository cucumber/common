##Watir Webdriver

Watir (Web Application Testing in Ruby), pronounced water, is an open-source (BSD) family of Ruby libraries for automating web browsers. It allows you to write tests that are easy to read and maintain. It is simple and flexible.

Watir drives browsers the same way people do. It clicks links, fills in forms, presses buttons. Watir also checks results, such as whether expected text appears on the page.

Watir is a family of Ruby libraries but it supports your app no matter what technology it is developed in. While Watir supports only Internet Explorer.

Here comes our, Watir-WebDriver which supports Chrome, Firefox, Internet Explorer, Opera and also running in headless mode (HTMLUnit), the elegant way of testing UI using Ruby.

Without any delay, Now let us see an example using WATIR-WEBDRIVER

Before starting with an example we need to install watir-webdriver gem

```command
 
  gem install watir-webdriver

```
If you are using [bundler](http://bundler.io) just add **gem watir-webdriver** to your gemfile

Here is  a sample UI testing program using Watir


```ruby
{% codetabs name="Ruby", type="rb" -%}
require "rubygems"
require "rspec"
require "watir-webdriver"
 
describe "google.com" do
  let(:browser) { @browser ||= Watir::Browser.new :firefox } 
  before { browser.goto "http://google.com" } 
  browser.text_field(:name => "q").set "watir"
  browser.button.click 
  browser.div(:id => "resultStats").wait_until_present
  browser.title.should == "watir - Google Search"
  after { browser.close }
end
{%- endcodetabs %}

```

Now let us incorporate Cucumber to this simple test

```gherkin
Feature: Search In order to use Google users must be able to search for content 
  Scenario: Search for a term
    Given I have entered "watir" into the query
    When I click "search"
    Then I should see some results
 ```
 
 ```ruby
{% codetabs name="Ruby", type="rb" -%}
require "watir-webdriver"
require "rspec/expectations"
 
Given /^I have entered "([^"]*)" into the query$/ do |term|
  @browser ||= Watir::Browser.new :firefox
  @browser.goto "google.com"
  @browser.text_field(:name => "q").set term
end
 
When /^I click "([^"]*)"$/ do |button_name|
  @browser.button.click
end
 
Then /^I should see some results$/ do
  @browser.div(:id => "resultStats").wait_until_present
  @browser.div(:id => "resultStats").should exist 
  @browser.close
end

{%- endcodetabs %}
```

---
[*WATIR EXAMPLES*](https://watir.com/frameworks)
