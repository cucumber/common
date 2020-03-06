import React, { useState } from 'react'
import { messages } from '@cucumber/messages'

interface IProps {
    query: string
    matches: messages.IGherkinDocument[]
  }

  const NoMatchResult: React.FunctionComponent<IProps> = ({ query, matches }) => {

    const showNoMatchMessage = query !== '' && matches.length === 0

    return (
        <p>{showNoMatchMessage && `No match found for: "${query}"`}</p>
    )
  }

export default NoMatchResult
