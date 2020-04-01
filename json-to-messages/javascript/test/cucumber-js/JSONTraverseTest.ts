import assert from 'assert'
import { IStep, IDocString } from '../../src/cucumber-js.ts/JSONSchema'
import { stubInterface } from 'ts-sinon'
import IAstMaker from '../../src/IAstMaker'
import { traverseDocString } from '../../src/cucumber-js.ts/JSONTraverse'

describe('traversing elements', () => {
  context('traverseStep', () => {
    const docStringStep: IStep = {
      arguments: [
        {
          content: "  This is some content",
          line: 16
        }
      ],
      keyword: "Given ",
      line: 15,
      name: "a step with a doctring:",
      result: {
        status: "undefined"
      }
    }
    it('correctly parses DocString', () => {

    })
  })

  context('traverseDocString', () => {
    const docString: IDocString = {
      content: "  This is some content",
      line: 16
    }

    it('call AstMaker.makeDocString with the content but no media-type', () => {
      const astMaker = stubInterface<IAstMaker>()

      traverseDocString(docString, astMaker)
      assert.deepEqual(
        astMaker.makeDocstring.getCall(0).args,
        [null, "  This is some content"]
      )
    })
  })
})