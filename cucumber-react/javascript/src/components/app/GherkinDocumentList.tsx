import React from 'react'
import { ResultsLookup, StepMatchLookup } from '../../types'
import GherkinDocument from '../gherkin/GherkinDocument'
import { messages } from 'cucumber-messages'
import styled from 'styled-components'
import ResultsLookupContext from '../../ResultsLookupContext'
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from '../styled-react-accessible-accordion'
import ResultsLookupByLineContext from '../../ResultsLookupByLineContext'
import StepMatchLookupByLineContext from '../../StepMatchLookupByLineContext'
import R = require('ramda')

const Body = styled.div`
  font: 14px 'Open Sans', sans-serif;
  color: #212121;
  background: #fff;
  overflow-x: hidden;
`

interface IProps {
  gherkinDocuments: messages.IGherkinDocument[]
  resultsLookup: ResultsLookup
  stepMatchLookup: StepMatchLookup
}

const GherkinDocumentList: React.FunctionComponent<IProps> = ({
                                                         gherkinDocuments,
                                                         resultsLookup,
                                                         stepMatchLookup,
                                                       }) => {
  return (
    <Body>
      <link
        href="https://netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.css"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Open+Sans:300"
        rel="stylesheet"
      />
      <ResultsLookupContext.Provider value={resultsLookup}>
        <Accordion
          allowMultipleExpanded={false}
          allowZeroExpanded={true}
        >
          {gherkinDocuments.map(gherkinDocument => {
            const testResults = resultsLookup(gherkinDocument.uri, null)
            const status = testResults.length > 0 ? testResults[0].status : messages.TestResult.Status.UNKNOWN

            // TODO: Write our own curry and remove Ramda depencendy
            const resultsLookupByLine = R.curry(resultsLookup)(gherkinDocument.uri)
            const stepMatchLookupByLine = R.curry(stepMatchLookup)(gherkinDocument.uri)

            return (
              <AccordionItem
                key={gherkinDocument.uri}
                uuid={gherkinDocument.uri}
              >
                <AccordionItemHeading>
                  <AccordionItemButton status={status}>
                    {gherkinDocument.uri}
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <ResultsLookupByLineContext.Provider value={resultsLookupByLine}>
                    <StepMatchLookupByLineContext.Provider value={stepMatchLookupByLine}>
                      <GherkinDocument gherkinDocument={gherkinDocument}/>
                    </StepMatchLookupByLineContext.Provider>
                  </ResultsLookupByLineContext.Provider>
                </AccordionItemPanel>
              </AccordionItem>
            )
          })}
        </Accordion>
      </ResultsLookupContext.Provider>
    </Body>
  )
}

export default GherkinDocumentList
