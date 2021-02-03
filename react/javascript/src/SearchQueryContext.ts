import React from 'react'

export interface SearchQuery {
  query?: string
  updateQuery: (query: string) => any
}

export default React.createContext<SearchQuery>({
  query: '',
  updateQuery: () => {
    /*Do nothing*/
  },
})
