## Release process

Releases are made by tagging the monorepo with a tag using the pattern
`module/semver`, for example `gherkin/v7.4.8`. The CI build takes care of the rest:

- Tag each module repo with the `semver` part of the monorepo.
- Trigger a travis build for each module repo.
- Publish packages (maven, npm, rubygems etc) if the (tagged) build is successful.

## Releasing a module

*Note:* When a module is releases, artefacts will be published for all implementations
of the module, and all associated module repos will be tagged.

Triggering a release is simple:

    # For example
    release_module gherkin 7.4.8 # Don't specify the v in the version

This will update the various package descriptors (`pom.xml`, `package.json`, `*.gemspec`)
in the module implementations. A git commit will be created with message "Release gherkin v7.4.8". 
This commit is also tagged with `gherkin/v7.4.8`. Everything is pushed, which will kick 
off the release process above.

### Rebuilding tagged builds

After you push a tag, each module repo will start building in parallel. If a module
has a dependency on the go implementation (such as `gherkin`, `dots-formatter` and
`pretty-formatter`), you should *cancel* the build and wait for the go implementation's
build to complete. When it has completed, rerun the cancelled build.

The reason for this is that the dependent build can only pass after the go executables
are published and available for download.

We might automate this process at some stage, but for now this is manual.

## Configuring a module dir for automated releases

Before a module can be released automatically, a few scripts and files must be 
modified/added and committed to the monorepo.

### Set up GPG signing keys

We aim to sign all published packages. Currently this is only done for Maven
packages.

The GPG key in use is for the `cukebot@cucumber.io` machine user, which has id `E60E1F911B996560FFB135DAF4CABFB5B89B8BE6`. You have to install this key.
You'll find it in 1Password under *devs@cucumber.io sub signing key*. (TODO: check
if this is correct).

    brew install gpg gpg-agent
    travis login --github-token # 1Password: Travis API Token (cukebot)
    gpg --import private-key.asc

Add signing keys to the module dir:

    source scripts/functions.sh && setup_gpg gherkin/javascript

This will add the encrypted signing key and configure Travis to decrypt it during
a module build.

### Package repository security credentials

Security credentials for the various package repositories must be encrypted
in each `.travis.yml` file. How to do this is slightly different depending
on the platform. This is described in details below.

#### Java (Maven)

A lot of GPG stuff needs to be added to `pom.xml`. See one of the existing projects,
such as `gherkin/java/pom.xml`.

#### Ruby (Rubygems)

Follow the Travis [RubyGems Deployment](https://docs.travis-ci.com/user/deployment/rubygems/) guide.

#### JavaScript (NPM)

Follow the Travis [NPM Releasing](https://docs.travis-ci.com/user/deployment/npm/) guide.

#### Go (modules)

Starting with Go 1.11, releasing a go module is simply a matter of pushing a git tag,
so there is nothing extra to set up. The tag is pushed by the `release_module` command.
