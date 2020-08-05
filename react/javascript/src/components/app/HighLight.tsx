import React from 'react'
import { findAll, Chunk } from '../highlight-words'
import SearchQueryContext from '../../SearchQueryContext'
import elasticlunr from 'elasticlunr'

interface IProps {
  text: string
  htmlText?: boolean,
  className?: string
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
  let highlightIndex = -1
  return chunks.reduce((elements: JSX.Element[], chunk) => {
    const chunkText = text.slice(chunk.start, chunk.end)
    highlightIndex += 1
    if (chunk.highlight) {
      elements.push(<mark key={highlightIndex}>{chunkText}</mark>)
    } else {
      elements.push(<span key={highlightIndex}>{chunkText}</span>)
    }
    return elements
  }, [])
}

const HighLight: React.FunctionComponent<IProps> = ({
  text,
  htmlText = false,
  className = ''
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

  const appliedClassName = className ? `highlight ${className}` : 'highlight'

  if (htmlText) {
    return (
      <div
        className={appliedClassName}
        dangerouslySetInnerHTML={{ __html: highlightText(text, chunks) }}
      />
    )
  }

  return <span className={appliedClassName}>{highlightElements(text, chunks)}</span>
}

export default HighLight
