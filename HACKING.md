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

### Docker and CI

Our CI build uses Docker. We have our own docker images defined in `Dockerfile.*`
files. These need to be rebuilt and published manually whenever they change:

   source ./scripts/functions.sh
   docker_build Dockerfile.cucumber-build
   docker_push

The images are published [here](https://hub.docker.com/r/cucumber/)
