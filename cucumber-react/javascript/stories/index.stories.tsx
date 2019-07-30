import { storiesOf } from '@storybook/react'
import React from 'react'
import Feature from "../src/components/gherkin/Feature"
import { messages } from "cucumber-messages"

import rulesJson from "../testdata/rules.json"
import escapedPipesJson from "../testdata/escaped_pipes.json"
import testJson from "../testdata/test.json"
import IGherkinDocument = messages.IGherkinDocument

storiesOf('Features', module)
  .add('rules.feature', () => {
    return <Feature feature={(rulesJson.gherkinDocument as IGherkinDocument).feature}/>
  })
  .add('escaped_pipes.feature', () => {
    return <Feature feature={(escapedPipesJson.gherkinDocument as IGherkinDocument).feature}/>
  })
  .add('test.feature', () => {
    return <Feature feature={(testJson.gherkinDocument as IGherkinDocument).feature}/>
  })
