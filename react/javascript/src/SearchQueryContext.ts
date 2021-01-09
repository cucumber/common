import React from 'react'

export interface SearchQuery {
  query?: string
  updateQuery: (query: string) => any
}

export function createConstSearchQuery(initialQuery = ''): SearchQuery {
  return {
    query: initialQuery,
    updateQuery: () => {
      // Do nothing
    },
  }
}

export class NavigatingSearchOpts {
  readonly searchParam: string
  readonly location: Location

  constructor(searchParam = 'search', location: Location = window.location) {
    this.searchParam = searchParam
    this.location = location
  }
}

export function updateNavigation(
  search: string,
  options?: NavigatingSearchOpts
) {
  const opts = options || new NavigatingSearchOpts()
  const searchParms = new URLSearchParams(opts.location.search)
  searchParms.set(opts.searchParam, search)
  opts.location.search = searchParms.toString()
}

export function createNavigatingSearchQuery(options?: NavigatingSearchOpts) {
  const opts = options || new NavigatingSearchOpts()
  return {
    query: new URLSearchParams(opts.location.search).get(opts.searchParam),
    updateQuery: (query: string) => updateNavigation(query, opts),
  }
}

export default React.createContext<SearchQuery>(createConstSearchQuery(''))
