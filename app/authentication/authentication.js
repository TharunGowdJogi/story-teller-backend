const db = require("../models");
const { hashPassword } = require("./crypto");
const User = db.user;

authenticate = async (req, res) => {
  let auth = req.get("authorization");
  console.log(auth);
  let email = req.body.email;
  let password = req.body.password;
  let user = {};
  await User.findAll({ where: { email: email } })
    .then((data) => {
      user = data[0];
    })
    .catch((error) => {
      console.log(error);
    });
  if (user && user.user_id) {
    let hash = await hashPassword(password, user.salt);
    if (Buffer.compare(user.password, hash) !== 0) {
      return res.status(401).send({
        message: "Invalid password!",
      });
    }
    return {
      type: "credentials",
      userId: user.user_id,
    };
  } else {
    return res.status(401).send({
      message: "User not found!",
    });
  }
  };
const auth = {
  authenticate: authenticate,
};

module.exports = auth;
