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
  gherkinDocuments?: ReadonlyArray<messages.IGherkinDocument>
}

const GherkinDocumentList: React.FunctionComponent<IProps> = ({
  gherkinDocuments,
}) => {
  const gherkinQuery = React.useContext(GherkinQueryContext)
  const cucumberQuery = React.useContext(CucumberQueryContext)

  const gherkinDocs =
    gherkinDocuments === undefined
      ? gherkinQuery.getGherkinDocuments()
      : gherkinDocuments

  const entries: Array<
    [string, messages.TestStepFinished.TestStepResult.Status]
  > = gherkinDocs.map((gherkinDocument) => {
    const gherkinDocumentStatus = gherkinDocument.feature
      ? cucumberQuery.getWorstTestStepResult(
          cucumberQuery.getPickleTestStepResults(
            gherkinQuery.getPickleIds(gherkinDocument.uri)
          )
        ).status
      : messages.TestStepFinished.TestStepResult.Status.UNDEFINED
    return [gherkinDocument.uri, gherkinDocumentStatus]
  })
  const gherkinDocumentStatusByUri = new Map(entries)

  // Pre-expand any document that is *not* passed - assuming this is what people want to look at first
  const preExpanded = gherkinDocs
    .filter(
      (doc) =>
        gherkinDocumentStatusByUri.get(doc.uri) !==
        messages.TestStepFinished.TestStepResult.Status.PASSED
    )
    .map((doc) => doc.uri)
  return (
    <div className="gherkin-document-list">
      <Accordion
        allowMultipleExpanded={true}
        allowZeroExpanded={true}
        preExpanded={preExpanded}
      >
        {gherkinDocs.map((doc) => {
          const gherkinDocumentStatus = gherkinDocumentStatusByUri.get(doc.uri)

          return (
            <AccordionItem key={doc.uri} uuid={doc.uri}>
              <AccordionItemHeading>
                <AccordionItemButton>
                  <span className="cucumber-feature__icon">
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
