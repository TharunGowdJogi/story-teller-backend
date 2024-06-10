const db = require("../models");
const Country = db.story_country;
const Op = db.Sequelize.Op;

// Create and Save a new Country
exports.createCountry = (req, res) => {
  // Validate request
  if (!req.body.country_name) {
    res.status(400).send({
      message: "Country name cannot be empty!",
    });
    return;
  }

  // Create a Country
  const country = {
    country_name: req.body.country_name,
  };

  // Save Country in the database
  Country.create(country)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Country.",
      });
    });
};

// Retrieve all Countries from the database.
exports.getAllCountries = (req, res) => {
  Country.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving countries.",
      });
    });
};

// Find a single Country with an id
exports.getCountryById = (req, res) => {
  const id = req.params.id;

  Country.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Country with id = ${id}.`,
        });
      }
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send({
        message: err.message || "Error retrieving Country with id = " + id,
      });
    });
};

// Update a Country by the id in the request
exports.updateCountry = (req, res) => {
  const id = req.params.id;

  Country.update(req.body, {
    where: { country_id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Country was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Country with id = ${id}. Maybe Country was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send({
        message: err.message || "Error updating Country with id = " + id,
      });
    });
};

// Delete a Country with the specified id in the request
exports.deleteCountry = (req, res) => {
  const id = req.params.id;

  Country.destroy({
    where: { country_id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Country was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Country with id = ${id}. Maybe Country was not found!`,
        });
      }
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send({
        message: err.message || "Could not delete Country with id = " + id,
      });
    });
};

// Delete all Countries from the database.
exports.deleteAllCountries = (req, res) => {
  Country.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Countries were deleted successfully!` });
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send({
        message: err.message || "Some error occurred while removing all countries.",
      });
    });
};
