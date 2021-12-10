import * as messages from '@cucumber/messages'
import { Query as GherkinQuery } from '@cucumber/gherkin-utils'
import { Query as CucumberQuery } from '@cucumber/query'
import { EnvelopesQuery } from '../../src'

export function props(envelopes: readonly messages.Envelope[]): Props {
  const gherkinQuery = new GherkinQuery()
  const cucumberQuery = new CucumberQuery()
  const envelopesQuery = new EnvelopesQuery()
  for (const envelope of envelopes) {
    gherkinQuery.update(envelope)
    cucumberQuery.update(envelope)
    envelopesQuery.update(envelope)
  }
  return { gherkinQuery, cucumberQuery, envelopesQuery }
}

export type Props = {
  gherkinQuery: GherkinQuery
  cucumberQuery: CucumberQuery
  envelopesQuery: EnvelopesQuery
}
