# cucumber-html-formatter

For general information, see the parent [README.md](../README.md)

## Hacking

While hacking on this module you may want to try it out manually. To be able to
do this without getting errors, first run:

    make clean && make && make npm-link-shared

This is to avoid errors from React as described in [facebook/react#13991](https://github.com/facebook/react/issues/13991).

After you have done that you should be able to generate HTML reports. For example,
to generate a report with random results for the `.feature` files used in gherkin's
test suite:

```
cd ../../gherkin
../fake-cucumber/javascript/bin/fake-cucumber \
  --results random \
  testdata/good/*.feature | \
  ../html-formatter/javascript/bin/cucumber-html-formatter.js > \
  gherkin.html
```
