import { messages } from '@cucumber/messages'
import CucumberHtmlStream from '../src/CucumberHtmlStream'
import { Writable } from 'stream'
import assert from 'assert'

async function renderAsHtml(
  ...envelopes: messages.IEnvelope[]
): Promise<string> {
  return new Promise((resolve) => {
    let html = ''
    const sink: Writable = new Writable({
      write(
        chunk: any,
        encoding: string,
        callback: (error?: Error | null) => void
      ): void {
        html += chunk
        callback()
      },
    })
    sink.on('finish', () => resolve(html))
    const cucumberHtmlStream = new CucumberHtmlStream(
      __dirname +
        '/../node_modules/@cucumber/react/dist/src/styles/cucumber-react.css',
      __dirname + '/../dist/main.js'
    )
    cucumberHtmlStream.pipe(sink)

    for (const envelope of envelopes) {
      cucumberHtmlStream.write(envelope)
    }
    cucumberHtmlStream.end()
  })
}

describe('CucumberHtmlStream', () => {
  it('writes zero messages to html', async () => {
    const html = await renderAsHtml()
    assert(html.indexOf('window.CUCUMBER_MESSAGES = []') >= 0)
  })

  it('writes one message to html', async () => {
    const e1 = messages.Envelope.create({
      testRunStarted: messages.TestRunStarted.create({}),
    })
    const html = await renderAsHtml(e1)
    assert(
      html.indexOf(
        `window.CUCUMBER_MESSAGES = [${JSON.stringify(e1.toJSON())}]`
      ) >= 0
    )
  })

  it('writes one message to html', async () => {
    const e1 = messages.Envelope.create({
      testRunStarted: messages.TestRunStarted.create({}),
    })
    const e2 = messages.Envelope.create({
      testRunFinished: messages.TestRunFinished.create({}),
    })
    const html = await renderAsHtml(e1, e2)
    assert(
      html.indexOf(
        `window.CUCUMBER_MESSAGES = [${JSON.stringify(
          e1.toJSON()
        )},${JSON.stringify(e2.toJSON())}]`
      ) >= 0
    )
  })
})
