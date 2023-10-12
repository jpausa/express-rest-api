import { Router } from 'express'
import { MovieController } from '../controllers/movies.js'

export const createMovieRouter = ({ movieModel }) => {
  const movieRouter = Router()

  const movieController = new MovieController({ movieModel })

  movieRouter.get('/', movieController.getAllMovies)

  movieRouter.get('/:id', movieController.getMovieById)

  movieRouter.post('/', movieController.createMovie)

  movieRouter.patch('/:id', movieController.updateMovie)

  movieRouter.delete('/:id', movieController.deleteMovieById)

  return movieRouter
}
