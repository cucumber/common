import React from 'react'
import Highlighter from 'react-highlight-words'
import SearchQueryContext from '../../SearchQueryContext'
import elasticlunr from 'elasticlunr'

interface IProps {
  text: string
}

const HighLight: React.FunctionComponent<IProps> = ({ text }) => {
  const searchQueryContext = React.useContext(SearchQueryContext)
  const queryWords = searchQueryContext.query
    ? searchQueryContext.query.split(' ')
    : []
  const searchWords: string[] = []

  for (const word of queryWords) {
    const stem = elasticlunr.stemmer(word)
    searchWords.push(word)

    if (stem !== word) {
      searchWords.push(stem)
    }
  }

  elasticlunr.stemmer

  return (
    <Highlighter
      className="highlight"
      highlightClassName="YourHighlightClass"
      searchWords={searchWords}
      autoEscape={true}
      textToHighlight={text}
    />
  )
}

export default HighLight
