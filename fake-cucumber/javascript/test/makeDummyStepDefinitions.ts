import SupportCode from '../src/SupportCode'

export default function makeDummyStepDefinitions(supportCode: SupportCode) {
  const { Given } = supportCode

  Given('a passed {word}', (thing: string) => {
    // no-op
  })

  Given('a passed {word} with', (thing: string, dataTableOrDocString) => {
    // no-op
  })

  Given('a passed {word} with text attachment {string}', function(
    thing: string,
    textAttachment
  ) {
    this.attach(textAttachment, 'text/plain')
  })

  Given(
    'I have {int} cukes/cucumbers in my {word}',
    (count: number, container: string) => {
      // no-op
    }
  )

  Given('a failed {word}', (thing: string) => {
    throw new Error(`This step failed. The thing was "${thing}"`)
  })

  Given('a failed {word} with', (thing: string, dataTableOrDocString) => {
    throw new Error(
      `This step failed. The thing was "${thing}" and the dataTable/docString was ${JSON.stringify(
        dataTableOrDocString
      )}`
    )
  })

  Given('a pending {word}', (thing: string) => 'pending')

  Given('an ambiguou(s) {word}', (thing: string) => {
    // no-op
  })

  Given('an (a)mbiguous {word}', (thing: string) => {
    // no-op
  })
}
