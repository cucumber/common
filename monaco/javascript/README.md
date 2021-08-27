# Cucumber Monaco

This library configures a [monaco editor](https://github.com/microsoft/monaco-editor) instance
to use [@cucumber/language-service](../../language-service/javascript).

This makes it possible to build a web based editor for Gherkin with code completion,
syntax highlighting and all the services offered by @cucumber/language-service.

## Example

To build the example, run the following:

```
pushd ../.. 
npm install
npm run build
popd

npm run build
```

This should create additional (.gitigored) files in `./example`. Now, start a static web server in that directory:

```
cd examples
npx node-static -p 8000
```

Open http://localhost:8000
