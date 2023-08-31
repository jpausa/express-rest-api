import cors from "cors"

export const corsMiddleware = () => {
  cors({
    origin: (origin, callback) => {
      const ACCEPTED_ORIGINS = [
        "http://localhost:3000",
        "https://movies-app-react.netlify.app",
      ]
      if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
        return callback(null, true)
      }
      return new Error("Not allowed by CORS")
    },
  })
}
