import mysql from 'mysql2/promise'

const config = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: '',
  database: 'moviesdb'
}

const connection = await mysql.createConnection(config)

export class MovieModel {
  static async getAll ({ genre }) {
    try {
      const [movies] = await connection.query(
        'SELECT title, year, director, duration,poster, rate, BIN_TO_UUID(id) id FROM movie;'
      )
      return movies
    } catch (error) {
      throw new Error('There was an error when trying to get all movies')
    }
  }

  static async getById ({ id }) {
    try {
      const [movie] = await connection.query(
        'SELECT title, year, director, duration,poster, rate, BIN_TO_UUID(id) id FROM movie WHERE id = UUID_TO_BIN(?);',
        [id]
      )
      return movie
    } catch (error) {
      throw new Error('There was an error when trying to get the movie')
    }
  }

  static async update ({ id, data }) {}
  static async delete ({ id }) {}
  static async create ({ data }) {
    const { title, year, director, duration, poster, rate } = data

    const [uuidResult] = await connection.query('SELECT UUID() id;')
    const [{ id }] = uuidResult

    try {
      await connection.query(
        `INSERT INTO movie (id, title, year, director, duration,poster, rate) VALUES ((UUID_TO_BIN("${id}")),?, ?, ?, ?, ?, ?);`,
        [title, year, director, duration, poster, rate]
      )

      const movie = this.getById({ id })
      return movie
    } catch (error) {
      throw new Error('There was an error when trying to create the movie')
    }
  }
}
