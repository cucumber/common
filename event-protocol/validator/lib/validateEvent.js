const path = require('path')
const inspect = require('util').inspect
const fs = require('mz/fs')
const Ajv = require('ajv')

const SCHEMA_BASE_URL = 'https://raw.github.com/cucumber/cucumber/master/event-protocol/schemas/'

const schemaDir = __dirname + '/../schemas'
const schemaFiles = fs.readdirSync(schemaDir)
  .map(name => path.resolve(`${schemaDir}/${name}`))

const ajv = Ajv({
  allErrors: true,
  schemas: schemaFiles.map(require)
})

function validateEvent(event) {
  const validate = ajv.getSchema(`${SCHEMA_BASE_URL}${event.type}.json#`)
  if (!validate) throw new Error(`No schema for ${inspect(event)}`)
  const valid = validate(event)
  if (!valid) throw new Error(JSON.stringify(validate.errors, null, 2))
}
module.exports = validateEvent