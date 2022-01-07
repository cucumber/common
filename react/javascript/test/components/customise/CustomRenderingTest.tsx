import assert from 'assert'
import React from 'react'
import { Tags } from '../../../src/components/gherkin'
import * as messages from '@cucumber/messages'
import { render } from '../utils'
import { CucumberReact } from '../../../src/components'

describe('custom rendering and theming', () => {
  it('uses the generated class names from built-in styles by default', () => {
    const tags: messages.Tag[] = [
      {
        id: '123',
        name: 'sometag',
        location: {
          line: 1,
          column: 1,
        },
      },
    ]

    const { container } = render(<Tags tags={tags} />)

    assert.strictEqual(container.querySelector('ul').className, 'tags__generated')
    assert.strictEqual(container.querySelector('ul > li').className, 'tag__generated')
  })

  it('uses the custom classnames provided via custom rendering', () => {
    const tags: messages.Tag[] = [
      {
        id: '123',
        name: 'sometag',
        location: {
          line: 1,
          column: 1,
        },
      },
    ]

    const { container } = render(
      <CucumberReact
        customRendering={{
          Tags: {
            tags: 'custom-list-class',
            tag: 'custom-item-class',
          },
        }}
      >
        <Tags tags={tags} />
      </CucumberReact>
    )

    assert.strictEqual(container.querySelector('ul').className, 'custom-list-class')
    assert.strictEqual(container.querySelector('ul > li').className, 'custom-item-class')
  })

  it('uses a partial of custom classes and falls back to built-in styles where omitted', () => {
    const tags: messages.Tag[] = [
      {
        id: '123',
        name: 'sometag',
        location: {
          line: 1,
          column: 1,
        },
      },
    ]

    const { container } = render(
      <CucumberReact
        customRendering={{
          Tags: {
            tags: 'custom-list-class',
          },
        }}
      >
        <Tags tags={tags} />
      </CucumberReact>
    )

    assert.strictEqual(container.querySelector('ul').className, 'custom-list-class')
    assert.strictEqual(container.querySelector('ul > li').className, 'tag__generated')
  })

  it('uses a custom component implementation where provided', () => {
    const tags: messages.Tag[] = [
      {
        id: '123',
        name: 'sometag',
        location: {
          line: 1,
          column: 1,
        },
      },
    ]

    const CustomComponent = () => {
      return <p>Totally custom!</p>
    }

    const { container } = render(
      <CucumberReact
        customRendering={{
          Tags: CustomComponent,
        }}
      >
        <Tags tags={tags} />
      </CucumberReact>
    )

    assert.strictEqual(container.querySelector('div').innerHTML, '<p>Totally custom!</p>')
  })

  it('a custom component can defer to the default renderer if it wants to', () => {
    const tags: messages.Tag[] = [
      {
        id: '123',
        name: 'sometag',
        location: {
          line: 1,
          column: 1,
        },
      },
    ]

    const CustomComponent = (props: any) => {
      return <props.DefaultRenderer {...props} />
    }

    const { container } = render(
      <CucumberReact
        customRendering={{
          Tags: CustomComponent,
        }}
      >
        <Tags tags={tags} />
      </CucumberReact>
    )

    assert.strictEqual(container.querySelector('ul').className, 'tags__generated')
    assert.strictEqual(container.querySelector('ul > li').className, 'tag__generated')
  })
})
