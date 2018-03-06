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

You can learn more about monrepos here:
* http://www.thedotpost.com/2016/05/fabien-potencier-monolithic-repositories-vs-many-repositories
* https://developer.atlassian.com/blog/2015/10/monorepos-in-git/
* http://danluu.com/monorepo/
* https://medium.com/@bebraw/the-case-for-monorepos-907c1361708a

### Adding a new subrepo

Occasionally, a sub directory is promoted to a separate subrepo. The process for doing this is:

Create a new, empty subrepo at GitHub.
    
Initialise the subrepo, for example:

    git subrepo init tag-expressions/go --remote https://github.com/cucumber/tag-expressions-go.git

Create an .rsync file, for example:

    ../../LICENSE LICENSE
    ../../.travis/go/.travis.yml .travis.yml

Update README.md with a build badge for the new subrepo.

Sync files:

    source scripts/functions.sh && rsync_files

Push to the subrepo:

    git subrepo push tag-expressions/go

Log into Travis and set up build for the new subrepo

### Docker and CI

Our CI build uses Docker. We have our own docker images defined in `Dockerfile.*`
files. These need to be rebuilt and published manually whenever they change:

   source ./scripts/functions.sh
   # Standard image (for all builds except .NET)
   docker_build Dockerfile.cucumber-build
   docker_push Dockerfile.cucumber-build
   # .NET image (for .NET builds only)
   docker_build Dockerfile.cucumber-build
   docker_push Dockerfile.cucumber-build

The images are published [here](https://hub.docker.com/r/cucumber/)
