import { Router } from "express"
import { readJSON } from "../utils/custom-require.js"
import { randomUUID } from "node:crypto"
import { validateMovie, validatePartialMovie } from "../schemas/movies.js"

export const movieRouter = Router()

const movies = readJSON("../movies.json")

movieRouter.get("/", (req, res) => {
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

movieRouter.get("/:id", (req, res) => {
  const { id } = req.params
  const movie = movies.find((movie) => movie.id === id)
  if (movie) {
    res.json(movie)
  } else {
    res.status(404)
    res.json({ error: "Movie not found" })
  }
})

movieRouter.post("/", (req, res) => {
  const body = req.body

  const validationResult = validateMovie(body)

  if (validationResult.error) {
    return res.status(400).json(JSON.parse(validationResult.error.message))
  }

  const newMovie = {
    id: randomUUID(),
    ...validationResult.data,
  }
  movies.push(newMovie)
  res.status(201).json(newMovie)
})

movieRouter.patch("/:id", (req, res) => {
  const validationResult = validatePartialMovie(req.body)

  if (validationResult.error) {
    return res.status(400).json(JSON.parse(validationResult.error.message))
  }
  const { id } = req.params
  const movieIndex = movies.movies.findIndex((movie) => movie.id === id)

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
