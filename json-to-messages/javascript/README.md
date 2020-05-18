# cucumber/json-to-messages

A library to tranlate legacy JSON output from various cucumber implementations to
`cucumber-messages`.

Currently supports output from:
 * `behave`
 * `cucumber-java`
 * `cucumber-javascript`
 * `cucumber-ruby``

## InstalLing

You can install this tool using npm:

```shell
npm install @cucumber/json-to-messages
```

## Using the CLI

Send the content of your json file to the CLI:

```shell
cat my_report.json | ./node_modules/.bin/json-to-features > my_report.messages
```

By default, the tool will detect the cucumber implementation used to generate the report but you can specify it manually:

```shell
cat my_report.json | ./node_modules/.bin/json-to-features --implementation cucumber-js > my_report.messages
```

## Using as a library

```typescript
import { jsonToMessages } from '@cucumber/json-to-messages'

const JSONs: Readable = ... // The JSON reports to translate
const outputStream: Writable = ... // A sstream to write the messages to
jsonToMessages(JSONs, outputStream)
```
