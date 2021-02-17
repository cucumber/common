# Triage

Target audience: Regular contributors to Cucumber Open.

This document describes how issues and pull requests (work items) are triaged across
the Cucumber GitHub organisation.

The purpose of a triage process is to make it easier for *regular* contributors
to decide what to work on next.

Triage should ideally happen whenever a new work item is submitted, but for practical
reasons the triage may happen at less frequent intervals (ideally at least a couple of
times a week).

## Daily routine

The first step of the triage process is to assign relevant labels to new issues and
pull requests. We maintain a [consistent set of labels](https://github.com/cucumber/cucumber/pull/1326)
across repositories to make this simpler.

Sometimes a bit of discussion in the ticket is needed before we can label them correctly.

* Coding :-)
* Label unlabelled issues:
  * Exactly one of the following:
    * :white_check_mark: `accepted` to indicate that we'd welcome a PR for this
    * :no_good: `wont fix` for issues we won't fix
      * Also close these issues
  * Optionally any of these:
    * :cucumber: `core team` these are issues that the core team will give priority to
    * :pray: `help wanted` for accepted issues, but not a priority to the core team
    * :dollar: `bounty` if we want to draw extra attention to an issue
    * :fire: `critical` for issues that make it onto the [Cucumber Open board]
  * And one of these:
    * :bug: `bug`
    * :zap: `enhancement`
* Reply to new issues
* Engage in Slack conversations
* Merge Renovate bot pull requests

## Weekly routine

* Community Zoom meetings
* Make Releases
* Adding new work items to the [Cucumber Open board]
  * Partly informed by the weekly Zoom call
  * Partly informed by the labels

### Pulling into Next

We aim to have about a dozen or so work items in the `Next` column at any given time
so that regular contributors have a bit of choice (but not too much choice) when they
pick up something new to work on.

### Pull priority

Pull requests and issues tagged with :fire: `critical` *always* have higher priority than regular issues.
In other words, the [Cucumber Open board] should *only* have pull requests and :fire: `critical` issues.

The reason for this is to build a culture that:
* nurtures new contributors
* places a higher value on "work done" (pull requests) than "work requested" (issues).

When pulling from `Next` to `In Progress` - pull the *top* work item if you can.
When adding new work items into `Next` - put them at the bottom.

What gets pulled into `Next` is decided based on the following guidelines:

* The `Next` column should ideally have a mix of pull requests and :fire: `critical` issues
* A mix of repositories:
  * [cucumber/cucumber](https://github.com/cucumber/cucumber/issues?q=is%3Aopen+sort%3Acreated-asc)
  * [cucumber/cucumber-jvm](https://github.com/cucumber/cucumber-jvm/issues?q=is%3Aopen+sort%3Acreated-asc)
  * [cucumber/cucumber-ruby](https://github.com/cucumber/cucumber-ruby/issues?q=is%3Aopen+sort%3Acreated-asc)
  * [cucumber/cucumber-js](https://github.com/cucumber/cucumber-js/issues?q=is%3Aopen+sort%3Acreated-asc)
  * [cucumber/docs.cucumber.io](https://github.com/cucumber/docs.cucumber.io/issues?q=is%3Aopen+sort%3Acreated-asc)
* The oldest work items have the highest priority to be pulled into Next (FIFO policy)

<!-- links -->
[Cucumber Open board]: https://github.com/orgs/cucumber/projects/8
