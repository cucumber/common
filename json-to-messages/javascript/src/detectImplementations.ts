import { pipeline, Readable } from 'stream'
import { Implementation } from './types'
import { promisify } from 'util'
import SingleObjectWritableStream from './stream/SingleObjectWritableStream'
import { IFeature } from './cucumber-generic/JSONSchema'
import JSONTransformStream from './stream/JSONTransformStream'
import detectImplementation from './detectImplementation'

export default async function detectImplementations(
  jsonReadable: Readable
): Promise<readonly Implementation[]> {
  const asyncPipeline = promisify(pipeline)
  const singleObjectWritable = new SingleObjectWritableStream<readonly IFeature[]>()
  await asyncPipeline(jsonReadable, new JSONTransformStream(), singleObjectWritable)

  return singleObjectWritable.object.map((feature) => detectImplementation(feature))
}
