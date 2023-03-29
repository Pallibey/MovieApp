import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import CardsList from './components/cards-list/cards-list'

const App = () => {
  return (
    <main className="movie-list d-flex flex-wrap  justify-content-around">
      <CardsList />
    </main>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
