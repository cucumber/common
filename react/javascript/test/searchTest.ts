import assert from 'assert'
import { messages } from '@cucumber/messages'


function search(query: string): messages.IGherkinDocument[] {
    return []
}

describe('search', () => {
    it('returns an empty array when there are no hits', () => {
        const searchResult = search('banana')

        assert.deepStrictEqual(
            searchResult, []
        )
    })
})