import React, { useMemo } from 'react'
import * as messages from '@cucumber/messages'
import { TestRunFinished, TestRunStarted, TimeConversion } from '@cucumber/messages'
import { formatDistanceStrict, formatDuration, intervalToDuration } from 'date-fns'
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

const numberFormat = new Intl.NumberFormat(undefined, {
  maximumFractionDigits: 2,
})

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
  const startDate: Date = useMemo(
    () => new Date(TimeConversion.timestampToMillisecondsSinceEpoch(testRunStarted.timestamp)),
    [testRunStarted]
  )
  const finishDate: Date = useMemo(
    () => new Date(TimeConversion.timestampToMillisecondsSinceEpoch(testRunFinished.timestamp)),
    [testRunFinished]
  )
  const formattedTimestamp: string = useMemo(() => {
    return formatDistanceStrict(startDate, referenceDate ?? new Date(), { addSuffix: true })
  }, [startDate, referenceDate])
  const formattedDuration: string = useMemo(() => {
    const inMilllis = finishDate.getTime() - startDate.getTime()
    // if under 10s, use 0.01s precision, otherwise 1s is fine
    if (inMilllis < 10000) {
      return `${numberFormat.format(inMilllis / 1000)} seconds`
    }
    return formatDuration(intervalToDuration({ start: startDate, end: finishDate }), {})
  }, [startDate, finishDate])
  return (
    <>
      <dl className={styles.layout}>
        <div className={styles.item}>
          <dt className={styles.suffix}>last run</dt>
          <dd className={styles.value}>{formattedTimestamp}</dd>
        </div>
        <div className={styles.item}>
          <dt className={styles.suffix}>duration</dt>
          <dd className={styles.value}>{formattedDuration}</dd>
        </div>
      </dl>
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
