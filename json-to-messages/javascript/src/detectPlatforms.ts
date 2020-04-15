import { pipeline, Readable } from 'stream'
import { Platform } from './types'
import { promisify } from 'util'
import SingleObjectWritableStream from './stream/SingleObjectWritableStream'
import { IFeature } from './cucumber-generic/JSONSchema'
import JSONTransformStream from './stream/JSONTransformStream'
import detectPlatform from './detectPlatform'

export default async function detectPlatforms(
  jsonReadable: Readable
): Promise<readonly Platform[]> {
  const asyncPipeline = promisify(pipeline)
  const singleObjectWritable = new SingleObjectWritableStream<
    ReadonlyArray<IFeature>
  >()
  await asyncPipeline(
    jsonReadable,
    new JSONTransformStream(),
    singleObjectWritable
  )

  return singleObjectWritable.object.map(feature => detectPlatform(feature))
}
