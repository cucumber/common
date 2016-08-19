# Cucumber HTML Formatter

## Trying it out

### Writing events to STDIN

    cat example.txt | bin/cucumber-html-formatter

This should print a HTML report to `STDOUT`. You probably want to direct it to a file, then
open it in a browser:

    cat example.txt | bin/cucumber-html-formatter > cucumber.html
    open cucumber.html

### Writing events over a socket

In the first shell:

    bin/cucumber-html-formatter

In the 2nd shell:

    curl --header "Accept: text/event-stream" http://localhost:2222/sse

In the 3rd shell:

    cat example.txt | nc localhost 2223
    
