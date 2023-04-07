import React from 'react'
import { Offline } from 'react-detect-offline'
import { Alert, Tabs } from 'antd'
import './app.css'

import CardsList from '../cards-list/cards-list'
import SearchPanel from '../search-panel/search-panel'
import SwapiService from '../../services/swapi-service'
import { SwapiServiceProvider } from '../swapi-service-context/swapi-service-context'

export default class App extends React.Component {
  state = {
    searchingText: '',
    genresData: [],
    guestID: null,
  }

  swapiService = new SwapiService()

  componentDidMount() {
    this.getGenres()
    if (sessionStorage.getItem('guestID') === null) {
      this.swapiService.createGuestSession().then((data) => {
        sessionStorage.setItem('guestID', data.guest_session_id)
        this.setState({ guestID: data.guest_session_id })
      })
    } else {
      this.setState({ guestID: sessionStorage.getItem('guestID') })
    }
  }

  getGenres = () => {
    this.swapiService.getGenres().then((genresArr) => {
      this.setState({ genresData: genresArr })
    })
  }

  onChangeTabs = (key) => {
    this.setState({ tab: key })
  }

  onChangeSearchPanel = (text) => {
    this.setState({ searchingText: text })
  }

  render() {
    return (
      <SwapiServiceProvider value={this.state.genresData}>
        <Offline>
          <Alert
            className="network-alert"
            message="Warning"
            description="You're offline right now. Check your connection."
            type="warning"
            showIcon
            closable
          />
        </Offline>
        <Tabs
          items={[
            {
              key: '1',
              label: 'Search',
              children: (
                <div className="container">
                  <nav className="nav-panel">
                    <SearchPanel onChangeSearchPanel={this.onChangeSearchPanel} />
                  </nav>
                  <main className="movie-list d-flex flex-column align-items-center">
                    <CardsList
                      searchingText={this.state.searchingText}
                      swapiService={this.swapiService}
                      tab={1}
                      guestID={this.state.guestID}
                    />
                  </main>
                </div>
              ),
            },
            {
              key: '2',
              label: 'Rated',
              children: (
                <div className="container">
                  <main className="movie-list d-flex flex-column align-items-center">
                    <CardsList
                      searchingText={this.state.searchingText}
                      swapiService={this.swapiService}
                      tab={2}
                      guestID={this.state.guestID}
                    />
                  </main>
                </div>
              ),
            },
          ]}
          centered={true}
          destroyInactiveTabPane={true}
          onChange={this.onChangeTabs}
        />
      </SwapiServiceProvider>
    )
  }
}
