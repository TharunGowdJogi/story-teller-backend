module.exports = (app) => {
  const { createRole, getAllRoles, getRoleById, updateRole, deleteRole, deleteAllRoles } = require("../controllers/story_role.controller.js");
  var storyRoleRouter = require("express").Router();

  storyRoleRouter.post("/roles/", createRole);
  storyRoleRouter.get("/roles/", getAllRoles);
  storyRoleRouter.get("/roles/:id", getRoleById);
  storyRoleRouter.put("/roles/:id", updateRole);
  storyRoleRouter.delete("/roles/:id", deleteRole);
  storyRoleRouter.delete("/roles/", deleteAllRoles);
  app.use("/", storyRoleRouter);
};
