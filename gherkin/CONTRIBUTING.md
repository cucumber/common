# Contributing to Gherkin

Gherkin is implemented in several different languages. Each implementation is
in a separate sub directory in this repository.

A copy of each implementation also exists in a separate git repository,
under `https://github.com/cucumber/gherkin-DIRNAME`.

The code in each of those git repositories can be built and used independently.
This is useful for people who only want to *use* Gherkin without *contributing*
to Gherkin.

Gherkin *contributors* should clone *this* repository. This will automatically get
you a copy of the files in the various `gherkin-*` repositories.

When you're done, just create a pull request against *this* repository.

## Gherkin team

Before you do anything, make sure you set up remotes for the subtrees:

    make add-remotes

When you have made a change (or merged a PR from a contributor) you can sync them
to the individual `gherkin-*` repos:

    make push-subtrees

Or if someone has made changes to a `gherkin-*` repo independently:

    make pull-subtrees

This should only be done on rare occasions - it's always better to make changes against
this *master* repo.

### Troubleshooting

Occasionally, `make push-subtrees` might fail if you have merged changes from a subtree.
In that case, you can force push a particular subtree. Example:

    git push gherkin-python `git subtree split --prefix=python master`:master --force

See [SO](http://stackoverflow.com/questions/13756055/git-subtree-subtree-up-to-date-but-cant-push) for details.

## Building

Prerequisites:

* .NET or Mono (needed to run `berp` to generate parsers)
* .NET Core 1.0.1
* JDK
  * Maven
* Node.js or IO.js
* Ruby
* Python (both python2 & python3)
* Go
* `make`
* `jq` (>= 1.4 for `--sort-keys` option)
* `diff`
* `git`

With all this installed, just run `make` from the root directory.

Notes:
* Mono might complain about NuGet.CommandLine authentication or decryption failing, you can type
```
mozroots --import --sync
```
to import Mozilla certificates & solve the problem
* on Ubuntu you need to create a symbolic link from `/usr/bin/nodejs` to `/usr/bin/node`

## Contributing changes

* Create a feature branch for your change.
* Don't lump unrelated changes together.
* If you change code, please make sure all implementations are changed accordingly.
  * If you don't to do this, we might reject your patch because the burden to keep parsers in sync is now on us.

## Adding or updating an i18n language

1) Edit `gherkin-langauges.json`.

2) Distribute the changes to the different parser implementations, this requires `make`, `jq`, `diff`, but no compiler/interpreters:

```
make update-gherkin-languages
```

3) Make a pull request with the changed files.

## Building individual parsers

It's possible to build the parser for a single language too. Please refer to
`CONTRIBUTING.md` files in each language directory for details.

## Running tests

Each sub project has its own unit tests that are run during the build of that project.

In addition to these tests, `make` will run acceptance tests that verify the output of:

* the scanner
* the parser
* the compiler (WIP)

This is done by consuming the `*.feature` files under `/testdata` and comparing the actual
output with expected output (`*.feature.tokens` and `*.feature.ast.json` files) using `diff`.

`make` will remove the generated file unless it is identical to the expected file so that
it will try to regenerate it the next time you run `make`.

When all files are identical and successfully compared, `make` will create the `.compared`
file, indicating that the acceptance tests passed.

## Consistency between implementations

TL;DR anyone who only knows one of the supported programming languages should be
able to fix a bug or add a feature in all the other implementations. -Simply by
finding their way around a consistently organised codebase.

As of May 2016 Gherkin is implemented in 8 languages. This number is likely to
increase to a dozen within a year or two. Very few programmers are intimate with
all those languages. Therefore, in order to make it as easy as possible to refactor,
fix bugs, add features and release packages it is essential that all implementations
have a similar structure.

For example, I (Aslak) don't currently know go at all, and very little Python.
Still, I have been able to fix bugs and refactor the go and python code simply
because I know where to find stuff since all implementations follow the same structure.

If one implementation looks completely different, this becomes a huge burden that
will slow everything down.

