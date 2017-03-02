# Try Cucumber

A web page where people can try Cucumber in their browser.

## Try Try Cucumber

    npm install # or yarn
    open public/index.html (there is no server, all happens in browser)

It currently consists of 4 fields:

* Gherkin step
* Cucumber Expression
* Regular Expression (readonly, generated from the Cucumber Expression)
* Step definition (readonly, signature only)
  * Also displays arguments from matching Gherkin step against Cucumber Expression

## Ideas for improvement

* Multiline editor for both Gherkin and Stepdef
* Give the user a series of tasks to complete
* Use CodeMirror widgets to highlight args in step
* Use CodeMirror widgets to display args over stepdef params (requires a bit of js parsing)
* Custom theme based on brand colors: https://github.com/cucumber-ltd/brand
* Embed this in the website docs
* CodeMirror.defineMode that highlights arguments. This is better than widget because widgets
  can't set the text color (only background).
