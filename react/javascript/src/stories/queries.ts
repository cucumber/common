import { Query as GherkinQuery } from '@cucumber/gherkin-utils'
import { Query as CucumberQuery } from '@cucumber/query'
import { EnvelopesQuery } from '..'
import { messages } from '@cucumber/messages'

type Queries = {
  gherkinQuery: GherkinQuery
  cucumberQuery: CucumberQuery
  envelopesQuery: EnvelopesQuery
}

export default function queries(
  envelopes: readonly messages.IEnvelope[]
): Queries {
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
