import * as React from 'react'
import DataTable from './DataTable'
import Keyword from './Keyword'
import DocString from './DocString'
import { messages } from 'cucumber-messages'
import GherkinDocumentContext from '../../GherkinDocumentContext'
import UriContext from '../../UriContext'
import Status = messages.TestResult.Status

interface IProps {
  step: messages.GherkinDocument.Feature.IStep
}

const statusColours = {
  [Status.AMBIGUOUS]: 'gray',
  [Status.FAILED]: 'red',
  [Status.PASSED]: 'green',
  [Status.PENDING]: 'yellow',
  [Status.SKIPPED]: 'cyan',
  [Status.UNDEFINED]: 'orange',
  [Status.AMBIGUOUS]: 'purple',
}

const Step: React.FunctionComponent<IProps> = ({ step }) => {
  const uri = React.useContext(UriContext)
  const resultsLookup = React.useContext(GherkinDocumentContext)

  const testResults = resultsLookup(uri, step.location.line)
  const status = testResults[0].status
  return (
    <li>
      <span
        style={{ color: statusColours[status] }}>{step.location.line}</span>: <Keyword>{step.keyword}</Keyword><span>{step.text}</span>
      {step.dataTable && <DataTable dataTable={step.dataTable}/>}
      {step.docString && <DocString docString={step.docString}/>}
    </li>
  )
}

export default Step
