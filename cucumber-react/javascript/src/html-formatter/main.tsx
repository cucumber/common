import all from '../../testdata/all.json'
import { messages } from 'cucumber-messages'
import App from '../components/app/App'
import { renderToNodeStream } from 'react-dom/server'
import React from 'react'
import makeGherkinDocumentsAndResultsLookup from '../components/app/makeGherkinDocumentsAndResultsLookup'

const { gherkinDocuments, resultsLookup } = makeGherkinDocumentsAndResultsLookup(all as messages.IEnvelope[])

const out = process.stdout

out.write(`<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Cucumber</title>
    <meta content="text/html;charset=utf-8" http-equiv="Content-Type">
  </head>
  <body>
    <div id="content">
`)
const stream = renderToNodeStream(<App gherkinDocuments={gherkinDocuments} resultsLookup={resultsLookup}/>)
stream.pipe(out, { end: false })
stream.on('end', () => {
  out.write(`
    </div>
    <script src="main.js"></script>
  </body>
</html>
`)
  out.end()
})
