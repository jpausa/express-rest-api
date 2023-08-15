const z = require("zod")

const movieSchema = z.object({
  title: z.string(),
  director: z.string(),
  year: z.number().int().positive().min(1900),
  genre: z.array(
    z.enum([
      "Action",
      "Comedy",
      "Drama",
      "Horror",
      "Romance",
      "Sci-fi",
      "Adventure",
      "Crime",
      "Animation",
      "Biography",
      "Fantasy",
      "History"
    ])
  ),
  rate: z.number().min(1).max(10),
  poster: z.string().url(),
  duration: z.number().positive(),
})

const validateMovie = (movieObject) => {
  return movieSchema.safeParse(movieObject)
}

const validatePartialMovie = (movieObject) => {
    return movieSchema.partial().safeParse(movieObject)
  }

module.exports = {
  validateMovie,
  validatePartialMovie
}
