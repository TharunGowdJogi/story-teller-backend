module.exports = (app) => {
    const {getAllRoles } = require("../controllers/story_role.controller.js");
    var storyRoleRouter = require("express").Router();
  
    storyRoleRouter.get("/roles/", getAllRoles);
    app.use("/", storyRoleRouter);
  };
  