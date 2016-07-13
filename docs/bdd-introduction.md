
## Behavior Driven Development(BDD):

   Behavior driven development (or BDD) is an software development technique that encourages collaboration between developers, QA and non-technical or business participants in a software project.

   BDD focuses on obtaining a clear understanding of desired software behavior through discussion with stakeholders. It extends [TDD](docs/tdd-introduction) by writing test cases in a natural language that non-programmers can read. Behavior-driven developers use their native language in combination with the ubiquitous language of domain driven design to describe the purpose and benefit of their code. This allow the developers to focus on why the code should be created, rather than the technical details, and minimizes translation between the technical language in which the code is written and the domain language spoken by the business, users, stakeholders, project management, etc.
     
   Coming to reality, Customer is a person who is an expert in dealing the things other than Technology. They need not to be aware of Edge case scenarios,beta testing and Alpha testing and so on. Even if he(customer) is familiar of the Technology stack,the only thing that is evolving in much faster pace is business, which change at constant pace.
     
   In this modern Agile world, teams understand the business change and structure their approach according to the business needs.Rather than attempt to conceive, build, and deliver the perfect application in one fell swoop, they steadily deliver work in small and usable chunks for every week continously.  The customer is encouraged to think in terms of what functionality will be delivered at the maximum benefit to the business and prioritize the pipeline of work accordingly.
     
  ![misconception between the team](images/problems.png)

   This is where BDD comes in.  It bakes quality into the process by smoothing communication between stakeholders.  
  
  The BDD process looks like this:

  A Subject-Matter-Expert (typically a business user) works with a Business Analyst to identify a business requirement. 
  
  *This is expressed as a story using the following template:*

|As a Role
|-
|I request a Feature
|To gain a Benefit
|The speaker, who holds the Role, is the person who will gain the Benefit from the requested Feature.

This can also be paraphrased variously as ...

I want to achieve a specific Goal, and as a Role I should be able to accomplish this by performing Functionality.A Role invokes Feature to cause a Benefit[1]

Software teams work best when the developers and business stakeholders are communicating clearly with one another. A great way to do that is to ollaboratively specify the work that’s about to be done using automated acceptance tests.

When the acceptance tests are written as examples, they stimulate people’s imaginations and help them see other scenarios they hadn’t previously considered.

When the team write their acceptance tests collaboratively, they can develop their own ubiquitous language for talking about their problem domain.This helps them avoid misunderstandings.[2]
   
   
   **"Behavior-driven development is about implementing an application by describing its behavior from the perspective of its stakeholders”** -- Dan North

---

[1] *BDD PROCESS*

[2] *THE CUCUMBER BOOK*