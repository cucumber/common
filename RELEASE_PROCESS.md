# Release process

The release process is automated from the command line.

When a package is released, _all_ implementations of the package are released.
For example, when you release `cucumber-expressions`, it will release the Java, Ruby,
Go and JavaScript implementations of that library, with the same version number.

You *must* be on the `main` branch when you make a release. The steps below
outline the process:

* Start the docker container with secrets
* Update dependencies
* Update changelog
* Release packages

The release commands will be done from a terminal session in the Docker container.
This ensures a consistent release environment.

## Get the secrets

In order to publish packages several secrets are required. Members of the core
team can install keybase and join the `cucumberbdd` team to access these secrets.

## Start the Cucumber docker container

All commands should be made from the Cucumber docker container. Start it:

    make docker-run-with-secrets

You're now ready to make a release.

## Update changelog

Open `CHANGELOG.md` and remove any `###` headers without content. Do not commit.

No further edits should be made. The markdown headers and links will be updated
automatically in the next step.

## Decide what the next version should be

This depends on what's changed (see `CHANGELOG.md`):

* Bump `MAJOR` if:
  * There are `Changed` or `Removed` entries
  * A cucumber library dependency upgrade was major
* Bump `MINOR` if:
  * There are `Added` entries
* Bump `PATCH` if:
  * There are `Fixed` or `Deprecated` entries

## Prepare the release

    npm run clean
    cd thepackage
    make clean

Run the `pre-release` target:

    NEW_VERSION=X.Y.Z make pre-release

This will update the package version in the package descriptors and `CHANGELOG.md`.
It will also update dependencies and verify that the build passes.

The changes made *will not* be committed to git. Examine what changed:

    git diff

Inspect the diff. If all is good, proceed to the next step to release.

Otherwise, undo any changes that you think shouldn't have been made and make the necessary edits until the build passes. Make sure the package still builds, and that the tests are still passing:

    make clean && make

## Release packages

Make sure you're in the package directory (e.g `/cucumber-expressions`).
Publish a release with the following command:

    NEW_VERSION=X.Y.Z make release

This will:

* Commit all the changed files
* Create a git tag
* Publish all the packages

Check that releases show up under:

* `https://rubygems.org/gems/[package]/versions/[version]`
* `https://www.npmjs.com/package/[package]`
* `https://search.maven.org/search?q=a:[package]` (This will take a few hours to show up)
* `https://www.nuget.org/packages/[package]/[version]`
* `https://cloud.docker.com/u/cucumber/repository/list` (If the package has a Dockerfile)

## Post release

Run the following command (using the same NEW_VERSION as you used for the release):

    NEW_VERSION=X.Y.Z make post-release

This should update the version in `java/pom.xml` file to use a `-SNAPSHOT` suffix and add
`replace` directives in the `go.mod` file.
This is automatically committed, and pushed along with the tag of the release.

For the time being you have to do the same for Java (`pom.xml`) manually.
