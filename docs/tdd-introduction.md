

## Test Driven Development

Test-driven development (TDD) is a software development process that relies on the repetition of a very short development cycle: requirements are turned into very specific test cases, then the software is improved to pass the new tests. This is opposed to software development that allows software to be added that isn't proven to meet requirements. Begin by writing a very small test for code that does not yet exist. Run the test and, naturally, it fails. Now write just enough code to make that test pass. Once the test passes, observe the resulting design and re-factor to remove any duplication you see. It is natural at this point to judge the design as too simple to handle all of the responsibilities this code will have.

Test Driven Development is a developer practice that involves writing tests before writing the code being tested. Begin by writing a very small test for code that does not yet exist. Run the test and, naturally, it fails. Now write just enough code to make that test pass. No more. Once the test passes, observe the
resulting design and re-factor to remove any duplication you see. It is natural at this point to judge the design as too simple to handle all of the responsibilities this code will have.

As the code base gradually increases in size, more and more attention is consumed by the re-factoring step. The design is constantly evolving and under constant review, though it is not predetermined. This process is known as emergent design, and is one of the most significant by products of Test Driven Development. 

To get better understanding here we go life cycle of TDD

  * write a test
  * Run it ( No implementation code in place, Test need to fail)
  * write implemnetation code to make the test pass
  * Run it
  * Refactor the tset for better code quality
  
This procdure is called as **RED-GREEN-REFACTOR**

Final Note: TDD is aot about testing, It is the process of approach towards your design and force us to think about the implemantation before we code.

The main objective of this framework is code design with tests.




 