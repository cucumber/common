import EnvelopesQueryContext, { EnvelopesQuery } from '../EnvelopesQueryContext'
import GherkinQueryContext from '../GherkinQueryContext'
import CucumberQueryContext from '../CucumberQueryContext'
import { Query as CucumberQuery } from '@cucumber/query'
import { Query as GherkinQuery } from '@cucumber/gherkin-utils'
import { useContext } from 'react'

interface IQueries {
  cucumberQuery: CucumberQuery
  gherkinQuery: GherkinQuery
  envelopesQuery: EnvelopesQuery
}

export function useQueries(): IQueries {
  const envelopesQuery = useContext(EnvelopesQueryContext)
  const gherkinQuery = useContext(GherkinQueryContext)
  const cucumberQuery = useContext(CucumberQueryContext)
  return { cucumberQuery, gherkinQuery, envelopesQuery }
}
