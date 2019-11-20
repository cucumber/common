import allJson from './all.json'
import IStepDefinition from '../src/IStepDefinition'
import { Argument } from 'cucumber-expressions'
import SupportCodeExecutor from '../src/SupportCodeExecutor'
import { messages } from 'cucumber-messages'

class JsonStepDefinition implements IStepDefinition {
  constructor(private readonly uri: string, private readonly line: number) {}

  public getArguments(text: string): Array<Argument<any>> {
    // The JSON report doesn't contain match arguments, so we'll just say none
    return []
  }

  public match(
    pickleStep: messages.Pickle.IPickleStep
  ): SupportCodeExecutor | null {
    return undefined
  }

  public toMessage(): messages.IEnvelope {
    return undefined
  }
}

function makeJsonStepDefinitions(jsonReport: any): IStepDefinition[] {
  const result: IStepDefinition[] = []
  for (const feature of jsonReport) {
    const { uri } = feature
    for (const element of feature.elements) {
      for (const step of element.steps) {
        const { line } = step

        result.push(new JsonStepDefinition(uri, line))
      }
    }
  }
  return result
}

describe('makeJsonStepDefinitions', () => {
  it('generates step definitions from a JSON report', () => {
    const stepDefinitions = makeJsonStepDefinitions(allJson)
  })
})
