See [website docs](https://cucumber.io/docs/cucumber/cucumber-expressions/) for more details.


## Grammar ##

```
cucumber-expression :=  ( alternation | optional | parameter | text )*
alternation := boundry + alternative* + ( '/' + alternative* )+ + boundry 
boundry := whitespace | ^ | $
alternative: = optional | parameter | text 
optional := '(' + option* + ')'
option := parameter | text
parameter := '{' + text* + '}'
text := .*
```

Note:
  * `boundry` is not consumed in parsing
  * While `parameter` is allowed to appear as part of `alternative` and 
`option` in the AST, such an AST is not a valid a Cucumber Expression.

## Acknowledgements

The Cucumber Expression syntax is inspired by similar expression syntaxes in
other BDD tools, such as [Turnip](https://github.com/jnicklas/turnip), [Behat](https://github.com/Behat/Behat) and [Behave](https://github.com/behave/behave).

Big thanks to Jonas Nicklas, Konstantin Kudryashov and Jens Engel for
implementing those libraries.

