#Cucumber:
     
   Cucumber is a [command-line tool](https://en.wikipedia.org/wiki/Command-line_interface). When you run it, it reads in your specifications from plain-language text files called features, examines them for scenarios to test, and runs the scenarios against your system. Each scenario is a list of steps for Cucumber to work through. So that Cucumber can understand these feature files, they must follow some basic syntax rules. The name for this set of rules is [Gherkin](docs/gherkin.md).
     
Along with the features, you give Cucumber a set of step definitions, which map the business-readable language of each step into programming code to carry out
whatever action is being described by the step. In a mature test suite, the step definition itself will probably just be one or two lines of code that delegate to a library of support code, specific to the domain of your application, that knows how to carry out common tasks on the system. Normally that will involve using an automation library, like the browser automation library Capybara, to interact with the system itself.
    
##BDD with Cucumber:
What makes Cucumber to stand out from the crowd of other communication and collaboration tools is that it has been designed specifically to ensure the acceptance tests can easily be read and written by anyone on the team. This reveals the true value of acceptance tests: as a communication and collaboration tool. The easy readability of Cucumber tests draws business stakeholders into the process, helping you really explore and understand their requirements.
   
   Here is an example of a Cucumber acceptance test:
 
 ```gherkin 
Feature: Sign up Sign up should be quick and friendly**

Scenario: Successful sign up.  New users should get a confirmation email and greeted personally by the site once signed in.

Given I have chosen to sign up
When I sign up with valid details
Then I should receive a confirmation email
And I should see a personalized greeting message
```

```gherkin
Scenario: Duplicate email. Where someone tries to create an account for an email address that already exists.

Given I have chosen to sign up
But I specify an email address that has already registered
Then I should be told that the email is already registered
And I should be offered the option to recover my password

 ```
Notice how these tests are specified as examples of the way we want the system to behave in particular scenarios. Using examples like this has an unexpectedly powerful effect in enabling people to visualize the system before it has been built. Anyone from the team can go through the Feature file an can understand what is the system for, And how it works(functionality).This helps in analyzing the functionality of the system and come up with more scenarios where the system/software can be tested thoroughly
      
In this way, we say that the story functions as a living document.  As the behavior of the system evolves over time, the team is forced to evolve the documentation in parallel.
   
  Acceptance tests written in this style become more than just tests,they are executable specifications along with [living documentation](docs/living-documentation).
  