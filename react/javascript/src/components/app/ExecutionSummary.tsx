import React, { useMemo } from 'react'
import * as messages from '@cucumber/messages'
import {
  TestRunFinished,
  TestRunStarted,
  TestStepResultStatus,
  TimeConversion,
} from '@cucumber/messages'
import { formatDistanceStrict, formatDuration, intervalToDuration } from 'date-fns'
import styles from './ExecutionSummary.module.scss'
import { CucumberLogo } from './icons/CucumberLogo'
import { OSIcon } from './OSIcon'
import { RuntimeIcon } from './RuntimeIcon'
import { CICommitLink } from './CICommitLink'
import { faCodeBranch, faTag } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export interface IExecutionSummaryProps {
  scenarioCountByStatus: Map<messages.TestStepResultStatus, number>
  totalScenarioCount: number
  testRunStarted: TestRunStarted
  testRunFinished: TestRunFinished
  referenceDate?: Date
  meta: messages.Meta
}

export const ExecutionSummary: React.FunctionComponent<IExecutionSummaryProps> = ({
  scenarioCountByStatus,
  totalScenarioCount,
  testRunStarted,
  testRunFinished,
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
      return `${new Intl.NumberFormat(undefined, {
        maximumFractionDigits: 2,
      }).format(inMilllis / 1000)} seconds`
    }
    return formatDuration(intervalToDuration({ start: startDate, end: finishDate }), {})
  }, [startDate, finishDate])
  return (
    <>
      <div className={styles.summaryBackdrop}>
        <dl className={styles.summaryList}>
          <div className={styles.summaryItem}>
            <dt className={styles.summarySuffix}>{totalScenarioCount} executed</dt>
            <dd className={styles.summaryValue}>{percentagePassed}</dd>
          </div>
          <div className={styles.summaryItem}>
            <dt className={styles.summarySuffix}>last run</dt>
            <dd className={styles.summaryValue}>{formattedTimestamp}</dd>
          </div>
          <div className={styles.summaryItem}>
            <dt className={styles.summarySuffix}>duration</dt>
            <dd className={styles.summaryValue}>{formattedDuration}</dd>
          </div>
          {meta.ci && (
            <div className={`${styles.summaryItem} ${styles.summaryItemCi}`}>
              <dt className={styles.summarySuffix}>
                {meta.ci.git ? (
                  <>
                    {meta.ci.git.branch && (
                      <span className={styles.gitItem}>
                        <FontAwesomeIcon icon={faCodeBranch} />
                        {meta.ci.git.branch}
                      </span>
                    )}
                    {meta.ci.git.tag && (
                      <span className={styles.gitItem}>
                        <FontAwesomeIcon icon={faTag} />
                        {meta.ci.git.tag}
                      </span>
                    )}
                    <span className={styles.gitItem}>
                      <CICommitLink ci={meta.ci} />
                    </span>
                  </>
                ) : (
                  '-'
                )}
              </dt>
              <dd className={styles.summaryValue}>{meta.ci.name}</dd>
            </div>
          )}
          <div className={styles.summaryItem}>
            <dt className={styles.summarySuffix}>{meta.os.name}</dt>
            <dd className={styles.summaryValue}>
              <OSIcon name={meta.os.name} />
            </dd>
          </div>
          <div className={styles.summaryItem}>
            <dt className={styles.summarySuffix}>
              {meta.runtime.name + ' ' + meta.runtime.version}
            </dt>
            <dd className={styles.summaryValue}>
              <RuntimeIcon name={meta.runtime.name} />
            </dd>
          </div>
          <div className={styles.summaryItem}>
            <dt className={styles.summarySuffix}>
              {`${meta.implementation.name} ${meta.implementation.version}`}
            </dt>
            <dd className={styles.summaryValue}>
              <CucumberLogo />
            </dd>
          </div>
        </dl>
      </div>
    </>
  )
}
