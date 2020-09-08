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

Each top level directory is the name of a cucumber *package*, and each directory
underneath is an implementation *language* for that package.

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
created a [docker image](https://github.com/cucumber/cucumber-build) with all the required build tools
installed. To use this you need Docker installed, and a bash shell on your host OS:

```
make docker-run
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

Package names are the top level directory names, and language names are the
directory names underneath. For instance, `html-formatter` package has
implementations for `java`, `javascript`, and `ruby` languages.

Define `PACKAGES` and/or `LANGUAGES` to only build a subset of packages / languages.

To build `html-formatter` package for `javascript` language:

```
PACKAGES=html-formatter LANGUAGES=javascript make
```

To build `html-formatter` package for `javascript` and `ruby` languages:

```
PACKAGES=html-formatter LANGUAGES="javascript ruby" make
```

To build all packages for `javascript` language:

```
LANGUAGES=javascript make
```

To build `messages` and `gherkin` packages for all languages:

```
PACKAGES="messages gherkin" make
```

Packages have to be built in a particular order. This order is defined in
`Makefile`. If you set `PACKAGES` when running `make`, be careful at keeping
that order to prevent any build error.

### Using yarn instead of npm

If you prefer to use yarn instead of npm:

```
NPM=yarn LANGUAGES=javascript make
```

## Troubleshooting

### Errors during Node builds

You may encounter timeouts or errors when building some npm modules. If this happens,
try building the module with yarn (`NPM=yarn` - see above).

If you're still experiencing errors or timeouts, try replacing `file:../..` dependencies
in `package.json` with the latest release of the package. If you do, please do not
commit that change.
