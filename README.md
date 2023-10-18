# Movie REST API

This repository contains a simple RESTful API for movies. The service is built with Node.js and Express.js using JavaScript. This API supports all basic CRUD (Create, Read, Update, Delete) operations on movie data.

## Project Setup

### Prerequisites

1. **Node.js** - The project was built with Node.js version v18.17.0, but should run on any later versions as well. Please download Node.js from [here](https://nodejs.org/).
2. **npm** - This comes bundled with Node.js and is required to manage the project's dependencies(you can use **pnpm** as well).

### Installation

Follow these steps to install the project:

1. Clone the repository:
```bash
git clone https://github.com/jpausa/express-rest-api.git
```

2. Navigate to the project's directory:
```bash
cd express-rest-api
```

3. Install the dependencies:
```bash
npm install
```
This command will fetch all the necessary packages.

## Configuration

You need to add a `.env` file to the root directory of the repository. This file should declare (at minimum) the following environment variables:

```bash
PORT=<Server Port>
DATABASE_URL=<Database Connection String>
```

Replace `<Server Port>` with the port number on which you want the server to run and `<Database Connection String>` with your MySQL connection string.

## Database Setup

You'll need to create the relevant tables in your MySQL database. Use the following commands:

```sql
CREATE TABLE movie (
 id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
 title VARCHAR(255) NOT NULL,
 year INT NOT NULL,
 director VARCHAR(255) NOT NULL,
 duration INT NOT NULL,
 poster TEXT,
 rate DECIMAL(2, 1) UNSIGNED NOT NULL
);

CREATE TABLE genre (
 id INT AUTO_INCREMENT PRIMARY KEY,
 name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE movie_genre (
movie_id BINARY(16) REFERENCES movies(id),
genre_id INT REFERENCES genres(id),
PRIMARY KEY (movie_id, genre_id)
);

INSERT INTO genre (name) VALUES
('Drama'),
('Action'),
('Crime'),
('Adventure'),
('Sci-Fi'),
('Romance');
```

## Running the API server locally

### Using a MySQL server

To start the server with a MySQL database, run:

```bash
npm run start
```

### Using local data

To start the server with local JSON data, run:

```bash
npm run start:local
```

In both cases, by default, the server runs on the port you specified in the `.env` file. You can access the API at `http://localhost:<your-port>`.

## API Endpoints

This API provides the following endpoints:

* `GET /movies` - Retrieves all movies
* `POST /movies` - Creates a new movie
* `GET /movies/:id` - Retrieves a specific movie by id
* `PUT /movies/:id` - Updates a specific movie by id
* `DELETE /movies/:id` - Deletes a specific movie by id

Please note that you should replace `:id` with the actual id of the movie.

## Contribute

Contributions are welcome. Please fork this repository and submit your changes via a pull request.

## License
This project is open-source and freely available under the MIT License. Please refer to the [LICENSE](LICENSE.md) file for further information.
