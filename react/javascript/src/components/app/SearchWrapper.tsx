import React, { FunctionComponent } from 'react'
import SearchQueryContext, { SearchQueryProps, useSearchQueryCtx } from '../../SearchQueryContext'

export const SearchWrapper: FunctionComponent<SearchQueryProps> = ({
  children,
  ...searchProps
}) => {
  return (
    <SearchQueryContext.Provider value={useSearchQueryCtx(searchProps)}>
      {children}
    </SearchQueryContext.Provider>
  )
}
