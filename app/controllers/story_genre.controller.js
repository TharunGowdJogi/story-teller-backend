const db = require("../models");
const Genre = db.story_genre;

// Retrieve all Genres from the database.
exports.getAllGenres = (req, res) => {
  Genre.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log("get all genres Error: ",err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving genres.",
      });
    });
};
