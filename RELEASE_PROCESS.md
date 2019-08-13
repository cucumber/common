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

All the release commands will be done from a shell session in the Docker container.

## Decrypt credentials

The credentials for the various package managers are stored in the `/secrets`
directory. They are encrypted with [git-crypt](https://www.agwa.name/projects/git-crypt/).

You need to decrypt these files with `git-crypt` before you can make a release.
Here is how you do it:

    ./scripts/docker-run Dockerfile
    # Find GIT_CRYPT_KEY_BASE64 in 1Password
    GIT_CRYPT_KEY_BASE64="..." source ./scripts/prepare_release_env.sh

The files under `/secrets` are now decrypted, and will be used later when we
publish packages.

*IMPORTANT:* You should also install `git-crypt` on your host OS, even if the
releases are made from the Docker container. If you don't, you'll get an error
when you run certain `git` commands on your host OS later.

## Update dependencies

Before you make a major release, you should consider updating the package's dependencies to the latest
available stable versions:

    cd thepackage
    make clean && make
    make update-dependencies

This will typically modify the files where dependencies are declared, *without*
committing the changes to git. Examine what changed:

    git diff

Inspecting the diff, and undo any changes that you think shouldn't have been made.
Make sure the package still builds, and that the tests are still passing:

    make clean && make

If all is good, commit the files.

    git add .
    git commit -m "Update dependencies"

## Update changelog

The `CHANGELOG.md` file in the package directory must be updated to reflect the
changes that are going into this release:

* Under `<!-- Releases -->` at the bottom:
  * Update the `Unreleased` link
  * Create a new link for the new release
* Change `[Unreleased]` to `[major.minor.patch] - YYYY-mm-dd`
* Remove any `###` headers without content
* `git add CHANGELOG.md`, but don't commit it (that will happen in the post release step).

## Release packages

Make sure you're in the package directory (e.g `/cucumber-expressions`).
Publish a release with the following command:

    NEW_VERSION=1.2.3 make release

This will:

* Update the version number in all the package descriptors
* Commit the changed files
* Publish all the packages
* Create a git tag

Check that releases show up under:

* `https://rubygems.org/gems/[package]/versions/[version]`
* `https://www.npmjs.com/package/[package]`
* `https://search.maven.org/search?q=a:[package]` (This will take a few hours to show up)
* `https://www.nuget.org/packages/[package]/[version]`

## Post release

Run the following command:

    make post-release

This should update the CHANGELOG to get placeholders for the Unreleased version 
and also the `java/pom.xml` file for the snapshot releases.

Exit your docker container. The final step should be done on your host OS.

Commit the changes and push everything:

    git commit -am "Post-release of [package] v[version]"
    git push && git push --tags
