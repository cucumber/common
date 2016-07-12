
##Watir-Webdriver

Now let us see an example using WATIR-WEBDRIVER

Here is  a sample UI testing program using Watir
 {% codetabs name="Python", type="py" -%} 
{%- language name="Ruby", type="rb" -%}
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

Now let us incorporate Cucumber to this simple test

Feature: Search In order to use Google users must be able to search for content 
  Scenario: Search for a term
    Given I have entered "watir" into the query
    When I click "search"
    Then I should see some results


{%- language name="Ruby", type="rb" -%}
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

