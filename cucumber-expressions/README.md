See [website docs](https://cucumber.io/docs/cucumber/cucumber-expressions/) for more details.


## Grammar ##

```
cucumber-expression :=  [ optional | escaped-optional | other-then-optional ]*
optional := '(' + text + ')'
escaped-optional :=  '\(' + other-then-optional + ')'
other-then-optional: = [ alternative | escaped-alternative | other-then-alternative ]*
alternative := text + [ '/' + text ]+
escaped-alternative := other-then-alternative +[ '\/' + other-then-alternative ]+
other-then-alternative :=  [ parameter | escaped-parameter | other-then-parameter ]*
parameter := '{' + text + '}' 
escaped-parameter  := '\{' + other-then-parameter + '}'
other-then-parameter:= text
text := .*
```

## Acknowledgements

The Cucumber Expression syntax is inspired by similar expression syntaxes in
other BDD tools, such as [Turnip](https://github.com/jnicklas/turnip), [Behat](https://github.com/Behat/Behat) and [Behave](https://github.com/behave/behave).

Big thanks to Jonas Nicklas, Konstantin Kudryashov and Jens Engel for
implementing those libraries.

