import { Router } from 'express'
import { MovieController } from '../controllers/movies.js'

export const movieRouter = Router()

movieRouter.get('/', MovieController.getAllMovies)

movieRouter.get('/:id', MovieController.getMovieById)

movieRouter.post('/', MovieController.createMovie)

movieRouter.patch('/:id', MovieController.updateMovie)

movieRouter.delete('/:id', MovieController.deleteMovieById)
