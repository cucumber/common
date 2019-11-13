import React from 'react'
import GherkinDocument from '../gherkin/GherkinDocument'
import { messages } from 'cucumber-messages'
import styled from 'styled-components'
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from '../styled-react-accessible-accordion'
import CucumberQueryContext from '../../CucumberQueryContext';
import CucumberQuery from 'cucumber-query';
import UriContext from '../../UriContext';

const Body = styled.div`
  font: 14px 'Open Sans', sans-serif;
  color: #212121;
  background: #fff;
  overflow-x: hidden;
`

interface IProps {
  gherkinDocuments: messages.IGherkinDocument[]
  cucumberQuery: CucumberQuery
}

const GherkinDocumentList: React.FunctionComponent<IProps> = ({
                                                                gherkinDocuments,
                                                                cucumberQuery,
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
      <CucumberQueryContext.Provider value={cucumberQuery}>
        <Accordion
          allowMultipleExpanded={false}
          allowZeroExpanded={true}
        >
          {gherkinDocuments.map(gherkinDocument => {
            const testResults = cucumberQuery.getDocumentResults(gherkinDocument.uri)
            const status = testResults.length > 0 ? testResults[0].status : messages.TestResult.Status.UNKNOWN

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
                  <UriContext.Provider value={gherkinDocument.uri}>
                    <GherkinDocument gherkinDocument={gherkinDocument}/>
                  </UriContext.Provider>
                </AccordionItemPanel>
              </AccordionItem>
            )
          })}
        </Accordion>
      </CucumberQueryContext.Provider>
    </Body>
  )
}

export default GherkinDocumentList
