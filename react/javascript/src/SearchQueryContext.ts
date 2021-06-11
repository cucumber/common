import React from 'react'
import * as messages from '@cucumber/messages'
import statusName from './components/gherkin/statusName'

const defaultQuerySearchParam = 'search'
const defaultHideStatusesSearchParam = 'hide'

const defaultQuery = ''
const defaultHiddenStatuses: readonly string[] = [
  statusName(messages.TestStepResultStatus.UNKNOWN),
]

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

export interface SearchQueryProps {
  readonly query?: string
  readonly hiddenStatuses?: readonly string[]
}

export interface SearchQuery {
  readonly query: string
  readonly hiddenStatuses: readonly string[]
}

export type RenderSearchURLFn = (query: SearchQuery) => string

function toSearchQuery(iQuery?: SearchQueryProps): SearchQuery {
  return {
    query: iQuery?.query != null ? iQuery.query : defaultQuery,
    hiddenStatuses:
      iQuery?.hiddenStatuses != null
        ? iQuery.hiddenStatuses
        : defaultHiddenStatuses,
  }
}

export function searchFromURLParams(
  querySearchParam: string = defaultQuerySearchParam,
  hideStatusesSearchParam: string = defaultHideStatusesSearchParam,
  getURL: () => string = () => window.location.toString()
): {
  searchQuery: SearchQueryProps
  renderSearchURL: RenderSearchURLFn
} {
  const url = new URL(getURL())
  const hiddenStatusesParams = url.searchParams.getAll(hideStatusesSearchParam)

  function toURL(query: SearchQuery): string {
    const url = new URL(getURL())

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
      query.hiddenStatuses.forEach((s) =>
        url.searchParams.append(hideStatusesSearchParam, s)
      )
    }

    return url.toString()
  }

  return {
    searchQuery: {
      query: url.searchParams.get(querySearchParam),
      hiddenStatuses:
        hiddenStatusesParams.length === 0
          ? null
          : hiddenStatusesParams.filter((n) => n !== ''),
    },
    renderSearchURL: toURL,
  }
}

export class SearchQueryCtx implements SearchQuery {
  readonly query: string
  readonly hiddenStatuses: readonly string[]
  private readonly updateValue: (query: SearchQuery) => void

  constructor(
    value: SearchQueryProps,
    updateValue?: (query: SearchQuery) => void
  ) {
    const q = toSearchQuery(value)
    this.query = q.query
    this.hiddenStatuses = q.hiddenStatuses
    this.updateValue =
      updateValue ||
      (() => {
        // Do nothing
      })
  }

  update = (values: SearchQueryProps) => {
    this.updateValue({
      query: values.query != null ? values.query : this.query,
      hiddenStatuses:
        values.hiddenStatuses != null
          ? values.hiddenStatuses
          : this.hiddenStatuses,
    })
  }
}

export default React.createContext<SearchQueryCtx>(new SearchQueryCtx({}))
