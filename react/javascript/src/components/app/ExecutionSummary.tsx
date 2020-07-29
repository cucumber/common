import React from 'react'
import { messages } from '@cucumber/messages'
import EnvelopesQueryContext from '../../EnvelopesQueryContext'
import CICommitLink from './CICommitLink'
import getDurationsMillis from '../../getDurationMillis'
import Duration from './Duration'

interface IProductProps {
  name: string
  product: messages.Meta.IProduct
}

const Product: React.FunctionComponent<IProductProps> = ({
  name: name,
  product: product,
}) => {
  const value = [product.name, product.version]
    .filter((v) => v !== '' && v !== undefined && v !== null)
    .join(' - ')

  return (
    <tr>
      <th>{name}</th>
      <td>{value}</td>
    </tr>
  )
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
    <div className="cucumber-execution-data">
      <table>
        <tbody>
          <tr>
            <th>Duration</th>
            <td>
              {millisDuration ? (
                <Duration durationMillis={millisDuration} />
              ) : (
                '--'
              )}
            </td>
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
          {meta.implementation && (
            <Product name="Implementation" product={meta.implementation} />
          )}
          {meta.runtime && <Product name="Runtime" product={meta.runtime} />}
          {meta.os && <Product name="OS" product={meta.os} />}
          {meta.cpu && <Product name="CPU" product={meta.cpu} />}
        </tbody>
      </table>
    </div>
  )
}

export default ExecutionSummary
