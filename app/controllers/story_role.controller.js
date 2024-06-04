const db = require("../models");
const Role = db.story_role;


// Retrieve all Roles from the database.
exports.getAllRoles = (req, res) => {
  Role.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving roles.",
      });
    });
};