#!/usr/bin/env node
/* This script reads an ndjson stream of cucumber events from STDIN
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
const ajv = new Ajv();
const RED   = '\033[0;31m'
const GREEN = '\033[0;32m'
const NC    = '\033[0m'


const loadSchemas = (schemaDir) => {
  return fs.readdir(schemaDir)
    .then(fileNames => Promise.all(
      fileNames.map(
        fileName => fs.readFile(path.join(schemaDir, fileName), 'utf-8')
          .then(schemaSource => [path.basename(fileName, '.json'), ajv.compile(JSON.parse(schemaSource))])
      )
    ))
    .then(fileNameSourcePairs => new Map(fileNameSourcePairs))
}

const validateEvents = (schemas) => {
  let validationError = false
  return new Promise((resolve, reject) => {
    process.stdin
      .pipe(es.split())
      .pipe(es.map((json, cb) => json ? cb(null, JSON.parse(json)) : cb()))
      .pipe(es.map((event, cb) => {
        const validate = schemas.get(event.type)
        if(!validate) return cb(null, [`No schema for ${inspect(event)}`, event])
        const valid = validate(event)
        if (!valid) return cb(null, [JSON.stringify(validate.errors), event])
        cb(null, [null, event])
      }))
      .pipe(es.map(([errorMessage, event], cb) => {
        if(errorMessage) {
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

loadSchemas(__dirname + '/schemas')
  .then(schemas => validateEvents(schemas))
  .then(validationError => process.exit(validationError ? 1 : 0))
  .catch(err => {
    console.error(`${RED}${err}${NC}`)
    process.exit(1)
  })
