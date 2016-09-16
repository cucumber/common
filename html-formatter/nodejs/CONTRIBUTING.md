# Cucumber HTML Formatter for Node.js

The Cucumber HTML Formatter consists of two main components:

* [Cucumber-React](../../cucumber-react/README.md)
* Command-line program (JavaScript / Node.js)

## Install dependencies

    # Link the local cucumber-react module
    cd ../../cucumber-react
    npm link
    cd ../cucumber-react/nodejs
    npm link cucumber-react

    # Install other modules
    npm install

## Build it

    npm run build

## Run tests

    npm test

## Try it

There are a few different ways to use the formatter, depending on how you want
to write events and capture output.

### Events to STDIN, HTML to STDOUT

    cat ../../event-protocol/examples/events.ndjson | bin/cucumber-html-formatter

This should print a HTML report to `STDOUT`. You probably want to direct it to a file, then
open it in a browser:

    cat ../../event-protocol/examples/events.ndjson | bin/cucumber-html-formatter > cucumber.html
    open cucumber.html

Or, you can pipe it straight to your browser if you `gem install bcat` first:

    cat ../../event-protocol/examples/events.ndjson | bin/cucumber-html-formatter | bcat

### Events via socket, HTML to browser

In the first shell:

    npm run build
    bin/cucumber-html-formatter

Now, open up a browser:

    open http://localhost:2222

And optionally, in a new shell:

    curl --header "Accept: text/event-stream" http://localhost:2222/sse

Write some events over the socket:

    cat ../../event-protocol/examples/events.ndjson | nc localhost 2223

You should see the browser update with HTML (and if you ran `curl` you should see events there too)
