import React, { useContext } from 'react'
import GherkinDocument from '../gherkin/GherkinDocument'
import * as messages from '@cucumber/messages'
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
import {
  CustomRenderingContext,
  GherkinDocumentListProps,
  mixinStyles,
} from '../customise/CustomRendering'
import styles from './GherkinDocumentList.module.scss'
import { getWorstTestStepResult } from '@cucumber/messages'

const GherkinDocumentList: React.FunctionComponent<GherkinDocumentListProps> = ({
  gherkinDocuments,
}) => {
  const { GherkinDocumentList: Custom } = useContext(CustomRenderingContext)
  if (typeof Custom === 'function') {
    return <Custom gherkinDocuments={gherkinDocuments} />
  }
  const composedStyles = mixinStyles(styles, Custom)

  const gherkinQuery = React.useContext(GherkinQueryContext)
  const cucumberQuery = React.useContext(CucumberQueryContext)

  const gherkinDocs =
    gherkinDocuments === undefined ? gherkinQuery.getGherkinDocuments() : gherkinDocuments

  const entries: Array<[string, messages.TestStepResultStatus]> = gherkinDocs.map(
    (gherkinDocument) => {
      const gherkinDocumentStatus = gherkinDocument.feature
        ? getWorstTestStepResult(
            cucumberQuery.getPickleTestStepResults(gherkinQuery.getPickleIds(gherkinDocument.uri))
          ).status
        : messages.TestStepResultStatus.UNDEFINED
      return [gherkinDocument.uri, gherkinDocumentStatus]
    }
  )
  const gherkinDocumentStatusByUri = new Map(entries)

  // Pre-expand any document that is *not* passed - assuming this is what people want to look at first
  const preExpanded = gherkinDocs
    .filter((doc) => gherkinDocumentStatusByUri.get(doc.uri) !== 'PASSED')
    .map((doc) => doc.uri)

  return (
    <div className={composedStyles.list}>
      <Accordion
        allowMultipleExpanded={true}
        allowZeroExpanded={true}
        preExpanded={preExpanded}
        className={composedStyles.accordion}
      >
        {gherkinDocs.map((doc) => {
          const gherkinDocumentStatus = gherkinDocumentStatusByUri.get(doc.uri)

          return (
            <AccordionItem key={doc.uri} uuid={doc.uri} className={composedStyles.accordionItem}>
              <AccordionItemHeading>
                <AccordionItemButton className={composedStyles.accordionButton}>
                  <span className={composedStyles.icon}>
                    <StatusIcon status={gherkinDocumentStatus} />
                  </span>
                  <span>{doc.uri}</span>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel className={composedStyles.accordionPanel}>
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
