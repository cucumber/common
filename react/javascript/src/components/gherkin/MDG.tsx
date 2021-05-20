import React from 'react'
import ReactMarkdown from 'react-markdown'
import rehypePlugins from '../app/rehypePlugins'
import GherkinQueryContext from '../../GherkinQueryContext'
import Step from './Step'
import styles from '../app/GherkinDocumentList.module.scss'
import dataTableStyles from './DataTable.module.scss'

type IProps = { uri: string; children: any }

const MDG: React.FunctionComponent<IProps> = ({ uri, children }) => {
  const gherkinQuery = React.useContext(GherkinQueryContext)

  return (
    <div className={styles.list}>
      <ReactMarkdown
        rehypePlugins={rehypePlugins}
        components={{
          table({ children }) {
            return <table className={dataTableStyles.table}>{children}</table>
          },
          ul({ children }) {
            return <ul className={'cucumber-steps'}>{children}</ul>
          },
          li({ node, children }) {
            const line = node.position.start.line
            const step = gherkinQuery.getStep(uri, line)
            if (!step) {
              // Non-Gherkin list item
              return <li>{children}</li>
            }
            return (
              <li>
                <Step step={step} renderStepMatchArguments={true} renderMessage={true} />
              </li>
            )
          },
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  )
}

export default MDG
