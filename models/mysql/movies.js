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

  static async update ({ id, data }) {
    const { title, year, director, duration, poster, rate } = data

    try {
      await connection.query(
        'UPDATE movie SET title = IFNULL(?, title), year = IFNULL(?, year), director = IFNULL(?, director), duration = IFNULL(?, duration), poster = IFNULL(?, poster), rate = IFNULL(?, rate) WHERE id = UUID_TO_BIN(?);',
        [title, year, director, duration, poster, rate, id]
      )

      const movie = this.getById({ id })
      return movie
    } catch (error) {
      throw new Error('There was an error when trying to update the movie')
    }
  }

  static async delete ({ id }) {
    try {
      await connection.query('DELETE FROM movie WHERE id = UUID_TO_BIN(?);', [id])
      return this.getAll({ genre: null })
    } catch (error) {
      throw new Error('There was an error when trying to delete the movie')
    }
  }

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
