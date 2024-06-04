const db = require("../models");
const User = db.user;
const Session = db.session;
const Op = db.Sequelize.Op;
const { encrypt, getSalt, hashPassword } = require("../authentication/crypto");

// Create and Save a new User
exports.createUser = async (req, res) => {
  // Validate request
  if (req.body.name === undefined) {
    const error = new Error("name cannot be empty for user!");
    error.statusCode = 400;
    throw error;
  }  else if (req.body.email === undefined) {
    const error = new Error("Email cannot be empty for user!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.password === undefined) {
    const error = new Error("Password cannot be empty for user!");
    error.statusCode = 400;
    throw error;
  }

  // find by email
  await User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then(async (data) => {
      if (data) {
        return "This email is already in use.";
      } else {
        console.log("email not found");

        let salt = await getSalt();
        let hash = await hashPassword(req.body.password, salt);

        // Create a User
        const user = {
          id: req.body.id,
          name: req.body.name,
          email: req.body.email,
          password: hash,
          role_id: req.body.role_id || 1,
          salt: salt,
        };

        // Save User in the database
        await User.create(user)
          .then(async (data) => {
            // Create a Session for the new user
            let user_id = data.user_id;

            let expireTime = new Date();
            expireTime.setDate(expireTime.getDate() + 1);

            const session = {
              email: req.body.email,
              user_id: user_id,
              expiration_date: expireTime,
            };
            await Session.create(session).then(async (data) => {
              let sessionId = data.id;
              let token = await encrypt(sessionId);
              let userInfo = {
                email: user.email,
                name: user.name,
                id: user.id,
                role_id: user.role_id,
                token: token,
              };
              res.send(userInfo);
            });
          })
          .catch((err) => {
            console.log("Creaing user Error: ",err);
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the User.",
            });
          });
      }
    })
    .catch((err) => {
      console.log("Error retrieving User with email= ",email,". Error: ",err);
      return err.message || "Error retrieving User with email=" + email;
    });
};

// Retrieve all Users from the database.
exports.getAllUsers = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

  User.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log("get all users Error: ",err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    });
};

// Find a single User with an id
exports.getUserById = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find User with id = ${id}.`,
        });
      }
    })
    .catch((err) => {
      console.log("get user by id Error: ",err)
      res.status(500).send({
        message: err.message || "Error retrieving User with id = " + id,
      });
    });
};

// Find a single User with an email
exports.getUserByEmail = (req, res) => {
  const email = req.params.email;

  User.findOne({
    where: {
      email: email,
    },
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.send({ email: "not found" });
        /*res.status(404).send({
          message: `Cannot find User with email=${email}.`
        });*/
      }
    })
    .catch((err) => {
      console.log("get user by email Error: ",err)
      res.status(500).send({
        message: err.message || "Error retrieving User with email=" + email,
      });
    });
};

// Update a User by the id in the request
exports.updateUser = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "User was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update User with id = ${id}. Maybe User was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      console.log("user update Error: ",err)
      res.status(500).send({
        message: err.message || "Error updating User with id =" + id,
      });
    });
};

// Delete a User with the specified id in the request
exports.deleteUser = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "User was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete User with id = ${id}. Maybe User was not found!`,
        });
      }
    })
    .catch((err) => {
      console.log("deleting the user Error: ",err)
      res.status(500).send({
        message: err.message || "Could not delete User with id = " + id,
      });
    });
};

// Delete all People from the database.
exports.deleteAllUsers = (req, res) => {
  User.destroy({
    where: {},
    truncate: false,
  })
    .then((number) => {
      res.send({ message: `${number} People were deleted successfully!` });
    })
    .catch((err) => {
      console.log("delete all users Error: ",err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all people.",
      });
    });
};
