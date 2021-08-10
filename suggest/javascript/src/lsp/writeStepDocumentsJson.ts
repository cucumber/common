import { ChildProcess } from 'child_process'
import { pipeline as pipelineCb, Transform } from 'stream'
import { promisify } from 'util'
import { NdjsonToMessageStream } from '@cucumber/message-streams'
import { StepDocument } from '../../src/types'
import StepDocumentsStream from '../../src/lsp/StepDocumentsStream'
import fs from 'fs'

const pipeline = promisify(pipelineCb)

export default async function writeStepDocumentsJson(cucumber: ChildProcess, jsonPath: string) {
  await pipeline(
    cucumber.stdout,
    new NdjsonToMessageStream(),
    new StepDocumentsStream(),
    new Transform({
      objectMode: true,
      transform(stepDocuments: StepDocument[], encoding, callback) {
        callback(null, JSON.stringify(stepDocuments, null, 2))
      }
    }),
    fs.createWriteStream(jsonPath, { encoding: 'utf-8' })
  )
}
