

## Test Driven Development

    Test-driven development (TDD) is a software development process that relies on the repetition of a very short development cycle. Requirements are turned into very specific test cases, then the software is improved to pass the new tests. This is opposed to software development that allows software to be added that isn't proven to meet requirements. Begin by writing a very small test for code that does not yet exist. Run the test and, naturally, it fails. Now write just enough code to make that test pass. Once the test passes, observe the resulting design and re-factor to remove any duplication you see. It is natural at this point to judge the design as too simple to handle all of the responsibilities this code will have.

  As the code base gradually increases in size, more and more attention is consumed by the re-factoring step. The design is constantly evolving and under constant review, though it is not predetermined. This process is known as emergent design, and is one of the most significant by-products of Test Driven Development. 

To get better understanding here we go life cycle of TDD

  * Write a test
  * Run it ( No implementation code in place, Test needs to fail)
  * Write implemnetation code to make the test pass
  * Run it
  * Refactor the test for better code quality
  
This procdure is called **RED-GREEN-REFACTOR**

Final Note: TDD is not only about testing; it is the process of approaching your design and forcing you to think about the desired outcome and API before you code.

