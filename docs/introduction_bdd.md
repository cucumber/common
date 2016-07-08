
## Behavior Driven Development(BDD):

     Behavior driven development (or BDD) is an agile software development technique that encourages collaboration between developers, QA and non-technical or business participants in a software project.

     BDD focuses on obtaining a clear understanding of desired software behavior through discussion with stakeholders. It extends TDD by writing test cases in a natural language that non-programmers can read. Behavior-driven developers use their native language in combination with the ubiquitous language of domain driven design to describe the purpose and benefit of their code.This allows the developers to focus on why the code should be created, rather than the technical details, and minimizes translation between the technical language in which the code is written and the domain language spoken by the business, users, stakeholders, project management, etc.
     
     Coming to reality Customer is a person who is an expert in dealing thw things other than Technology.They really need not to be aware of Edge case scenarios,beta testing and Alpha testing Etc..Etc... Even if the customer is found of Technology stack, the only this that is evolving in much fatser pace is business, which chnage at constant pace.
     
     In this modern Agile world, teams understand this and structure their approach to delivery with this in mind.  Rather than attempt to conceive, build, and deliver the perfect application in one fell swoop, they steadily deliver work in small, usable chunks, every few weeks.  The customer is encouraged to think in terms of what functionality will deliver the maximum benefit to the business and prioritize the pipeline of work accordingly.
     
   ![misconception between the team](images/problems.png)

     This is where BDD comes in.  It bakes quality into the process by smoothing communication between stakeholders.  Here is how we're practicing it on my current project:
     * The Business Analyst works with the Customer to determine what it is that the business is trying to accomplish.
     * The BA, QA, and Developer sit down and have a discussion. The QA focuses on flushing out the bounds of the system and edge cases.  The Dev focuses on implementation and brings up potential technical hurdles.  The Business Analyst answers questions, ensuring that the customer's high-level business needs are met.  This is the software equivalent of 'measure twice, cut once.'  Many times, poorly conceived requirements are eliminated before even reaching development.
   
    **"Behaviour-driven development is about implementing an application by describing its behaviour from the perspective of its stakeholders”** -- DAN North




# BDD with Cucumber:
     
     Cucumber is a command-line tool. When you run it, it reads in your specifications from plain-language text files called features, examines them for scenarios to test, and runs the scenarios against your system. Each scenario is a list of steps for Cucumber to work through. So that Cucumber can understand these feature files, they must follow some basic syntax rules. The name for this set of rules is Gherkin.
     
   ![Cucumber_role](images/cucumber_core.png)
   
    Along with the features, you give Cucumber a set of step definitions, which map the business-readable language of each step into Ruby code to carry out whatever action is being described by the step. In a mature test suite, the step definition itself will probably just be one or two lines of Ruby that delegate to a library of support code, specific to the domain of your application, that knows how to carry out common tasks on the system. Normally that will involve using an automation library, like the browser automation library Capybara, to interact with the system itself.
    

### Example
       What makes Cucumber stand out from the crowd of other testing tools is that it has been designed specifically to ensure the acceptance tests can easily be read—and written—by anyone on the team. This reveals the true value of acceptance tests: as a communication and collaboration tool. The easy readability of Cucumber tests draws business stakeholders into the process, helping you really explore and understand their requirements.
    Here’s an example of a Cucumber acceptance test:

    Feature: Sign up
    Sign up should be quick and friendly.
    Scenario: Successful sign up
    New users should get a confirmation email and be greeted
    personally by the site once signed in.
    **Given** I have chosen to sign up
    **When** I sign up with valid details
    **Then** I should receive a confirmation email
    **And** I should see a personalized greeting message
    
    **Scenario**: Duplicate email
    Where someone tries to create an account for an email address that already exists.
    **Given** I have chosen to sign up
    **But** I enter an email address that has already registered
    **Then ** I should be told that the email is already registered
    **And** I should be offered the option to recover my password
    
     Notice how the test is specified as examples of the way we want the system to behave in particular scenarios. Using examples like this has an unexpectedly powerful effect in enabling people to visualize the system before it has been built. Anyone on the team can read a test like this and tell you whether it reflects their understanding of what the system should do, and it may well spark their imagination into thinking of other scenarios that you’ll need to consider too. Many case studies of teams who have discovered this and used it to their advantage.
         In this way, we say that the story functions as a living document.  As the behavior of the system evolves over time, the team is forced to evolve the documentation in parallel.
            Acceptance tests written in this style become more than just tests; they are executable specifications.