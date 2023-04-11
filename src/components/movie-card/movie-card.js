import React from 'react'
import { Image, Rate } from 'antd'
import format from 'date-fns/format'
import enGB from 'date-fns/locale/en-GB'

import './movie-card.css'
import img from './poster_none.jpg'

export default class Card extends React.Component {
  state = {
    rating: 0,
    error: false,
  }

  componentDidMount() {
    this.setState({ rating: this.props.rated })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.rated !== this.props.rated) {
      this.setState({ rating: this.props.rated })
    }
  }

  componentDidCatch(err) {
    console.log(err)
    this.setState({ error: true })
  }

  descriptionSlicer = (text, title) => {
    let des = text
    if (des.length > 173 && title.length < 27) {
      des = des.replace(/^(.{170}[\w]*).*/, '$1') + '...'
    } else if (des.length > 153 && title.length < 60) {
      des = des.replace(/^(.{150}[\w]*).*/, '$1') + '...'
    } else if (des.length > 33 && title.length >= 60) {
      des = des.replace(/^(.{30}[\w]*).*/, '$1') + '...'
    }
    return des
  }

  formatDate = (date) => {
    if (typeof date === 'string') {
      try {
        return format(new Date(date), 'dd MMMM, yyyy', { locale: enGB })
      } catch {
        return date
      }
    } else {
      return null
    }
  }

  setColorStyle = (rate) => {
    if (rate < 3 && rate !== 0) {
      return { borderColor: '#E90000' }
    } else if (rate < 5 || rate === 0) {
      return { borderColor: '#E97E00' }
    } else if (rate < 7) {
      return { borderColor: '#E9D100' }
    } else {
      return { borderColor: '#66E900' }
    }
  }

  renderGenres = (arr) => {
    if (arr.length === 0) {
      return null
    }
    if (arr.length >= 2) {
      return (
        <React.Fragment>
          <button type="button" className="genres">
            {arr[0].name}
          </button>
          <button type="button" className="genres">
            {arr[1].name}
          </button>
        </React.Fragment>
      )
    } else {
      return (
        <button type="button" className="genres">
          {arr[0].name}
        </button>
      )
    }
  }

  render() {
    if (this.state.error) {
      return (
        <div className="card mb-4 row g-0">
          <div className="col-5">
            <Image src={img} className="card-img" />
          </div>
          <div className="col-7">
            <div className="card-body">
              <h5 className="card-title">An unexpected error has occurred</h5>
              <p className="card-text">We are already working on fixing it</p>
            </div>
            <Rate allowHalf={true} value={0} count={10} disabled={true} style={{ fontSize: 15.5, marginLeft: 15 }} />
          </div>
        </div>
      )
    }
    const { id, poster, voteAverage, title, release, genres, description, guestID, sessionService } = this.props
    return (
      <div className="card mb-4 row g-0">
        <div className="col-5">
          <Image src={`https://image.tmdb.org/t/p/w220_and_h330_face${poster}`} className="card-img" fallback={img} />
        </div>
        <div className="col-7">
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <div className="rate-circle" style={this.setColorStyle(voteAverage)}>
              {voteAverage === 0 ? '?' : Math.round(voteAverage * 10) / 10}
            </div>
            <p className="card-text card-genres">
              <small className="text-body-secondary">{this.formatDate(release)}</small>
            </p>
            <p className="card-text d-flex">{this.renderGenres(genres)}</p>
            <p className="card-text">{this.descriptionSlicer(description, title)}</p>
          </div>
          <Rate
            allowHalf={true}
            value={this.state.rating}
            count={10}
            style={{ fontSize: 15.5, marginLeft: 15 }}
            onChange={(rate) => {
              sessionService.rateMovie(rate, id, guestID).catch(() => {
                this.setState({ error: true })
              })
              this.setState({ rating: rate })
            }}
          />
        </div>
      </div>
    )
  }
}
