import React, { ElementType, createElement } from 'react'
import * as messages from '@cucumber/messages'
import GherkinQueryContext from '../../GherkinQueryContext'
import CucumberQueryContext from '../../CucumberQueryContext'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'

import StatusIcon from '../gherkin/StatusIcon'
import StepLine from '../gherkin/StepLine'
import rehypePlugins from './rehypePlugins'
import { Position } from 'react-markdown/src/ast-to-react'

interface IProps {
  sources?: readonly messages.Source[]
}

const MarkdownDocumentList: React.FunctionComponent<IProps> = ({ sources }) => {
  const gherkinQuery = React.useContext(GherkinQueryContext)

  const srcs: readonly messages.Source[] = sources || gherkinQuery.getSources()

  return (
    <>
      {srcs.map((src, i) => (
        <MarkdownDocument key={i} source={src} />
      ))}
    </>
  )
}

const SourceContext = React.createContext<messages.Source>(null)

const MarkdownDocument: React.FunctionComponent<{
  source: messages.Source
}> = ({ source }) => {
  const components: { [nodeType: string]: ElementType } = {
    text: Text,

    listItem: ListItem,

    list: List,
  }
  return (
    <SourceContext.Provider value={source}>
      <ReactMarkdown
        rehypePlugins={rehypePlugins}
        plugins={[gfm]}
        rawSourcePos={true}
        components={components}
      >
        {source.data}
      </ReactMarkdown>
    </SourceContext.Provider>
  )
}

const Text: React.FunctionComponent<{
  sourcePosition: Position
}> = (props) => {
  const source = React.useContext(SourceContext)
  const gherkinQuery = React.useContext(GherkinQueryContext)
  const { sourcePosition } = props
  const { line } = sourcePosition.start

  const step: messages.Step = gherkinQuery.getStep(source.uri, line)
  if (!step) {
    // @ts-ignore
    return ReactMarkdown.renderers.text(props)
  }

  return <StepLine step={step} renderStepMatchArguments={true} />
}

const ListItem: React.FunctionComponent<{
  sourcePosition: Position
}> = (props) => {
  const { children, sourcePosition } = props
  const source = React.useContext(SourceContext)
  const gherkinQuery = React.useContext(GherkinQueryContext)
  const cucumberQuery = React.useContext(CucumberQueryContext)
  const { line } = sourcePosition.start
  const step: messages.Step = gherkinQuery.getStep(source.uri, line)
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
