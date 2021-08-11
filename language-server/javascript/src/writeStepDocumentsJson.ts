import { spawn } from 'child_process'
import { pipeline, Transform, Writable } from 'stream'
import { NdjsonToMessageStream } from '@cucumber/message-streams'
import { StepDocument } from '@cucumber/suggest'
import StepDocumentsStream from '../src/StepDocumentsStream'
import fs from 'fs'

export default function writeStepDocumentsJson(
  command: string,
  args: string[],
  jsonPath: string
): Promise<void> {
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
        return resolve()
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

    pipeline(
      cucumber.stdout,
      new NdjsonToMessageStream(),
      new StepDocumentsStream(),
      new Transform({
        objectMode: true,
        transform(stepDocuments: StepDocument[], encoding, callback) {
          callback(null, JSON.stringify(stepDocuments, null, 2))
        },
      }),
      fs.createWriteStream(jsonPath, { encoding: 'utf-8' }),
      (err) => err && reject(err)
    )
  })
}
