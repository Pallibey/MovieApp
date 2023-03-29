async function swapiService() {
  const res = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=3e7f6ca038985d64d620cf93d6a3bb77')
  const body = await res.json()
  return body.results
}

export default swapiService
