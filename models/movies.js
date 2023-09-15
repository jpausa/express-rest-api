import { readJSON } from "../utils/custom-require.js"
import { randomUUID } from "node:crypto"

const movies = readJSON("../movies.json")

export class MovieModel {
  static async getAll({ genre }) {
    if (genre) {
      return movies.filter((movie) =>
        movie.genre.some(
          (movieGenre) => movieGenre.toLowerCase() === genre.toLowerCase()
        )
      )
    }
    return movies
  }

  static async getById({ id }) {
    return movies.find((movie) => movie.id === id)
  }

  static async create({ data }) {
    const newMovie = {
      id: randomUUID(),
      ...data,
    }
    movies.push(newMovie)
    return newMovie
  }

  static async update({ id, data }) {
    const movieIndex = movies.findIndex((movie) => movie.id === id)

    if (movieIndex < 0) {
      return false
    }

    const updatedMovie = {
      ...movies[movieIndex],
      ...data,
    }
    
    movies[movieIndex] = updatedMovie
    return updatedMovie
  }
}
