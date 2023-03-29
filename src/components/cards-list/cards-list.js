import React from 'react'

import Card from '../movie-card/movie-card'
import swapiService from '../../swapiService/swapi-service'

export default class CardsList extends React.Component {
  state = {
    data: [],
  }

  constructor() {
    super()
    this.getData()
  }

  getData = () => {
    swapiService().then((results) => {
      this.setState({ data: results })
    })
  }

  render() {
    return (
      <React.Fragment>
        {this.state.data.map((movie) => {
          return (
            <Card
              key={movie.title}
              poster={movie.poster_path}
              description={movie.overview}
              title={movie.title}
              release={movie.release_date}
            />
          )
        })}
      </React.Fragment>
    )
  }
}
