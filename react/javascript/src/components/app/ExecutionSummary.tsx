import React from 'react'
import { messages, TimeConversion } from '@cucumber/messages'
import EnvelopesQueryContext from '../../EnvelopesQueryContext'

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

const ExecutionSummary: React.FunctionComponent = () => {
  const envelopesQuery = React.useContext(EnvelopesQueryContext)
  const meta = envelopesQuery.find((envelope) => envelope.meta !== null).meta
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
