import assert from 'assert'
import React from 'react'

class IdGenerator {
  private generatedIds: string[] = []

  public generate(title: string): string {
    let id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-')

    if (id.match(/^-*$/)) {
      id = 'id'
    }

    if (!this.idAlreadyUsed(id)) {
      this.generatedIds.push(id)
      return id
    }

    let index = 1
    while (this.idAlreadyUsed(`${id}-${index}`)) {
      index += 1
    }
    this.generatedIds.push(`${id}-${index}`)
    return `${id}-${index}`
  }

  private idAlreadyUsed(id: string): boolean {
    return this.generatedIds.includes(id)
  }
}

describe('IdGenerator', () => {
  context('generate', () => {
    it('generates lower case ids', () => {
      const generator = new IdGenerator()

      assert.equal(generator.generate('Scenario'), 'scenario')
    })

    it('generates id without spaces or special characters', () => {
      const generator = new IdGenerator()

      assert.equal(
        generator.generate('Scenario 12 :()/#é Test'),
        'scenario-12-test'
      )
    })

    it('generates unique id', () => {
      const generator = new IdGenerator()

      assert.equal(generator.generate('My Scenario'), 'my-scenario')
      assert.equal(generator.generate('My Scenario'), 'my-scenario-1')
      assert.equal(generator.generate('My Scenario'), 'my-scenario-2')
      assert.equal(generator.generate('My Scenario 1'), 'my-scenario-1-1')
    })

    it('generates a default id', () => {
      const generator = new IdGenerator()

      assert.equal(generator.generate('日本'), 'id')
    })

    it('generates a default unique id', () => {
      const generator = new IdGenerator()

      assert.equal(generator.generate('日本'), 'id')
      assert.equal(generator.generate('日本'), 'id-1')
    })
  })
})

export default React.createContext(new IdGenerator())
