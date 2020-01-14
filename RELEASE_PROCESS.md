# Release process

The release process is automated from the command line.

When a package is released, _all_ implementations of the package are released.
For example, when you release `cucumber-expressions`, it will release the Java, Ruby,
Go and JavaScript implementations of that library, with the same version number.

You *must* be on the `master` branch when you make a release. The steps below
outline the process:

* Decrypt credentials
* Update dependencies
* Update changelog
* Release packages

The release commands will be done from a shell session in the Docker container.
This ensures a consistent release environment.
## Decrypt credentials

The credentials for the various package managers are stored in the `/secrets`
directory. They are encrypted with [git-crypt](https://www.agwa.name/projects/git-crypt/).

You need to decrypt these files with `git-crypt` before you can make a release.
Here is how you do it:

    ./scripts/docker-run Dockerfile
    # Find GIT_CRYPT_KEY_BASE64 in Keybase
    # Sign up for a free 1Password account and ping someone in the Slack #committers channel
    # to request access.
    GIT_CRYPT_KEY_BASE64="..." source ./scripts/prepare_release_env.sh

The files under `/secrets` are now decrypted, and will be used later when we
publish packages.

*IMPORTANT:* You should also install `git-crypt` on your host OS, even if the
releases are made from the Docker container. If you don't, you'll get an error
when you run certain `git` commands on your host OS later.

## Update changelog

Open `CHANGELOG.md` and remove any `###` headers without content. Do not commit.

No further edits should be made. The markdown headers and links will be updated
automatically in the next step.

## Prepare the release

Before you make a major release, you should consider updating the package's dependencies to the latest
available stable versions.

    cd thepackage

Run the `pre-release` target:

    NEW_VERSION=X.Y.Z make pre-release

This will update the package version in the package descriptor and `CHANGELOG.md`.
It will also update dependencies and verify that the build passes.

The changes made *will not* be committed to git. Examine what changed:

    git diff

Inspect the diff, and undo any changes that you think shouldn't have been made.
Make sure the package still builds, and that the tests are still passing:

    make clean && make

If all is good, commit the files.

    git add .
    git commit -m "Pre-release"

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
the `replace`directives in the `go.mod`file.
This is automatically committed, and pushed along with the tag of the release.

It's also a good practice to update all the dependencies in the monorepo, especially
when the module you just released is a dependency of other modules:

    # Run this in the root directory:
    make update-dependencies

If you did a new major release of a Go package, you can also update all the references in the
libraries using it:

    # Run this in the root directory
    source scripts/functions.sh && update_go_library_version libraryName X.Y.Z
