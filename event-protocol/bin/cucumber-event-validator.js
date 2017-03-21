const readline = require('readline')
const validateEvent = require('../lib/validateEvent')
const RED = '\033[0;31m'
const NC = '\033[0m'

const lines = readline.createInterface({ input: process.stdin })
let error = false
lines.on('line', line => {
  if(error) return
  let event
  try {
    event = JSON.parse(line)
    validateEvent(event)
    console.log(line)
  } catch(err) {
    if(event) {
      console.error(RED + '--- Failed to validate event ---' + NC)
      console.error(RED + JSON.stringify(event, null, 2) + NC)
      console.error(RED + '--- Validation error ---' + NC)
    }
    console.error(RED + err.message + NC)

    error = true
    lines.close()
  }
})
lines.on('close', () => process.exit(error ? 1 : 0))
