import SupportCode from '../src/SupportCode'

export default function makeDummyStepDefinitions(supportCode: SupportCode) {
  const { Given } = supportCode

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Given('a passed {word}', (thing: string) => {
    // no-op
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Given('a pending {word}', (thing: string) => 'pending')

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Given('an ambiguou(s) {word}', (thing: string) => {
    // no-op
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Given('an (a)mbiguous {word}', (thing: string) => {
    // no-op
  })
}
