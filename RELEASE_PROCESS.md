# Release Process

The release process is supported by scripts and bash functions in the `scripts` directory.
To follow the instructions below you first have to load the bash scripts into your
current shell:

    source ./scripts/functions.sh

## Library groups

Some libraries are implemented in several programming languages.
These libraries are called _library groups_. Examples are
_Gherkin_, _Cucumber Expressions_ and _Tag Expressions_.

In the instructions below, `group_path` refers to the main directory of a
library group, for example `gherkin`, `cucumber-expressions` or `tag-expressions`.

All implementations of a library groups should be released at the same time.
The reason for this is that they all follow the same versioning scheme
([semver](http://semver.org/)).

### Preparing the release

Make sure the main `cucumber/cucumber` repo has the most recent commits from
all of the subrepos:

    pull_subrepos ${group_path}

Make sure they all build successfully:

    build_subrepos ${group_path}

Update the version you're about to release. Pay special attention to messages
printed in blue - you might need to take some manual steps:

    group_update_version ${group_path} ${version}

Commit and push all subrepos

    git commit -am "${group_path}: Release ${version}"
    push_subrepos
    git push

Release all the subrepos in the group

    git clean -dffx
    # TODO: finish implementing this
    group_release "${group_path}""