So for this reason, please don't start a new implementation that doesn't use Berp,
or add a feature in one implementation without also doing it in all the other
implementations. Don't refactor the code to follow some nice design pattern if
it makes the code so different from the other implementations that it can no longer
be maintained by someone who doesn't know the language.

## Implementing a parser for a new language

First off, fork the repository and create a branch for the new language.

Create a new directory for the new language and copy the `Makefile` from one
of the existing implementations. Now, modify the parts of the `Makefile` that
generates the `Parser.x` file, referring to the `gherkin-x.razor` file you're
about to create.

When you run `make` it should complain that `gherkin-x.razor` does not exist.

Now, copy a `.razor` file from one of the other implementations.

Your `.built` target should compile your code (if necessary) and run unit tests.
You won't need a lot of unit tests (the cross-platform acceptance tests are pretty
good), but writing a few during development might help you progress.

You'll spend quite a bit of time fiddling with the `.razor` template to make it
generate code that is syntactically correct.

When you get to that stage, `make` will run the acceptance tests, which iterate
over all the `.feature` files under `/testdata`, passes them through your
`bin/gherkin-generate-tokens` and `bin/gherkin-generate-ast` command-line programs,
and compares the output using `diff`.

You'll start out with lots of errors, and now you just code until all acceptance tests
pass!

Then send us a pull-request :-)

And if you're stuck - please shoot an email to the *cukes-devs* Google Group
or find us on [Gitter](https://gitter.im/cucumber/gherkin).

## Make a release

Start by modifying the version in all sub projects:

    echo "X.Y.Z" > VERSION
    make update-version
    git commit -m "Update VERSION to X.Y.Z"

Releases are made from the various subtrees. Before you release, update the subtrees:

    make push-subtrees

Next, clone each individual subtree repo (or `git pull -r origin master` if you've already done so)
in your working copy of each subtree, then follow the release guidelines
for each component in the respective `CONTRIBUTING.md` file.

When all components are released, update the master repo:

    make pull-subtrees

This might cause some trivial merge conflicts. If that happens, resolve them manually,
commit and pull subtrees again.

Now, update `CHANGELOG.md` with the new release number and date, while keeping
a section for the upcoming changes. Also update the links at the bottom of the file.

Then finally create a tag in this master repo and push.

    git commit -m "Release X.Y.Z"
    git tag -a -m "Version X.Y.Z" vX.Y.Z
    git push
    git push --tags
    make push-subtrees

The last step might cause some conflicts. If that happens, force push the failing
subtree (see Troubleshooting section) and run `make push-subtrees` again.

## Verify all of Cucumber's i18n examples

If you have [cucumber-ruby](https://github.com/cucumber/cucumber-ruby) cloned
next to the gherkin directory, try processing all of the files.

With just the scanner:

    [LANGUAGE]/bin/gherkin-generate-tokens `find ../cucumber-ruby/examples -name "*.feature"`

With the parser:

    [LANGUAGE]/bin/gherkin-generate-ast `find ../cucumber-ruby/examples -name "*.feature"`

## Adding new good testdata

1) Add a `.feature` file to `testdata/good`

2) Generate the tokens:

    # For example
    cd [LANGUAGE]
    bin/gherkin-generate-tokens \
    ../testdata/good/new_file.feature > \
    ../testdata/good/new_file.feature.tokens

3) Inspect the generated `.feature.tokens` file manually to see if it's good.

4) Generate the ast:
    cd [LANGUAGE]
    bin/gherkin --no-source --no-pickles \
    ../testdata/good/new_file.feature | \
    jq --sort-keys --compact-output "." > \
    ../testdata/good/new_file.feature.ast.ndjson

5) Inspect the generated `.feature.ast.ndjson` file manually to see if it's good.

6) Generate the pickles:

    cd [LANGUAGE]
    bin/gherkin --no-source --no-ast \
    ../testdata/good/new_file.feature | \
    jq --sort-keys --compact-output "." > \
    ../testdata/good/new_file.feature.pickles.ndjson

7) Inspect the generated `.feature.pickles.json` file manually to see if it's good.

8) Run `make` from the root directory to verify that all parsers parse it ok.
