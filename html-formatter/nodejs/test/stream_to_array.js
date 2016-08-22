export default (readableStream) => {
  return new Promise((resolve, reject) => {
    const items = []
    readableStream.on('data', items.push.bind(items))
    readableStream.on('error', reject)
    readableStream.on('end', () => resolve(items))
  })
}
