import Stream from "stream"
import EventSource from "eventsource"

class EventSourceStream extends Stream.Readable {
  constructor(url) {
    const es = new EventSource(url)
    super({objectMode: true})

    es.onmessage = messageEvent => {
      try {
        const event = JSON.parse(messageEvent.data)
        this.push(event)
      } catch (err) {
        this.emit('error', err)
      }
    }

    let open = false
    es.onopen = () => {
      open = true
      this.emit('open')
    }
    es.onerror = () => {
      if (open) {
        // The server has closed the connection. That's fine - consider the job done.
        this.emit('end')
      } else {
        // We never managed to connect.
        this.emit('error', new Error(`Failed to connect to ${url}`))
      }
    }
    es.onclose = () => console.log('ES CLOSE')
  }

  _read() {
  }
}

export default EventSourceStream