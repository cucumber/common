import React, { ElementType, createElement } from 'react'
import { messages } from '@cucumber/messages'
import GherkinQueryContext from '../../GherkinQueryContext'
import CucumberQueryContext from '../../CucumberQueryContext'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'

// @ts-ignore
import htmlParser from 'react-markdown/plugins/html-parser'
import StatusIcon from '../gherkin/StatusIcon'
import StepLine from '../gherkin/StepLine'

const parseHtml = htmlParser()

interface IProps {
  sources?: readonly messages.ISource[]
}

const MarkdownDocumentList: React.FunctionComponent<IProps> = ({ sources }) => {
  const gherkinQuery = React.useContext(GherkinQueryContext)

  const srcs: readonly messages.ISource[] = sources || gherkinQuery.getSources()

  return (
    <>
      {srcs.map((src, i) => (
        <MarkdownDocument key={i} source={src} />
      ))}
    </>
  )
}

const SourceContext = React.createContext<messages.ISource>(null)

const MarkdownDocument: React.FunctionComponent<{
  source: messages.ISource
}> = ({ source }) => {
  const renderers: { [nodeType: string]: ElementType } = {
    text: Text,

    listItem: ListItem,

    list: List,
  }
  return (
    <SourceContext.Provider value={source}>
      <ReactMarkdown
        astPlugins={[parseHtml]}
        plugins={[gfm]}
        allowDangerousHtml
        rawSourcePos={true}
        renderers={renderers}
      >
        {source.data}
      </ReactMarkdown>
    </SourceContext.Provider>
  )
}

const Text: React.FunctionComponent<{
  sourcePosition: ReactMarkdown.Position
}> = (props) => {
  const source = React.useContext(SourceContext)
  const gherkinQuery = React.useContext(GherkinQueryContext)
  const { sourcePosition } = props
  const { line } = sourcePosition.start

  const step: messages.GherkinDocument.Feature.IStep = gherkinQuery.getStep(source.uri, line)
  if (!step) {
    // @ts-ignore
    return ReactMarkdown.renderers.text(props)
  }

  return <StepLine step={step} renderStepMatchArguments={true} />
}

const ListItem: React.FunctionComponent<{
  sourcePosition: ReactMarkdown.Position
}> = (props) => {
  const { children, sourcePosition } = props
  const source = React.useContext(SourceContext)
  const gherkinQuery = React.useContext(GherkinQueryContext)
  const cucumberQuery = React.useContext(CucumberQueryContext)
  const { line } = sourcePosition.start
  const step: messages.GherkinDocument.Feature.IStep = gherkinQuery.getStep(source.uri, line)
  if (!step) {
    // @ts-ignore
    return ReactMarkdown.renderers.listItem(props)
  }

  // Get the status. TODO: Decouple this both structurally and temporally.
  // The status should be fetched async in a hook, and only with a single
  // DocumentQuery#getStatuses(scenarios) where scenarios is just a list of scenarios with step ids
  // Later we can use a HTTP based one that uses a backend with a database
  const pickleStepIds = gherkinQuery.getPickleStepIds(step.id)
  const pickleStepTestStepResults = cucumberQuery.getPickleStepTestStepResults(pickleStepIds)
  const testStepResult = cucumberQuery.getWorstTestStepResult(pickleStepTestStepResults)

  return (
    <li>
      <StatusIcon status={testStepResult.status} listItem={true} />
      <div className="cucumber-step__content">{children}</div>
    </li>
  )
}

const List: React.FunctionComponent<{
  ordered: boolean
}> = ({ ordered, children }) => {
  return createElement(ordered ? 'ol' : 'ul', { className: 'fa-ul' }, children)
}

export default MarkdownDocumentList
