import React from 'react'
import { findAll, Chunk } from '../highlight-words'
import SearchQueryContext from '../../SearchQueryContext'
import elasticlunr from 'elasticlunr'

interface IProps {
  text: string
  htmlText?: boolean
}

const allQueryWords = (queryWords: string[]): string[] => {
  return queryWords.reduce((allWords, word) => {
    const stem = elasticlunr.stemmer(word)
    allWords.push(word)

    if (stem !== word) {
      allWords.push(stem)
    }
    return allWords
  }, [])
}

const highlightText = (text: string, chunks: Chunk[]): string => {
  return chunks.reduce((highlighted, chunk) => {
    const chunkText = text.slice(chunk.start, chunk.end)
    if (chunk.highlight) {
      return `${highlighted}<mark>${chunkText}</mark>`
    }
    return `${highlighted}${chunkText}`
  }, '')
}

const highlightElements = (text: string, chunks: Chunk[]): JSX.Element[] => {
  return chunks.reduce((elements: JSX.Element[], chunk) => {
    const chunkText = text.slice(chunk.start, chunk.end)
    if (chunk.highlight) {
      elements.push(<mark>{chunkText}</mark>)
    } else {
      elements.push(<span>{chunkText}</span>)
    }
    return elements
  }, [])
}

const HighLight: React.FunctionComponent<IProps> = ({
  text,
  htmlText = false,
}) => {
  const searchQueryContext = React.useContext(SearchQueryContext)
  const queryWords = allQueryWords(
    searchQueryContext.query ? searchQueryContext.query.split(' ') : []
  )
  const chunks = findAll({
    searchWords: queryWords,
    textToHighlight: text,
    htmlText,
  })

  if (htmlText) {
    return (
      <span
        className="highlight"
        dangerouslySetInnerHTML={{ __html: highlightText(text, chunks) }}
      />
    )
  }

  return <span className="highlight">{highlightElements(text, chunks)}</span>
}

export default HighLight
