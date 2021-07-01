import React, { useState } from 'react'
import { TestStepResultStatus as Status } from '@cucumber/messages'

const defaultQuerySearchParam = 'search'
const defaultShowStatusesSearchParam = 'only'

const defaultQuery = ''
const defaultOnlyShowStatuses: Status[] | null = null

export interface SearchQueryUpdate {
  readonly query?: string
  readonly onlyShowStatuses?: readonly Status[] | null
}

export interface SearchQuery {
  readonly query: string
  readonly onlyShowStatuses: readonly Status[] | null
}

export type SearchQueryUpdateFn = (query: SearchQuery) => void

export interface SearchQueryProps extends SearchQueryUpdate {
  onSearchQueryUpdated?: SearchQueryUpdateFn
}

export interface WindowUrlApi {
  getURL: () => string
  setURL: (url: string) => void
}

const defaultWindowUrlApi: WindowUrlApi = {
  getURL: () => window.location.toString(),
  setURL: (url) => window.history.replaceState({}, '', url),
}

export function searchFromURLParams(opts?: {
  querySearchParam?: string
  showStatusesSearchParam?: string
  windowUrlApi?: WindowUrlApi
}): SearchQueryProps {
  const querySearchParam = opts?.querySearchParam ?? defaultQuerySearchParam
  const showStatusesSearchParam = opts?.showStatusesSearchParam ?? defaultShowStatusesSearchParam
  const windowUrlApi = opts?.windowUrlApi ?? defaultWindowUrlApi

  function onSearchQueryUpdated(query: SearchQuery): void {
    const url = new URL(windowUrlApi.getURL())

    if (query.query !== defaultQuery) {
      url.searchParams.set(querySearchParam, query.query)
    } else {
      url.searchParams.delete(querySearchParam)
    }
    url.searchParams.delete(showStatusesSearchParam)
    if (query.onlyShowStatuses !== null) {
      if (query.onlyShowStatuses.length === 0) {
        url.searchParams.append(showStatusesSearchParam, '')
      } else {
        query.onlyShowStatuses.forEach((s) => url.searchParams.append(showStatusesSearchParam, s))
      }
    }

    windowUrlApi.setURL(url.toString())
  }

  const url = new URL(windowUrlApi.getURL())

  const onlyShowStatusesParams = url.searchParams.getAll(showStatusesSearchParam)

  const onlyShowStatuses =
    onlyShowStatusesParams.length === 0
      ? null
      : onlyShowStatusesParams.length === 1 && onlyShowStatusesParams[0] === ''
      ? []
      : onlyShowStatusesParams
          .filter((s) => (<any>Object).values(Status).includes(s))
          .map((s) => Status[s as keyof typeof Status])

  return {
    query: url.searchParams.get(querySearchParam),
    onlyShowStatuses,
    onSearchQueryUpdated,
  }
}

function toSearchQuery(iQuery?: SearchQueryUpdate): SearchQuery {
  return {
    query: iQuery.query ?? defaultQuery,
    onlyShowStatuses:
      iQuery.onlyShowStatuses === undefined ? defaultOnlyShowStatuses : iQuery.onlyShowStatuses,
  }
}

export class SearchQueryCtx implements SearchQuery {
  readonly query: string
  readonly onlyShowStatuses: readonly Status[] | null
  readonly update: (query: SearchQueryUpdate) => void

  constructor(value: SearchQuery, updateValue: SearchQueryUpdateFn) {
    this.query = value.query
    this.onlyShowStatuses = value.onlyShowStatuses
    this.update = (values: SearchQueryUpdate) => {
      updateValue({
        query: values.query ?? this.query,
        onlyShowStatuses:
          values.onlyShowStatuses === undefined ? this.onlyShowStatuses : values.onlyShowStatuses,
      })
    }
  }

  static withDefaults = (
    value: SearchQueryUpdate,
    onSearchQueryUpdated: SearchQueryUpdateFn = () => {
      //Do nothing
    }
  ) => {
    return new SearchQueryCtx(toSearchQuery(value), onSearchQueryUpdated)
  }
}

export function useSearchQueryCtx(props: SearchQueryProps): SearchQueryCtx {
  const [searchQuery, setSearchQuery] = useState(toSearchQuery(props))
  return new SearchQueryCtx(
    searchQuery,
    props.onSearchQueryUpdated
      ? (query) => {
          props.onSearchQueryUpdated(query)
          setSearchQuery(query)
        }
      : setSearchQuery
  )
}

export default React.createContext<SearchQueryCtx>(SearchQueryCtx.withDefaults({}))
