export default class SwapiService {
  async createGuestSession() {
    try {
      const link =
        'https://api.themoviedb.org/3/authentication/guest_session/new?api_key=3e7f6ca038985d64d620cf93d6a3bb77'
      const res = await fetch(link)
      const body = await res.json()
      return body
    } catch (error) {
      throw new Error(error)
    }
  }

  async getRated(guestID, page) {
    try {
      const link = `https://api.themoviedb.org/3/guest_session/${guestID}/rated/movies?api_key=3e7f6ca038985d64d620cf93d6a3bb77&page=${page}&language=en-US`
      const res = await fetch(link)
      const body = await res.json()
      return body
    } catch (error) {
      throw new Error(error)
    }
  }

  async getTopRated(page) {
    try {
      const link = `https://api.themoviedb.org/3/movie/popular?api_key=3e7f6ca038985d64d620cf93d6a3bb77&page=${page}`
      const res = await fetch(link)
      const body = await res.json()
      return body
    } catch (error) {
      throw new Error(error)
    }
  }

  async getMovie(text, page) {
    try {
      const link = `https://api.themoviedb.org/3/search/movie?api_key=3e7f6ca038985d64d620cf93d6a3bb77&language=en-US&page=${page}&include_adult=false&query=${text}`
      const res = await fetch(link)
      const body = await res.json()
      return body
    } catch (error) {
      throw new Error(error)
    }
  }

  async getGenres() {
    try {
      const MoviesLink =
        'https://api.themoviedb.org/3/genre/movie/list?api_key=3e7f6ca038985d64d620cf93d6a3bb77&language=en-US'
      const TVLink =
        'https://api.themoviedb.org/3/genre/tv/list?api_key=3e7f6ca038985d64d620cf93d6a3bb77&language=en-US'
      const MoviesRes = await fetch(MoviesLink)
      const TVRes = await fetch(TVLink)
      const MoviesBody = await MoviesRes.json()
      const TVBody = await TVRes.json()
      return [...MoviesBody.genres, ...TVBody.genres]
    } catch (error) {
      throw new Error(error)
    }
  }

  rateMovie(rate, id, guestID) {
    const link = `https://api.themoviedb.org/3/movie/${id}/rating?api_key=3e7f6ca038985d64d620cf93d6a3bb77&guest_session_id=${guestID}`
    const body = {
      value: rate,
    }
    fetch(link, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(body),
    })
  }
}
