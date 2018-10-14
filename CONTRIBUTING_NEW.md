## Release process

*Note:* When a module is released, artefacts will be published for *all* implementations
of the module, and all associated module repos will be tagged.

Triggering a release is simple:

    source scripts/functions.sh && release_module MODULE_NAME VERSION # Don't specify the v in the version

*IMPORTANT*: After running this command, bump the minor version and append `-SNAPSHOT` to any
affected `pom.xml` files.

This will update the various package descriptors (`pom.xml`, `package.json`, `*.gemspec`)
in the module directories. A git commit will be created with message "Release MODULE_NAME vVERSION". 
This commit is also tagged with `MODULE/vVERSION`. 

Behind the scenes - the following will occur:

- The release commit and tag is pushed, which will kick off the build of the monorepo.
- Each module repo is tagged with `vVERSION`.
- Each module repo will have a Travis build triggered.
- The module Travis builds will publish packages (maven, npm, rubygems etc).

### Caveats

After you push a tag, each module repo will start building in parallel. If a module
has a dependency on the go implementation (such as `gherkin`, `dots-formatter` and
`pretty-formatter`), the build will initially fail because it can only pass after 
the go executables have been uploaded to S3 and made available for download.

The go module will trigger a new build of dependent module repos after a successful
tagged build. This second time the builds should pass and successfully publish packages.

## Configuring a module dir for automated releases

Before a module can be released automatically, a few scripts and files must be 
modified/added and committed to the monorepo.

### Java (Maven)

*IMPORTANT*: Make sure you [escape](https://docs.travis-ci.com/user/encryption-keys/#Note-on-escaping-certain-symbols)
characters with `\` in the password/passphrase when running the commands below:

    export CI_SONATYPE_PASSWORD="..."
    export CI_GPG_PASSPHRASE="..."
    setup_travis_maven_deploy MODULE/java

### Ruby (Rubygems)

Cd into the module dir and run:

    # Find the AUTH_TOKEN at https://rubygems.org/profile/edit (cukebot login password in 1Password)
    travis encrypt "${AUTH_TOKEN}" --repo cucumber/gherkin-javascript --add deploy.api_key

For more details, follow the Travis [RubyGems Deployment](https://docs.travis-ci.com/user/deployment/rubygems/) guide.

### JavaScript (NPM)

Cd into the module dir and run:

    # Set AUTH_TOKEN to the value from 1Password
    travis encrypt "${AUTH_TOKEN}" --repo cucumber/gherkin-javascript --add deploy.api_key

For more details, follow the Travis [NPM Releasing](https://docs.travis-ci.com/user/deployment/npm/) guide.

### Go (modules)

Starting with Go 1.11, releasing a go module is simply a matter of pushing a git tag,
so there is nothing extra to set up. The tag is pushed by the `release_module` command.
