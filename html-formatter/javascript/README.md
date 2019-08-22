# cucumber-html-formatter

For general information, see the parent [README.md](../README.md)

## Hacking

While hacking on this module you may want to try it out manually. To be able to
do this without getting errors, first run:

    make clean && make && npm run npm-link-shared-react

This is to avoid errors from React as described in [facebook/react#13991](https://github.com/facebook/react/issues/13991).

After you have done that you should be able to generate HTML reports - for example:

```
../../fake-cucumber/javascript/bin/fake-cucumber \
../../cucumber-react/javascript/testdata/*.feature | \
./bin/cucumber-html-formatter.js > \
index.html
```
