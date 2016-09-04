# Gherkin

Gherkin is a structured format for executable specifications in plain text. Here is an example
that illustrate how a lift (elevator) controller should work:

```gherkin
Feature: Lift routing

  Example: One person requesting idle lift
    Given the lift is idle on floor 1
    When someone requests the lift on floor 5
    Then the lift should move to floor 5
```

Gherkin documents contain one or more `Example` sections.

Each `Example` is described in detail by a sequence of steps (the lines starting with `Given`, `When` and `Then`).

Together the steps form a *concrete example* of how the software *should behave* - and this is why the process is called *Behaviour-Driven Development*.

## The purpose of Gherkin

Gherkin has multiple purposes:

* Provide an unambiguous specification for developers
* Allow automated testing using Cucumber
* Document how the system *actually* behaves

INSERT VENN DIAGRAM HERE

### Executable Specifications

Teams produce examples that describe desired behaviour before the software is implemented.

Different roles on a software team (e.g. product owner, business analyst, UX designer, developer, tester) all have different perspectives on how the software should behave. For this reason it is *essential* that all of these roles have conversations to discover examples *together*.

[Example Mapping](#) and [Event Storming](#) are great collaborative analysis techniques for discovering examples.

After discovering examples as a team, developers and testers formalise those examples into Gherkin documents.

The whole team can then use the Gherkin documents as a shared source of truth of how the software is supposed to work.

This collaborative process exposes misunderstandings and assumptions before the software is written, which has profound impact on productivity.

### Automated Tests

### Living Documentation

## Steps {#steps}

It is designed to be easy for people to read and write, yet structured enough
for a tool like Cucumber to process.
