import { Given, Before, After } from '@cucumber/cucumber'

Before(() => {
  //no-op
})

Before('@beforeHook', () => {
  //no-op
})

Before('@failBeforeHook', () => {
  throw new Error('Woops !')
})

After('@beforeHook', () => {
  //no-op
})

Given('a passed step', () => {
  //no-op
})
