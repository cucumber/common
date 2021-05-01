# Cucumber Standalone JSON Formatter

Newer versions of Cucumber have deprecated the built-in JSON formatters in favour of [cucumber messages](../messages).

The purpose of the *Standalone JSON Formatter* is to provide backwards compatibility for tools that consume the legacy
Cucumber JSON format after native JSON formatters have been removed from Cucumber.

## Installation

The Standalone JSON Formatter is a prebuilt executable. (It's written in Go).
It can be downloaded from [GitHub Releases](https://github.com/cucumber/cucumber/releases/tag/cucumber-json-formatter%2Fv7.0.1)
where you'll find executables for various operating systems and CPU architectures.

### MacOS

* Download `cucumber-json-formatter-darwin-amd64` and rename it to `cucumber-json-formatter`
* Move it to a directory that's on your `PATH`
* Make it executable with `chmod +x cucumber-json-formatter`
* Verify that you can run it: `cucumber-json-formatter --help`

At the last step, you may get a security warning from MacOS. If you do, open *System Preferences*. Go to
*Security Settings*. You should see a question asking if you want to open it anyway. Say yes.  

### Windows

* Download `cucumber-json-formatter-windows-amd64.exe` and rename it to `cucumber-json-formatter`
* Move it to a directory that's on your `PATH`
* Verify that you can run it: `cucumber-json-formatter --help`

### Linux

* Download `cucumber-json-formatter-linux-amd64` (or one of the other CPU variants) and rename it to `cucumber-json-formatter`
* Move it to a directory that's on your `PATH`
* Make it executable with `chmod +x cucumber-json-formatter`
* Verify that you can run it: `cucumber-json-formatter --help`

## Usage

First, generate Cucumber messages using Cucumber's built-in `message` formatter and make sure it's saved to a file
(e.g. `cucumber-messages.ndjson`).

Next, generate JSON:

    cat cucumber-messages.ndjson | cucumber-json-formatter --format ndjson > cucumber-results.json

That's it. If you are the maintainer of a tool that consumes the legacy Cucumber JSON format you should consider
updating your tool to consume Cucumber Messages instead.
