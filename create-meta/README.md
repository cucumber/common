# createMeta

Utility function for creating system-specific `Meta` messages.

## CI

The `ci` field of the `Meta` message contains values from environment variables
defined by the following supported CI and build servers:

* [Azure Pipelines](https://docs.microsoft.com/en-us/azure/devops/pipelines/build/variables?tabs=yaml&view=azure-devops#build-variables)
* [Bamboo](https://confluence.atlassian.com/bamboo/bamboo-variables-289277087.html)
* [Buddy](https://buddy.works/docs/pipelines/environment-variables#default-environment-variables)
* [Bitrise](https://devcenter.bitrise.io/builds/available-environment-variables/)
* [CircleCI](https://circleci.com/docs/2.0/env-vars/#built-in-environment-variables)
* [CodeFresh](https://codefresh.io/docs/docs/codefresh-yaml/variables/#system-provided-variables)
* [CodeShip](https://documentation.codeship.com/basic/builds-and-configuration/set-environment-variables/)
* [GitHub Actions](https://help.github.com/en/actions/configuring-and-managing-workflows/using-environment-variables)
* [GitLab](https://docs.gitlab.com/ee/ci/variables/predefined_variables.html)
* [GoCD](https://docs.gocd.org/current/faq/dev_use_current_revision_in_build.html)
* [Jenkins](https://www.jenkins.io/doc/book/pipeline/jenkinsfile/#using-environment-variables) and [Jenkins Git plugin](https://plugins.jenkins.io/git/#environment-variables)
* [Semaphore](https://docs.semaphoreci.com/ci-cd-environment/environment-variables/)
* [TeamCity](https://www.jetbrains.com/help/teamcity/predefined-build-parameters.html)
  * Also see [REST API](https://www.jetbrains.com/help/teamcity/rest-api.html#)
* [Travis CI](https://docs.travis-ci.com/user/environment-variables/#Default-Environment-Variables)
* [Wercker](https://devcenter.wercker.com/administration/environment-variables/available-env-vars/)

### Adding support for new CI servers

If you want to see support for a new CI server, please submit a pull request.

Here are the steps:

* Modify the top level `ciDict.json`, using environment variables to extract information.
* Add an approval test in `testdata/YourCi.txt` and `testdata/YourCi.txt.json`.
* Make copies of the modified files to all the implementations:

    # From a bash shell
    source ../scripts/functions.sh && rsync_files

Then build and run the tests:

    make clean && make

If all tests pass, commit your code and send us a pull request. Bonus points if you
also update `CHANGELOG.md` and `README.md`.

## CI definitions

The `ciDict.json` file contains definitions of various CI servers. Each property of a CI
server definition is an expression that evaluates a value from one or more environment variables.

The expression syntax for environment variables can use the form `${variable/pattern/replacement}`,
similar to [bash parameter substitution](https://tldp.org/LDP/abs/html/parameter-substitution.html),
but inspired from [sed's s command](https://www.gnu.org/software/sed/manual/html_node/The-_0022s_0022-Command.html) which provides support for capture group back-references in the replacement.
