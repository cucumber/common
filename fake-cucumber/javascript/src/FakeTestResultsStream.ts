import { Transform } from 'stream'
import { messages } from 'cucumber-messages'
import uuidv4 from 'uuid/v4'

class FakeTestResultsStream extends Transform {
  private readonly buffer: messages.IEnvelope[] = []
  private stepDefinitionIds: string[] = []

  constructor(
    private readonly format:
      | 'json'
      | 'ndjson'
      | 'protobuf'
      | 'protobuf-objects',
    private readonly results: 'none' | 'random' | 'pattern'
  ) {
    super({ objectMode: true })
  }

  public _transform(
    envelope: messages.IEnvelope,
    encoding: string,
    callback: (error?: Error | null, data?: any) => void
  ): void {
    this.p(envelope)

    if (envelope.source) {
      const stepDefinitionPatterns = ['passed', 'failed', 'pending', 'skipped', 'ambig', 'ambiguous']
      stepDefinitionPatterns.forEach(pattern => {
        const stepDefinitionId = uuidv4()
        this.stepDefinitionIds.push(stepDefinitionId)
        this.p(
          new messages.Envelope({
            stepDefinitionConfig: new messages.StepDefinitionConfig({
              id: stepDefinitionId,
              pattern: new messages.StepDefinitionPattern({
                source: `{}${pattern}{}`,
              }),
              location: new messages.SourceReference({
                uri: "some/javascript/file.js",
                location: new messages.Location({
                  line: this.stepDefinitionIds.length * 3
                })
              })
            })
          })
        )
      })
    }

    if (envelope.pickle && this.results !== 'none') {
      const testCaseId = uuidv4()

      const pickleStepById = new Map<string, messages.Pickle.IPickleStep>()
      const testSteps: messages.TestCase.ITestStep[] = []
      for (const pickleStep of envelope.pickle.steps) {
        pickleStepById.set(pickleStep.id, pickleStep)

        const stepMatchArguments: messages.IStepMatchArgument[] = []

        let word = ''
        let wordIndex = 0
        pickleStep.text.split('').forEach((character, i) => {
          if (character !== ' ') {
            word += character
          } else {
            if (word.length > 0) {
              if (wordIndex % 2 === 1) {
                stepMatchArguments.push(
                  new messages.StepMatchArgument({
                    group: new messages.StepMatchArgument.Group({
                      value: word,
                      start: i - word.length,
                    }),
                    parameterTypeName: 'fake',
                  })
                )
              }
              word = ''
              wordIndex++
            }
          }
        })

        if (word.length > 0) {
          stepMatchArguments.push(
            new messages.StepMatchArgument({
              group: new messages.StepMatchArgument.Group({
                value: word,
                start: pickleStep.text.length - word.length,
              }),
              parameterTypeName: 'fake',
            })
          )
          word = ''
        }
        testSteps.push(
          new messages.TestCase.TestStep({
            id: uuidv4(),
            pickleStepId: pickleStep.id,
            stepMatchArguments,
            stepDefinitionId: [random(this.stepDefinitionIds)]
          })
        )
      }

      this.p(
        new messages.Envelope({
          testCase: new messages.TestCase({
            pickleId: envelope.pickle.id,
            id: testCaseId,
            testSteps,
          }),
        })
      )

      const attempt = 0
      const testCaseStartedId = uuidv4()

      this.p(
        new messages.Envelope({
          testCaseStarted: new messages.TestCaseStarted({
            attempt,
            testCaseId,
            id: testCaseStartedId,
          }),
        })
      )

      let testStepStatus: messages.TestResult.Status = null
      const testStepStatuses: messages.TestResult.Status[] = []

      for (const testStep of testSteps) {
        this.p(
          new messages.Envelope({
            testStepStarted: new messages.TestStepStarted({
              testCaseStartedId,
              testStepId: testStep.id,
            }),
          })
        )

        const pickleStep = pickleStepById.get(testStep.pickleStepId)

        switch (this.results) {
          case 'pattern':
            testStepStatus = patternStatus(pickleStep.text)
            break
          case 'random':
            testStepStatus =
              testStepStatus === messages.TestResult.Status.PASSED
                ? randomStatus()
                : messages.TestResult.Status.SKIPPED
            break
          default:
            throw new Error(`Unexpected results value: ${this.results}`)
        }

        this.p(
          new messages.Envelope({
            testStepFinished: new messages.TestStepFinished({
              testCaseStartedId,
              testStepId: testStep.id,
              testResult: {
                status: testStepStatus,
                message:
                  testStepStatus === messages.TestResult.Status.FAILED
                    ? `Some error message\n\tfake_file:2\n\tfake_file:7\n`
                    : null,
                duration: new messages.Duration({
                  seconds: 123456,
                  nanos: 789,
                }),
              },
            }),
          })
        )
        testStepStatuses.push(testStepStatus)
      }

      this.p(
        new messages.Envelope({
          testCaseFinished: new messages.TestCaseFinished({
            testCaseStartedId,
            testResult: {
              status:
                testStepStatuses.sort()[testStepStatuses.length - 1] ||
                messages.TestResult.Status.UNKNOWN,
              message:
                testStepStatus === messages.TestResult.Status.FAILED
                  ? `Some error message\n\tfake_file:2\n\tfake_file:7\n`
                  : null,
              duration: new messages.Duration({
                seconds: 987654,
                nanos: 321,
              }),
            },
          }),
        })
      )
    }

    callback()
  }

