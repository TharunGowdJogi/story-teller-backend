const db = require("../models");
const Language = db.story_language;

// Retrieve all Languages from the database.
exports.getAllLanguages = (req, res) => {
  Language.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving languages.",
      });
    });
};
