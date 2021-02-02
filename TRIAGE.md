# Triage

This document describes how issues and pull requests (work items) are triaged across
the Cucumber GitHub organisation.

The purpose of a triage process is to make it easier for *regular* contributors
to decide what to work on next.

Triage should ideally happen whenever a new work item is submitted, but for practical
reasons the triage may happen at less frequent intervals (ideally at least a couple of
times a week).

The triage process consists of two activities:

* Labelling
* Pulling into Next

## Labelling

The first step of the triage process is to assign relevant labels to new issues and
pull requests. We maintain a [consistent set of labels](https://github.com/cucumber/cucumber/pull/1326)
across repositories to make this simpler.

## Pulling into Next

The [Cucumber Open](https://github.com/orgs/cucumber/projects/8) board contains all the
work items that have been *accepted* or are actively being worked on.

We aim to have about a dozen or so work items in the `Next` column at any given time
so that regular contributors have a bit of choice (but not too much choice) when they
pick up something new to work on.

### Pull priority

When pulling from `Next` to `In Progress` - pull the top work item if you can.
When pulling new work items into `Next` - put them at the bottom.

What gets pulled into `Next` is decided based on the following guidelines:

* The Next column should ideally have a mix of issues and pull requests
* A mix of `bug` and `enhancement` work items
* A mix of programming languages
* The oldest work items have the highest priority to be pulled into Next (FIFO policy)
  * If you think the oldest work items should not be worked on, consider labelling it accordingly,
    perhaps even close with a `wontfix`.

With this in mind, pull into `Next` from the following lists. They oldest issues are at the top,
and they contain both PRs and issues.

* [cucumber/cucumber](https://github.com/cucumber/cucumber/issues?q=is%3Aopen+sort%3Acreated-asc)
* [cucumber/cucumber-jvm](https://github.com/cucumber/cucumber-jvm/issues?q=is%3Aopen+sort%3Acreated-asc)
* [cucumber/cucumber-ruby](https://github.com/cucumber/cucumber-ruby/issues?q=is%3Aopen+sort%3Acreated-asc)
* [cucumber/cucumber-js](https://github.com/cucumber/cucumber-js/issues?q=is%3Aopen+sort%3Acreated-asc)
* [cucumber/godog](https://github.com/cucumber/godog/issues?q=is%3Aopen+sort%3Acreated-asc)
