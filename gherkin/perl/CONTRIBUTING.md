Please read [CONTRIBUTING](https://github.com/cucumber/gherkin/blob/master/CONTRIBUTING.md) first.
You should clone the [cucumber/gherkin](https://github.com/cucumber/gherkin) repo if you want
to contribute.

You will need `cpanm` installed on your system

## Run tests

### Using make

Just run `make` from this directory.

## Make a distribution

    # The version number comes from ./VERSION
    make distribution

## Distribute the release

    # Assuming you have a PAUSE (CPAN) account which is authorized to make
    # releases, and they're in a ~/.pause file, you can also upload your release
    # directly to CPAN with:
    make release

## Trial releases...

Trial releases on CPAN allow you to upload the module to CPAN marked as a
developer release. It'll get smoked on CPAN Testers, too, which is useful.
Note that `3.2.1_1` is a trial release for `3.2.1`, not `3.2.2`, so you might
upload: `3.2.1_1`, `3.2.1_2`, and then `3.2.1` when you're happy with it.

Simply add the `_1` or whatever to `./VERSION` temporarily before running the
commands above.
