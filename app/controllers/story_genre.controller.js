const db = require("../models");
const Genre = db.story_genre;
const Op = db.Sequelize.Op;

// Create and Save a new Genre
exports.createGenre = (req, res) => {
  // Validate request
  if (!req.body.genre_name) {
    res.status(400).send({
      message: "Genre name cannot be empty!",
    });
    return;
  }

  // Create a Genre
  const genre = {
    genre_name: req.body.genre_name,
  };

  // Save Genre in the database
  Genre.create(genre)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Genre.",
      });
    });
};

// Retrieve all Genres from the database.
exports.getAllGenres = (req, res) => {
  Genre.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving genres.",
      });
    });
};

// Find a single Genre with an id
exports.getGenreById = (req, res) => {
  const id = req.params.id;

  Genre.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Genre with id = ${id}.`,
        });
      }
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send({
        message: err.message || "Error retrieving Genre with id = " + id,
      });
    });
};

// Update a Genre by the id in the request
exports.updateGenre = (req, res) => {
  const id = req.params.id;

  Genre.update(req.body, {
    where: { genre_id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Genre was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Genre with id = ${id}. Maybe Genre was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send({
        message: err.message || "Error updating Genre with id = " + id,
      });
    });
};

// Delete a Genre with the specified id in the request
exports.deleteGenre = (req, res) => {
  const id = req.params.id;

  Genre.destroy({
    where: { genre_id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Genre was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Genre with id = ${id}. Maybe Genre was not found!`,
        });
      }
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send({
        message: err.message || "Could not delete Genre with id = " + id,
      });
    });
};

// Delete all Genres from the database.
exports.deleteAllGenres = (req, res) => {
  Genre.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Genres were deleted successfully!` });
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send({
        message: err.message || "Some error occurred while removing all genres.",
      });
    });
};
