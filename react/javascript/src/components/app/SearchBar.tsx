import React, { Component, useState } from 'react'

interface IProps {
  queryUpdated: (event: any) => any
}

const SearchBar: React.FunctionComponent<IProps> = ({ queryUpdated }) => {
  const [query, setQuery] = useState('');

  return (
    <div className="cucumber-search-bar">
      <input type="text" onChange={(event) => setQuery(event.target.value)}/>
      <input type="button" onClick={() => queryUpdated(query)} value="go" />
    </div>
  )
}


export default SearchBar