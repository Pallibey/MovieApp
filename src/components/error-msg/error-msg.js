import React from 'react'
import { Offline, Online } from 'react-detect-offline'

import './error-msg.css'
import icon from './error-icon.jpg'

const ErrorMsg = () => {
  return (
    <div>
      <img width={350} src={icon} alt="изображение сообщения ошибки" />
      <figure className="text-center">
        <blockquote className="blockquote">
          <p>Oops, something seems to have gone wrong</p>
        </blockquote>
        <figcaption className="blockquote-footer">
          <Online>
            <cite title="Source Title">But we are already working on it</cite>
          </Online>
          <Offline>
            <cite title="Source Title">Check your network connection</cite>
          </Offline>
        </figcaption>
      </figure>
    </div>
  )
}

export default ErrorMsg
