# createMeta

Utility function for creating system-specific `Meta` messages.

## CI

The `ci` field of the `Meta` message contains values from environment variables
defined by the most popular CI and build servers:

* [Azure Pipelines](https://docs.microsoft.com/en-us/azure/devops/pipelines/build/variables?tabs=yaml&view=azure-devops#build-variables)
* [Bamboo](https://confluence.atlassian.com/bamboo/bamboo-variables-289277087.html)
* [Buddy](https://buddy.works/docs/pipelines/environment-variables#default-environment-variables)
* [CircleCI](https://circleci.com/docs/2.0/env-vars/#built-in-environment-variables)
* [CodeFresh](https://codefresh.io/docs/docs/codefresh-yaml/variables/#system-provided-variables)
* [CodeShip](https://documentation.codeship.com/basic/builds-and-configuration/set-environment-variables/)
* [GitHub Actions](https://help.github.com/en/actions/configuring-and-managing-workflows/using-environment-variables)
* [GitLab](https://docs.gitlab.com/ee/ci/variables/predefined_variables.html)
* [GoCD](https://docs.gocd.org/current/faq/dev_use_current_revision_in_build.html)
* [TeamCity](https://www.jetbrains.com/help/teamcity/predefined-build-parameters.html)
  * Also see [REST API](https://www.jetbrains.com/help/teamcity/rest-api.html#)
* [Travis CI](https://docs.travis-ci.com/user/environment-variables/#Default-Environment-Variables)
* [Wercker](https://devcenter.wercker.com/administration/environment-variables/available-env-vars/)

## CI definitions

The `ciDict.json` file contains definitions of various CI servers. Each CI server
provides a template for calculating a value from one or more environment variables.

The template has a simple syntax that supports the following:

* string interpolation with environment variables
* defaults for variables that are not defined
* extract branch or tag from refs - some CI servers do not provide these directly

Examples:

* `"revision": "${GITHUB_SHA}"` - substitutes with the value of the environment variable
* `"remote": "${_GITHUB_BASEURL | https://github.com/}${GITHUB_REPOSITORY}.git"` - an example of defining a default value
* `"branch": "${refbranch GITHUB_REF}"` - the `reftag` and `refbranch` prefixes extract tag or branch name from a git ref like `refs/heads/main`.
