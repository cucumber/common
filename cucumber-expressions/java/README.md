[![Maven Central](https://img.shields.io/maven-central/v/io.cucumber/cucumber-expressions.svg?label=Maven%20Central)](https://search.maven.org/search?q=g:%22io.cucumber%22%20AND%20a:%22cucumber-expressions%22)

# Cucumber Expressions for Java

[The docs are here](https://cucumber.io/docs/cucumber/cucumber-expressions/).


## Grammar ##

```
cucumber-expression :=  [ optional | escaped-optional | other-then-optional ]*
optional := '(' + text + ')'
escaped-optional :=  '\(' + other-then-optional + ')'
other-then-optional: = [ alternative | escaped-alternative | other-then-alternative ]*
alternative := text + [  '/' + text ]+
escaped-alternative := other-then-alternative +[ '\/' + other-then-alternative ]+
other-then-alternative :=  [ parameter | escaped-parameter | other-then-parameter ]*
parameter := '{' + text + '}' 
escaped-parameter  := '\{' + other-then-parameter + '}'
other-then-parameter:= text
text := .*
```