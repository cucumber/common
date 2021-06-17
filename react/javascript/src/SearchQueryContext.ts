import React, { useState } from 'react'
import * as messages from '@cucumber/messages'
import statusName from './components/gherkin/statusName'

const defaultQuerySearchParam = 'search'
const defaultHideStatusesSearchParam = 'hide'

const defaultQuery = ''
const defaultHiddenStatuses: readonly string[] = [statusName(messages.TestStepResultStatus.UNKNOWN)]

function isDefault(hiddenStatuses: readonly string[]): boolean {
  if (hiddenStatuses.length !== defaultHiddenStatuses.length) {
    return false
  }

  for (const s of hiddenStatuses) {
    if (!defaultHiddenStatuses.includes(s)) {
      return false
    }
  }

  return true
}

export interface SearchQueryUpdate {
  readonly query?: string
  readonly hiddenStatuses?: readonly string[]
}

export interface SearchQuery {
  readonly query: string
  readonly hiddenStatuses: readonly string[]
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
  hideStatusesSearchParam?: string
  windowUrlApi?: WindowUrlApi
}): SearchQueryProps {
  const querySearchParam = opts?.querySearchParam ?? defaultQuerySearchParam
  const hideStatusesSearchParam = opts?.hideStatusesSearchParam ?? defaultHideStatusesSearchParam
  const windowUrlApi = opts?.windowUrlApi ?? defaultWindowUrlApi

  function onSearchQueryUpdated(query: SearchQuery): void {
    const url = new URL(windowUrlApi.getURL())

    if (query.query !== defaultQuery) {
      url.searchParams.set(querySearchParam, query.query)
    } else {
      url.searchParams.delete(querySearchParam)
    }
    url.searchParams.delete(hideStatusesSearchParam)
    if (!isDefault(query.hiddenStatuses)) {
      if (query.hiddenStatuses.length == 0) {
        url.searchParams.set(hideStatusesSearchParam, '')
      }
      query.hiddenStatuses.forEach((s) => url.searchParams.append(hideStatusesSearchParam, s))
    }

    windowUrlApi.setURL(url.toString())
  }

  const url = new URL(windowUrlApi.getURL())
  const hiddenStatusesParams = url.searchParams.getAll(hideStatusesSearchParam)

  return {
    query: url.searchParams.get(querySearchParam),
    hiddenStatuses:
      hiddenStatusesParams.length === 0 ? null : hiddenStatusesParams.filter((n) => n !== ''),
    onSearchQueryUpdated,
  }
}

function toSearchQuery(iQuery?: SearchQueryUpdate): SearchQuery {
  return {
    query: iQuery.query ?? defaultQuery,
    hiddenStatuses: iQuery.hiddenStatuses ?? defaultHiddenStatuses,
  }
}

export class SearchQueryCtx implements SearchQuery {
  readonly query: string
  readonly hiddenStatuses: readonly string[]
  readonly update: (query: SearchQueryUpdate) => void

  constructor(value: SearchQuery, updateValue: SearchQueryUpdateFn) {
    this.query = value.query
    this.hiddenStatuses = value.hiddenStatuses
    this.update = (values: SearchQueryUpdate) => {
      updateValue({
        query: values.query ?? this.query,
        hiddenStatuses: values.hiddenStatuses ?? this.hiddenStatuses,
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
