import React from 'react'
import { Pagination } from 'antd'

import Card from '../movie-card/movie-card'
import LoadingIndicator from '../loading-indicator/loading-indicator'
import ErrorMsg from '../error-msg/error-msg'
import { SwapiServiceConsumer } from '../swapi-service-context/swapi-service-context'

export default class CardsList extends React.Component {
  state = {
    data: [],
    ratedData: [],
    status: 'loading',
    currentPage: 1,
    currentPageRated: 1,
    totalItems: 0,
    totalItemsRated: 0,
  }

  componentDidMount() {
    if (this.props.tab === 1) {
      this.getTopRated(this.state.currentPage)
    }
    this.getRated(this.props.guestID)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.searchingText !== this.props.searchingText) {
      if (this.props.searchingText !== '') {
        this.getMovie(this.props.searchingText)
      } else {
        this.getTopRated(1)
      }
    }
  }

  getTopRated = (page) => {
    const service = this.props.swapiService
    this.setState({ status: 'loading' })
    service
      .getTopRated(page)
      .then((body) => {
        const { results } = body
        let { total_results: totalItems } = body
        if (totalItems > 10000) {
          totalItems = 10000
        }
        this.setState({ data: results, status: 'ok', totalItems, currentPage: page })
      })
      .catch(() => {
        this.setState({ status: 'error' })
      })
  }

  getRated = (guestID, page = 1) => {
    if (guestID === null) {
      setTimeout(() => {
        this.getRated(this.props.guestID)
      }, 1000)
      return
    }
    const service = this.props.swapiService
    this.setState({ status: 'loading' })
    service
      .getRated(guestID, page)
      .then((body) => {
        const { results } = body
        let { total_results: totalItemsRated, total_pages: totalPages } = body
        if (totalItemsRated > 10000) {
          totalItemsRated = 10000
        }
        let data = [...this.state.ratedData, ...results]
        this.setState({ ratedData: data, status: 'ok', totalItemsRated })
        if (totalPages > page) {
          this.getRated(guestID, ++page)
        }
      })
      .catch(() => {
        this.setState({ status: 'error' })
      })
  }

  getMovie = (text, page) => {
    this.setState({ status: 'loading' })
    const service = this.props.swapiService
    let replaceSpace = text.replace(/ /g, '+')
    const pageNumber = page ? page : 1
    service
      .getMovie(replaceSpace, pageNumber)
      .then((body) => {
        const { results } = body
        let { total_results: totalItems } = body
        if (totalItems > 10000) {
          totalItems = 10000
        }
        this.setState({ data: results, status: 'ok', totalItems, currentPage: pageNumber })
      })
      .catch(() => {
        this.setState({ status: 'error' })
      })
  }

  onChangePagination = (page) => {
    const { tab } = this.props
    if (tab === 1) {
      if (this.props.searchingText !== '') {
        this.getMovie(this.props.searchingText, page)
      } else {
        this.getTopRated(page)
      }
    } else {
      this.setState({ currentPageRated: page })
    }
  }

  firstTabRender = () => {
    const { data, ratedData } = this.state
    let ratedID = []
    if (typeof ratedData !== 'undefined') {
      ratedID = ratedData.map((element) => {
        return element.id
      })
    }
    return data.map((movie) => {
      let rating = 0
      if (ratedID.includes(movie.id)) {
        rating = ratedData.find((element) => element.id === movie.id).rating
      }
      return (
        <SwapiServiceConsumer key={movie.id}>
          {(genresArr) => {
            let genresNames = genresArr.filter((element) => movie.genre_ids.includes(element.id))
            return (
              <Card
                key={movie.id}
                id={movie.id}
                voteAverage={movie.vote_average}
                poster={movie.poster_path}
                title={movie.title}
                release={movie.release_date}
                genres={genresNames}
                description={movie.overview}
                rated={rating}
                guestID={this.props.guestID}
                swapiService={this.props.swapiService}
              />
            )
          }}
        </SwapiServiceConsumer>
      )
    })
  }

  secondTabRender = (page) => {
    const { ratedData } = this.state
    let check = 1
    let resultArr = ratedData.map((movie) => {
      if (check < page * 20 - 19) {
        check++
        return null
      } else if (check >= page * 20 - 19 && check <= page * 20) {
        check++
        return (
          <SwapiServiceConsumer key={movie.id}>
            {(genresArr) => {
              let genresNames = genresArr.filter((element) => movie.genre_ids.includes(element.id))
              return (
                <Card
                  key={movie.id}
                  id={movie.id}
                  voteAverage={movie.vote_average}
                  poster={movie.poster_path}
                  description={movie.overview}
                  title={movie.title}
                  release={movie.release_date}
                  genres={genresNames}
                  rated={movie.rating}
                  swapiService={this.props.swapiService}
                  guestID={this.props.guestID}
                />
              )
            }}
          </SwapiServiceConsumer>
        )
      } else {
        return null
      }
    })
    return resultArr
  }

  contentRender = () => {
    const { status } = this.state
    let { tab } = this.props
    let content = null
    if (status === 'loading') {
      content = <LoadingIndicator />
    } else if (status === 'ok') {
      if (tab === 1) {
        content = this.firstTabRender()
      } else {
        content = this.secondTabRender(this.state.currentPageRated)
      }
    }
    return content
  }

  render() {
    if (this.state.status === 'error') {
      return <ErrorMsg />
    }
    const { currentPage, currentPageRated, totalItems, totalItemsRated } = this.state
    const { tab } = this.props
    return (
      <React.Fragment>
        <div className="d-flex flex-wrap justify-content-around">{this.contentRender()}</div>
        <Pagination
          className="cards-pagination"
          current={tab === 1 ? currentPage : currentPageRated}
          total={tab === 1 ? totalItems : totalItemsRated}
          defaultPageSize={20}
          onChange={(page) => {
            this.onChangePagination(page)
          }}
          showSizeChanger={false}
        />
      </React.Fragment>
    )
  }
}
