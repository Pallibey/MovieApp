import React from 'react'
import { debounce } from 'lodash'

import './search-panel.css'

export default class SearchPanel extends React.Component {
  state = {
    label: '',
  }

  onSubmit = debounce((text) => {
    this.props.onChangeSearchPanel(text)
  }, 3000)

  onChange = (e) => {
    this.setState({ label: e.target.value })
    this.onSubmit(e.target.value)
  }

  render() {
    return (
      <div className="container-fluid">
        <form
          onSubmit={(e) => {
            e.preventDefault()
          }}
          className="d-flex"
          role="search"
        >
          <input
            onChange={this.onChange}
            value={this.state.label}
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
        </form>
      </div>
    )
  }
}
