import React from 'react'
import ReactMarkdown from 'react-markdown'
import rehypePlugins from '../app/rehypePlugins'
import GherkinQueryContext from '../../GherkinQueryContext'
import Step from './Step'
import dataTableStyles from './DataTable.module.scss'
import Title, { Header } from './Title'
import Keyword from './Keyword'
import HighLight from '../app/HighLight'

interface IProps {
  uri: string
  children: any
}

const MDG: React.FunctionComponent<IProps> = ({ uri, children }) => {
  const gherkinQuery = React.useContext(GherkinQueryContext)

  let hasExamples = false

  function header(line: number, level: number, children: any) {
    const scenario = gherkinQuery.getScenario(uri, line)
    hasExamples = scenario && scenario.examples.length > 0
    const titleAstNode =
      scenario ||
      gherkinQuery.getBackground(uri, line) ||
      gherkinQuery.getRule(uri, line) ||
      gherkinQuery.getExamples(uri, line)
    if (titleAstNode) {
      const header = `h${level}` as Header
      return (
        <Title header={header} id={titleAstNode.id}>
          <Keyword>{titleAstNode.keyword}:</Keyword>
          <HighLight text={titleAstNode.name} />
        </Title>
      )
    }
    return <h3>{children}</h3>
  }

  return (
    <div className="cucumber">
      <ReactMarkdown
        rehypePlugins={rehypePlugins}
        components={{
          h1({ node, level, children }) {
            return header(node.position.start.line, level, children)
          },
          h2({ node, level, children }) {
            return header(node.position.start.line, level, children)
          },
          h3({ node, level, children }) {
            return header(node.position.start.line, level, children)
          },
          h4({ node, level, children }) {
            return header(node.position.start.line, level, children)
          },
          h5({ node, level, children }) {
            return header(node.position.start.line, level, children)
          },
          table({ children }) {
            return <table className={dataTableStyles.table}>{children}</table>
          },
          ul({ node, children }) {
            const line = node.position.start.line
            const step = gherkinQuery.getStep(uri, line)
            if (!step) {
              // Non-Gherkin list
              return <ul>{children}</ul>
            }
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
                <Step step={step} hasExamples={hasExamples} />
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
