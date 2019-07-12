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
    export GIT_CRYPT_KEY_BASE64="..." # Find it in 1Password
    echo "$GIT_CRYPT_KEY_BASE64" | base64 -d > ~/git-crypt.key
    git-crypt unlock ~/git-crypt.key

The files under `/secrets` are now decrypted, and will be used later when we
publish packages.

*IMPORTANT:* You should also install `git-crypt` on your host OS, even if the
releases are made from the Docker container. If you don't, you'll get an error
when you run certain `git` commands on your host OS later.

## Update dependencies

Before you make a release, you should update the package's dependencies to the latest
available versions:

    cd thepackage
    make update-dependencies

This will typically modify the files where dependencies are declared, *without*
committing the changes to git. Examine what changed:
 
    git diff

Inspecting the diff, and undo any changes that you think shouldn't have been made.
Make sure the package still builds, and that the tests are still passing:

    make clean && make

If all is good, commit the files and push.

    git add .
    git commit -m "Update dependencies"
    git push

Keep an eye on [CircleCI](https://circleci.com/gh/cucumber/workflows/cucumber/tree/master).
If all the jobs are green you can proceed to the next step, where we update the changelog.

## Update changelog

The `CHANGELOG.md` file in the package directory must be updated to reflect the
changes that went into this release:

* Under `<!-- Releases -->` at the bottom:
  * Update the `Unreleased` link
  * Create a new link for the new release
* Change `[Unreleased]` to `[major.minor.patch] - YYYY-mm-dd`
* Remove any `###` headers without content
* Add an empty `[Unreleased]` section at the top with:
  ```
  ## [Unreleased]

  ### Added

  ### Changed

  ### Deprecated

  ### Removed

  ### Fixed
  ```

## Release packages

Make sure you're in the package directory (e.g `/cucumber-expressions`).
Publish a release with the following command:

    NEW_VERSION=1.2.3 make release

This will:

* Update the version number in all the package descriptors
* Commit the changed files
* Publish all the packages
* Create a git tag
* Push changes to GitHub

Check that releases show up under:

* `https://rubygems.org/gems/[package]/versions/[version]`
* `https://www.npmjs.com/package/[package]`
* `https://search.maven.org/search?q=a:[package]` (This will take a few hours to show up)
* `https://www.nuget.org/packages/[package]/[version]`

