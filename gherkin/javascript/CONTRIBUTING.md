Please read [CONTRIBUTING](https://github.com/cucumber/gherkin/blob/master/CONTRIBUTING.md) first.
You should clone the [cucumber/gherkin](https://github.com/cucumber/gherkin) repo if you want
to contribute.

## Run tests

### Using make

Just run `make` from this directory.

### Using npm

Just run `npm test` from this directory (you need to `npm install` first).

Keep in mind that this will only run unit tests. The acceptance tests are only
run when you build with `make`.

## Browser Build

    make dist/gherkin.js

## Make a release

    # Do not manually change the version in package.json - this
    # happens during npm version.
    npm outdated --depth 0 # See if you can upgrade anything
    npm version NEW_VERSION
    npm publish
    git push
    git push --tags
