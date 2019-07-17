# Cucumber Design

This document describes the internal design of Cucumber v6. It is meant as
guide for contributors to all implementations of Cucumber.

## Overview

Cucumber consists of multiple components:

```
+------------------+                  +-------------+   
| Step Definitions |                  |    User     |   
|     & Hooks      |                  |  Interface  |   
+------------------+                  +-------------+   
          ^                                  ^          
          |                                  |          
   function calls                     function calls    
          |       +----------------+         |          
          |       |    Cucumber    |         |          
          +------>|   Front-End    |<--------+          
                  +----------------+                    
                           ^                            
                           | Cucumber Protocol          
                           v                            
 +---------------------------------------------------+  
 |                  Cucumber Engine                  |  
 |                                                   |  
 |  +-----------+ +-----------------+ +-----------+  |  
 |  |  Gherkin  | |    Cucumber     | |    Tag    |  |  
 |  |  Parser   | |   Expressions   | |Expressions|  |  
 |  +-----------+ +-----------------+ +-----------+  |  
 +---------------------------------------------------+  
                           |                            
                           | Cucumber Protocol          
                           v                            
                  +----------------+                    
                  |    Cucumber    |                    
                  |    Reporter    |                    
                  +----------------+                    
```

Step definitions and hooks use a programmatic API defined by the *Cucumber Front-End* component.
This component also provides a programmatic API for executing tests via a user interface 
(typically a command-line interface or an editor/IDE plugin). 

The Front-End communicates with the Engine via messages defined by the Cucumber Protocol - a set of predefined Protobuf messages.

The Engine communicates results to one or more reporters, also using Cucumber Protocol messages.

## Polyglot implementations

The *Cucumber Front-End* is the only component that *must* have an implementation native to
the target platform. This is because user code (step definition and hooks) need a native
API to interact with.

The official *Cucumber Engine* is written in Go, and can be used by any front-end as long
as it speaks the *Cucumber Protocol*. 

Some Cucumber implementations may choose to implement the engine (and even reporters) natively.
This allows all the components to run in the same process. It also allows installation and distribution
to be done as a single entity. This comes at a cost as there is more code to maintain.

Fully-native implementations should still expose the components via the 
Cucumber Protocol, even if the protocol is not used internally. This allows the implementation to
use the cross-platform compatibility test suite.

## Cucumber Engine

The *Cucumber Engine* component is responsible for orchestrating the execution of tests.
To do this it performs the following tasks:

- Use the *Gherkin Parser* component to convert Gherkin documents into *pickles*
- Select what pickles to run based on front-end-provided *tags* and *line number filters*
- Use the *Cucumber Expressions* component to parse Cucumber Expressions
  - 3rd party implementations may choose to only support *Regular Expressions* for simplicity
- Create executable *test cases* for each *pickle* by linking it to a step definition with a matching *Cucumber Expression* or *Regular Expression*
- Tell the *front-end* to execute step definitions and hooks
- Collect results from *front-end* and forward them to reporters

## Reporters

The *reporter* components are responsible for generating reports, using results forwarded
by the *Cucumber Engine* (and optionally Gherkin Document ASTs for advanced reports).

## Cucumber Protocol

The Cucumber Protocol is a platform- and transport-agnostic message protocol used by
the *Cucumber Front-End*, *Cucumber Engine* and *Cucumber Reporters*.

### Why a protocol?

The Cucumber Protocol allows components to be reused and shared across platforms and reduces the maintenance
overhead for the Cucumber team. Historically, the functionality of the *Cucumber Engine* and
the *Cucumber Reporters* have been ported to many platforms. This has led to infrequent release cycles,  maintenance costs and inconsistencies between implementations.

## Testing

We use three levels of testing, and different techniques for each.

### Acceptance tests

These tests assemble a full system, with front-end, engine and reporters. These
are approval tests. They could have been written with Gherkin embedded in Gherkin
(as Cucumber's own Cucumber scenarios). We have chosen a similar test, but with
context (input files) as separate files. The expected outcome (reporter output)
is also stored in a file with a similar name to the input file.

This still achieves the goals of BDD:
- Common understanding
- Readable executable specifications
- Living documentation
- Automated acceptance tests

### Protocol tests

These tests test a component in isolation. We could call them component tests.
These tests follow a simple pattern:
- One or more input messages.
- One or more expected output message.
- Send the input messages to the component via STDIN, socket or in-memory stream.
- Send a `Quit` message with reason `Reason.FINISH_PLEASE`.
- Wait for the connection to close.
- Compare the received messages with the expected ones.

These approval messages are stored in the `examples` directory as both `.json`
files and `.bin` files (in binary protobuf format). They are generated by `make`,
and their contents are derived from `Example:` annotations in the message and
field comments.

This also provides a form of living documentation. These `.json` messages are effectively
*examples* of a message type, and can be displayed next to the formal definition
of a message.

Some messages will be used as expected output messages for one component's tests, and
as input messages for another one's tests. This is a way to verify a *contract*
between two components, so we can think of them as a kind of *contract test*.

### Unit tests

These tests are internal to the component, and test smaller parts of the component, 
typically classes and functions. We prefer most of these tests to be TDD'ed, as we
rely on the *pressure* from the test to continuously improve the internal design through
refactoring.

### Summary

The acceptance tests and protocol tests are 