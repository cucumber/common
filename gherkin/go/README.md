[![Build Status](https://secure.travis-ci.org/cucumber/gherkin-go.svg)](http://travis-ci.org/cucumber/gherkin-go)

Gherkin parser/compiler for Go. Please see [Gherkin](https://github.com/cucumber/gherkin) for details.

## Building

You need Go installed (obviously). You also need to make sure your `PATH`
points to where Go installs packages:

```bash
# Add go bin to path
export PATH=$(go env GOPATH)/bin:${PATH}
```

Now build it:

```
make
make cross-compile
```

You should have cross-compiled binaries in `./dist/`.
