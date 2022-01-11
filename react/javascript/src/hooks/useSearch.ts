import { useContext } from 'react'
import SearchQueryContext, { SearchQueryCtx } from '../SearchQueryContext'

export function useSearch(): SearchQueryCtx {
  return useContext(SearchQueryContext)
}
