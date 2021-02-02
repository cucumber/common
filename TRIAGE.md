# Triage

This document describes how issues and pull requests (work items) are triaged across
the Cucumber GitHub organisation.

The purpose of a triage process is to make it easier for regular contributors
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

What gets pulled into `Next` is decided based on the following guidelines:

* There should ideally be two Java, Ruby, JavaScript and Go work items in Next at all times
* The oldest work items have the highest priority to be pulled into Next (FIFO policy)
  * If you find an old work item you don't want to pull, label it accordingly
* Maintain ca 50/50 of issues and pull requests
