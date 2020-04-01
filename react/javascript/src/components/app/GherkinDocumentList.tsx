import React from 'react'
import GherkinDocument from '../gherkin/GherkinDocument'
import { messages } from '@cucumber/messages'
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from 'react-accessible-accordion'
import UriContext from '../../UriContext'
import GherkinQueryContext from '../../GherkinQueryContext'
import CucumberQueryContext from '../../CucumberQueryContext'
import StatusIcon from '../gherkin/StatusIcon'

interface IProps {
  gherkinDocuments: messages.IGherkinDocument[]
}

const GherkinDocumentList: React.FunctionComponent<IProps> = ({
  gherkinDocuments = [],
}) => {
  const gherkinQuery = React.useContext(GherkinQueryContext)
  const cucumberQuery = React.useContext(CucumberQueryContext)

  const entries: Array<[
    string,
    messages.TestStepResult.Status
  ]> = gherkinDocuments.map(gherkinDocument => {
    const gherkinDocumentStatus = gherkinDocument.feature
      ? cucumberQuery.getWorstTestStepResult(
          cucumberQuery.getPickleTestStepResults(
            gherkinQuery.getPickleIds(gherkinDocument.uri)
          )
        ).status
      : messages.TestStepResult.Status.UNDEFINED
    return [gherkinDocument.uri, gherkinDocumentStatus]
  })
  const gherkinDocumentStatusByUri = new Map(entries)

  // Pre-expand any document that is *not* passed - assuming this is what people want to look at first
  const preExpanded = gherkinDocuments
    .filter(
      doc =>
        gherkinDocumentStatusByUri.get(doc.uri) !==
        messages.TestStepResult.Status.PASSED
    )
    .map(doc => doc.uri)
  return (
    <div className="gherkin-document-list">
      <Accordion
        allowMultipleExpanded={true}
        allowZeroExpanded={true}
        preExpanded={preExpanded}
      >
        {gherkinDocuments.map(doc => {
          const gherkinDocumentStatus = gherkinDocumentStatusByUri.get(doc.uri)

          return (
            <AccordionItem key={doc.uri} uuid={doc.uri}>
              <AccordionItemHeading>
                <AccordionItemButton>
                  <span className="text_status_icon_container">
                    <StatusIcon status={gherkinDocumentStatus} />
                  </span>
                  <span>{doc.uri}</span>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <UriContext.Provider value={doc.uri}>
                  <GherkinDocument gherkinDocument={doc} />
                </UriContext.Provider>
              </AccordionItemPanel>
            </AccordionItem>
          )
        })}
      </Accordion>
    </div>
  )
}

export default GherkinDocumentList
