## Making a release

Releases are automated. Simply push a git tag, and the build scripts will
publish releases to various package managers. For certain libraries, you may
have to restart the build if it fails (see below).

There are some constraints to be aware of:

* Each release will release *all* the implementations of a library.
* The git tag *MUST* be named `${library}/v${semver}`, for example `gherkin/v6.1.3`.

After you have pushed your tag with `git push --tags`, monotonic will push tags
to each subrepo (without the `${library}` prefix). For example, if you push the tag
`gherkin/v6.1.3` to the monorepo, the tag `v6.1.3` will be pushed to each of the
gherkin implementation subrepos.

The CI build for each subrepo will publish a package for tagged builds.

### Restarting builds

Some libraries (such as gherkin) are implemented in go. Some language implementations
depend on the go binaries to be built and published. A tagged build can fail if the
go binaries haven't yet been published. In this case, restarting the build after
the go package has been published should make the build pass (and publish the package).