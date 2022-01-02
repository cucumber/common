import React from 'react'
import { GherkinDocument } from '../gherkin/GherkinDocument'
import { StatusIcon } from '../gherkin/StatusIcon'
import { MDG } from '../gherkin/MDG'
import * as messages from '@cucumber/messages'
import { getWorstTestStepResult } from '@cucumber/messages'
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
import styles from './GherkinDocumentList.module.scss'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface IProps {
  gherkinDocuments?: readonly messages.GherkinDocument[]
  // Set to true if non-PASSED documents should be pre-expanded
  preExpand?: boolean
}

export const GherkinDocumentList: React.FunctionComponent<IProps> = ({
  gherkinDocuments,
  preExpand,
}) => {
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
  const preExpanded = preExpand
    ? gherkinDocs
        .filter(
          (doc) => gherkinDocumentStatusByUri.get(doc.uri) !== messages.TestStepResultStatus.PASSED
        )
        .map((doc) => doc.uri)
    : []

  return (
    <Accordion
      allowMultipleExpanded={true}
      allowZeroExpanded={true}
      preExpanded={preExpanded}
      className={styles.accordion}
    >
      {gherkinDocs.map((doc) => {
        const gherkinDocumentStatus = gherkinDocumentStatusByUri.get(doc.uri)
        const source = gherkinQuery.getSource(doc.uri)

        return (
          <AccordionItem key={doc.uri} className={styles.accordionItem}>
            <AccordionItemHeading>
              <AccordionItemButton className={styles.accordionButton}>
                <FontAwesomeIcon
                  className={styles.accordionChevron}
                  aria-hidden="true"
                  icon={faChevronRight}
                />
                <span className={styles.icon}>
                  <StatusIcon status={gherkinDocumentStatus} />
                </span>
                <span>{doc.uri}</span>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel className={styles.accordionPanel}>
              <UriContext.Provider value={doc.uri}>
                {source.mediaType === messages.SourceMediaType.TEXT_X_CUCUMBER_GHERKIN_PLAIN ? (
                  <GherkinDocument gherkinDocument={doc} source={source} />
                ) : (
                  <MDG uri={doc.uri}>{source.data}</MDG>
                )}
              </UriContext.Provider>
            </AccordionItemPanel>
          </AccordionItem>
        )
      })}
    </Accordion>
  )
}
