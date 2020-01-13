# cucumber-html-formatter

For general information, see the parent [README.md](../README.md)

## Hacking

While hacking on this module you may want to try it out manually. For example,
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

## Docker image

The Docker image is automatically built on docker hub, but you can also build it locally:

```
source ../../scripts/functions.sh
docker_build Dockerfile
```
