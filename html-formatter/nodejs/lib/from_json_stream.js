import Stream from "stream"

class FromJsonStream extends Stream.Transform {
  constructor() {
    super({objectMode: true})
  }

  _transform(line, _, callback) {
    if (line === '') return callback()
    try {
      var event = JSON.parse(line)
      this.push(event)
      callback()
    } catch (err) {
      callback(err)
    }
  }
}

export default FromJsonStream