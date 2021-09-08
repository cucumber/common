import { spawn } from 'child_process'
import { pipeline, Writable } from 'stream'
import { NdjsonToMessageStream } from '@cucumber/message-streams'
import { CucumberInfo } from '@cucumber/language-service'
import { CucumberInfoStream } from './CucumberInfoStream'

export function makeCucumberInfo(command: string, args: string[]): Promise<CucumberInfo | null> {
  const cucumber = spawn(command, args)

  const stderr: Buffer[] = []

  return new Promise((resolve, reject) => {
    cucumber.on('error', reject)
    cucumber.on('close', (code, signal) => {
      if (signal) {
        reject(new Error(`Received signal ${signal}`))
      }
      // https://github.com/cucumber/cucumber-js/issues/1768
      if (code === 1 || code === 0) {
        return resolve(null)
      }
      reject(
        new Error(`Exited with status ${code}. STDERR:\n${Buffer.concat(stderr).toString('utf8')}`)
      )
    })

    pipeline(
      cucumber.stderr,
      new Writable({
        write(chunk: Buffer, _, callback) {
          stderr.push(chunk)
          callback()
        },
      }),
      (err) => err && reject(err)
    )

    let cucumberInfo: CucumberInfo = null
    pipeline(
      cucumber.stdout,
      new NdjsonToMessageStream(),
      new CucumberInfoStream(),
      new Writable({
        objectMode: true,
        write(_cucumberInfo: CucumberInfo, encoding, callback) {
          cucumberInfo = _cucumberInfo
          callback()
        },
      }),
      (err) => {
        if (err) return reject(err)
        resolve(cucumberInfo)
      }
    )
  })
}
