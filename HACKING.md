# Hacking

This document describes the technical details of hacking on Cucumber.

## Installing build tools

Because of the polyglot nature of the Cucumber project, a lot of different tools
are required to build it. Here is how:

### OS X

    brew install go cmake maven gpg gpg-agent

## Monorepo

This git repository is a monorepo. It contains several libraries that Cucumber
is built on, in many programming languages. The goal is to migrate all of the
Cucumber codebase into this repository.

You can learn more about monorepos here:
* http://www.thedotpost.com/2016/05/fabien-potencier-monolithic-repositories-vs-many-repositories
* https://developer.atlassian.com/blog/2015/10/monorepos-in-git/
* http://danluu.com/monorepo/
* https://medium.com/@bebraw/the-case-for-monorepos-907c1361708a

### Adding a new subrepo

Occasionally, a sub directory is promoted to a separate subrepo. The process for doing this is:

#### Create a new directory in the monorepo

For example:

    mkdir -p tag-expressions/go

#### Add initial files

In the new directory, create the following files:

`.rsync`, with the following sample contents (adapt to the programming language):

    ../../LICENSE LICENSE
    ../../.templates/github/ .github/
    ../../.templates/go/.travis.yml .travis.yml

`README.md` with a build badge for the new subrepo. For example:

    # Tag Expressions for Go

    [![Build Status](https://travis-ci.org/cucumber/tag-expressions-go.svg?branch=master)](https://travis-ci.org/cucumber/tag-expressions-go)

    [The docs are here](http://docs.cucumber.io/tag-expressions/).

#### Sync files

    git add .
    source scripts/functions.sh && rsync_files
    git add .
    git commit -m "New project"

#### Create new subrepo.

Create a new, empty subrepo at GitHub.

Log into Travis and set up build for the new (empty) subrepo.

Initialise the subrepo, for example:
    
    echo "git@github.com:cucumber/tag-expressions-go.git" > tag-expressions/go/.subrepo

Push to the subrepo:

    push_subrepo tag-expressions/go

Wait for Travis to build.

Write some code in the monorepo, and push whenever you want to sync to the subrepo.

### Docker and CI

Our CI build uses Docker. We have our own docker images defined in `Dockerfile.*`
files. These need to be rebuilt and published manually whenever they change:

   source ./scripts/functions.sh
   # Standard image (for all builds except .NET)
   docker_build Dockerfile.cucumber-build
   docker_push Dockerfile.cucumber-build
   # .NET image (for .NET builds only)
   docker_build Dockerfile.cucumber-build-dotnet
   docker_push Dockerfile.cucumber-build-dotnet

The images are published [in the cucumber repository section at
Docker Hub](https://hub.docker.com/r/cucumber/).
