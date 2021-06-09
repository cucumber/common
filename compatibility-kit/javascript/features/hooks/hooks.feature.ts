import { When, Before, After } from '@cucumber/fake-cucumber'
import fs from 'fs'

Before(function () {
  // no-op
})

When('a step passes', function () {
  // no-op
})

When('a step throws an exception', function () {
  throw new Error('Exception in step')
})

After(function () {
  throw new Error('Exception in hook')
})

After('@some-tag or @some-other-tag', function () {
  throw new Error('Exception in conditional hook')
})

After('@with-attachment', async function () {
  await this.attach(fs.createReadStream(__dirname + '/cucumber.svg'), 'image/svg+xml')
})
