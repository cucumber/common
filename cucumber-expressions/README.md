See [website docs](https://cucumber.io/docs/cucumber/cucumber-expressions/) for more details.


## Grammar ##

```
cucumber-expression :=  ( alternation | optional | parameter | text )*
alternation := (?<=boundary) + alternative* + ( '/' + alternative* )+ + (?=boundary) 
boundary := whitespace | ^ | $
alternative: = optional | parameter | text 
optional := '(' + option* + ')'
option := parameter | text
parameter := '{' + text* + '}'
text := token

token := '\' + whitespace | whitespace | '\(' | '(' | '\)' | ')' | '\{' | '{' | 
         '\}' | '}' | '\/' | '/' | '\\' | '\' | .
```

Note:
 * While `parameter` is allowed to appear as part of `alternative` and 
`option` in the AST, such an AST is not a valid a Cucumber Expression.
 * All escaped tokens (tokens starting with a backslash) are rewritten to their
   unescaped equivalent after parsing.

## Acknowledgements

The Cucumber Expression syntax is inspired by similar expression syntaxes in
other BDD tools, such as [Turnip](https://github.com/jnicklas/turnip), [Behat](https://github.com/Behat/Behat) and [Behave](https://github.com/behave/behave).

Big thanks to Jonas Nicklas, Konstantin Kudryashov and Jens Engel for
implementing those libraries.

