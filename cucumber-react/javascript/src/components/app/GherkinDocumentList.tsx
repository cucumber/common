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
} from 'react-accessible-accordion'
import CucumberQueryContext from '../../CucumberQueryContext'
import CucumberQuery from 'cucumber-query'
import UriContext from '../../UriContext'

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
      <CucumberQueryContext.Provider value={cucumberQuery}>
        <Accordion allowMultipleExpanded={false} allowZeroExpanded={true}>
          {gherkinDocuments.map(gherkinDocument => {
            const testResults = cucumberQuery.getDocumentResults(
              gherkinDocument.uri
            )
            const status =
              testResults.length > 0
                ? testResults[0].status
                : messages.TestResult.Status.UNKNOWN

            return (
              <AccordionItem
                key={gherkinDocument.uri}
                uuid={gherkinDocument.uri}
              >
                <AccordionItemHeading>
                  <AccordionItemButton>
                    {gherkinDocument.uri}
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <UriContext.Provider value={gherkinDocument.uri}>
                    <GherkinDocument gherkinDocument={gherkinDocument} />
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
