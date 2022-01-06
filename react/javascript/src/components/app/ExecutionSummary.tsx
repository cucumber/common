import React from 'react'
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

function formatDurationNicely(startDate: Date, finishDate: Date) {
  const inMilllis = finishDate.getTime() - startDate.getTime()
  // if under 10s, use 0.01s precision, otherwise 1s is fine
  if (inMilllis < 10000) {
    return `${new Intl.NumberFormat(undefined, {
      maximumFractionDigits: 2,
    }).format(inMilllis / 1000)} seconds`
  }
  return formatDuration(intervalToDuration({ start: startDate, end: finishDate }), {})
}

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
  const percentagePassed: string =
    new Intl.NumberFormat(undefined, {
      style: 'percent',
    }).format((scenarioCountByStatus.get(TestStepResultStatus.PASSED) ?? 0) / totalScenarioCount) +
    ' passed'
  const startDate: Date = new Date(
    TimeConversion.timestampToMillisecondsSinceEpoch(testRunStarted.timestamp)
  )
  const finishDate: Date = new Date(
    TimeConversion.timestampToMillisecondsSinceEpoch(testRunFinished.timestamp)
  )
  const formattedTimestamp: string = formatDistanceStrict(startDate, referenceDate ?? new Date(), {
    addSuffix: true,
  })
  const formattedDuration: string = formatDurationNicely(startDate, finishDate)
  return (
    <div className={styles.backdrop}>
      <dl className={styles.list}>
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
        {meta.ci && (
          <div className={`${styles.item} ${styles.itemCi}`}>
            <dt className={styles.suffix}>
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
            <dd className={styles.value}>{meta.ci.name}</dd>
          </div>
        )}
        <div className={styles.item}>
          <dt className={styles.suffix}>{meta.os.name}</dt>
          <dd className={styles.value}>
            <OSIcon name={meta.os.name} />
          </dd>
        </div>
        <div className={styles.item}>
          <dt className={styles.suffix}>{meta.runtime.name + ' ' + meta.runtime.version}</dt>
          <dd className={styles.value}>
            <RuntimeIcon name={meta.runtime.name} />
          </dd>
        </div>
        <div className={styles.item}>
          <dt className={styles.suffix}>
            {`${meta.implementation.name} ${meta.implementation.version}`}
          </dt>
          <dd className={styles.value}>
            <CucumberLogo />
          </dd>
        </div>
      </dl>
    </div>
  )
}
