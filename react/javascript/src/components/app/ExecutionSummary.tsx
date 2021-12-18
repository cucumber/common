import React, { useMemo } from 'react'
import * as messages from '@cucumber/messages'
import { TestRunFinished, TestRunStarted, TimeConversion } from '@cucumber/messages'
import { formatDistanceStrict } from 'date-fns'
import styles from './ExecutionSummary.module.scss'

interface IProductProps {
  name: string
  product: messages.Product
}

export const Product: React.FunctionComponent<IProductProps> = ({
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

export interface IExecutionSummaryProps {
  scenarioCountByStatus: Map<messages.TestStepResultStatus, number>
  totalScenarioCount: number
  testRunStarted: TestRunStarted
  testRunFinished: TestRunFinished
  meta: messages.Meta
  referenceDate?: Date
}

export const ExecutionSummary: React.FunctionComponent<IExecutionSummaryProps> = ({
  testRunStarted,
  testRunFinished,
  referenceDate,
}) => {
  const referenceDateMemo: Date = useMemo(() => referenceDate ?? new Date(), [referenceDate])
  const testRunDate: Date = new Date(
    TimeConversion.timestampToMillisecondsSinceEpoch(testRunStarted.timestamp)
  )
  return (
    <>
      <div className={styles.layout}>
        <div>
          <span>{formatDistanceStrict(testRunDate, referenceDateMemo, { addSuffix: true })}</span>
          <span>last run</span>
        </div>
      </div>
      {/*<div className="cucumber-execution-data">*/}
      {/*  <table>*/}
      {/*    <tbody>*/}
      {/*      {millisDuration && (*/}
      {/*        <tr>*/}
      {/*          <th>Duration</th>*/}
      {/*          <td>*/}
      {/*            <Duration durationMillis={millisDuration} />*/}
      {/*          </td>*/}
      {/*        </tr>*/}
      {/*      )}*/}
      {/*      {meta.ci && (*/}
      {/*        <tr>*/}
      {/*          <th>Build</th>*/}
      {/*          <td>*/}
      {/*            <a href={meta.ci.url}>{meta.ci.name}</a>*/}
      {/*          </td>*/}
      {/*        </tr>*/}
      {/*      )}*/}
      {/*      {meta.ci && (*/}
      {/*        <tr>*/}
      {/*          <th>Commit</th>*/}
      {/*          <td>*/}
      {/*            <CICommitLink ci={meta.ci} />*/}
      {/*          </td>*/}
      {/*        </tr>*/}
      {/*      )}*/}
      {/*      {meta.implementation && <Product name="Implementation" product={meta.implementation} />}*/}
      {/*      {meta.runtime && <Product name="Runtime" product={meta.runtime} />}*/}
      {/*      {meta.os && <Product name="OS" product={meta.os} />}*/}
      {/*      {meta.cpu && <Product name="CPU" product={meta.cpu} />}*/}
      {/*    </tbody>*/}
      {/*  </table>*/}
      {/*</div>*/}
    </>
  )
}
