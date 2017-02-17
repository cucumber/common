# Release Process

The release process is supported by scripts and bash functions in the `scripts` directory.
To follow the instructions below you first have to load the bash scripts into your
current shell:

    source ./scripts/functions.sh

## Library groups

Some libraries are implemented in several programming languages.
Examples are _Gherkin_, _Cucumber Expressions_ and _Tag Expressions_.

In the instructions below, `group_path` refers to the main directory
containing several implementations, for example `gherkin`,
`cucumber-expressions` or `tag-expressions`.

If a library has multiple implementations, they should always be released at the
same time, even if only one of them has been modified. The reason for this is
that they all follow the same versioning scheme ([semver](http://semver.org/)).

## Releasing a library

First of all, make sure you have the right release karma:

    release_karma_all ${group_path}

If the library has a Java implementation, make sure the `pom.xml` version the version
you are about to release, with the `-SNAPSHOT` suffix. Add and commit.

Update `CHANGELOG.md` of the library in the following places:
* Change `Unreleased` to `[X.Y.Z] - yyyy-MM-DD`
* Add a new empty `Unreleased` section at the top of the page
* Update the `Unreleased` link at the bottom of the page
* Add a new `[X.Y.Z]` link at the bottom of the page

Make sure the main `cucumber/cucumber` repo has the most recent commits from
all of the subrepos:

    pull_subrepos ${group_path}

Make sure they all build successfully:

    build_subrepos ${group_path}

Make sure anything modified in the monorepo is pushed to subrepos:

    push_subrepos ${group_path}

Wait for the CI of each subrepo to build successfully.
Release all the subrepos in the group:

    release_subrepos ${group_path} ${version} ${next_version}

Alternatively, release each language independently:

    release_subrepo ${subrepo_path} ${version} ${next_version}

Pull back all the changes to the monorepo:

    pull_subrepos ${group_path}

Tag the monorepo:

    # group_name is typically the same as group_path, e.g. "cucumber-expressions"
    git tag "${group_name}-v${version}"
    git push --tags
