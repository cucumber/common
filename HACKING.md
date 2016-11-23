# Hacking

This document describes the technical details of hacking on Cucumber.

## Installing build tools

Because of the polyglot nature of the Cucumber project, a lot of different tools
are required to build it. Here is how:

### OS X

    brew install go cmake maven gpg

## Monorepo

This git repository is a monorepo. It contains several libraries that Cucumber
is built on, in many programming languages. The goal is to migrate all of the
Cucumber codebase into this repository.

You can learn more about monrepos here:
* http://www.thedotpost.com/2016/05/fabien-potencier-monolithic-repositories-vs-many-repositories
* https://developer.atlassian.com/blog/2015/10/monorepos-in-git/
* http://danluu.com/monorepo/
* https://medium.com/@bebraw/the-case-for-monorepos-907c1361708a

### Splitsh Lite

We're using a tool called [splitsh-lite](https://github.com/splitsh/lite) to push
the monorepo to the manyrepos. This is done by the CI server, but if you wish
to do it locally, here is how to install it:

First, make sure you have set [GOPATH](https://golang.org/doc/code.html#GOPATH).
Second, install it:

    ./scripts/install_splitsh-lite

Now you should have a new file called `bin/splitsh-lite`
