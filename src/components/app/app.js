import React from 'react'
import { Offline } from 'react-detect-offline'
import { Alert, Tabs } from 'antd'
import './app.css'

import CardsList from '../cards-list/cards-list'
import SearchPanel from '../search-panel/search-panel'
import ErrorMsg from '../error-msg/error-msg'
import { MovieService, SessionService } from '../../services/swapi-service'
import { SwapiServiceProvider } from '../swapi-service-context/swapi-service-context'

export default class App extends React.Component {
  state = {
    searchingText: '',
    genresData: [],
    guestID: null,
    error: false,
  }

  movieService = new MovieService()
  sessionService = new SessionService()

  componentDidMount() {
    this.getGenres()
    if (localStorage.getItem('guestID') === null) {
      this.sessionService.createGuestSession().then((data) => {
        localStorage.setItem('guestID', data.guest_session_id)
        this.setState({ guestID: data.guest_session_id })
      })
    } else {
      this.setState({ guestID: localStorage.getItem('guestID') })
    }
  }

  componentDidCatch(err) {
    console.log(err)
    this.setState({ error: true })
  }

  getGenres = () => {
    this.movieService.getGenres().then((genresArr) => {
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
    if (this.state.error === true) {
      return <ErrorMsg />
    }
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
                      movieService={this.movieService}
                      sessionService={this.sessionService}
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
                      movieService={this.movieService}
                      sessionService={this.sessionService}
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
