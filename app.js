import express, { json } from 'express'
import { corsMiddleware } from './middlewares/cors.js'
import { movieRouter } from './router/movies.js'

const app = express()
app.use(json())
app.use(corsMiddleware())
app.use('/movies', movieRouter)
app.disable('x-powered-by')

const PORT = process.env.PORT || 1234

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
