module.exports = (app) => {
  const { createUser, getAllUsers, updateUser, deleteAllUsers, deleteUser, getUserById: findOne} = require("../controllers/user.controller.js");
  var userRouter = require("express").Router();

  userRouter.post("/users/", createUser);
  userRouter.get("/users/", getAllUsers);
  userRouter.get("/users/:id", findOne);
  userRouter.put("/users/:id", updateUser);
  userRouter.delete("/users/:id", deleteUser);
  userRouter.delete("/users/", deleteAllUsers);
  app.use("/", userRouter);
};
