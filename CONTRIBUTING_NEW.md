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
NO_CROSS_COMPILE=1 make
```

You can leave out `NO_CROSS_COMPILE=1` to cross-compile go executables, but this
will slow down your build.

The build will take a while the first time you run it, but subsequent calls to `make`
should be a lot faster because downloaded files will be cached, and `make` will
only rebuild packages that you have changed.

The git repo is mounted as a volume in the running Docker container, so you can
edit files with your favourite IDE/editor on the host OS.

If you are only making changes to a particular package, you can build just that
package by changing into the relevant directory and running `make`.

The benefit of building in Docker is that you don't need to install anything
(except for Docker). The downside is that the build is slower than running on
your host OS.

### Building on MacOS/Linux

If you contribute regularly to Cucumber we recommend installing all the required
tools on your host OS. You can find a list of those tools by looking at `Dockerfile`.

The build process is the same as within Docker, except that you run your commands
on the host OS.

```
make clean
make
```

### Building on CircleCI

Whenever you push code to this repo, or create a [pull request](https://help.github.com/en/articles/about-pull-requests), CircleCI will build your code.

CircleCI will build the packages in parallel, so a full build will complete a lot faster
than a local build.

### Building a subset

Define `PACKAGES` and/or `LANGUAGES` to only build a subset of packages / languages.

Examples:

```
LANGUAGES=javascript make
LANGUAGES="javascript ruby" make
PACKAGES="messages gherkin" make
```

## Encrypted secrets

Some files in the repo are encrypted [git-crypt](https://www.agwa.name/projects/git-crypt/).
Look inside `/.gitattributes` to find out which ones.

Releases can only be made when these files are decrypted. See
[RELEASE_PROCESS.md](./RELEASE_PROCESS.md) for details.
