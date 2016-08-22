import Stream from "stream"

class EventSourceStream extends Stream.Readable {
  constructor(es) {
    super({objectMode: true})

    es.onmessage = messageEvent => {
      try {
        const event = JSON.parse(messageEvent.data)
        this.push(event)
      } catch (err) {
        this.emit('error', err)
      }
    }
  }

  _read() {
  }
}

module.exports = EventSourceStream