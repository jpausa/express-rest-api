import { Router } from "express"
import { validateMovie, validatePartialMovie } from "../schemas/movies.js"
import { MovieModel } from "../models/movies.js"

export const movieRouter = Router()

movieRouter.get("/", async (req, res) => {
  const { genre } = req.query

  const movies = await MovieModel.getAll({ genre })
  return res.json(movies)
})

movieRouter.get("/:id", async (req, res) => {
  const { id } = req.params
  const movie = await MovieModel.getById({ id })

  if (movie) return res.json(movie)
  return res.status(404).json({ error: "Movie not found" })
})

movieRouter.post("/", async (req, res) => {
  const body = req.body
  const validationResult = validateMovie(body)
  if (validationResult.error) {
    return res.status(400).json(JSON.parse(validationResult.error.message))
  }

  const newMovie = await MovieModel.create({ data: body })
  return res.status(201).json(newMovie)
})

movieRouter.patch("/:id", async (req, res) => {
  const body = req.body

  const validationResult = validatePartialMovie(body)
  if (validationResult.error) {
    return res.status(400).json(JSON.parse(validationResult.error.message))
  }

  const { id } = req.params

  const updatedMovie = await MovieModel.update({ id, data: body })

  if (updatedMovie) return res.json(updatedMovie)
  return res.status(404).json({ error: "Movie not found" })
})
