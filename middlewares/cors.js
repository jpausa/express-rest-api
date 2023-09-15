import cors from 'cors'

const ACCEPTED_ORIGINS = [
  'http://localhost:3000',
  'https://movies-app-react.netlify.app'
]

export const corsMiddleware = (acceptedOrigins = ACCEPTED_ORIGINS) =>
  cors({
    origin: (origin, callback) => {
      if (acceptedOrigins.includes(origin) || !origin) {
        return callback(null, true)
      }
      return new Error('Not allowed by CORS')
    }
  })
