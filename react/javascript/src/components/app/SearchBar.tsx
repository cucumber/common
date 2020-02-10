import React, { Component } from 'react'

export default class SearchBar extends Component {
  private searched = ""

  handleChange(event: any) : any {
    this.searched = event.target.value
  }

  showSearched(event: any) : any {
    console.log(this.searched)
  }

  render() {
    return (
      <div className="cucumber-search-bar">
        <input type="text" onChange={this.handleChange} />
        <input type="button" onClick={this.showSearched} value="go" />
      </div>
    )
  }
}
