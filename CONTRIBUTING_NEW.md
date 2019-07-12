# Contributing to Cucumber

First off - thank you for contributing to Cucumber!

## Overview

This [monorepo](https://gomonorepo.org/) contains various components (libraries) 
used by Cucumber, such as:

* The Gherkin parser
* The Cucumber Expressions engine
* The Tag Expressions parser
* The Cucumber Protocol messages
* ...and a few more bits and bobs.

The Cucumber implementations themselves live in separate Git repositories:

* [cucumber-jvm](https://github.com/cucumber/cucumber-jvm)
* [cucumber-ruby](https://github.com/cucumber/cucumber-ruby)
* [cucumber-js](https://github.com/cucumber/cucumber-js)
* [SpecFlow](https://github.com/techtalk/SpecFlow)
* And various [other](https://cucumber.io/docs/installation/) implementations

The libraries in this monorepo are implemented in many different languages
(Java, TypeScript, Ruby, C# and a few more).

## Building

You have a few options for building this repo as outlined below.

### Building on Docker

You need a lot of various tools to build this repo, and to make this easy we have
created a [docker](https://www.docker.com/) image with all the required build tools 
installed. To use this you need Docker installed, and a bash shell on your host OS:

```
./scripts/docker-run Dockerfile
make clean
make
```

This will take a while the first time you run it, but subsequent calls to `make`
should be a lot faster because downloaded files will be cached, and `make` will
only rebuild modules that you have changed.

The git repo is mounted as a volume in the running Docker container, so you can 
edit files with your favourite IDE/editor on the host OS.

If you are only making changes to a particular module, you can build just that
module by changing into the relevant directory and running `make`.

### Building on MacOS/Linux

The benefit of building in Docker is that you don't need to install anything
(except for Docker). The downside is that the build is slower than running on
your host OS. Also, if you exit the container, the cached files downloaded
from the Internet will be lost if you exit the container and start a new one.

If you contribute regularly to Cucumber we recommend installing all the required
tools on your host OS. You can find a list of those tools by looking at `Dockerfile`.

### Building on CircleCI

Whenever you push code to this repo, or create a [pull request](https://help.github.com/en/articles/about-pull-requests), CircleCI will build your code.

CircleCI will build the modules in parallel, so a full build will complete a lot faster
than a local build. 

## Releasing a module

The release process is automated from the command line.

When a module is released, _all_ implementations of the module are released.
For example, when you release `cucumber-expressions`, it will release the Java, Ruby,
Go and JavaScript implementations of that library, with the same version number.

You *must* be on the `master` branch when you make a release. The steps below
outline the process:

* Decrypt credentials
* Update dependencies
* Update CHANGELOG
* Release packages

All the release command will be done from a shell session in the Docker container.

### Decrypt credentials

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

### Update dependencies

Before you make a release, you should update the module's dependencies to the latest
available versions:

    cd themodule
    make update-dependencies

This will typically modify the files where dependencies are declared, without
committing the changes to git. Examine what changed:
 
    git diff

Inspecting the diff, and undo any changes that you think shouldn't have been made.
Make sure the module still builds, and that the tests are still passing:

    make clean && make

If all is good, commit the files and push.

    git add .
    git commit -m "Update dependencies"
    git push

Keep an eye on [CircleCI](https://circleci.com/gh/cucumber/workflows/cucumber/tree/master).
If all the jobs are green you can proceed to the next step, where we trigger a
release for the new version number:

### Update CHANGELOG

### Release packages

Update the version numbers by running the following commands from the module directory
(e.g `/cucumber-expressions`):

    NEW_VERSION=1.2.3 make release

This will:
* Update the version number in all the implementations
* Commit the changed files
* Create a git tag

### Release packages

Triggering a release is a process with the following steps:

* Update the version number in the module descriptor files (`package.json`, `pom.xml` etc)
* Add and commit the modified files
* Tag the git repository
* Push
* Wait for CircleCI to halt for approval
* Manually approve the release of each module

We have a script that handles the first 4 steps.

    ./scripts/docker_run Dockerfile
    source scripts/functions.sh && release_module MODULE_NAME VERSION # Don't specify the v in the version

Head over to [CircleCI](https://circleci.com/gh/cucumber/workflows/cucumber/tree/master)
and open the currently running build. You should see extra jobs for making the release.

(This uses encrypted credentials in files. Those files are decrypted during `checkout`).
See the section on [security](#security)

### Update version and dependencies (again!)

Now that we have made a release, we must link the module dependencies to other
versions in this repo:

* Update the module version to the next `-SNAPSHOT` version (Java only)
* Update all dependencies internal to this repo to use `-SNAPSHOT` version (Java only)

## Security
 
Only a small handful of people should be allowed to make a release.

This means we need to guard access to the secret key required to decrypt
encrypted files.

This decryption key is passed to CircleCI as an environment variable.

When a publish job is awaiting approval, only members of the `release-manager`
group will be granted access to this approval.