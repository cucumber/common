const Stream = require('stream')

class ReadableEventSourceStream extends Stream.Readable {
  constructor(es) {
    super({objectMode: true})

    es.onopen = () => {
      console.log('OPEN')
    }

    es.onmessage = messageEvent => {
      try {
        const event = JSON.parse(messageEvent.data)
        this.push(event)
      } catch (err) {
        this.emit('error', err)
      }
    }

    es.onerror = errorEvent => {
      this.emit('error', new Error("EventSource errored"))
    }
  }

  _read() {}
}

module.exports = ReadableEventSourceStream