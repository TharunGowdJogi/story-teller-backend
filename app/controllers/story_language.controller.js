const db = require("../models");
const Language = db.story_language;
const Op = db.Sequelize.Op;

// Create and Save a new Language
exports.createLanguage = (req, res) => {
  // Validate request
  if (!req.body.language_name) {
    res.status(400).send({
      message: "Language name cannot be empty!",
    });
    return;
  }

  // Create a Language
  const language = {
    language_name: req.body.language_name,
  };

  // Save Language in the database
  Language.create(language)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Language.",
      });
    });
};

// Retrieve all Languages from the database.
exports.getAllLanguages = (req, res) => {
  Language.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving languages.",
      });
    });
};

// Find a single Language with an id
exports.getLanguageById = (req, res) => {
  const id = req.params.id;

  Language.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Language with id = ${id}.`,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: err.message || "Error retrieving Language with id = " + id,
      });
    });
};

// Update a Language by the id in the request
exports.updateLanguage = (req, res) => {
  const id = req.params.id;

  Language.update(req.body, {
    where: { language_id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Language was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Language with id = ${id}. Maybe Language was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: err.message || "Error updating Language with id = " + id,
      });
    });
};

// Delete a Language with the specified id in the request
exports.deleteLanguage = (req, res) => {
  const id = req.params.id;

  Language.destroy({
    where: { language_id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Language was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Language with id = ${id}. Maybe Language was not found!`,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: err.message || "Could not delete Language with id = " + id,
      });
    });
};

// Delete all Languages from the database.
exports.deleteAllLanguages = (req, res) => {
  Language.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Languages were deleted successfully!` });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: err.message || "Some error occurred while removing all languages.",
      });
    });
};
