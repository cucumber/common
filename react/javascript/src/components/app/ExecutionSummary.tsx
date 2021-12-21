import React, { useMemo } from 'react'
import * as messages from '@cucumber/messages'
import { TestStepResultStatus } from '@cucumber/messages'
import { formatDistanceStrict, formatDuration, intervalToDuration } from 'date-fns'
import styles from './ExecutionSummary.module.scss'
import { CICommitLink } from './CICommitLink'
import { Cucumber } from './icons/Cucumber'

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
  startDate: Date
  finishDate: Date
  referenceDate?: Date
  meta: messages.Meta
}

export const ExecutionSummary: React.FunctionComponent<IExecutionSummaryProps> = ({
  scenarioCountByStatus,
  totalScenarioCount,
  startDate,
  finishDate,
  referenceDate,
  meta,
}) => {
  const percentagePassed: string = useMemo(() => {
    return (
      new Intl.NumberFormat(undefined, {
        style: 'percent',
      }).format(
        (scenarioCountByStatus.get(TestStepResultStatus.PASSED) ?? 0) / totalScenarioCount
      ) + ' passed'
    )
  }, [scenarioCountByStatus, totalScenarioCount])
  const formattedTimestamp: string = useMemo(() => {
    return formatDistanceStrict(startDate, referenceDate ?? new Date(), { addSuffix: true })
  }, [startDate, referenceDate])
  const formattedDuration: string = useMemo(() => {
    const inMilllis = finishDate.getTime() - startDate.getTime()
    // if under 10s, use 0.01s precision, otherwise 1s is fine
    if (inMilllis < 10000) {
      return `${new Intl.NumberFormat(undefined, {
        maximumFractionDigits: 2,
      }).format(inMilllis / 1000)} seconds`
    }
    return formatDuration(intervalToDuration({ start: startDate, end: finishDate }), {})
  }, [startDate, finishDate])
  return (
    <>
      <div className={styles.backdrop}>
        <dl className={styles.layout}>
          <div className={styles.item}>
            <dt className={styles.suffix}>{totalScenarioCount} executed</dt>
            <dd className={styles.value}>{percentagePassed}</dd>
          </div>
          <div className={styles.item}>
            <dt className={styles.suffix}>last run</dt>
            <dd className={styles.value}>{formattedTimestamp}</dd>
          </div>
          <div className={styles.item}>
            <dt className={styles.suffix}>duration</dt>
            <dd className={styles.value}>{formattedDuration}</dd>
          </div>
          <div className={styles.item}></div>
          <div className={styles.item}></div>
          <div className={styles.item}>
            <dt className={styles.suffix}>
              {`${meta.implementation.name} ${meta.implementation.version}`}
            </dt>
            <dd className={styles.value}>
              <Cucumber />
            </dd>
          </div>
        </dl>
      </div>
      <div className="cucumber-execution-data">
        <table>
          <tbody>
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
            {meta.runtime && <Product name="Runtime" product={meta.runtime} />}
            {meta.os && <Product name="OS" product={meta.os} />}
            {meta.cpu && <Product name="CPU" product={meta.cpu} />}
          </tbody>
        </table>
      </div>
    </>
  )
}
