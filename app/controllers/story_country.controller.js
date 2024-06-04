const db = require("../models");
const Country = db.story_country;

// Retrieve all Countries from the database.
exports.getAllCountries = (req, res) => {
  Country.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving countries.",
      });
    });
};