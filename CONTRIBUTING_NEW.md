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

You *must* be on the `master` branch when you make a release.

### Update dependencies

Before you make a release, you should update the module's dependencies to the latest
available versions:

    cd themodule
    make update-dependencies

This will typically modify the files where dependencies are declared, without
committing the changes to git. See what changed:
 
    git diff

After inspecting the diff, make sure the module still builds, and that the tests
are still passing:

    make

If all is good, commit the files and push.

    git add .
    git commit -m "Update dependencies"

Keep an eye on [CircleCI](https://circleci.com/gh/cucumber/workflows/cucumber/tree/master).
If all the jobs are green you can proceed to the next step, where we update the version
number:

### Update version number

