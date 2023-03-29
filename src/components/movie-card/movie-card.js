import React from 'react'
import { Image } from 'antd'
import format from 'date-fns/format'
import enGB from 'date-fns/locale/en-GB'

function descriptionSlicer(text) {
  let des = text
  if (des.length > 153) {
    des = des.replace(/^(.{150}[\w]*).*/, '$1') + '...'
  }
  return des
}

function formatDate(date) {
  if (typeof date === 'string') {
    return format(new Date(date), 'dd MMMM, yyyy', { locale: enGB })
  } else {
    return null
  }
}

const Card = (props) => {
  const { title, poster, release, description } = props
  return (
    <div className="card mb-4 row g-0">
      <div className="col-5">
        <Image src={`https://image.tmdb.org/t/p/w220_and_h330_face${poster}`} className="img-fluid" />
      </div>
      <div className="col-6">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">
            <small className="text-body-secondary">{formatDate(release)}</small>
          </p>
          <p className="card-text d-flex">
            <button type="button" className="genres">
              genre
            </button>
            <button type="button" className="genres">
              genre
            </button>
          </p>
          <p className="card-text">{descriptionSlicer(description)}</p>
        </div>
      </div>
    </div>
  )
}

export default Card
