const express = require("express")
const crypto = require("node:crypto")
const movies = require("./movies.json")
const { validateMovie, validatePartialMovie } = require("./schemas/movies")

const app = express()
app.use(express.json())
app.disable("x-powered-by")

const PORT = process.env.PORT || 1234

app.get("/movies", (req, res) => {
  const { genre } = req.query

  if (genre) {
    const filteredMovies = movies.filter((movie) =>
      movie.genre.some(
        (movieGenre) => movieGenre.toLowerCase() === genre.toLowerCase()
      )
    )
    return filteredMovies.length > 0
      ? res.json(filteredMovies)
      : res.status(404).json({ error: "Genre not found" })
  }
  res.json(movies)
})

app.get("/movies/:id", (req, res) => {
  const { id } = req.params
  const movie = movies.find((movie) => movie.id === id)
  if (movie) {
    res.json(movie)
  } else {
    res.status(404)
    res.json({ error: "Movie not found" })
  }
})

app.post("/movies", (req, res) => {
  const body = req.body

  const validationResult = validateMovie(body)

  if (validationResult.error) {
    return res.status(400).json(JSON.parse(validationResult.error.message))
  }

  const newMovie = {
    id: crypto.randomUUID(),
    ...validationResult.data,
  }
  movies.push(newMovie)
  res.status(201).json(newMovie)
})

app.patch("/movies/:id", (req, res) => {
  const validationResult = validatePartialMovie(req.body)

  if (validationResult.error) {
    return res.status(400).json(JSON.parse(validationResult.error.message))
  }
  const { id } = req.params
  const movieIndex = movies.findIndex((movie) => movie.id === id)

  if (movieIndex < 0) {
    return res.status(404).json({ error: "Movie not found" })
  }

  const updatedMovie = {
    ...movies[movieIndex],
    ...validationResult.data,
  }
  movies[movieIndex] = updatedMovie
  res.json(updatedMovie)
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
