import React from 'react'
import { messages, TimeConversion } from '@cucumber/messages'
import EnvelopesQueryContext from '../../EnvelopesQueryContext'
import CICommitLink from './CICommitLink'

interface IProductProps {
  name: string
  product: messages.Meta.IProduct
}

const Product: React.FunctionComponent<IProductProps> = ({
  name: name,
  product: product,
}) => {
  return (
    <tr>
      <th>{name}</th>
      <td>
        {product.name} - {product.version}
      </td>
    </tr>
  )
}

function getDurationsMillis(
  testRunStarted: messages.ITestRunStarted,
  testRunFinished: messages.ITestRunFinished
): number {
  if (testRunStarted !== undefined && testRunFinished !== undefined) {
    return (
      TimeConversion.timestampToMillisecondsSinceEpoch(
        testRunFinished.timestamp
      ) -
      TimeConversion.timestampToMillisecondsSinceEpoch(testRunStarted.timestamp)
    )
  }
}

interface IProps {
  meta: messages.IMeta
}

const ExecutionSummary: React.FunctionComponent<IProps> = ({ meta: meta }) => {
  const envelopesQuery = React.useContext(EnvelopesQueryContext)

  const testRunStarted = envelopesQuery.find(
    (envelope) => envelope.testRunStarted !== null
  ).testRunStarted
  const testRunFinished = envelopesQuery.find(
    (envelope) => envelope.testRunFinished !== null
  ).testRunFinished
  const millisDuration = getDurationsMillis(testRunStarted, testRunFinished)

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th>Duration (milliseconds)</th>
            <td>{millisDuration || '--'} ms</td>
          </tr>
          {meta.ci && (
            <tr>
              <th>Build</th>
              <td>
                <a href={meta.ci.url}>{meta.ci.name}</a>
              </td>
            </tr>
          )}
          {meta.ci && (
            <tr>
              <th>Commit</th>
              <td>
                <CICommitLink ci={meta.ci} />
              </td>
            </tr>
          )}
          <Product name="Implementation" product={meta.implementation} />
          <Product name="Runtime" product={meta.runtime} />
          <Product name="OS" product={meta.os} />
          <Product name="CPU" product={meta.cpu} />
        </tbody>
      </table>
    </div>
  )
}

export default ExecutionSummary
