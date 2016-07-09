Test Driven Development is a developer practice that

involves writing tests before writing the code being tested. Begin by writing a very small

test for code that does not yet exist. Run the test and, naturally, it fails. Now write just

enough code to make that test pass. No more. Once the test passes, observe the

resulting design and re-factor 2 to remove any duplication you see. It is natural at this

point to judge the design as too simple to handle all of the responsibilities this code will

As the code base gradually increases in size, more and

more attention is consumed by the refactoring step. The design is constantly evolving

and under constant review, though it is not pre-determined. This process is known as

emergent design, and is one of the most significant byproducts of Test Driven

Development. This is not a testing practice at all. Instead, the goal of TDD is to deliver

high quality code to testers, but it is the testers who are responsible for testing

And this is where the Test in TDD becomes a problem.

Specifically, it is the idea of Unit Testing that often leads new TDD’ers to verifying things

like making sure that a register( ) method stores a Registration in a Registry’s

registrations collection, and that collection is specifically an Array.