  public _flush(callback: (error?: Error | null, data?: any) => void): void {
    if (this.format === 'json') {
      this.push(JSON.stringify(this.buffer) + '\n')
    }
    callback()
  }

  private p(envelope: messages.IEnvelope) {
    switch (this.format) {
      case 'json':
        this.buffer.push(envelope)
        break
      case 'ndjson':
        this.push(JSON.stringify(envelope) + '\n')
        break
      case 'protobuf':
        this.push(messages.Envelope.encodeDelimited(envelope).finish())
        break
      case 'protobuf-objects':
        this.push(envelope)
        break
      default:
        throw new Error(`Invalid format "${this.format}"`)
    }
  }
}

function patternStatus(text: string): messages.TestResult.Status {
  if (text.match(/ambiguous/)) {
    return messages.TestResult.Status.AMBIGUOUS
  } else if (text.match(/failed/)) {
    return messages.TestResult.Status.FAILED
  } else if (text.match(/passed/)) {
    return messages.TestResult.Status.PASSED
  } else if (text.match(/pending/)) {
    return messages.TestResult.Status.PENDING
  } else if (text.match(/skipped/)) {
    return messages.TestResult.Status.SKIPPED
  } else if (text.match(/undefined/)) {
    return messages.TestResult.Status.UNDEFINED
  } else {
    return messages.TestResult.Status.PASSED
  }
}

function randomStatus(): messages.TestResult.Status {
  return random([
    // The duplicates are deliberate - we're trying
    // to generate realistic results
    messages.TestResult.Status.PASSED,
    messages.TestResult.Status.PASSED,
    messages.TestResult.Status.PASSED,
    messages.TestResult.Status.PASSED,
    messages.TestResult.Status.PASSED,
    messages.TestResult.Status.PASSED,
    messages.TestResult.Status.PASSED,
    messages.TestResult.Status.PASSED,
    messages.TestResult.Status.PASSED,
    messages.TestResult.Status.PASSED,
    messages.TestResult.Status.PASSED,
    messages.TestResult.Status.PASSED,
    messages.TestResult.Status.PASSED,
    messages.TestResult.Status.PASSED,
    messages.TestResult.Status.PASSED,
    messages.TestResult.Status.PASSED,
    messages.TestResult.Status.PASSED,
    messages.TestResult.Status.PASSED,
    messages.TestResult.Status.PASSED,
    messages.TestResult.Status.PASSED,
    messages.TestResult.Status.PASSED,
    messages.TestResult.Status.PENDING,
    messages.TestResult.Status.UNDEFINED,
    messages.TestResult.Status.AMBIGUOUS,
    messages.TestResult.Status.FAILED,
    messages.TestResult.Status.FAILED,
    messages.TestResult.Status.FAILED,
  ])
}

function random<T>(array: T[]): T {
  const randomIndex = Math.floor(Math.random() * array.length)
  return array[randomIndex]
}

export default FakeTestResultsStream
