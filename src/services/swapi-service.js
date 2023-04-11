class MovieService {
  _baseURL = new URL('https://api.themoviedb.org')
  _apiKey = '3e7f6ca038985d64d620cf93d6a3bb77'
  async getTopRated(page) {
    try {
      const link = new URL('/3/movie/popular', this._baseURL)
      link.searchParams.set('api_key', this._apiKey)
      link.searchParams.set('page', page)
      const res = await fetch(link)
      if (!res.ok) {
        throw new Error()
      }
      const body = await res.json()
      return body
    } catch (error) {
      throw new Error(error)
    }
  }
  async getMovie(text, page) {
    try {
      const link = new URL('/3/search/movie', this._baseURL)
      link.searchParams.set('api_key', this._apiKey)
      link.searchParams.set('page', page)
      link.searchParams.set('query', text)
      const res = await fetch(link)
      if (!res.ok) {
        throw new Error()
      }
      const body = await res.json()
      return body
    } catch (error) {
      throw new Error(error)
    }
  }

  async getGenres() {
    try {
      const MoviesLink = new URL('/3/genre/movie/list', this._baseURL)
      MoviesLink.searchParams.set('api_key', this._apiKey)
      const TVLink = new URL('/3/genre/tv/list', this._baseURL)
      TVLink.searchParams.set('api_key', this._apiKey)
      const MoviesRes = await fetch(MoviesLink)
      const TVRes = await fetch(TVLink)
      if (!MoviesRes.ok || !TVRes.ok) {
        throw new Error()
      }
      const MoviesBody = await MoviesRes.json()
      const TVBody = await TVRes.json()
      return [...MoviesBody.genres, ...TVBody.genres]
    } catch (error) {
      throw new Error(error)
    }
  }
}

class SessionService {
  _baseURL = new URL('https://api.themoviedb.org')
  _apiKey = '3e7f6ca038985d64d620cf93d6a3bb77'
  async createGuestSession() {
    try {
      const link = new URL('/3/authentication/guest_session/new', this._baseURL)
      link.searchParams.set('api_key', this._apiKey)
      const res = await fetch(link)
      if (!res.ok) {
        throw new Error()
      }
      const body = await res.json()
      return body
    } catch (error) {
      throw new Error(error)
    }
  }

  async getRated(guestID, page) {
    try {
      const link = new URL(`/3/guest_session/${guestID}/rated/movies`, this._baseURL)
      link.searchParams.set('api_key', this._apiKey)
      link.searchParams.set('page', page)
      const res = await fetch(link)
      if (!res.ok) {
        throw new Error()
      }
      const body = await res.json()
      return body
    } catch (error) {
      throw new Error(error)
    }
  }

  async rateMovie(rate, id, guestID) {
    try {
      const link = new URL(`/3/movie/${id}/rating`, this._baseURL)
      link.searchParams.set('api_key', this._apiKey)
      link.searchParams.set('guest_session_id', guestID)
      const body = {
        value: rate,
      }
      const res = await fetch(link, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(body),
      })
      if (!res.ok) {
        throw new Error()
      }
    } catch (error) {
      throw new Error()
    }
  }
}

export { MovieService, SessionService }
