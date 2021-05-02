# cucumber/json-to-messages

A library to translate legacy JSON output from various cucumber implementations to
`cucumber-messages`.

Currently supports output from:
 * `behave`
 * `cucumber-java`
 * `cucumber-javascript`
 * `cucumber-ruby`

## Installing

You can install this tool using npm:

```shell
npm install @cucumber/json-to-messages
```

## Using the CLI

Send the content of your json file to the CLI:

```shell
cat my_report.json | ./node_modules/.bin/json-to-messages > my_report.ndjson
```

By default, the tool will detect the cucumber implementation used to generate the report but you can specify it manually:

```shell
cat my_report.json | ./node_modules/.bin/json-to-messages --implementation cucumber-js > my_report.ndjson
```

## Using as a library

```typescript
import { jsonToMessages } from '@cucumber/json-to-messages'

const JSONs: Readable = ... // The JSON reports to translate
const outputStream: Writable = ... // A stream to write the messages to
jsonToMessages(JSONs, outputStream)
```
