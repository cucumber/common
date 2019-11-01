See [website docs](https://cucumber.io/docs/cucumber/cucumber-expressions/) for more details.


## Grammar ##

```
cucumber-expression :=  ( optional | other-then-optional )*
other-then-optional: =  ( alternation | parameter | text )*
optional := '(' + optional-text + ')'
optional-text :=  [^ ')' ]
alternation := alternative-text* + ( '/' + alternative-text* )+
alternative-text: = [^ whitespace ]
parameter := '{' + parameter-text* + '}'
parameter-text := [^ '}' ]
text := .*
```

## Acknowledgements

The Cucumber Expression syntax is inspired by similar expression syntaxes in
other BDD tools, such as [Turnip](https://github.com/jnicklas/turnip), [Behat](https://github.com/Behat/Behat) and [Behave](https://github.com/behave/behave).

Big thanks to Jonas Nicklas, Konstantin Kudryashov and Jens Engel for
implementing those libraries.

