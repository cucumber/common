# Techniques

## Analysis

### Example Mapping

#### The Three Amigos {#three-amigos}

The Three Amigos is a meeting that takes user stories and turns them into clean,
thorough scenarios for Gherkin. It involves three voices (at least):

+ **The product owner** - This person is most concerned with the scope of the
  application. This involves translating user stories into a series of features.
  As the tester comes up with edge cases, the product owner is responsible for
  deciding what is within scope.
+ **The tester** - This person will be generating lots of Scenarios, and lots
  of edge cases. How will the application break? What user stories have we not
  accounted for within these features?
+ **The developer** - This person will add many of the steps to the Scenarios,
  and think of the details that go into each requirement. How will this
  application execute? What are some of the roadblocks or requirements behind 
  the scenes?

These conversations can produce great tests because each amigo is able to see
the product from a different angle. If the tests are being developed before the
application is built, these conversations will also be clarifying for all
parties going forward and help to develop a shared (ubiquitous) language for
the product.

Finally, there is no reason to limit these meetings to three people, or to only
hold one at the beginning of the project. Continually refine your features and
collaborate with everyone to best understand how to talk about, develop, and
test your application.
