# Cucumber HTML Formatter

This is a cross-platform formatter that produces a HTML report for Cucumber runs.
It is built on top of [cucumber-react](../cucumber-react/javascript) and works with *any* 
Cucumber implementation with a `protobuf` formatter that outputs [cucumber messages](../cucumber-messages).

# Installation

    npm install -g cucumber-html-formatter
    
# Usage
    
    cat messages.bin | cucumber-html-formatter > index.html

Or, if you have some feature files and just want to try it out with some fake results:

    # As of 23 Aug 2019 none of the Cucumber implementations can output
    # cucumber messages. Until they do you can use fake-cucumber instead,
    # which will generate fake results for your Gherkin documents (.feature files)
    npm install -g fake-cucumber
    fake-cucumber features/*.feature | cucumber-html-formatter > index.html
