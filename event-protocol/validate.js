#!/usr/bin/env node
/*
 * This script reads an ndjson stream of cucumber events from STDIN
 * and validates each event using JSON Schema.
 *
 * Valid events are printed as green.
 *
 * Invalid events are printed as red, followed by a line with a validation error.
 *
 * The script exits with 1 if one or more events are invalid.
 */

const inspect = require('util').inspect
const path = require('path')
const es = require('event-stream')
const fs = require('mz/fs')
const Ajv = require('ajv');
const RED = '\033[0;31m'
const GREEN = '\033[0;32m'
const NC = '\033[0m'
const SCHEMA_BASE_URL = 'https://raw.github.com/cucumber/cucumber/master/event-protocol/schemas/'

const schemaDir = __dirname + '/schemas'
const schemaFiles = fs.readdirSync(schemaDir)
  .map(name => path.resolve(`${schemaDir}/${name}`))

var ajv = Ajv({
  allErrors: true,
  schemas: schemaFiles.map(require)
})

const validateEvents = (schemas) => {
  let validationError = false
  return new Promise((resolve, reject) => {
    process.stdin
      .pipe(es.split())
      .pipe(es.map((json, cb) => json ? cb(null, JSON.parse(json)) : cb()))
      .pipe(es.map((event, cb) => {
        const validate = schemas.getSchema(`${SCHEMA_BASE_URL}${event.type}.json#`)
        if (!validate) return cb(null, [`No schema for ${inspect(event)}`, event])
        const valid = validate(event)
        if (!valid) return cb(null, [JSON.stringify(validate.errors), event])
        cb(null, [null, event])
      }))
      .pipe(es.map(([errorMessage, event], cb) => {
        if (errorMessage) {
          validationError = true
          const output = RED + JSON.stringify(event) + NC + "\n" +
            RED + "  ERROR: " + errorMessage + NC + "\n"
          cb(null, output)
        } else {
          const output = GREEN + JSON.stringify(event) + NC + "\n"
          cb(null, output)
        }
      }))
      .on('end', () => resolve(validationError))
      .on('error', reject)
      .pipe(process.stdout)
  })
}

validateEvents(ajv)
  .then(validationError => process.exit(validationError ? 1 : 0))
  .catch(err => {
    console.error(`${RED}${err}${NC}`)
    process.exit(1)
  })
