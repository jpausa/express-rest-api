import { validateMovie, validatePartialMovie } from '../schemas/movies.js'

export class MovieController {
  constructor ({ movieModel }) {
    this.movieModel = movieModel
  }

  getAllMovies = async (req, res) => {
    const { genre } = req.query

    const movies = await this.movieModel.getAll({ genre })
    return res.json(movies)
  }

  getMovieById = async (req, res) => {
    const { id } = req.params
    const movie = await this.movieModel.getById({ id })

    if (movie) return res.json(movie)
    return res.status(404).json({ error: 'Movie not found' })
  }

  createMovie = async (req, res) => {
    const body = req.body
    const validationResult = validateMovie(body)
    if (validationResult.error) {
      return res.status(400).json(JSON.parse(validationResult.error.message))
    }

    const newMovie = await this.movieModel.create({ data: body })
    return res.status(201).json(newMovie)
  }

  updateMovie = async (req, res) => {
    const body = req.body

    const validationResult = validatePartialMovie(body)
    if (validationResult.error) {
      return res.status(400).json(JSON.parse(validationResult.error.message))
    }

    const { id } = req.params

    const updatedMovie = await this.movieModel.update({ id, data: body })

    if (updatedMovie) return res.json(updatedMovie)
    return res.status(404).json({ error: 'Movie not found' })
  }

  deleteMovieById = async (req, res) => {
    const { id } = req.params
    const movies = await this.movieModel.delete({ id })

    if (movies) return res.json(movies)
    return res.status(404).json({ error: 'Movie not found' })
  }
}
