import express, { json } from 'express'
import { corsMiddleware } from './middlewares/cors.js'
import { createMovieRouter } from './router/movies.js'

export const createApp = ({ movieModel }) => {
  const app = express()
  app.use(json())
  app.use(corsMiddleware())
  app.use('/movies', createMovieRouter({ movieModel }))
  app.disable('x-powered-by')

  const PORT = process.env.PORT || 1234

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
  })
}
