## Release process

*Note:* When a module is released, artifacts will be published for *all* implementations
of the module, and all associated module repos will be tagged.

Checklist:

* Maven `pom.xml` should *not* have any `-SNAPSHOT` dependencies
* Maven `pom.xml` version field should not contain `-SNAPSHOT`

Triggering a release is simple:

    source scripts/functions.sh && release_module MODULE_NAME VERSION # Don't specify the v in the version

Triggering a release will update the various package descriptors (`pom.xml`, `package.json`, `*.gemspec`)
in the module directories. A git commit will be created with message "Release MODULE_NAME vVERSION". 
This commit is also tagged with `MODULE/vVERSION`. 

Behind the scenes - the following will occur:

- The release commit and tag is pushed, which will kick off the build of the monorepo.
- The monorepo build tags each relevant module repo with `vVERSION`.
- Each module repo will have a tagged Travis build triggered.
- The module repo's Travis builds will publish packages (maven, npm, rubygems etc).

### Post-release process

After triggering a release, bump the minor version and append `-SNAPSHOT` to any
affected `pom.xml` files, then commit with message "Post-release: Bump to SNAPSHOT version".

When the release is completed (check RubyGems, NPM and Maven Central), update any dependent
modules to depend on the version you just released.

### Caveats

After you push a tag, each module repo will start building in parallel. If a module
has a dependency on the go implementation (such as `gherkin`, `dots-formatter` and
`pretty-formatter`), the build will initially fail because it can only pass after 
the go executables have been uploaded to S3 and made available for download.

To work around this limitation,
the go module build will trigger a new build of dependent module repos after a successful
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
    travis encrypt "${AUTH_TOKEN}" --repo cucumber/gherkin-ruby --add deploy.api_key

For more details, follow the Travis [RubyGems Deployment](https://docs.travis-ci.com/user/deployment/rubygems/) guide.

### JavaScript (NPM)

Cd into the module dir and run:

    # Set AUTH_TOKEN to the value from 1Password
    travis encrypt "${AUTH_TOKEN}" --repo cucumber/gherkin-javascript --add deploy.api_key

For more details, follow the Travis [NPM Releasing](https://docs.travis-ci.com/user/deployment/npm/) guide.

### Go (modules)

Starting with Go 1.11, releasing a go module is simply a matter of pushing a git tag,
so there is nothing extra to set up. The tag is pushed by the `release_module` command.

#### executables

Cd into the module dir.

Copy `gherkin/go/.travis.yml` and change the following:

* Change `upload-dir`
* Change `after_deploy` entries. See the Caveats section above for details
* Remove all the properties that have `secure:` values (encrypted values)

Add encrypted values:

    # Find "cukebot personal github token for releases" in 1Password
    travis encrypt "..." --add deploy[0].api_key --repo cucumber/dots-formatter-go
    # Ok, that deploy[0] ends up in the wrong place - move it to the right place.

    # Find TRAVIS_API_TOKEN in 1Password
    travis encrypt TRAVIS_API_TOKEN=... --add env.global --repo cucumber/dots-formatter-go
