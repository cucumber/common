import { messages } from 'cucumber-messages'
import React from 'react'
import styled from 'styled-components'
import statusColor from '../gherkin/statusColor'
import ResultsLookupContext from '../../ResultsLookupContext'
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from '../styled-react-accessible-accordion'

interface IGherkinDocumentItemDivProps {
  selected: boolean
  status: messages.TestResult.Status
}

const GherkinDocumentItemDiv = styled.div`
  color: ${(props: IGherkinDocumentItemDivProps) =>
  props.selected ? 'blue' : 'inherit'};
  background-color: ${(props: IGherkinDocumentItemDivProps) => statusColor(props.status)};
  padding: 8px 12px;
  cursor: pointer;
  :hover {
    color: blue;
  }
`

interface IGherkinDocumentItemProps {
  uri: string
}

const GherkinDocumentItem: React.FunctionComponent<IGherkinDocumentItemProps> = ({ uri, children }) => {
  const resultsLookup = React.useContext(ResultsLookupContext)
  const testResults = resultsLookup(uri, null)
  const status = testResults.length > 0 ? testResults[0].status : messages.TestResult.Status.UNKNOWN
  return (
    <GherkinDocumentItemDiv selected={false} status={status}>
      {children}
    </GherkinDocumentItemDiv>
  )
}

interface IGherkinDocumentNavProps {
  gherkinDocuments: messages.IGherkinDocument[]
  selectedUri: string,
  onSelection: (uri: string) => void
}

const GherkinDocumentSideNav: React.FunctionComponent<IGherkinDocumentNavProps> = ({ gherkinDocuments, selectedUri, onSelection }) => {
  return (
    <Accordion
      allowMultipleExpanded={false}
      allowZeroExpanded={false}
      preExpanded={[selectedUri]}
      onChange={(args: string[]): void => onSelection(args[0])}
    >
      {gherkinDocuments.map(gherkinDocument => (
        <AccordionItem
          key={gherkinDocument.uri}
          uuid={gherkinDocument.uri}
        >
          <AccordionItemHeading>
            <AccordionItemButton>
              <GherkinDocumentItem uri={gherkinDocument.uri}>
                {gherkinDocument.uri}
              </GherkinDocumentItem>
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <p>
              Bla
            </p>
          </AccordionItemPanel>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export default GherkinDocumentSideNav
