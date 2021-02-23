import { Writable } from 'stream'

export default class SingleObjectWritableStream<T> extends Writable {
  private o: T = null
  constructor() {
    super({ objectMode: true })
  }

  get object(): T {
    return this.o
  }

  _write(object: T, encoding: string, callback: (error?: Error | null) => void): void {
    if (this.o) {
      return callback(new Error(`Can only write one object to SingleObjectWritable`))
    }
    this.o = object
    callback()
  }
}
