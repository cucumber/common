import Stream from 'stream'

export default (array) => {
  let cursor = 0
  return new Stream.Readable({
    objectMode: true,
    read: function () {
      this.push(array[ cursor++ ] || null)
    }
  })
}
